import { NextRequest, NextResponse } from 'next/server';

/**
 * Progressive capture proxy → GHL inbound webhook.
 *
 * Called twice per applicant:
 *  1. stage "started"   — fires the moment quiz step 2 (contact) completes.
 *     → tag: application-started → triggers the existing GHL abandonment workflow.
 *  2. stage "completed" — fires on final submit with all answers.
 *     → tag: application-completed + remove_tags: [application-started]
 *     → triggers the booking-reminder workflow.
 *
 * Custom field keys match the spec exactly: goal, how_long, obstacle, readiness_score.
 * In GHL, map the webhook JSON paths customField.goal etc. to your custom fields
 * (see README → "GHL wiring").
 *
 * Keeping this server-side means the webhook URL lives in GHL_WEBHOOK_URL
 * (no NEXT_PUBLIC_ prefix) and is never shipped to the browser.
 */
export async function POST(req: NextRequest) {
  const webhook = process.env.GHL_WEBHOOK_URL;
  // Free alternative to the (premium) inbound-webhook trigger: a Private
  // Integration token (GHL Settings → Private Integrations, scope
  // contacts.write) + the sub-account's Location ID.
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!webhook && !(apiToken && locationId)) {
    // Dev-friendly: succeed silently so the quiz flow is testable without keys.
    console.warn('[ghl] no GHL_WEBHOOK_URL and no GHL_API_TOKEN/GHL_LOCATION_ID — payload dropped');
    return NextResponse.json({ ok: true, dev: true });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const stage = body.stage === 'completed' ? 'completed' : 'started';
  const answers = (body.answers || {}) as Record<string, unknown>;
  const utms = (body.utms || {}) as Record<string, unknown>;

  const payload = {
    first_name: body.first_name ?? '',
    phone: body.phone ?? '',
    email: body.email ?? '',
    tags: stage === 'completed' ? ['application-completed'] : ['application-started'],
    remove_tags: stage === 'completed' ? ['application-started'] : [],
    customField: {
      goal: answers.goal ?? '',
      how_long: answers.how_long ?? '',
      obstacle: answers.obstacle ?? '',
      readiness_score: answers.readiness_score ?? '',
    },
    attribution: {
      ...utms,
      page: body.page ?? '/apply',
      ab_q1_variant: body.ab_q1_variant ?? 'a',
      submitted_at: new Date().toISOString(),
    },
    source: 'website-quiz-application',
  };

  // Path 1 — inbound webhook (if the premium trigger ever exists).
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error('[ghl] webhook responded', res.status);
        return NextResponse.json({ ok: false }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error('[ghl] webhook error', e);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  // Path 2 — direct contact upsert via the GHL API (free; no premium trigger).
  try {
    const headers = {
      Authorization: `Bearer ${apiToken}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    };
    const up = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId,
        firstName: payload.first_name,
        phone: payload.phone,
        email: payload.email || undefined,
        tags: payload.tags,
        source: payload.source,
      }),
    });
    if (!up.ok) {
      console.error('[ghl] contact upsert responded', up.status, await up.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    const contact = (await up.json()) as { contact?: { id?: string } };
    const contactId = contact?.contact?.id;
    // Quiz answers + attribution land as a note on the contact timeline, so
    // whoever follows up sees them without custom-field mapping.
    if (contactId) {
      const noteLines = [
        `Website quiz (${stage})`,
        `Goal: ${payload.customField.goal || '—'}`,
        `Wanting change for: ${payload.customField.how_long || '—'}`,
        `Obstacle: ${payload.customField.obstacle || '—'}`,
        `Readiness: ${payload.customField.readiness_score || '—'}/10`,
        `Page: ${payload.attribution.page} · q1 variant ${payload.attribution.ab_q1_variant}`,
        Object.entries(utms).length
          ? `UTMs: ${Object.entries(utms).map(([k, v]) => `${k}=${v}`).join(' ')}`
          : '',
      ].filter(Boolean);
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: noteLines.join('\n') }),
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[ghl] api upsert error', e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

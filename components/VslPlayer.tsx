'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { track, recordWatchDepth } from '@/lib/tracking';

/**
 * VSL player. Requirements (spec):
 *  - click-to-play with poster (captions are burned into the video itself)
 *  - lazy: no player JS/iframe loads until the poster is tapped
 *  - zero CLS: aspect-ratio box is always reserved
 *  - fires VSLPlay + VSLProgress25/50/75/100 (power the retargeting cutdowns)
 *
 * Provider via env: NEXT_PUBLIC_VSL_PROVIDER = mp4 | youtube | vimeo
 *  - mp4:      NEXT_PUBLIC_VSL_ID = full video file URL (quartiles via timeupdate)
 *  - youtube:  NEXT_PUBLIC_VSL_ID = video ID            (quartiles via 1s polling)
 *  - vimeo:    NEXT_PUBLIC_VSL_ID = video ID            (quartiles via player.js API)
 * Unset → labeled placeholder so the page still builds and lays out correctly.
 */

const PROVIDER = process.env.NEXT_PUBLIC_VSL_PROVIDER || 'mp4';
const VIDEO_ID = process.env.NEXT_PUBLIC_VSL_ID || '';
const POSTER = process.env.NEXT_PUBLIC_VSL_POSTER || '/images/vsl-poster.jpg';

const QUARTILES = [25, 50, 75, 100] as const;

function useQuartiles() {
  const fired = useRef(new Set<number>());
  return (pct: number) => {
    QUARTILES.forEach((q) => {
      if (pct >= q && !fired.current.has(q)) {
        fired.current.add(q);
        track(`VSLProgress${q}`);
        recordWatchDepth(q);
      }
    });
  };
}

export default function VslPlayer({ onPlay }: { onPlay?: () => void }) {
  const [playing, setPlaying] = useState(false);
  const checkQuartiles = useQuartiles();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const start = () => {
    setPlaying(true);
    track('VSLPlay');
    onPlay?.();
  };

  // mp4 quartiles
  useEffect(() => {
    if (!playing || PROVIDER !== 'mp4') return;
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration > 0) checkQuartiles((v.currentTime / v.duration) * 100);
    };
    const onEnded = () => checkQuartiles(100);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    v.play().catch(() => {});
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // youtube quartiles (IFrame API)
  useEffect(() => {
    if (!playing || PROVIDER !== 'youtube') return;
    let player: any;
    let poll: ReturnType<typeof setInterval>;
    const w = window as any;
    const init = () => {
      player = new w.YT.Player(iframeRef.current, {
        events: {
          onReady: (e: any) => e.target.playVideo(),
          onStateChange: (e: any) => {
            if (e.data === w.YT.PlayerState.ENDED) checkQuartiles(100);
          },
        },
      });
      poll = setInterval(() => {
        try {
          const d = player.getDuration?.();
          const t = player.getCurrentTime?.();
          if (d > 0) checkQuartiles((t / d) * 100);
        } catch {}
      }, 1000);
    };
    if (w.YT?.Player) init();
    else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      w.onYouTubeIframeAPIReady = init;
    }
    return () => clearInterval(poll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // vimeo quartiles (player.js)
  useEffect(() => {
    if (!playing || PROVIDER !== 'vimeo') return;
    const w = window as any;
    const init = () => {
      const player = new w.Vimeo.Player(iframeRef.current);
      player.on('timeupdate', (d: { percent: number }) => checkQuartiles(d.percent * 100));
      player.on('ended', () => checkQuartiles(100));
      player.play().catch(() => {});
    };
    if (w.Vimeo?.Player) init();
    else {
      const tag = document.createElement('script');
      tag.src = 'https://player.vimeo.com/api/player.js';
      tag.onload = init;
      document.head.appendChild(tag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-ink shadow-xl" style={{ aspectRatio: '16 / 9' }}>
      {!playing ? (
        <button
          onClick={start}
          aria-label="Play the 4-minute video"
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={POSTER}
            alt="Coach Nate — tap to play the 4-minute video"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-active:scale-95">
              <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden>
                <path d="M2 2 L28 17 L2 32 Z" fill="#14161A" />
              </svg>
            </span>
          </span>
          {/* No text overlay: the poster has its own baked-in title/duration lettering,
              and the duration line renders directly below the frame (VslHero). */}
        </button>
      ) : PROVIDER === 'mp4' && VIDEO_ID ? (
        <video
          ref={videoRef}
          src={VIDEO_ID}
          poster={POSTER}
          controls
          playsInline
          className="absolute inset-0 h-full w-full"
        />
      ) : PROVIDER === 'youtube' && VIDEO_ID ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Watch the 4-minute video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : PROVIDER === 'vimeo' && VIDEO_ID ? (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIDEO_ID}?autoplay=1&playsinline=1`}
          title="Watch the 4-minute video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white/80">
          <p>
            VSL not configured — set <code>NEXT_PUBLIC_VSL_PROVIDER</code> +{' '}
            <code>NEXT_PUBLIC_VSL_ID</code> in <code>.env.local</code>
          </p>
        </div>
      )}
    </div>
  );
}

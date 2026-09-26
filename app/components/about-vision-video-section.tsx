"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  loadVimeoPlayerAPI,
  type VimeoPlayerInstance,
} from "@/lib/vimeo-player-api";

const VIMEO_ID = "1211636228";
const VIDEO_POSTER = "/images/durabilite_1.webp";

function vimeoEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    autoplay: "1",
    muted: "1",
    loop: "1",
    background: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    playsinline: "1",
    dnt: "1",
    quality: "720p",
  });
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

export function AboutVisionVideoSection({
  videoId = VIMEO_ID,
}: {
  videoId?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayerInstance | null>(null);
  const isNearRef = useRef(false);
  const isInViewRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const [isNear, setIsNear] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
    restDelta: 0.001,
  });

  const clipInset = useTransform(
    smoothProgress,
    [0.18, 0.48],
    reduceMotion ? [0, 0] : [14, 0]
  );
  const clipPath = useTransform(clipInset, (v) => {
    const inset = `${v}%`;
    return `inset(${inset} ${inset} ${inset} ${inset})`;
  });

  useEffect(() => {
    void loadVimeoPlayerAPI().catch(() => {});
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const syncPlayback = () => {
      const player = playerRef.current;
      if (!player) return;
      if (isNearRef.current || isInViewRef.current) {
        void player.setMuted(true);
        void player.play().catch(() => {});
      } else {
        void player.pause().catch(() => {});
      }
    };

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        const near = entry.isIntersecting;
        isNearRef.current = near;
        if (near) setIsNear(true);
        syncPlayback();
      },
      { root: null, rootMargin: "150% 0px", threshold: 0 }
    );

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.25;
        syncPlayback();
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.25, 0.5, 1] }
    );

    nearObserver.observe(section);
    viewObserver.observe(section);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isNear) return;

    let cancelled = false;
    let rafId = 0;

    rafId = requestAnimationFrame(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      void loadVimeoPlayerAPI()
        .then(async () => {
          if (cancelled || !iframeRef.current) return;
          const Vimeo = window.Vimeo;
          if (!Vimeo?.Player) return;

          const player = new Vimeo.Player(iframe);
          playerRef.current = player;

          await player.setMuted(true);
          await player.setLoop(true);
          await player.setVolume(0);

          player.on("play", () => {
            if (!cancelled) setShowPoster(false);
          });

          player.on("loaded", () => {
            if (!cancelled) setIsPlayerReady(true);
          });

          try {
            await player.play();
          } catch {
            // ignore autoplay policy failures
          }

          if (!cancelled) setIsPlayerReady(true);
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore destroy errors during unmount
      }
      playerRef.current = null;
      setIsPlayerReady(false);
    };
  }, [isNear, videoId]);

  // Keep a fixed-length dependency list for Fast Refresh stability.
  useEffect(() => {
    if (!isPlayerReady) return;
    const player = playerRef.current;
    if (!player) return;
    if (isNearRef.current || isInViewRef.current) {
      void player.setMuted(true);
      void player.play().catch(() => {});
    }
  }, [isPlayerReady]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-[100vw] h-[140vh] bg-background md:h-[160vh] lg:h-[170vh]"
      aria-label="Vidéo de présentation"
    >
      <div className="sticky top-0 z-10 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <motion.div
          className="relative z-10 h-full w-full min-w-0 overflow-hidden bg-background [transform:translateZ(0)]"
          style={{ clipPath }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 backface-hidden">
            {isNear ? (
              <iframe
                ref={iframeRef}
                src={vimeoEmbedSrc(videoId)}
                title="CAP Congo — vidéo"
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : null}
          </div>

          <div
            className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-700 ${
              showPoster ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showPoster}
          >
            <Image
              src={VIDEO_POSTER}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-cap-dark/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlayback = async () => {
      try {
        audio.volume = 0.9;
        await audio.play();
      } catch {
        // Browsers may block autoplay until the user interacts with the page.
      }
    };

    void startPlayback();

    const handleInteraction = () => {
      if (audio.paused) {
        void startPlayback();
      }
    };

    document.addEventListener("pointerdown", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("pointerdown", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return <audio ref={audioRef} src="/music.mp3" autoPlay loop preload="auto" playsInline />;
}

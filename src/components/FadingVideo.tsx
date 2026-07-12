import React, { useRef, useEffect } from 'react';

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style, ...props }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRafId = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55; // seconds

    const fadeTo = (targetOpacity: number, durationMs: number = FADE_MS) => {
      if (fadeRafId.current !== null) {
        cancelAnimationFrame(fadeRafId.current);
      }

      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          fadeRafId.current = requestAnimationFrame(animate);
        } else {
          fadeRafId.current = null;
        }
      };

      fadeRafId.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(console.error);
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      if (!fadingOutRef.current && timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (fadeRafId.current !== null) {
        cancelAnimationFrame(fadeRafId.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
      {...props}
    />
  );
}

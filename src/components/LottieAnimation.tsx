
'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { fetchLottieData } from '@/lib/lottie-cache';
import { cn } from '@/lib/utils';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps {
  url: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  playInterval?: number; // Har necha ms da qayta o'ynashi (ixtiyoriy)
}

/**
 * An optimized Lottie player that uses a global cache for faster loading.
 */
export function LottieAnimation({
  url,
  className,
  loop = true,
  autoplay = true,
  onComplete,
  playInterval,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    fetchLottieData(url).then((data) => {
      if (isMounted && data) {
        setAnimationData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [url]);

  useEffect(() => {
    if (!animationData || !playInterval) return;

    const interval = setInterval(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0);
      }
    }, playInterval);

    return () => clearInterval(interval);
  }, [animationData, playInterval]);

  if (!animationData) {
    return <div className={cn('bg-zinc-800/20 animate-pulse rounded-full', className)} />;
  }

  return (
    <div className={cn('flex items-center justify-center overflow-visible', className)}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        className="w-full h-full"
      />
    </div>
  );
}

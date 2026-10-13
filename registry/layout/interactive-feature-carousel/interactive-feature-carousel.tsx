import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CaretLeft, 
  CaretRight, 
  Lightning, 
  ShieldCheck, 
  Cpu, 
  Browsers, 
  ArrowRight,
  CloudCheck
} from '@phosphor-icons/react';

export interface CarouselSlide {
  id: string;
  badge: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: 'lightning' | 'shield' | 'cpu' | 'cloud';
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: '1',
    badge: 'EDGE COMPUTE',
    title: 'Sub-Millisecond V8 Isolate Execution',
    description: 'Distribute serverless functions globally across 320+ edge point-of-presences with zero cold starts.',
    metric: '0.8ms',
    metricLabel: 'Global Median Latency',
    icon: 'lightning',
  },
  {
    id: '2',
    badge: 'NEURAL INFRA',
    title: 'Autonomous Multi-Agent Orchestration',
    description: 'Coordinate background reasoning swarms with streaming token compaction and distributed state locks.',
    metric: '99.98%',
    metricLabel: 'Agent Consensus Rate',
    icon: 'cpu',
  },
  {
    id: '3',
    badge: 'ENTERPRISE VAULT',
    title: 'Zero-Knowledge Cryptographic Isolation',
    description: 'Hardware-enforced confidential computing enclaves guaranteeing memory encryption at runtime.',
    metric: '256-bit',
    metricLabel: 'AES-GCM Quantum Shield',
    icon: 'shield',
  },
  {
    id: '4',
    badge: 'HYPER-SCALE CACHE',
    title: 'Distributed In-Memory Semantic Store',
    description: 'Sub-second vector indexing with real-time replication across multi-region datacenters.',
    metric: '12M req/s',
    metricLabel: 'Throughput Capacity',
    icon: 'cloud',
  },
];

export interface InteractiveFeatureCarouselProps {
  slides?: CarouselSlide[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export const InteractiveFeatureCarousel: React.FC<InteractiveFeatureCarouselProps> = ({
  slides = DEFAULT_SLIDES,
  autoplay = false,
  autoplayInterval = 4500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const getSlideIcon = (type: CarouselSlide['icon']) => {
    switch (type) {
      case 'lightning': return <Lightning size={24} weight="bold" className="text-amber-400" />;
      case 'cpu': return <Cpu size={24} weight="bold" className="text-cyan-400" />;
      case 'shield': return <ShieldCheck size={24} weight="bold" className="text-emerald-400" />;
      case 'cloud': return <CloudCheck size={24} weight="bold" className="text-violet-400" />;
      default: return <Browsers size={24} weight="bold" className="text-indigo-400" />;
    }
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center select-none ${className}`}>
      {/* 3D Stacked Card Perspective Deck */}
      <div className="relative w-full h-[340px] sm:h-[320px] flex items-center justify-center perspective-[1000px]">
        {slides.map((slide, index) => {
          // Calculate relative position (-1: left, 0: center, 1: right)
          const offset = (index - currentIndex + slides.length) % slides.length;
          let normalizedOffset = offset;
          if (offset > slides.length / 2) {
            normalizedOffset = offset - slides.length;
          }

          const isCenter = normalizedOffset === 0;
          const isLeft = normalizedOffset === -1;
          const isRight = normalizedOffset === 1;
          const isVisible = Math.abs(normalizedOffset) <= 1;

          if (!isVisible) return null;

          return (
            <motion.div
              key={slide.id}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              initial={false}
              animate={{
                x: isCenter ? '0%' : isLeft ? '-45%' : '45%',
                scale: isCenter ? 1 : 0.86,
                rotateY: isCenter ? 0 : isLeft ? 14 : -14,
                zIndex: isCenter ? 30 : 10,
                opacity: isCenter ? 1 : 0.45,
                filter: isCenter ? 'blur(0px)' : 'blur(1.5px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 26,
              }}
              className={`absolute w-full max-w-[340px] sm:max-w-[420px] rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl cursor-pointer transition-colors duration-200`}
            >
              {/* Card Header & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5">
                  {getSlideIcon(slide.icon)}
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10">
                  {slide.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                {slide.description}
              </p>

              {/* Metric & Action Row */}
              <div className="flex items-end justify-between pt-4 border-t border-zinc-200/80 dark:border-white/5">
                <div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {slide.metric}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">
                    {slide.metricLabel}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight size={13} weight="bold" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls & Pagination Indicators */}
      <div className="mt-6 flex items-center gap-6">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <CaretLeft size={16} weight="bold" />
        </button>

        {/* Step Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === i 
                  ? 'w-7 bg-zinc-900 dark:bg-white' 
                  : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
};

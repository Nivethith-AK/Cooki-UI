import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, easeOut, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThreeDImageRingProps {
  /** Array of image URLs to display in the ring */
  images?: string[];
  /** Container width in pixels (will be scaled) */
  width?: number;
  /** 3D perspective value */
  perspective?: number;
  /** Distance of images from center (z-depth) */
  imageDistance?: number;
  /** Initial rotation of the ring */
  initialRotation?: number;
  /** Animation duration for entrance */
  animationDuration?: number;
  /** Stagger delay between images */
  staggerDelay?: number;
  /** Hover opacity for non-hovered images */
  hoverOpacity?: number;
  /** Custom container className */
  containerClassName?: string;
  /** Custom ring className */
  ringClassName?: string;
  /** Custom image className */
  imageClassName?: string;
  /** Background color of the stage */
  backgroundColor?: string;
  /** Enable/disable drag functionality */
  draggable?: boolean;
  /** Breakpoint for mobile responsiveness */
  mobileBreakpoint?: number;
  /** Scale factor for mobile */
  mobileScaleFactor?: number;
  /** Power for the drag end inertia animation */
  inertiaPower?: number;
  /** Time constant for the drag end inertia animation */
  inertiaTimeConstant?: number;
  /** Multiplier for initial velocity when drag ends */
  inertiaVelocityMultiplier?: number;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744626753-1fa7604d459a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071131384-001b85755536?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
];

export function ThreeDImageRing({
  images = DEFAULT_IMAGES,
  width = 240,
  perspective = 1600,
  imageDistance = 360,
  initialRotation = 180,
  animationDuration = 1.2,
  staggerDelay = 0.08,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.75,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / Math.max(1, images.length), [images.length]);

  const getBgPos = (imageIndex: number, currentRot: number, scale: number) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = (((effectiveRotation % 360) + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement as HTMLElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grabbing";
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (t) => Math.round(t / angle) * angle,
      onUpdate: (latest) => {
        rotationY.set(latest);
      },
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[360px] overflow-hidden select-none relative flex items-center justify-center",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.3}px`,
          position: "relative",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn("w-full h-full absolute inset-0", ringClassName)}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          {showImages &&
            images.map((imageUrl, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-full h-full absolute rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10",
                  imageClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                  rotateY: index * -angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  backgroundPosition: getBgPos(
                    index,
                    currentRotationY.current,
                    currentScale
                  ),
                }}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                custom={index}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                onHoverStart={() => {
                  if (isDragging.current || !ringRef.current) return;
                  Array.from(ringRef.current.children).forEach((imgEl, i) => {
                    if (i !== index) {
                      (imgEl as HTMLElement).style.opacity = `${hoverOpacity}`;
                    }
                  });
                }}
                onHoverEnd={() => {
                  if (isDragging.current || !ringRef.current) return;
                  Array.from(ringRef.current.children).forEach((imgEl) => {
                    (imgEl as HTMLElement).style.opacity = "1";
                  });
                }}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ThreeDImageRing;

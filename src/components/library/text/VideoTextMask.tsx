import React, { ReactNode, useEffect, useState, useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VideoTextMaskProps {
  src?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  as?: "div" | "span" | "section" | "article" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function VideoTextMask({
  src = "https://assets.mixkit.co/videos/preview/mixkit-fluid-lines-moving-in-slow-motion-41857-large.mp4",
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = "16vw",
  fontWeight = "900",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "system-ui, -apple-system, sans-serif",
  as = "div",
  ...motionProps
}: VideoTextMaskProps & HTMLMotionProps<"div">) {
  const [svgMask, setSvgMask] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const responsiveFontSize =
      typeof fontSize === "number" ? `${fontSize}px` : fontSize;

    const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1000 300'>
      <text x='50%' y='50%'
            font-size='${responsiveFontSize}'
            font-weight='${fontWeight}'
            text-anchor='${textAnchor}'
            dominant-baseline='${dominantBaseline}'
            font-family='${fontFamily}'
            letter-spacing='-0.03em'
            fill='black'>${content}</text>
    </svg>`;
    setSvgMask(newSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleError = () => setVideoError(true);

    vid.addEventListener("canplay", handleCanPlay);
    vid.addEventListener("error", handleError);

    // Attempt autoplay safely
    if (autoPlay) {
      vid.play().catch(() => {
        // Autoplay may be restricted by browser policy; fallback gradient shines through
      });
    }

    return () => {
      vid.removeEventListener("canplay", handleCanPlay);
      vid.removeEventListener("error", handleError);
    };
  }, [src, autoPlay]);

  const validTags = ["div", "span", "section", "article", "p", "h1", "h2", "h3", "h4", "h5", "h6"] as const;
  type ValidTag = (typeof validTags)[number];
  const MotionComponent = motion[validTags.includes(as) ? as : "div"] as any;

  if (!svgMask) {
    return React.createElement(
      MotionComponent,
      {
        className: cn("relative size-full", className),
        ...motionProps,
      },
      <span className="sr-only">{content}</span>
    );
  }

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return React.createElement(
    MotionComponent,
    {
      className: cn(
        "relative w-full h-48 sm:h-56 overflow-hidden rounded-xl bg-zinc-950 flex items-center justify-center select-none shadow-2xl",
        className
      ),
      ...motionProps,
    },
    <>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        {/* Animated Cyber Aurora Fluid Fallback (Always active & shining through) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 90, 180, 270, 360],
              x: [-20, 20, -20],
              y: [-10, 15, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-indigo-500 to-rose-500 opacity-80 blur-xl"
          />
        </div>

        {/* Video stream layered on top if available */}
        {!videoError && src && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            preload={preload}
            playsInline
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      <span className="sr-only">{content}</span>
    </>
  );
}

export default VideoTextMask;

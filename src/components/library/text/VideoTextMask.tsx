import React, { ReactNode, useEffect, useState } from "react";
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
      className: cn("relative w-full h-48 sm:h-56 overflow-hidden rounded-xl bg-zinc-950 flex items-center justify-center select-none", className),
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
        <video
          className="w-full h-full object-cover scale-105"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <span className="sr-only">{content}</span>
    </>
  );
}

export default VideoTextMask;

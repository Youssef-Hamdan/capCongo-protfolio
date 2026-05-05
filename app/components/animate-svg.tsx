"use client";

import {
  type Variants,
  motion,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { useState, useEffect, useMemo, useRef, type FC } from "react";

type PathData = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
};

export type HoverAnimationType =
  | "float"
  | "pulse"
  | "redraw"
  | "color"
  | "sequential";

type ViewportOptions = {
  once?: boolean;
  amount?: number;
};

type TAnimateSvgProps = {
  width: string;
  height: string;
  viewBox: string;
  className: string;
  /** Default `xMidYMid meet`. Use `none` to stretch the path with the box (e.g. background ribbons). */
  preserveAspectRatio?: string;
  path?: string;
  paths?: PathData[];
  strokeColor?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  animationDuration?: number;
  animationDelay?: number;
  animationBounce?: number;
  staggerDelay?: number;
  reverseAnimation?: boolean;
  /** When true (default), paths reveal when the SVG scrolls into view. */
  animateOnView?: boolean;
  viewport?: ViewportOptions;
  enableHoverAnimation?: boolean;
  hoverAnimationType?: HoverAnimationType;
  hoverStrokeColor?: string | null;
  initialAnimation?: boolean;
};

export const AnimateSvg: FC<TAnimateSvgProps> = ({
  width,
  height,
  viewBox,
  className,
  preserveAspectRatio = "xMidYMid meet",
  path,
  paths = [],
  strokeColor = "#575756",
  strokeWidth = 3,
  strokeLinecap = "round",
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  staggerDelay = 0.2,
  reverseAnimation = false,
  animateOnView = true,
  viewport: viewportOptions,
  enableHoverAnimation = false,
  hoverAnimationType = "redraw",
  hoverStrokeColor = "#70aa43",
  initialAnimation = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const inView = useInView(svgRef, {
    once: viewportOptions?.once ?? true,
    amount: viewportOptions?.amount ?? 0.2,
  });

  const isInView = animateOnView ? inView : true;

  const normalizedPaths: PathData[] = useMemo(() => {
    if (paths.length > 0) return paths;
    if (path) {
      return [
        {
          d: path,
          stroke: strokeColor,
          strokeWidth,
          strokeLinecap,
        },
      ];
    }
    return [];
  }, [paths, path, strokeColor, strokeWidth, strokeLinecap]);

  const getPathVariants = (index: number): Variants => ({
    hidden: {
      pathLength: 0,
      opacity: 0,
      pathOffset: reverseAnimation ? 1 : 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      pathOffset: reverseAnimation ? 0 : 0,
      transition: {
        pathLength: {
          type: "spring",
          duration: animationDuration,
          bounce: animationBounce,
          delay: animationDelay + index * staggerDelay,
        },
        pathOffset: {
          duration: animationDuration,
          delay: animationDelay + index * staggerDelay,
        },
        opacity: {
          duration: animationDuration / 4,
          delay: animationDelay + index * staggerDelay,
        },
      },
    },
  });

  if (normalizedPaths.length === 0) return null;

  return (
    <motion.svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onHoverStart={() => {
        if (enableHoverAnimation) setIsHovering(true);
      }}
      onHoverEnd={() => {
        if (enableHoverAnimation) setIsHovering(false);
      }}
      whileHover={
        enableHoverAnimation && hoverAnimationType !== "redraw"
          ? { scale: 1.05 }
          : undefined
      }
    >
      {normalizedPaths.map((pathData, index) => (
        <AnimatedPath
          key={index}
          pathData={pathData}
          index={index}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          initialAnimation={initialAnimation}
          pathVariants={getPathVariants(index)}
          isInView={isInView}
          isHovering={isHovering && enableHoverAnimation}
          hoverEnabled={enableHoverAnimation}
          hoverAnimationType={hoverAnimationType}
          hoverStrokeColor={hoverStrokeColor}
          totalPaths={normalizedPaths.length}
        />
      ))}
    </motion.svg>
  );
};

interface AnimatedPathProps {
  pathData: PathData;
  index: number;
  strokeColor: string;
  strokeWidth: number;
  strokeLinecap: "butt" | "round" | "square";
  initialAnimation: boolean;
  pathVariants: Variants;
  isInView: boolean;
  isHovering: boolean;
  hoverEnabled: boolean;
  hoverAnimationType: HoverAnimationType;
  hoverStrokeColor: string | null;
  totalPaths: number;
}

const AnimatedPath: FC<AnimatedPathProps> = ({
  pathData,
  index,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  initialAnimation,
  pathVariants,
  isInView,
  isHovering,
  hoverEnabled,
  hoverAnimationType,
  hoverStrokeColor,
  totalPaths,
}) => {
  const controls = useAnimationControls();
  const originalColor = pathData.stroke || strokeColor;

  const variantState =
    !initialAnimation
      ? "visible"
      : isInView
        ? "visible"
        : "hidden";

  useEffect(() => {
    if (!hoverEnabled) return;

    if (!isHovering) {
      void controls.stop();
      return;
    }

    switch (hoverAnimationType) {
      case "redraw":
        void controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "float":
        void controls.start({
          y: [0, -2, 0],
          transition: {
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "pulse":
        void controls.start({
          scale: [1, 1.03, 1],
          transition: {
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "color":
        void controls.start({
          stroke: [
            originalColor,
            hoverStrokeColor || strokeColor,
            originalColor,
          ],
          transition: {
            stroke: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "sequential":
        void controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: (index / Math.max(totalPaths, 1)) * 2,
              ease: "easeInOut",
            },
          },
        });
        break;
    }
  }, [
    hoverEnabled,
    isHovering,
    hoverAnimationType,
    controls,
    originalColor,
    hoverStrokeColor,
    strokeColor,
    index,
    totalPaths,
    initialAnimation,
  ]);

  const animate = hoverEnabled && isHovering ? controls : variantState;

  return (
    <motion.path
      d={pathData.d}
      stroke={pathData.stroke ?? strokeColor}
      strokeWidth={pathData.strokeWidth ?? strokeWidth}
      strokeLinecap={pathData.strokeLinecap ?? strokeLinecap}
      initial={initialAnimation ? "hidden" : "visible"}
      animate={animate}
      variants={pathVariants}
    />
  );
};

export type { PathData, TAnimateSvgProps };

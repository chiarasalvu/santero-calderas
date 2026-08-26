"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      // Skip the tween entirely for users who asked for less motion —
      // jump straight to the final value instead of ticking up.
      if (ref.current) {
        ref.current.textContent = value.toFixed(decimals);
      }
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        // Writes directly to the DOM node, bypassing React state, for
        // perf on a 60fps tween. Safe as long as nothing re-renders this
        // span's parent mid-count — if this component is ever reused
        // under a frequently-re-rendering parent, switch to
        // useMotionValueEvent + React state instead.
        if (ref.current) {
          ref.current.textContent = latest.toFixed(decimals);
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, motionValue, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  );
}

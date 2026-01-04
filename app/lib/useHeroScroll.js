"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHeroScroll({ containerRef, end = "+=100%" }) {
  return () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end,
        pin: true,
        scrub: 1,
      },
      scale: 0.78,
      rotationX: 12,
      rotationZ: -6,
      y: -80,
      borderRadius: "40px",
      transformOrigin: "center center",
      ease: "none",
    });
  };
}

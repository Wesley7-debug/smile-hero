"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingElements() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".floating-face", {
        x: xPos,
        y: yPos,
        stagger: 0.02,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-20"
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="floating-face absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <img
            src="/svg/octagon.png"
            className="w-8 h-8 opacity-40 animate-pulse"
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

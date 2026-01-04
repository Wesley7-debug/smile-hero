"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroFace from "../ui/HeroFace";
import FloatingElements from "../ui/FloatingElements";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef(null);
  const aboutRef = useRef(null); // <-- New ref for About

  // Hero animations (unchanged)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      gsap.set(".slam-text, .face-wrapper, .floating-wrapper, .cta-badge", {
        opacity: 0,
      });

      tl.fromTo(
        ".slam-text",
        { scale: 8, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 0.4,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "back.out(1.2)",
        }
      )
        .fromTo(
          ".face-wrapper",
          { scale: 0, opacity: 0, rotation: -10 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ".floating-wrapper",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, stagger: 0.2 },
          "-=0.5"
        )
        .fromTo(
          ".cta-badge",
          { x: 100, opacity: 0, rotation: 45 },
          {
            x: 0,
            opacity: 1,
            rotation: 3,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1"
        );
    },
    { scope: container }
  );

  // Scroll animations
  useGSAP(() => {
    // Hero container scroll animation
    gsap.to(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: () =>
          "+=" + (window.innerHeight + aboutRef.current.offsetHeight * 0.2),
        scrub: 1,
        pin: true,
      },
      onLeave: () => {
        // Immediately reset Hero to relative positioning
        container.current.style.position = "relative";
        container.current.style.top = "0";
        container.current.style.left = "0";
        container.current.style.transform = "none";
      },
      y: 250,
      scale: 0.75,
      rotation: -15,
      ease: "power3.inOut",
    });

    // About section scroll animation
    gsap.fromTo(
      aboutRef.current,
      { x: -100, scale: 0.3, rotation: 15 },
      {
        x: 0,
        scale: 1,
        duration: 2,
        rotation: 0,
        ease: "power3.inOut",

        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 200%", // start when About enters viewport
          end: "top 10%", // end when About reaches center
          scrub: 1,
        },
      }
    );
  });

  return (
    <>
      <section
        ref={container}
        className="fixed top-0 z-10 left-0 sticky-section w-screen h-screen bg-purple-950 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center slam-text">
          <h1 className="text-[28vw] font-black text-white leading-none select-none pointer-events-none uppercase">
            Smile
          </h1>
        </div>
        <div className="floating-wrapper absolute inset-0 pointer-events-none">
          <FloatingElements />
        </div>
        <div className="face-wrapper z-1">
          <HeroFace />
        </div>
        <div className="cta-badge absolute bottom-12 right-12 z-2 group">
          <div className="relative bg-[#A3FFD6] text-black font-black px-6 py-2 rounded-2xl transform group-hover:-rotate-2 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
            EXPLORE
            <div className="absolute -top-3 -left-3 bg-white border-2 border-black text-[10px] px-2 py-0.5 rounded-full">
              scroll
            </div>
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        className="about absolute top-[100vh] z-20 w-full h-[150vh] flex justify-center items-center overflow-hidden bg-gray-600"
      >
        <div className="flex justify-center items-center P-6 mx-auto text-white text-4xl lg:text-7xl">
          {" "}
          SCROLL ANIMATIONS FINISHED CHECK OUT NEXT SECTION{" "}
        </div>
      </section>
    </>
  );
}

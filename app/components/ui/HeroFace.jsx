// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function HeroFace() {
//   const trackerRef = useRef(null);
//   const leftPupilRef = useRef(null);
//   const rightPupilRef = useRef(null);
//   const mouthRef = useRef(null);

//   useEffect(() => {
//     const tracker = trackerRef.current;

//     const handleMouseMove = (e) => {
//       const rect = tracker.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const relX = (e.clientX - centerX) / (rect.width / 2);
//       const relY = (e.clientY - centerY) / (rect.height / 2);

//       // Clamp values so pupils stay inside eyes
//       const clampedX = Math.max(-1, Math.min(1, relX));
//       const clampedY = Math.max(-1, Math.min(1, relY));

//       const moveX = clampedX * 8;
//       const moveY = clampedY * 6;

//       gsap.to([leftPupilRef.current, rightPupilRef.current], {
//         x: moveX,
//         y: moveY,
//         duration: 0.25,
//         ease: "power2.out",
//       });
//     };

//     const handleMouseEnter = () => {
//       // Smile
//       gsap.to(mouthRef.current, {
//         height: 26,
//         borderRadius: "0 0 40px 40px",
//         duration: 0.35,
//         ease: "back.out(2)",
//       });
//     };

//     const handleMouseLeave = () => {
//       // Reset pupils
//       gsap.to([leftPupilRef.current, rightPupilRef.current], {
//         x: 0,
//         y: 0,
//         duration: 0.3,
//         ease: "power2.out",
//       });

//       // Neutral mouth
//       gsap.to(mouthRef.current, {
//         height: 8,
//         borderRadius: "999px",
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     };

//     tracker.addEventListener("mousemove", handleMouseMove);
//     tracker.addEventListener("mouseenter", handleMouseEnter);
//     tracker.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       tracker.removeEventListener("mousemove", handleMouseMove);
//       tracker.removeEventListener("mouseenter", handleMouseEnter);
//       tracker.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div
//       ref={trackerRef}
//       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//                  w-[1000px] h-screen flex items-center justify-center z-10"
//     >
//       <div className="size-120 rounded-full bg-blue-500 flex flex-col items-center justify-center gap-10 shadow-2xl">
//         {/* Eyes */}
//         <div className="flex gap-24">
//           {/* Left Eye */}
//           <div
//             ref={leftPupilRef}
//             className="w-24 h-24 relative flex items-center justify-center overflow-hidden"
//           >
//             <img
//               src="/svg/octagon.png"
//               className="w-full h-full absolute object-cover"
//             />
//           </div>

//           {/* Right Eye */}
//           <div
//             ref={rightPupilRef}
//             className="w-24 h-24 relative  rounded-full flex items-center justify-center overflow-hidden"
//           >
//             <img
//               src="/svg/octagon.png"
//               className="w-full h-full absolute object-cover"
//             />
//           </div>
//         </div>

//         {/* Mouth */}
//         <div
//           ref={mouthRef}
//           className="w-20 h-2 bg-black rounded-full transition-all"
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroFace() {
  const trackerRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftSvgRef = useRef(null);
  const rightSvgRef = useRef(null);
  const mouthRef = useRef(null);

  useEffect(() => {
    const tracker = trackerRef.current;

    const handleMouseMove = (e) => {
      const rect = tracker.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relX = (e.clientX - centerX) / (rect.width / 2);
      const relY = (e.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      const moveX = clampedX * 8;
      const moveY = clampedY * 6;

      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(mouthRef.current, {
        height: 26,
        duration: 0.35,
        ease: "back.out(2)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(mouthRef.current, {
        height: 8,
        borderRadius: "999px",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    tracker.addEventListener("mousemove", handleMouseMove);
    tracker.addEventListener("mouseenter", handleMouseEnter);
    tracker.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tracker.removeEventListener("mousemove", handleMouseMove);
      tracker.removeEventListener("mouseenter", handleMouseEnter);
      tracker.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Rotate SVGs like tires (independent of cursor movement)
    gsap.to(leftSvgRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    gsap.to(rightSvgRef.current, {
      rotation: -360,
      duration: 5,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });
  }, []);

  return (
    <div
      ref={trackerRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[500px] h-[500px] flex items-center justify-center z-10"
    >
      <div className="md:size-120 size-50 rounded-full bg-blue-500 flex flex-col items-center justify-center md:gap-10 shadow-2xl">
        {/* Eyes */}
        <div className="flex md:gap-24 gap-12">
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            className="md:w-24 md:h-24 w-10 h-10 relative flex items-center justify-center overflow-hidden"
          >
            <img
              ref={leftSvgRef}
              src="/svg/octagon.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            className="md:w-24 md:h-24 w-10 h-10 relative flex items-center justify-center overflow-hidden"
          >
            <img
              ref={rightSvgRef}
              src="/svg/octagon.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mouth */}
        <div
          ref={mouthRef}
          className="w-16 h-18 bg-black sm:mt-4 md:mt-0 rounded-full transition-all"
        />
      </div>
    </div>
  );
}

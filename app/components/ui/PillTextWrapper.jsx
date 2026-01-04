"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const PillTextWrapper = ({
  children,
  keywordStyles = {},
  wordHighlight = "60, 60, 60",
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const paraGraph = contentRef.current;
    const text = paraGraph.textContent || "";
    const wordList = text.split(/(\s+)/).filter((word) => word.length > 0);
    paraGraph.innerHTML = "";

    wordList.forEach((word) => {
      if (word.trim()) {
        const wordContainer = document.createElement("div");
        wordContainer.classList.add("word");

        const wordText = document.createElement("span");
        wordText.textContent = word;

        const normalized = word.toLowerCase().replace(/[.,!?;:'")(-]/g, "");
        if (keywordStyles[normalized]) {
          const bgClass = keywordStyles[normalized];
          wordText.className = `${bgClass}`;
          wordContainer.classList.add("keyword-wrapper");
          wordText.classList.add("keyword");
        }

        wordContainer.appendChild(wordText);
        paraGraph.appendChild(wordContainer);
      }
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: containerRef.current,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const words = Array.from(document.querySelectorAll(".anim-text .word"));
        const totalWords = words.length;

        words.forEach((word, index) => {
          const wordText = word.querySelector("span");
          if (!wordText) return;

          if (progress < 0.7) {
            const progressTarget = 0.7;
            const revealProgress = Math.min(1, progress / progressTarget);
            const overlayWords = 15;
            const totalAnimationLength = 1 + overlayWords / totalWords;
            const wordStart = index / totalWords;
            const wordEnd = wordStart + overlayWords / totalWords;
            const timelineScale =
              1 /
              Math.min(
                totalAnimationLength,
                1 + (totalWords - 1) / totalWords + overlayWords / totalWords
              );
            const adjustStart = wordStart * timelineScale;
            const adjustEnd = wordEnd * timelineScale;
            const adjustDuration = adjustEnd - adjustStart;

            let wordProgress = 0;
            if (revealProgress < adjustStart) wordProgress = 0;
            else if (revealProgress > adjustEnd) wordProgress = 1;
            else wordProgress = (revealProgress - adjustStart) / adjustDuration;

            word.style.opacity = wordProgress;

            const backgroundFadeStart =
              wordProgress > 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
            word.style.backgroundColor = `rgba(${wordHighlight}, ${backgroundOpacity})`;

            const textRevealThreshold = 0.3;
            const textRevealProgress =
              wordProgress > textRevealThreshold
                ? (wordProgress - textRevealThreshold) /
                  (1 - textRevealThreshold)
                : 0;
            wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
          } else {
            const reverseProgress = (progress - 0.7) / 0.3;
            word.style.opacity = 1;
            const targetOpacity = 1;
            const reverseOverlay = 5;
            const reverseWordStart = index / totalWords;
            const reverseWordEnd =
              reverseWordStart + reverseOverlay / totalWords;
            const reverserTimelineScale =
              1 /
              Math.max(
                1,
                (totalWords - 1) / totalWords + reverseOverlay / totalWords
              );
            const reverseAdjustStart = reverseWordStart * reverserTimelineScale;
            const reverseAdjustEnd = reverseWordEnd * reverserTimelineScale;
            const reverseDuration = reverseAdjustEnd - reverseAdjustStart;

            let reverseWordProgress = 0;
            if (reverseProgress < reverseAdjustStart) reverseWordProgress = 0;
            else if (reverseProgress > reverseAdjustEnd)
              reverseWordProgress = 1;
            else
              reverseWordProgress =
                (reverseProgress - reverseAdjustStart) / reverseDuration;

            if (reverseWordProgress > 0) {
              wordText.style.opacity =
                targetOpacity * (1 - reverseWordProgress);
              word.style.backgroundColor = `rgba(${wordHighlight}, ${reverseWordProgress})`;
            } else {
              wordText.style.opacity = targetOpacity;
              word.style.backgroundColor = `rgba(${wordHighlight}, 0)`;
            }
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [keywordStyles, wordHighlight]);

  return (
    <section
      ref={containerRef}
      className="w-screen h-screen relative z-5 overflow-x-hidden  anim-text-container"
    >
      <div className="anim-text font-body font-bold text-2xl md:text-4xl w-full lg:w-[80%] overflow-hidden text-white font-poppins text-center lg:leading-loose absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 lg:px-6">
        <p ref={contentRef}>{children}</p>
      </div>
    </section>
  );
};

export default PillTextWrapper;

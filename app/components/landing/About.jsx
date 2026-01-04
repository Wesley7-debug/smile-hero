"use client";
import PillTextWrapper from "../ui/PillTextWrapper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
const keywords = {
  lifestyle: "bg-[var(--color-mint)]",
  unbothered: "bg-[var(--color-yellow)]",
  iconic: "bg-[var(--color-purple)]",
  definitely: "bg-[var(--color-neutral)]", // optional: define a neutral color in CSS
  stand: "bg-[var(--color-blue)]",
  out: "bg-[var(--color-blue)]",
};

export default function About() {
  return (
    <div className="z-20">
      <PillTextWrapper keywordStyles={keywords} wordHighlight="60, 60, 60">
        Snubbz aren’t just crocs they’re a lifestyle. Slide into max comfort and
        main character energy with clogs that scream unbothered. Whether you`re
        dodging responsibilities or flexing at brunch, Snubbz got your feet and
        your vibe covered. Ugly? Maybe. Iconic? Definitely. Comfort so real,
        it’s basically illegal. Step in and Stand out.
      </PillTextWrapper>
    </div>
  );
}

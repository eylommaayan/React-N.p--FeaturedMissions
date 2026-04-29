"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}

export default function TextReveal({
  text,
  className = "",
  as: Component = "h1",
}: TextRevealProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // פירוק הטקסט למילים ואז לאותיות כדי לשמור על שבירת שורות תקינה
    const words = text.split(" ");
    textRef.current.innerHTML = words
      .map((word) => {
        const chars = word
          .split("")
          .map(
            (char) =>
              `<span class="char-span" style="opacity: 0.15; display: inline-block;">${char}</span>`,
          )
          .join("");
        // עוטפים כל מילה כדי שהיא לא תישבר באמצע
        return `<span style="white-space: nowrap; display: inline-block;">${chars}</span>`;
      })
      .join(" "); // רווח בין מילים

    const chars = textRef.current.querySelectorAll(".char-span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        // start: "top 60%" אומר שהאנימציה תתחיל רק כשהחלק העליון של הטקסט מגיע ל-60% מגובה המסך (מתחת לאמצע)
        start: "top 60%",
        // end: "bottom 40%" אומר שהיא תסתיים כשהחלק התחתון של הטקסט עובר את ה-40% העליונים של המסך
        end: "bottom 40%",
        scrub: true,
      },
    });

    tl.to(chars, {
      opacity: 1,
      color: "#ffffff",
      stagger: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);

  return (
    <Component
      ref={textRef}
      className={className}
      style={{
        lineHeight: "0.9", // צפוף כמו במקור
        textAlign: "right", // יישור לימין
        direction: "rtl", // כיווניות עברית
        width: "100%", // תופס את כל הרוחב
        display: "block",
        whiteSpace: "normal", // מאפשר שבירת שורות
        wordWrap: "break-word",
      }}
    >
      {text}
    </Component>
  );
}

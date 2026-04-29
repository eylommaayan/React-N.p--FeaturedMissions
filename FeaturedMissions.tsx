"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MISSIONS = [
  {
    id: "01",
    name: "SOLAR RIDGE",
    img: "/index/highlight_img_01.jpg",
    label: "FIELD REPORT",
  },
  {
    id: "02",
    name: "CRYSTALLINE BASIN",
    img: "/index/highlight_img_02.jpg",
    label: "SURFACE RECORD",
  },
  {
    id: "03",
    name: "LUMINAR SIGNAL",
    img: "/index/highlight_img_03.jpg",
    label: "SIGNAL STUDY",
  },
  {
    id: "04",
    name: "VALLEY STRUCTURES",
    img: "/index/highlight_img_04.jpg",
    label: "STRUCTURE LOG",
  },
  {
    id: "05",
    name: "EMERALD HORIZON",
    img: "/index/highlight_img_05.jpg",
    label: "HORIZON SCAN",
  },
];

export default function FeaturedMissions() {
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const textBackgroundRef = useRef<HTMLDivElement>(null);
  const missionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // כל לוגיקת ה-GSAP חייבת להיות כאן בפנים
    const ctx = gsap.context(() => {
      // 1. נעילת הרקע
      ScrollTrigger.create({
        trigger: mainSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: textBackgroundRef.current,
        pinSpacing: false,
      });

      // 2. אנימציית ה-Reveal לכל כרטיס
      const cards = gsap.utils.toArray(".mission-card") as HTMLElement[];
      cards.forEach((card) => {
        const box = card.querySelector(".mission-box");
        if (box) {
          gsap.fromTo(
            box,
            { opacity: 0, y: 100, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              },
            },
          );
        }
      });

      // 3. הגדרת גובה הגלילה
      const totalHeight = MISSIONS.length * window.innerHeight * 1.2;
      gsap.set(missionsListRef.current, { height: totalHeight });
    }, mainSectionRef);

    return () => ctx.revert();
  }, []);

  // סגנונות
  const mainSectionStyle: React.CSSProperties = {
    width: "100%",
    position: "relative",
    backgroundColor: "#111",
  };

  const backgroundTextStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  };

  return (
    <section ref={mainSectionRef} style={mainSectionStyle}>
      <div ref={textBackgroundRef} style={backgroundTextStyle}>
        <h1
          style={{
            fontSize: "clamp(5rem, 20vw, 15rem)",
            fontWeight: "900",
            color: "#e6e6e6",
            textAlign: "center",
            lineHeight: "0.85",
          }}
        >
          HIGHLIGHTED <br /> MISSIONS
        </h1>
      </div>

      <div
        ref={missionsListRef}
        style={{ width: "100%", position: "relative", zIndex: 2 }}
      >
        <div style={{ height: "100vh" }}></div> {/* רווח התחלתי */}
        {MISSIONS.map((mission) => (
          <div
            key={mission.id}
            className="mission-card"
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* הוספתי את הקלאס mission-box שחיפשנו באנימציה */}
            <div
              className="mission-box"
              style={{ width: "90%", maxWidth: "800px", textAlign: "center" }}
            >
              <p
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                {mission.id} / 05
              </p>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#939387",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={mission.img}
                  alt={mission.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p style={{ color: "#fff", marginTop: "20px", opacity: 0.7 }}>
                [ {mission.label} ]
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

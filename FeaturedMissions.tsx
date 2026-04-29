"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// רישום הפלאגין (חובה בצד הלקוח)
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
    // יצירת הקשר ל-GSAP
    const ctx = gsap.context(() => {
      // 1. "נעילת" הרקע (הטקסט הענק) במקום
      ScrollTrigger.create({
        trigger: mainSectionRef.current,
        start: "top top", // כשהחלק העליון של הסקשן מגיע לראש המסך
        end: "bottom bottom", // כשהחלק התחתון שלו יוצא
        pin: textBackgroundRef.current, // האלמנט שיינעל
        pinSpacing: false, // מונע מ-GSAP להוסיף רווח מיותר
      });

      // 2. הזזת רשימת המשימות מעל הרקע הנעול
      // אין צורך ב-GSAP כאן, הגלילה הטבעית עושה את זה
      // אבל אנחנו צריכים לוודא שיש מספיק גובה לגלילה
      const totalHeight = MISSIONS.length * window.innerHeight * 1.2; // גובה הגלילה
      gsap.set(missionsListRef.current, { height: totalHeight });
    }, mainSectionRef);

    return () => ctx.revert();
  }, []);

  // סגנונות Inline למבנה
  const mainSectionStyle: React.CSSProperties = {
    width: "100%",
    position: "relative",
    overflow: "hidden", // מונע בריחת תוכן
    backgroundColor: "#111", // צבע הרקע הכהה
  };

  const backgroundTextStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh", // גובה המסך
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: 1, // שכבה אחורית
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(5rem, 20vw, 15rem)", // טקסט ענק כמו במקור
    fontWeight: "900",
    color: "#e6e6e6", // הצבע הבהיר מהתמונה
    lineHeight: "0.85",
    textTransform: "uppercase",
    margin: 0,
  };

  return (
    <section
      ref={mainSectionRef}
      style={mainSectionStyle}
      className="featured-missions"
    >
      {/* 1. שכבת הרקע הסטטית (הטקסט הענק) */}
      <div ref={textBackgroundRef} style={backgroundTextStyle}>
        <h1 style={titleStyle}>
          HIGHLIGHTED <br /> MISSIONS
        </h1>
      </div>

      {/* 2. שכבת התוכן הנעה (הכרטיסים) */}
      <div
        ref={missionsListRef}
        style={{ width: "100%", position: "relative", zIndex: 2 }}
      >
        {/* רווח התחלתי כדי שהכרטיסים יופיעו רק כשמגוללים */}
        <div style={{ height: "100vh" }}></div>

        {MISSIONS.map((mission) => (
          <div
            key={mission.id}
            className="mission-card"
            style={{
              height: "100vh", // כל כרטיס תופס מסך מלא
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative", // חשוב: הם זזים בגלילה טבעית
              backgroundColor: "transparent", // שקופים כדי לראות את הטקסט מאחור
            }}
          >
            {/* תוכן הכרטיס (המלבן האפור) */}
            <div
              style={{
                width: "90%",
                maxWidth: "800px",
                textAlign: "center",
                marginTop: "100px", // הזזה למטה כמו בצילום
              }}
            >
              <p style={{ color: "#000", fontWeight: "600" }}>
                {mission.id} / 05
              </p>

              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#939387", // המלבן האפור המפורסם
                  borderRadius: "32px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)", // צל כבד להדגשת השכבות
                }}
              >
                <img
                  src={mission.img}
                  alt={mission.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

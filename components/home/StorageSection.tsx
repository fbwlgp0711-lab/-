"use client";

import { Thermometer, Droplets } from "lucide-react";
import { useState } from "react";

const facilities = [
  { name: "국립현대미술관 과천", location: "경기 과천시 광명로 313" },
  { name: "국립현대미술관 서울", location: "서울 종로구 삼청로 30" },
  { name: "국립현대미술관 덕수궁", location: "서울 중구 세종대로 99" },
  { name: "국립현대미술관 청주", location: "충북 청주시 청원구 상당로 314" },
];

export default function StorageSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionStyle = {
    padding: "10rem 0",
    backgroundColor: "#FFFFFF",
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  const headerStyle = {
    marginBottom: "5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  };

  const gridStyle = {
    display: "flex",
    gap: "1.25rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#B8975A", textTransform: "uppercase" as const, letterSpacing: "0.2em" }}>State-of-the-art</span>
            <h2 style={{ fontSize: "40px", fontFamily: "var(--font-noto-serif), serif", fontWeight: 700, color: "#0D1B3E", marginTop: "12px" }}>최적의 보존 및 수장 환경</h2>
          </div>
          <p style={{ color: "#9A9A92", fontSize: "15px", maxWidth: "24rem", textAlign: "right" as const }}>
            대한민국 4개 권역 수장고는 국제 표준을 준수하며 24시간 철저한 항온항습 관리를 수행합니다.
          </p>
        </div>

        <div style={gridStyle}>
          {facilities.map((fac, index) => {
            const isHovered = hoveredIndex === index;

            const cardStyle = {
              flex: 1,
              backgroundColor: "#F8F7F4",
              padding: "2.5rem",
              borderRadius: "2px",
              borderTop: `4px solid ${isHovered ? "#B8975A" : "transparent"}`,
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "space-between",
              height: "280px",
            };

            return (
              <div 
                key={index} 
                style={cardStyle}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#0D1B3E", marginBottom: "8px" }}>{fac.name}</h4>
                  <p style={{ fontSize: "12px", color: "#9A9A92" }}>{fac.location}</p>
                </div>

                <div style={{ display: "flex", gap: "1.5rem", paddingTop: "2rem", borderTop: "1px solid #EAEAE6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Thermometer size={16} color="#B8975A" />
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#9A9A92" }}>온도</span>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#0D1B3E" }}>20±1°C</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Droplets size={16} color="#B8975A" />
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#9A9A92" }}>습도</span>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#0D1B3E" }}>50±5%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

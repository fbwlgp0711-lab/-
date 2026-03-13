"use client";

import { Search, FileCheck, Landmark, ShieldCheck, Database } from "lucide-react";
import { useState } from "react";

const steps = [
  { icon: Search, title: "신청 접수", desc: "물납 희망 미술품 정보 입력 및 온라인 접수" },
  { icon: FileCheck, title: "행정 심사", desc: "국세청 및 소관 행정기관의 절차상 적격 여부 확인" },
  { icon: Landmark, title: "감정위원회", desc: "미술품 물납 심의위원회의 가치 및 예술성 평가", special: true },
  { icon: ShieldCheck, title: "물납 허가", desc: "최종 가액 확정 및 세무서장의 물납 승인 통지" },
  { icon: Database, title: "소장품 등록", desc: "국비 관리 시스템 등록 및 국립박물관/미술관 이관" },
];

export default function ProcessSteps() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionStyle = {
    padding: "10rem 0",
    backgroundColor: "#F8F7F4",
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  const headerStyle = {
    textAlign: "center" as const,
    marginBottom: "5rem",
  };

  const gridStyle = {
    display: "flex",
    gap: "1.25rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#B8975A", textTransform: "uppercase" as const, letterSpacing: "0.2em" }}>Process</span>
          <h2 style={{ fontSize: "40px", fontFamily: "var(--font-noto-serif), serif", fontWeight: 700, color: "#0D1B3E", marginTop: "12px" }}>물납 통합 프로세스</h2>
        </div>

        <div style={gridStyle}>
          {steps.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isSpecial = step.special;

            const cardStyle = {
              flex: 1,
              padding: "3rem 2rem",
              backgroundColor: isHovered ? "#0D1B3E" : isSpecial ? "#B8975A" : "#FFFFFF",
              border: `1px solid ${isSpecial || isHovered ? "transparent" : "#EAEAE6"}`,
              transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
              position: "relative" as const,
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              textAlign: "center" as const,
              cursor: "default",
              boxShadow: isHovered ? "0 20px 40px rgba(13, 27, 62, 0.15)" : "none",
            };

            const numStyle = {
              fontSize: "12px",
              fontWeight: 700,
              color: isHovered || isSpecial ? "rgba(255,255,255,0.4)" : "#B8975A",
              marginBottom: "1.5rem",
            };

            const iconStyle = {
              color: isHovered || isSpecial ? "#FFFFFF" : "#0D1B3E",
              marginBottom: "1.5rem",
              transition: "all 0.3s ease",
            };

            const titleStyle = {
              fontSize: "19px",
              fontWeight: 700,
              color: isHovered || isSpecial ? "#FFFFFF" : "#0D1B3E",
              marginBottom: "1rem",
            };

            const descStyle = {
              fontSize: "14px",
              color: isHovered || isSpecial ? "rgba(255,255,255,0.7)" : "#6B7280",
              lineHeight: 1.6,
            };

            return (
              <div 
                key={index} 
                style={cardStyle}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={numStyle}>0{index + 1}</div>
                <div style={iconStyle}>
                  <step.icon size={40} strokeWidth={1.5} />
                </div>
                <h4 style={titleStyle}>{step.title} {isSpecial && "★"}</h4>
                <p style={descStyle}>{step.desc}</p>
                
                {/* Special Tag for Commission */}
                {isSpecial && !isHovered && (
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    padding: "2px 8px",
                    borderRadius: "2px"
                  }}>
                    핵심 심의
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

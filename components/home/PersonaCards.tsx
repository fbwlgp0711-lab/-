"use client";

import { UserCircle, Briefcase, Heart } from "lucide-react";
import { useState } from "react";

const personas = [
  {
    icon: UserCircle,
    role: "고액 자산가",
    name: "이윤석 (가상)",
    title: "상속세 부담 완화를 희망",
    desc: "가업 승계 및 고액 상속 절차에서 미술품 물납을 통해 유동성 문제를 해결하고 사회적 가치를 창출하고자 합니다.",
    tags: ["상속세 물납", "자산 유동화", "공공 기여"]
  },
  {
    icon: Briefcase,
    role: "핵심 사용자",
    name: "박세무 세무사",
    title: "전문적인 물납 대행 컨설팅",
    desc: "의뢰인의 절세 효과를 극대화하기 위해 ArchiValue의 실시간 자가진단 및 감정 평가 프로세스를 활용하고 있습니다.",
    tags: ["전문가용 서비스", "세무 컨설팅", "감정 연계"],
    special: true
  },
  {
    icon: Heart,
    role: "미술품 컬렉터",
    name: "정아라 (가상)",
    title: "소장품의 예술적 가치 보존",
    desc: "평생 수집한 작품들이 국가 소장품으로 등록되어 영구히 보존되고 전시되기를 희망하는 진정한 컬렉터입니다.",
    tags: ["가치 보존", "국가 기증", "컬렉션 관리"]
  }
];

export default function PersonaCards() {
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

  const gridStyle = {
    display: "flex",
    gap: "2.5rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{ marginBottom: "5rem" }}>
          <h3 style={{ fontSize: "32px", fontFamily: "var(--font-noto-serif), serif", fontWeight: 700, color: "#0D1B3E", marginBottom: "1rem" }}>맞춤형 물납 가이드</h3>
          <p style={{ color: "#9A9A92", fontSize: "16px" }}>사용자 맞춤형 솔루션으로 복잡한 절차를 명확하게 안내합니다.</p>
        </div>

        <div style={gridStyle}>
          {personas.map((persona, index) => {
            const isHovered = hoveredIndex === index;
            
            const cardStyle = {
              flex: 1,
              backgroundColor: "#FFFFFF",
              border: "1px solid #EAEAE6",
              borderRadius: "2px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              transform: isHovered ? "translateY(-8px)" : "none",
              boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.06)" : "none",
            };

            const topAreaStyle = {
              padding: "2.5rem",
              backgroundColor: isHovered ? "#0D1B3E" : "transparent",
              transition: "all 0.4s ease",
            };

            const avatarStyle = {
              width: "60px",
              height: "60px",
              backgroundColor: isHovered ? "#B8975A" : "#F5EDD9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isHovered ? "#FFFFFF" : "#B8975A",
              marginBottom: "1.5rem",
            };

            return (
              <div 
                key={index} 
                style={cardStyle}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={topAreaStyle}>
                  <div style={avatarStyle}>
                    <persona.icon size={32} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: isHovered ? "#B8975A" : "#B8975A" }}>{persona.role}</span>
                    {persona.special && (
                      <span style={{ fontSize: "10px", backgroundColor: "#B8975A", color: "#FFFFFF", padding: "1px 6px", borderRadius: "10px" }}>★ CORE</span>
                    )}
                  </div>
                  <h4 style={{ fontSize: "20px", fontWeight: 700, color: isHovered ? "#FFFFFF" : "#0D1B3E" }}>{persona.name}</h4>
                </div>
                
                <div style={{ padding: "0 2.5rem 2.5rem" }}>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#0D1B3E", marginBottom: "1rem" }}>{persona.title}</p>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, marginBottom: "2rem" }}>{persona.desc}</p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {persona.tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{ fontSize: "11px", padding: "4px 10px", backgroundColor: "#F8F7F4", color: "#9A9A92", fontWeight: 500 }}>
                        {tag}
                      </span>
                    ))}
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

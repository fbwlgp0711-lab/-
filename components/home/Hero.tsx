"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const sectionStyle = {
    position: "relative" as const,
    height: "88vh",
    minHeight: "700px",
    width: "100%",
    background: "linear-gradient(135deg, #0D1B3E 0%, #162550 50%, #1E3368 100%)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: "72px", // GNB height
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
    width: "100%",
    position: "relative" as const,
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const contentStyle = {
    maxWidth: "50rem",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    backgroundColor: "rgba(184, 151, 90, 0.15)",
    border: "1px solid rgba(184, 151, 90, 0.3)",
    borderRadius: "99px",
    color: "#B8975A",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "64px",
    fontFamily: "var(--font-noto-serif), serif",
    fontWeight: 700,
    color: "#FFFFFF",
    lineHeight: 1.1,
    marginBottom: "0.5rem",
  };

  const accentTitleStyle = {
    fontSize: "72px",
    fontFamily: "var(--font-noto-serif), serif",
    fontWeight: 700,
    color: "#B8975A",
    fontStyle: "italic",
    lineHeight: 1.1,
    marginBottom: "2rem",
    display: "block",
  };

  const subTitleStyle = {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: 300,
    lineHeight: 1.6,
    maxWidth: "36rem",
    marginBottom: "3.5rem",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "1.25rem",
  };

  const primaryBtnStyle = {
    padding: "18px 36px",
    backgroundColor: "#B8975A",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
  };

  const secondaryBtnStyle = {
    padding: "18px 36px",
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "2px",
    transition: "all 0.2s ease",
  };

  // Abstract Art Elements
  const abstractFrameBase = {
    position: "absolute" as const,
    border: "1px solid rgba(184, 151, 90, 0.4)",
    zIndex: 1,
  };

  // Stats Bar
  const statsBarStyle = {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(13, 27, 62, 0.6)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "2rem 0",
  };

  const statsContainer = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
  };

  const statsItem = {
    flex: 1,
    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
    paddingLeft: "2rem",
  };

  return (
    <section style={sectionStyle}>
      {/* Abstract Art Background */}
      <div style={{ ...abstractFrameBase, width: "400px", height: "500px", right: "5%", top: "15%", transform: "rotate(5deg)" }}></div>
      <div style={{ ...abstractFrameBase, width: "400px", height: "500px", right: "8%", top: "20%", transform: "rotate(-3deg)", border: "1px solid #B8975A" }}></div>
      <div style={{ ...abstractFrameBase, width: "350px", height: "450px", right: "4%", top: "18%", transform: "rotate(10deg)", opacity: 0.5 }}></div>
      
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={badgeStyle}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8975A" }}></span>
            OFFICIAL PLATFORM
          </div>
          <h1 style={titleStyle}>미술품으로 가치를 잇다,</h1>
          <span style={accentTitleStyle}>ArchiValue</span>
          <p style={subTitleStyle}>
            기획재정부·문화체육관광부·국립현대미술관이 함께하는 <br />
            국내 유일 미술품 조세 물납 통합 서비스입니다.
          </p>
          <div style={buttonGroupStyle}>
            <Link href="/diagnosis" style={primaryBtnStyle}>
              물납 자가진단 시작하기 <ArrowRight size={20} />
            </Link>
            <Link href="#" style={secondaryBtnStyle}>
              제도 상세 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={statsBarStyle}>
        <div style={statsContainer}>
          {[
            { label: "과세인원", value: "21,193", unit: "명" },
            { label: "상속세수", value: "9.6", unit: "조원" },
            { label: "물납 실적", value: "1", unit: "건(4점) (2024)" },
            { label: "미술시장", value: "6,151", unit: "억 (2023)" },
          ].map((stat, i) => (
            <div key={i} style={{ ...statsItem, borderLeft: i === 0 ? "none" : statsItem.borderLeft }}>
              <span style={{ display: "block", fontSize: "13px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>{stat.label}</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "#B8975A", fontFamily: "var(--font-noto-serif), serif" }}>{stat.value}</span>
                <span style={{ fontSize: "14px", color: "#FFFFFF" }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

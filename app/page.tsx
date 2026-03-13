"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProcessSteps from "@/components/home/ProcessSteps";
import PersonaCards from "@/components/home/PersonaCards";
import PartnersStrip from "@/components/home/PartnersStrip";
import StorageSection from "@/components/home/StorageSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
    color: "#374151",
    fontFamily: "var(--font-noto-sans), sans-serif",
  };

  const ctaSectionStyle = {
    padding: "8rem 0",
    background: "linear-gradient(135deg, #0D1B3E 0%, #162550 100%)",
    textAlign: "center" as const,
    position: "relative" as const,
    overflow: "hidden",
  };

  const ctaTitleStyle = {
    fontSize: "40px",
    fontFamily: "var(--font-noto-serif), serif",
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: "1.5rem",
  };

  const goldButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "20px 48px",
    backgroundColor: "#B8975A",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 700,
    borderRadius: "2px",
    transition: "all 0.3s ease",
    marginTop: "2.5rem",
    boxShadow: "0 10px 30px rgba(184, 151, 90, 0.3)",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      
      <main>
        <Hero />
        <PartnersStrip />
        <ProcessSteps />
        
        {/* Refined Diagnosis CTA */}
        <section style={ctaSectionStyle}>
          {/* Decorative Elements */}
          <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184, 151, 90, 0.1) 0%, transparent 70%)" }}></div>
          <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184, 151, 90, 0.05) 0%, transparent 70%)" }}></div>
          
          <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#B8975A", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem", display: "block" }}>Quick Assessment</span>
            <h2 style={ctaTitleStyle}>3분으로 물납 가능 여부를 확인하세요</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "18px", fontWeight: 300, maxWidth: "40rem", margin: "0 auto" }}>
              복잡한 서류 검토 전, ArchiValue 알고리즘이 <br />
              현재 상황에 맞는 미술품 조세 물납 적격 판정을 미리 내려드립니다.
            </p>
            <Link href="/diagnosis" style={goldButtonStyle}>
              자가진단 시작하기 <ArrowRight size={22} />
            </Link>
          </div>
        </section>

        <PersonaCards />
        <StorageSection />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topBarStyle = {
    backgroundColor: "#0D1B3E",
    height: "32px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const topBarContainer = {
    maxWidth: "80rem",
    width: "100%",
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "1.5rem",
  };

  const topBarLink = {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "11px",
    textDecoration: "none",
    fontWeight: 400,
  };

  const gnbStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    transition: "all 0.3s ease",
  };

  const mainBarStyle = {
    height: "72px",
    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF",
    backdropFilter: scrolled ? "blur(8px)" : "none",
    boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
    borderBottom: scrolled ? "none" : "1px solid #EAEAE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  };

  const containerStyle = {
    maxWidth: "80rem",
    width: "100%",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  };

  const emblemStyle = {
    width: "44px",
    height: "44px",
    backgroundColor: "#0D1B3E",
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "3px solid #B8975A",
  };

  const emblemTextStyle = {
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: 900,
    fontFamily: "var(--font-noto-serif), serif",
    letterSpacing: "-0.05em",
  };

  const logoTextStyle = {
    fontSize: "22px",
    fontFamily: "var(--font-noto-serif), serif",
    fontWeight: 700,
    color: "#0D1B3E",
    letterSpacing: "-0.02em",
  };

  const menuListStyle = {
    display: "flex",
    gap: "2.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const menuLinkStyle = {
    fontSize: "15px",
    fontWeight: 500,
    color: "#374151",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <header style={gnbStyle}>
      {/* Top Bar */}
      {!scrolled && (
        <div style={topBarStyle}>
          <div style={topBarContainer}>
            <a href="#" style={topBarLink}>국세청 홈택스</a>
            <span style={{ color: "rgba(255, 255, 255, 0.2)", fontSize: "10px" }}>|</span>
            <a href="#" style={topBarLink}>국립현대미술관</a>
            <span style={{ color: "rgba(255, 255, 255, 0.2)", fontSize: "10px" }}>|</span>
            <a href="#" style={topBarLink}>문화체육관광부</a>
          </div>
        </div>
      )}

      {/* Main GNB */}
      <div style={mainBarStyle}>
        <div style={containerStyle}>
          <Link href="/" style={logoGroupStyle}>
            <div style={emblemStyle}>
              <span style={emblemTextStyle}>AV</span>
            </div>
            <span style={logoTextStyle}>ArchiValue</span>
          </Link>

          <nav>
            <ul style={menuListStyle}>
              <li><Link href="#" style={menuLinkStyle}>제도 소개</Link></li>
              <li><Link href="#" style={menuLinkStyle}>신청 절차</Link></li>
              <li><Link href="/diagnosis" style={menuLinkStyle}>자가진단</Link></li>
              <li><Link href="#" style={menuLinkStyle}>감정위원회</Link></li>
              <li><Link href="#" style={menuLinkStyle}>보존·수장고</Link></li>
              <li><Link href="#" style={menuLinkStyle}>FAQ</Link></li>
            </ul>
          </nav>

          <Link 
            href="/login" 
            style={{
              padding: "8px 20px",
              border: "1px solid #0D1B3E",
              color: "#0D1B3E",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "2px",
            }}
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

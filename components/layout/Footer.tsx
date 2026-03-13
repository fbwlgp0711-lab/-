"use client";

import Link from "next/link";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#0D1B3E",
    padding: "6rem 0 3rem",
    color: "#FFFFFF",
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  const topSection = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5rem",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  };

  const emblemStyle = {
    width: "36px",
    height: "36px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "2px solid #B8975A",
  };

  const emblemTextStyle = {
    color: "#0D1B3E",
    fontSize: "14px",
    fontWeight: 900,
    fontFamily: "var(--font-noto-serif), serif",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "3rem",
  };

  const headingStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#B8975A",
    marginBottom: "1.5rem",
    textTransform: "uppercase" as const,
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  };

  const linkStyle = {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  const bottomSection = {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "2.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={topSection}>
          <div style={{ maxWidth: "20rem" }}>
            <div style={{ ...logoStyle, marginBottom: "2rem" }}>
              <div style={emblemStyle}>
                <span style={emblemTextStyle}>AV</span>
              </div>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF" }}>ArchiValue</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)", lineHeight: 1.6 }}>
              미술품 조세 물납 통합 서비스 ArchiValue는 기획재정부 및 유관기관의 협력으로 운영되는 공식 플랫폼입니다.
            </p>
          </div>

          <div style={gridStyle}>
            <div style={{ minWidth: "120px" }}>
              <h5 style={headingStyle}>서비스</h5>
              <ul style={listStyle}>
                <li><Link href="#" style={linkStyle}>제도 안내</Link></li>
                <li><Link href="/diagnosis" style={linkStyle}>물납 자가진단</Link></li>
                <li><Link href="#" style={linkStyle}>신청 현황</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: "120px" }}>
              <h5 style={headingStyle}>지원</h5>
              <ul style={listStyle}>
                <li><Link href="#" style={linkStyle}>공지사항</Link></li>
                <li><Link href="#" style={linkStyle}>자료실</Link></li>
                <li><Link href="#" style={linkStyle}>FAQ</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: "120px" }}>
              <h5 style={headingStyle}>법률</h5>
              <ul style={listStyle}>
                <li><Link href="#" style={linkStyle}>이용약관</Link></li>
                <li><Link href="#" style={linkStyle}>개인정보처리방침</Link></li>
                <li><Link href="#" style={linkStyle}>물납 관련 법규</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: "120px" }}>
              <h5 style={headingStyle}>연락처</h5>
              <ul style={listStyle}>
                <li style={linkStyle}>T. 02-1234-5678</li>
                <li style={linkStyle}>E. info@archivalue.go.kr</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={bottomSection}>
          <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.3)" }}>
            © 2026 ArchiValue. All Rights Reserved.
          </p>
          <p style={{ fontSize: "14px", color: "#B8975A", fontStyle: "italic", fontWeight: 500 }}>
            "Integrating Art and Value"
          </p>
        </div>
      </div>
    </footer>
  );
}

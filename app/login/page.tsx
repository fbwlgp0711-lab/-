"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleSocialLogin = (platform: string) => {
    alert(`${platform} 로그인은 준비 중입니다.`);
    router.push("/");
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#F8F7F4",
    fontFamily: "var(--font-noto-sans), sans-serif",
    display: "flex",
    flexDirection: "column" as const,
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6rem 1.5rem",
  };

  const cardStyle = {
    maxWidth: "28rem",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: "3rem 2.5rem",
    borderRadius: "2px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
    border: "1px solid #EAEAE6",
    textAlign: "center" as const,
  };

  const emblemStyle = {
    width: "48px",
    height: "48px",
    backgroundColor: "#0D1B3E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    borderBottom: "3px solid #B8975A",
  };

  const emblemTextStyle = {
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 900,
    fontFamily: "var(--font-noto-serif), serif",
  };

  const titleStyle = {
    fontSize: "24px",
    fontFamily: "var(--font-noto-serif), serif",
    fontWeight: 700,
    color: "#0D1B3E",
    marginBottom: "0.5rem",
  };

  const subTitleStyle = {
    fontSize: "14px",
    color: "#9A9A92",
    marginBottom: "2.5rem",
  };

  const inputGroupStyle = {
    marginBottom: "1.25rem",
    textAlign: "left" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: "#374151",
    marginBottom: "0.5rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "2px",
    border: "1px solid #EAEAE6",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const loginButtonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#0D1B3E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "2px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "1rem",
    transition: "opacity 0.2s ease",
  };

  const socialButtonStyle = (bgColor: string, textColor: string) => ({
    width: "100%",
    padding: "12px",
    backgroundColor: bgColor,
    color: textColor,
    border: "none",
    borderRadius: "2px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "0.75rem",
    textDecoration: "none",
  });

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "2rem 0",
    color: "#EAEAE6",
    fontSize: "12px",
  };

  const hrStyle = {
    flex: 1,
    height: "1px",
    backgroundColor: "#EAEAE6",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      
      <main style={mainStyle}>
        <div style={cardStyle}>
          <div style={emblemStyle}>
            <span style={emblemTextStyle}>AV</span>
          </div>
          <h1 style={titleStyle}>ArchiValue 로그인</h1>
          <p style={subTitleStyle}>미술품 조세 물납 통합 서비스에 오신 것을 환영합니다.</p>
          
          <form onSubmit={handleLogin}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>이메일 주소</label>
              <input type="email" placeholder="example@archivalue.go.kr" style={inputStyle} required />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>비밀번호</label>
              <input type="password" placeholder="••••••••" style={inputStyle} required />
            </div>
            
            <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
              <Link href="#" style={{ fontSize: "12px", color: "#B8975A", textDecoration: "none" }}>비밀번호 찾기</Link>
            </div>
            
            <button type="submit" style={loginButtonStyle}>로그인</button>
          </form>
          
          <div style={dividerStyle}>
            <div style={hrStyle}></div>
            <span style={{ padding: "0 10px" }}>또는 소셜 계정으로 로그인</span>
            <div style={hrStyle}></div>
          </div>
          
          <button 
            type="button" 
            onClick={() => handleSocialLogin("카카오")} 
            style={socialButtonStyle("#FEE500", "#191919")}
          >
            <span style={{ fontWeight: 900 }}>K</span> 카카오로 로그인
          </button>
          <button 
            type="button" 
            onClick={() => handleSocialLogin("네이버")} 
            style={socialButtonStyle("#03C75A", "#FFFFFF")}
          >
            <span style={{ fontWeight: 900 }}>N</span> 네이버로 로그인
          </button>
          
          <div style={{ marginTop: "2rem", fontSize: "14px", color: "#9A9A92" }}>
            계정이 없으신가요? <Link href="/register" style={{ color: "#0D1B3E", fontWeight: 700, textDecoration: "none" }}>회원가입</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

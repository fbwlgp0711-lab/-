"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation and API call would happen here
    router.push("/");
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#F8F7F4", // Off-white
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
    maxWidth: "32rem",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: "3.5rem 2.5rem",
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

  const registerButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: "#0D1B3E",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "2px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "1.5rem",
    transition: "background-color 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      
      <main style={mainStyle}>
        <div style={cardStyle}>
          <div style={emblemStyle}>
            <span style={emblemTextStyle}>AV</span>
          </div>
          <h1 style={titleStyle}>ArchiValue 회원가입</h1>
          <p style={subTitleStyle}>간편 수장품 등록과 세무 전문 자가진단 서비스를 한 눈에 확인하세요.</p>
          
          <form onSubmit={handleRegister}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>이름</label>
              <input type="text" placeholder="홍길동" style={inputStyle} required />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>이메일 주소</label>
              <input type="email" placeholder="example@archivalue.go.kr" style={inputStyle} required />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>비밀번호</label>
              <input type="password" placeholder="8자 이상의 영문, 숫자, 특수문자 조합" style={inputStyle} required />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>비밀번호 확인</label>
              <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" style={inputStyle} required />
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "1rem" }}>
              <input type="checkbox" id="terms" required style={{ marginTop: "4px" }} />
              <label htmlFor="terms" style={{ fontSize: "13px", color: "#6B7280", textAlign: "left", lineHeight: 1.4 }}>
                [필수] <Link href="#" style={{ color: "#0D1B3E", fontWeight: 600 }}>이용약관</Link> 및 <Link href="#" style={{ color: "#0D1B3E", fontWeight: 600 }}>개인정보 수집 및 이용</Link>에 동의합니다.
              </label>
            </div>
            
            <button type="submit" style={registerButtonStyle}>회원가입 완료</button>
          </form>
          
          <div style={{ marginTop: "2rem", fontSize: "14px", color: "#9A9A92" }}>
            이미 계정이 있으신가요? <Link href="/login" style={{ color: "#0D1B3E", fontWeight: 700, textDecoration: "none" }}>로그인하기</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

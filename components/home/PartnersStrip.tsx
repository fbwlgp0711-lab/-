"use client";

export default function PartnersStrip() {
  const partners = [
    "기획재정부",
    "문화체육관광부",
    "국립현대미술관",
    "국세청",
    "한국미술감정협회"
  ];

  const sectionStyle = {
    backgroundColor: "#FFFFFF",
    borderTop: "1px solid #EAEAE6",
    borderBottom: "1px solid #EAEAE6",
    padding: "2.5rem 0",
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2.5rem",
  };

  const itemStyle = {
    fontSize: "15px",
    fontWeight: 500,
    color: "#9A9A92",
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        {partners.map((partner, i) => (
          <div key={i} style={itemStyle}>
            <span>{partner}</span>
            {i < partners.length - 1 && (
              <span style={{ color: "#EAEAE6", fontWeight: 200, fontSize: "12px" }}>|</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

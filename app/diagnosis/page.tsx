"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, ChevronLeft, ChevronRight, Upload, Info, ImageIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- Types ---
type DiagnosisStep = "ELIGIBILITY" | "FORM" | "RESULT";

const ELIGIBILITY_QUESTIONS = [
  "상속세 또는 증여세 납부 의무가 있습니까?",
  "물납하고자 하는 품목이 회화, 판화, 조각 등 역사적·학술적·예술적 가치가 있는 미술품입니까?",
  "해당 작품의 소유권이 본인(또는 피상속인)에게 명확히 있습니까?",
  "작품의 진품 여부를 증명할 수 있는 보증서나 자료가 있습니까?",
  "납부 세액이 2천만 원을 초과합니까?",
  "해당 세액이 현금으로 납부하기 곤란한 상황입니까?",
  "작품이 파손되거나 훼손되지 않은 상태입니까?",
  "작품에 저당권이나 압류 등 권리 설정이 되어 있지 않습니까?",
  "작품을 보관/운송하는 데 특별한 결격 사유가 없습니까?"
];

const GUIDANCE_MESSAGES: Record<number, string> = {
  0: "상속세 또는 증여세 납부 대상자만 신청 가능합니다.",
  1: "미술품 물납 제도는 회화, 판화, 조각 등 예술적 가치가 인정되는 자산만 대상으로 합니다. (골동품/서예 등은 별도 확인 필요)",
  2: "권리 관계가 불분명한 작품은 물납이 제한될 수 있습니다.",
  3: "감정기관을 통해 진품 확인 가능 시 신청할 수 있습니다.",
  4: "납부 세액 2천만원 초과 시에만 물납 신청이 가능합니다.",
  5: "현금 납부가 가능한 경우 물납 신청이 거부될 수 있습니다.",
  6: "훼손이 심한 작품은 보존 가치 판단에 따라 거절될 수 있습니다.",
  7: "저당권 해제 후 신청 가능합니다.",
  8: "이동이 불가능하거나 특수 보관이 필요한 경우 협의가 필요합니다."
};

// 단계별 라벨 (총 5단계)
const FORM_STEPS = [
  "작품 기본 정보",
  "작품 이미지",
  "취득 정보",
  "보관 현황",
  "최종 확인"
];

export default function DiagnosisPage() {
  const [step, setStep] = useState<DiagnosisStep>("ELIGIBILITY");
  const [checklist, setChecklist] = useState<(boolean | null)[]>(new Array(9).fill(null));
  const [formStep, setFormStep] = useState(1);

  // Form fields
  const [artistName, setArtistName] = useState("");
  const [artworkName, setArtworkName] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [storageNote, setStorageNote] = useState("");

  // Image Upload State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Values for calculation
  const [auctionValue, setAuctionValue] = useState<string>("");
  const [acquisitionValue, setAcquisitionValue] = useState<string>("");
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const auction = parseInt(auctionValue.replace(/,/g, "")) || 0;
    const acquisition = parseInt(acquisitionValue.replace(/,/g, "")) || 0;
    setTotalValue(auction + acquisition);
  }, [auctionValue, acquisitionValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggle = (index: number, val: boolean) => {
    const newChecklist = [...checklist];
    newChecklist[index] = val;
    setChecklist(newChecklist);
  };

  const formatNumber = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const allAnswered = checklist.every(v => v !== null);
  const yesCount = checklist.filter(v => v === true).length;
  const noCount = checklist.filter(v => v === false).length;
  const isNoGo = noCount > 2 || checklist[0] === false || checklist[1] === false || checklist[2] === false;
  const isConditional = yesCount >= 7 && noCount <= 2;

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#F9F7F4',
    color: '#374151',
    fontFamily: 'var(--font-noto-sans), sans-serif',
  };

  const mainStyle = {
    paddingTop: '8rem',
    paddingBottom: '5rem',
  };

  const contentWrapStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: '0 1.5rem',
  };

  const cardBaseStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #F3F4F6',
    borderRadius: '2px',
    padding: '2rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  return (
    <div style={containerStyle}>
      <Navbar />

      <main style={mainStyle}>
        <div style={contentWrapStyle}>

          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
            {[
              { id: "ELIGIBILITY", label: "자격 검토" },
              { id: "FORM", label: "상세 진단" },
              { id: "RESULT", label: "진단 결과" },
            ].map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: step === s.id ? '#0D1B3E' : '#E5E7EB',
                  color: step === s.id ? '#FFFFFF' : '#9CA3AF'
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: step === s.id ? '#0D1B3E' : '#9CA3AF'
                }}>
                  {s.label}
                </span>
                {i < 2 && <div style={{ width: '3rem', height: '1px', backgroundColor: '#E5E7EB', marginLeft: '0.75rem' }} />}
              </div>
            ))}
          </div>

          {/* ===================== ELIGIBILITY ===================== */}
          {step === "ELIGIBILITY" && (
            <div>
              <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-noto-serif), serif', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '1rem' }}>물납 자격 자가진단</h1>
                <p style={{ color: '#374151' }}>기본적인 요건을 확인합니다. '아니오' 항목이 있을 경우 안내 메시지를 확인하세요.</p>
              </div>

              <div style={cardBaseStyle}>
                {ELIGIBILITY_QUESTIONS.map((q, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #F9FAFB', padding: '1.5rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#B8975A', fontFamily: 'var(--font-noto-serif), serif', fontWeight: 'bold' }}>Q{i+1}.</span>
                        <span style={{ color: '#0D1B3E', fontWeight: 500 }}>{q}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggle(i, true)}
                          style={{
                            padding: '0.5rem 1.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            border: '1px solid ' + (checklist[i] === true ? '#0D1B3E' : '#E5E7EB'),
                            backgroundColor: checklist[i] === true ? '#0D1B3E' : '#FFFFFF',
                            color: checklist[i] === true ? '#FFFFFF' : '#9CA3AF',
                            cursor: 'pointer'
                          }}
                        >
                          YES
                        </button>
                        <button
                          onClick={() => handleToggle(i, false)}
                          style={{
                            padding: '0.5rem 1.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            border: '1px solid ' + (checklist[i] === false ? '#DC2626' : '#E5E7EB'),
                            backgroundColor: checklist[i] === false ? '#DC2626' : '#FFFFFF',
                            color: checklist[i] === false ? '#FFFFFF' : '#9CA3AF',
                            cursor: 'pointer'
                          }}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                    {checklist[i] === false && (
                      <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', backgroundColor: '#FEF2F2', borderLeft: '3px solid #DC2626', fontSize: '0.875rem', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={14} /> {GUIDANCE_MESSAGES[i]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                {allAnswered ? (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{
                      padding: '2rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      backgroundColor: isNoGo ? '#FEF2F2' : isConditional ? '#FFFBEB' : '#F0FDF4'
                    }}>
                      {isNoGo ? (
                        <>
                          <XCircle style={{ color: '#DC2626' }} size={48} />
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#991B1B' }}>물납 부적격 대상입니다.</h2>
                          <p style={{ fontSize: '0.875rem', color: '#B91C1C' }}>중요 항목이 충족되지 않았습니다. 위 안내를 참고하여 해결 후 재신청 바랍니다.</p>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 style={{ color: '#16A34A' }} size={48} />
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#166534' }}>{isConditional ? "조건부 물납 가능" : "물납 적격 대상"}</h2>
                          <p style={{ fontSize: '0.875rem', color: '#15803D' }}>상세 진단 단계로 이동하여 예상 가액을 확인해 보세요.</p>
                        </>
                      )}
                    </div>
                    <button onClick={() => { setStep("FORM"); setFormStep(1); }} style={{ padding: '1rem 2.5rem', backgroundColor: '#0D1B3E', color: '#FFFFFF', fontWeight: 'bold', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      상세 진단 계속하기 <ArrowRight size={20} />
                    </button>
                  </div>
                ) : (
                  <div style={{ color: '#9CA3AF', fontSize: '0.875rem', fontStyle: 'italic' }}>모든 항목에 답변해 주세요.</div>
                )}
              </div>
            </div>
          )}

          {/* ===================== FORM ===================== */}
          {step === "FORM" && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-noto-serif), serif', fontWeight: 'bold', color: '#0D1B3E' }}>
                  상세 진단 — {formStep}단계: {FORM_STEPS[formStep - 1]}
                </h1>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#9CA3AF' }}>{formStep} / {FORM_STEPS.length} 단계</p>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: '#F3F4F6', marginBottom: '2.5rem', borderRadius: '3px' }}>
                <div style={{ height: '100%', backgroundColor: '#B8975A', width: `${(formStep / FORM_STEPS.length) * 100}%`, borderRadius: '3px', transition: 'width 0.3s ease' }} />
              </div>

              <div style={{ ...cardBaseStyle, minHeight: '400px' }}>

                {/* ── STEP 1: 작품 기본 정보 ── */}
                {formStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '0.5rem' }}>01. 작품 기본 정보</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>물납 신청하실 작품의 기본 정보를 입력해 주세요.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>작가명 <span style={{ color: '#DC2626' }}>*</span></label>
                        <input
                          type="text"
                          value={artistName}
                          onChange={e => setArtistName(e.target.value)}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem', outline: 'none' }}
                          placeholder="예: 김환기"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>작품명 <span style={{ color: '#DC2626' }}>*</span></label>
                        <input
                          type="text"
                          value={artworkName}
                          onChange={e => setArtworkName(e.target.value)}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem', outline: 'none' }}
                          placeholder="예: 우주"
                        />
                      </div>
                    </div>
                    {artistName && artworkName && (
                      <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '4px', fontSize: '0.875rem', color: '#166534' }}>
                        ✓ <strong>{artistName}</strong>의 <strong>「{artworkName}」</strong> — 정보가 입력되었습니다.
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 2: 작품 이미지 업로드 ── */}
                {formStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '0.5rem' }}>02. 작품 이미지 업로드</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>작품 사진을 등록하면 AI 참고 분석에 활용됩니다. (선택 사항)</p>
                    </div>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: '2px dashed #D1D5DB',
                        borderRadius: '4px',
                        padding: selectedImage ? '1rem' : '4rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#FAFAFA',
                        transition: 'border-color 0.2s',
                        minHeight: '280px',
                      }}
                    >
                      {selectedImage ? (
                        <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                          <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '2px' }} />
                          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#9CA3AF' }}>클릭하여 이미지 변경</div>
                        </div>
                      ) : (
                        <>
                          <div style={{ width: '56px', height: '56px', backgroundColor: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Upload size={24} color="#9CA3AF" />
                          </div>
                          <p style={{ fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>작품 사진을 업로드하세요</p>
                          <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>JPG, PNG, GIF 파일 지원 · 최대 10MB</p>
                          <div style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.875rem', color: '#374151', backgroundColor: '#FFFFFF' }}>
                            파일 선택
                          </div>
                        </>
                      )}
                    </div>
                    <div style={{ padding: '0.75rem 1rem', backgroundColor: '#FFF9EE', border: '1px solid #FCD34D', borderRadius: '4px', fontSize: '0.8rem', color: '#92400E', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <Info size={14} style={{ marginTop: '1px', flexShrink: 0 }} />
                      <span>이미지는 참고용 분석에만 사용되며, AI 추정가는 공식 감정가가 아닙니다. 정확한 가치 평가를 위해 반드시 공인 감정사의 확인이 필요합니다.</span>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: 취득 정보 ── */}
                {formStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '0.5rem' }}>03. 취득 정보</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>작품 취득 당시의 금액을 입력해 주세요. 예상 신청 가액 산정에 활용됩니다.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>취득 가액 (천원 단위)</label>
                        <input
                          type="text"
                          value={acquisitionValue}
                          onChange={(e) => setAcquisitionValue(formatNumber(e.target.value))}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem' }}
                          placeholder="예: 500,000"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>낙찰 금액 (천원 단위 · 경매 취득 시)</label>
                        <input
                          type="text"
                          value={auctionValue}
                          onChange={(e) => setAuctionValue(formatNumber(e.target.value))}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem' }}
                          placeholder="예: 1,200,000"
                        />
                      </div>
                      <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#F9F7F4', border: '1px solid #B8975A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>실시간 합계 예상 가액</span>
                        <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#B8975A' }}>{totalValue.toLocaleString()} 천원</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: 보관 현황 ── */}
                {formStep === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '0.5rem' }}>04. 보관 현황</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>현재 작품이 보관된 장소와 상태를 알려주세요.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>보관 장소</label>
                        <select
                          value={storageLocation}
                          onChange={e => setStorageLocation(e.target.value)}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                        >
                          <option value="">선택하세요</option>
                          <option value="home">자택 보관</option>
                          <option value="storage">전문 수장고</option>
                          <option value="gallery">갤러리/화랑 위탁</option>
                          <option value="other">기타</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>특이사항 (선택)</label>
                        <textarea
                          value={storageNote}
                          onChange={e => setStorageNote(e.target.value)}
                          rows={3}
                          style={{ padding: '0.875rem 1rem', border: '1px solid #E5E7EB', fontSize: '0.9rem', resize: 'vertical' }}
                          placeholder="보관 환경, 훼손 여부 등 특이사항이 있으면 입력해 주세요."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 5: 최종 확인 ── */}
                {formStep === 5 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '0.5rem' }}>05. 최종 확인</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>입력하신 정보를 확인해 주세요.</p>
                    </div>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                        <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>작가명</span>
                        <span style={{ fontWeight: 600 }}>{artistName || '—'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                        <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>작품명</span>
                        <span style={{ fontWeight: 600 }}>{artworkName || '—'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                        <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>이미지 등록</span>
                        <span style={{ fontWeight: 600, color: selectedImage ? '#16A34A' : '#9CA3AF' }}>{selectedImage ? '✓ 등록됨' : '미등록'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E7EB' }}>
                        <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>보관 장소</span>
                        <span style={{ fontWeight: 600 }}>{storageLocation || '—'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                        <span style={{ fontWeight: 700 }}>총 예상 신청 가액</span>
                        <span style={{ fontWeight: 900, fontSize: '1.125rem', color: '#B8975A' }}>{totalValue.toLocaleString()} 천원</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: '#FFF9EE', border: '1px solid #FCD34D', borderRadius: '4px', fontSize: '0.8 rem', color: '#92400E' }}>
                      ⚠️ 본 진단 결과는 참고용이며, 공식 물납 신청을 위해서는 반드시 전문 감정사의 확인과 관할 세무서 상담이 필요합니다.
                    </div>
                  </div>
                )}
              </div>

              {/* 하단 버튼 */}
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => formStep > 1 ? setFormStep(formStep - 1) : setStep("ELIGIBILITY")}
                  style={{ padding: '0.75rem 2rem', border: '1px solid #E5E7EB', cursor: 'pointer', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <ChevronLeft size={16} /> 이전
                </button>
                <button
                  onClick={() => formStep < 5 ? setFormStep(formStep + 1) : setStep("RESULT")}
                  style={{ padding: '0.875rem 2.5rem', backgroundColor: '#0D1B3E', color: '#FFFFFF', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {formStep === 5 ? '결과 보기' : '다음'} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ===================== RESULT ===================== */}
          {step === "RESULT" && (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle2 size={64} color="#16A34A" style={{ margin: '0 auto 2rem' }} />
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-noto-serif), serif', fontWeight: 700, color: '#0D1B3E' }}>진단 완료</h1>
              {artistName && artworkName && (
                <p style={{ marginTop: '0.75rem', fontSize: '1rem', color: '#6B7280' }}>
                  <strong>{artistName}</strong>의 「<strong>{artworkName}</strong>」
                </p>
              )}
              <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: '#B8975A' }}>
                예상 가액: {totalValue > 0 ? `${totalValue.toLocaleString()} 천원` : '미입력'}
              </p>
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F9F7F4', border: '1px solid #E5E7EB', borderRadius: '4px', maxWidth: '400px', margin: '2rem auto 0', textAlign: 'left', fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                <p style={{ fontWeight: 700, color: '#0D1B3E', marginBottom: '0.75rem' }}>다음 단계 안내</p>
                <p>① 공인 감정사를 통한 정식 감정 진행</p>
                <p>② 관할 세무서에 물납 신청 상담</p>
                <p>③ 문화체육관광부 물납 심의 위원회 접수</p>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => { setStep("ELIGIBILITY"); setFormStep(1); setArtistName(""); setArtworkName(""); setSelectedImage(null); setAuctionValue(""); setAcquisitionValue(""); setStorageLocation(""); setStorageNote(""); }}
                  style={{ padding: '0.875rem 2rem', border: '1px solid #E5E7EB', cursor: 'pointer', backgroundColor: '#FFFFFF' }}
                >
                  다시 진단하기
                </button>
                <button
                  style={{ padding: '0.875rem 2rem', backgroundColor: '#B8975A', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  전문가 상담 신청
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

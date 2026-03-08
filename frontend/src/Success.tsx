import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useIsMobile } from "./useIsMobile";
import { useLanguage } from "./LanguageContext";
import LangSwitcher from "./LangSwitcher";
import logoImg from "./assets/basemicrobe-logo.png";

export default function Success() {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: "#111", background: "#fafaf8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "14px 20px" : "18px 48px",
        background: "rgba(250,250,248,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#111" }}>
            <img src={logoImg} alt="Basemicrobe" style={{ height: 20 }} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>BASEMICROBE</span>
          </Link>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LangSwitcher />
          <Link to="/products" style={{
            fontSize: 12, letterSpacing: "0.1em", textDecoration: "none",
            color: "#fff", background: "#009f6c",
            padding: isMobile ? "8px 14px" : "9px 20px",
            textTransform: "uppercase", fontWeight: 600,
          }}>
            {t.nav.shopNow}
          </Link>
          <Link to="/cart" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", color: "#111", padding: "6px", position: "relative",
          }}>
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: 0, right: 0,
                background: "#009f6c", color: "#fff",
                fontSize: 9, fontWeight: 700, borderRadius: "50%",
                width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: isMobile ? "140px 24px 80px" : "180px 48px 120px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#009f6c", marginBottom: 16, fontWeight: 600 }}>
          {t.success.orderConfirmed}
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 24px", lineHeight: 1 }}>
          {t.success.thankYou}
        </h1>
        <p style={{ fontSize: 16, color: "#666", lineHeight: 1.6, marginBottom: 48 }}>
          {t.success.paymentSuccess}
        </p>
        <Link to="/products" style={{
          fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
          color: "#fff", background: "#009f6c", padding: "14px 32px",
          textTransform: "uppercase", fontWeight: 700, display: "inline-block",
        }}>
          {t.success.continueShopping}
        </Link>
      </div>
    </div>
  );
}

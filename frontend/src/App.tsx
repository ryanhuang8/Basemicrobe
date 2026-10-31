import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaInstagram, FaFacebook } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useIsMobile } from "./useIsMobile";
import { useLanguage } from "./LanguageContext";
import LangSwitcher from "./LangSwitcher";
import logoImg from "./assets/basemicrobe-logo.png";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const startY = window.scrollY;
      const endY = (target as HTMLElement).getBoundingClientRect().top + startY;
      const duration = 800;
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo(0, startY + (endY - startY) * ease);
        if (elapsed < duration) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: "#111", background: "#fafaf8" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "14px 20px" : (scrolled ? "14px 48px" : "22px 48px"),
        background: scrolled ? "rgba(250,250,248,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", gap: isMobile ? 20 : 36, alignItems: "center" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#111" }}>
            <img src={logoImg} alt="Basemicrobe" style={{ height: 20 }} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>BASEMICROBE</span>
          </a>
          {!isMobile && [
            { label: t.nav.about, href: "#about" },
            { label: t.nav.contact, href: "#contact" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              fontSize: 13, letterSpacing: "0.06em", textDecoration: "none",
              color: "#333", fontWeight: 500, textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.5"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LangSwitcher />
          <Link to="/products" style={{
            fontSize: 12, letterSpacing: "0.1em", textDecoration: "none",
            color: "#fff", background: "#009f6c",
            padding: isMobile ? "8px 14px" : "9px 20px",
            textTransform: "uppercase", fontWeight: 600,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#00b87d"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#009f6c"}
          >
            {t.nav.shopNow}
          </Link>
          <Link to="/cart" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", color: "#111", padding: "6px",
            transition: "opacity 0.2s", position: "relative",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.5"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
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

      {/* HERO */}
      <section style={{
        height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: isMobile ? "0 24px" : "0 48px",
        background: "linear-gradient(160deg, #e8e4de 0%, #d4cfc8 50%, #bfb9b0 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: isMobile ? 240 : 480, height: isMobile ? 240 : 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "20%",
          width: isMobile ? 160 : 320, height: isMobile ? 160 : 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 900 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: 24, fontWeight: 600 }}>
            {t.hero.tagline}
          </p>
          <h1 style={{ fontSize: "clamp(40px, 9vw, 90px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 32px", color: "#111" }}>
            {t.hero.titleLine1}<br />{t.hero.titleLine2}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.2vw, 26px)", fontWeight: 400, color: "#444", maxWidth: 560, lineHeight: 1.5, marginBottom: 48 }}>
            {t.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link to="/products" style={{
              fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
              color: "#fff", background: "#009f6c", padding: "14px 32px",
              textTransform: "uppercase", fontWeight: 700, display: "inline-block",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#00b87d"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#009f6c"}
            >
              {t.hero.shopNow}
            </Link>
            <a href="#contact" style={{
              fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
              color: "#111", border: "1.5px solid #111", padding: "14px 32px",
              textTransform: "uppercase", fontWeight: 700, display: "inline-block",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#111"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#111"; }}
            >
              {t.hero.joinWaitlist}
            </a>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section id="about" style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
            {t.about.label}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 48px", maxWidth: 640 }}>
            {t.about.heading1}<br />{t.about.heading2}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
            <div style={{ background: "#f0ebe3", padding: isMobile ? "32px 28px" : "48px 44px" }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>🌱</div>
              <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#009f6c", margin: "0 0 16px" }}>
                {t.about.bioLabel}
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 20px", lineHeight: 1.2 }}>
                {t.about.bioTitle}
              </h3>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.75, margin: 0 }}>{t.about.bioBody}</p>
            </div>
            <div style={{ background: "#e8e4de", padding: isMobile ? "32px 28px" : "48px 44px" }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>🔬</div>
              <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#009f6c", margin: "0 0 16px" }}>
                {t.about.microLabel}
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 20px", lineHeight: 1.2 }}>
                {t.about.microTitle}
              </h3>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.75, margin: 0 }}>{t.about.microBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE SECTION */}
      <section id="science" style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: "#111", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: 20, fontWeight: 600 }}>
            {t.science.label}
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 48px", maxWidth: 600 }}>
            {t.science.heading}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 2 }}>
            {t.science.stats.map(item => (
              <div key={item.num} style={{ background: "#1a1a1a", padding: isMobile ? "36px 28px" : "48px 40px" }}>
                <p style={{ fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 8px" }}>
                  {item.num}
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 16px" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 15, color: "#666", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" style={{ padding: isMobile ? "80px 24px 100px" : "140px 48px", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
              {t.contact.label}
            </p>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 84px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 auto 24px", maxWidth: 800, lineHeight: 1 }}>
              {t.contact.heading}
            </h2>
            <p style={{ fontSize: isMobile ? 16 : 18, color: "#666", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
              {t.contact.body}
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 56 }}>
            <div style={{ background: "#fff", border: "1px solid #ebebeb", padding: isMobile ? "32px 28px" : "44px 40px" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#009f6c", margin: "0 0 16px" }}>
                {t.contact.headquartersLabel}
              </p>
              <p style={{ fontSize: 15, color: "#333", lineHeight: 1.75, margin: "0 0 20px", whiteSpace: "pre-line" }}>{t.contact.headquarters}</p>
              <a href={`mailto:${t.contact.email}`} style={{ display: "block", fontSize: 14, color: "#111", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
                {t.contact.email}
              </a>
              <a href={`tel:${t.contact.phone.replace(/[^+\d]/g, "")}`} style={{ fontSize: 14, color: "#666", textDecoration: "none" }}>
                {t.contact.phone}
              </a>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ebebeb", padding: isMobile ? "32px 28px" : "44px 40px" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#009f6c", margin: "0 0 16px" }}>
                {t.contact.distributorLabel}
              </p>
              <p style={{ fontSize: 15, color: "#333", lineHeight: 1.75, margin: "0 0 20px", whiteSpace: "pre-line" }}>{t.contact.distributor}</p>
              <a href={`mailto:${t.contact.distributorEmail}`} style={{ display: "block", fontSize: 14, color: "#111", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
                {t.contact.distributorEmail}
              </a>
              <a href={`tel:${t.contact.distributorPhone.replace(/[^+\d]/g, "")}`} style={{ fontSize: 14, color: "#666", textDecoration: "none" }}>
                {t.contact.distributorPhone}
              </a>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <a href={`mailto:${t.contact.email}`} style={{
              fontSize: 13, letterSpacing: "0.12em", textDecoration: "none",
              color: "#fff", background: "#111", padding: "16px 40px",
              textTransform: "uppercase", fontWeight: 700, display: "inline-block",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#333"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >
              {t.contact.button}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#fff", padding: isMobile ? "48px 24px" : "64px 48px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
          gap: isMobile ? 40 : 48,
          marginBottom: 48,
        }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.08em", margin: "0 0 16px" }}>BASEMICROBE</p>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 260, margin: "0 0 16px" }}>{t.footer.brandDesc}</p>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: "0 0 8px", whiteSpace: "pre-line" }}>{t.footer.address}</p>
            <a href={`mailto:${t.footer.email}`} style={{ display: "block", fontSize: 13, color: "#888", textDecoration: "none", marginBottom: 4 }}>{t.footer.email}</a>
            <a href={`tel:${t.footer.phone.replace(/[^+\d]/g, "")}`} style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>{t.footer.phone}</a>
          </div>
          {[
            {
              heading: t.footer.company,
              links: [
                { label: t.footer.about, href: "#about" },
                { label: t.footer.shop, href: "/products" },
                { label: t.footer.contact, href: "#contact" },
              ],
            },
            {
              heading: t.footer.products,
              links: [
                { label: t.footer.bioProducts, href: "/products" },
                { label: t.footer.microProducts, href: "/products" },
              ],
            },
          ].map(col => (
            <div key={col.heading}>
              <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", margin: "0 0 20px", fontWeight: 600 }}>{col.heading}</p>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ display: "block", fontSize: 14, color: "#888", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#888"}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid #222", paddingTop: 32,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 16 : 0,
        }}>
          <p style={{ fontSize: 13, color: "#444", margin: 0 }}>{t.footer.copyright}</p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="https://www.instagram.com/basemicrobe/" target="_blank" rel="noopener noreferrer" style={{ color: "#444", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#444"}
            >
              <FaInstagram size={18} />
            </a>
            <a href="#" style={{ color: "#444", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#444"}
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

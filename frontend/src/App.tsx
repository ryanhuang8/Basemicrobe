import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Science", href: "#science" },
  { label: "Performance", href: "#performance" },
  { label: "Applications", href: "#applications" },
];

const PERFORMANCE_TAGS = [
  "Performance-tested",
  "Truly scalable",
  "Low carbon",
  "Plastic-free",
  "Naturally circular",
  "Bioneutral",
  "Safe return to earth",
  "Nontoxic",
];

const APPLICATIONS = [
  { label: "Footwear", icon: "👟" },
  { label: "Apparel", icon: "🧥" },
  { label: "Accessories", icon: "👜" },
  { label: "Automotive", icon: "🚗" },
  { label: "Interior", icon: "🛋️" },
  { label: "Industrial", icon: "⚙️" },
];

const MATERIALS = [
  { name: "MIRUM®", desc: "Plant-based, plastic-free, not leather", href: "#" },
  { name: "CLARUS®", desc: "Tunable, precision-engineered fabrics", href: "#" },
  { name: "PLIANT™", desc: "Footwear outsoles with zero synthetics", href: "#" },
  { name: "TUNERA™", desc: "First-in-kind plastic-free foam", href: "#" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

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
        padding: scrolled ? "14px 48px" : "22px 48px",
        background: scrolled ? "rgba(250,250,248,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          <a href="#" style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em", textDecoration: "none", color: "#111" }}>
            BASEMICROBE
          </a>
          {NAV_LINKS.map(l => (
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
          <Link to="/products" style={{
            fontSize: 12, letterSpacing: "0.1em", textDecoration: "none",
            color: "#fff", background: "#7aab6e", padding: "9px 20px",
            textTransform: "uppercase", fontWeight: 600,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#8fbc84"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#7aab6e"}
          >
            Shop Now
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
                background: "#7aab6e", color: "#fff",
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
        justifyContent: "center", padding: "0 48px",
        background: "linear-gradient(160deg, #e8e4de 0%, #d4cfc8 50%, #bfb9b0 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background texture circles */}
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "20%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 900 }}>
          <p style={{
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#666", marginBottom: 24, fontWeight: 600,
          }}>
            Health · Vitamins · Innovation
          </p>
          <h1 style={{
            fontSize: "clamp(56px, 9vw, 90px)", fontWeight: 800,
            lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 32px",
            color: "#111",
          }}>
            Better for Your Body.<br />Better for the Planet.
          </h1>
          <p style={{
            fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 400,
            color: "#444", maxWidth: 560, lineHeight: 1.5, marginBottom: 48,
          }}>
            The world's first bio-based health products and microplastic-free materials powered by natural microbes.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/products" style={{
              fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
              color: "#fff", background: "#7aab6e", padding: "14px 32px",
              textTransform: "uppercase", fontWeight: 700, display: "inline-block",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#8fbc84"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#7aab6e"}
            >
              Shop Now
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
              Join Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section id="about" style={{ padding: "120px 48px", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
              What Is It
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
              Durable by nature,<br />engineered for<br />inspiration.
            </h2>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.75, marginBottom: 20 }}>
              A plastic-free alternative made from natural rubber, plant oils and waxes, natural pigments, and minerals.
            </p>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.75 }}>
              Made with a patented biocurative — a groundbreaking, nontoxic, plant-based alternative to conventional curing systems.
            </p>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #e0dbd3 0%, #ccc7be 100%)",
            aspectRatio: "1 / 1", borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", color: "#888" }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>🌿</div>
              <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Plant-Based Material</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE SECTION */}
      <section id="science" style={{ padding: "120px 48px", background: "#111", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: 20, fontWeight: 600 }}>
            Science
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 64px", maxWidth: 600 }}>
            The first truly plastic-free alternative.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              { num: "100%", label: "Plant-Based Inputs", desc: "Every ingredient derived from natural sources — no synthetics." },
              { num: "0%", label: "Plastic Content", desc: "Zero plastics across the entire material formulation." },
              { num: "72%", label: "Lower Carbon Footprint", desc: "Dramatically reduced emissions compared to conventional leather." },
            ].map(item => (
              <div key={item.num} style={{ background: "#1a1a1a", padding: "48px 40px" }}>
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

      {/* PERFORMANCE SECTION */}
      <section id="performance" style={{ padding: "120px 48px", background: "#f2ede6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
            Performance
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 64px", maxWidth: 500 }}>
            Built to last.<br />Designed to return.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {PERFORMANCE_TAGS.map(tag => (
              <span key={tag} style={{
                fontSize: 13, letterSpacing: "0.06em", fontWeight: 600,
                textTransform: "uppercase", padding: "12px 24px",
                border: "1.5px solid #222", color: "#222",
                background: "transparent",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" style={{ padding: "120px 48px", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
            Application
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, maxWidth: 520 }}>
              Pushing the boundaries of plastic-free design.
            </h2>
            <a href="#contact" style={{
              fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
              color: "#fff", background: "#111", padding: "14px 28px",
              textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap",
            }}>
              Join Waitlist
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {APPLICATIONS.map(app => (
              <div key={app.label} style={{
                background: "#f0ebe3", padding: "48px 40px",
                display: "flex", flexDirection: "column", gap: 16,
                cursor: "pointer", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#e5dfd6"}
                onMouseLeave={e => e.currentTarget.style.background = "#f0ebe3"}
              >
                <span style={{ fontSize: 36 }}>{app.icon}</span>
                <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>{app.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS PLATFORM */}
      <section style={{ padding: "120px 48px", background: "#111", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: 20, fontWeight: 600 }}>
            A platform of plastic-free performance materials
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, marginTop: 48 }}>
            {MATERIALS.map(mat => (
              <div key={mat.name} style={{
                background: "#1a1a1a", padding: "40px 32px",
                borderTop: "2px solid #333", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#333"}
              >
                <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 12px" }}>{mat.name}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: "0 0 28px" }}>{mat.desc}</p>
                <a href={mat.href} style={{
                  fontSize: 11, letterSpacing: "0.14em", textDecoration: "none",
                  color: "#fff", textTransform: "uppercase", fontWeight: 700,
                  borderBottom: "1px solid #444", paddingBottom: 2,
                }}>
                  Discover →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" style={{ padding: "140px 48px", background: "#fafaf8", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20, fontWeight: 600 }}>
          Get In Touch
        </p>
        <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 auto 32px", maxWidth: 700, lineHeight: 1 }}>
          Ready to partner?
        </h2>
        <p style={{ fontSize: 18, color: "#666", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.65 }}>
          Join our waitlist to be the first to access materials and collaborate on next-generation products.
        </p>
        <a href="mailto:hello@yourbrand.com" style={{
          fontSize: 13, letterSpacing: "0.12em", textDecoration: "none",
          color: "#fff", background: "#111", padding: "16px 40px",
          textTransform: "uppercase", fontWeight: 700, display: "inline-block",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#333"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
        >
          Join the Waitlist
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#fff", padding: "64px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.08em", margin: "0 0 16px" }}>BASEMICROBE</p>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, maxWidth: 260 }}>
              A platform of plastic-free performance materials to remake everything.
            </p>
          </div>
          {[
            { heading: "Company", links: ["About", "People", "Newsroom", "Shop"] },
            { heading: "Materials", links: ["MIRUM®", "CLARUS®", "PLIANT™", "TUNERA™"] },
            { heading: "Science", links: ["Ground Rules", "Impact", "Stories", "Careers"] },
          ].map(col => (
            <div key={col.heading}>
              <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", margin: "0 0 20px", fontWeight: 600 }}>{col.heading}</p>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "#888", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#888"}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #222", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "#444", margin: 0 }}>©2024 Your Brand, Inc. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Terms", "Privacy", "Cookies"].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: "#444", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#888"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#444"}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useIsMobile } from "./useIsMobile";
import { useLanguage } from "./LanguageContext";
import LangSwitcher from "./LangSwitcher";
import logoImg from "./assets/basemicrobe-logo.png";
import testProductOne from "./assets/test1.jpg";
import testProductTwo from "./assets/test2.jpg";
import testProductThree from "./assets/test3.jpg";
import { lipBalm, lipBalmCopy } from "./lipBalm";

const PRODUCT_IMAGES = [testProductOne, testProductTwo, testProductThree /*, ""*/];
const PRODUCT_BG = ["#e8e4de", "#dde8d8", "#e4ddd6" /*, "#e8ede8"*/];
const PRODUCT_PRICES = ["$20.00", "$15 / pack", "Ask for price" /*, "$1.00"*/];

export default function Products() {
  const { addToCart, totalItems } = useCart();
  const isMobile = useIsMobile();
  const { t, lang } = useLanguage();

  const products = [...t.productsPage.products.map((p, i) => ({
    ...p,
    image: PRODUCT_IMAGES[i],
    bg: PRODUCT_BG[i],
    price: PRODUCT_PRICES[i],
    detailsPath: undefined as string | undefined,
  })), {
    name: lipBalmCopy[lang].name,
    desc: lipBalmCopy[lang].shortDescription,
    tag: lipBalmCopy[lang].tag,
    image: lipBalm.image,
    bg: lipBalm.bg,
    price: lipBalm.price,
    detailsPath: lipBalm.path,
  }];

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
        <div style={{ display: "flex", gap: isMobile ? 0 : 36, alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#111" }}>
            <img src={logoImg} alt="Basemicrobe" style={{ height: 20 }} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>BASEMICROBE</span>
          </Link>
          {!isMobile && [
            { label: t.nav.about, href: "/#about" },
            { label: t.nav.contact, href: "/#contact" },
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

      {/* PAGE HEADER */}
      <div style={{ padding: isMobile ? "120px 24px 48px" : "140px 48px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 16, fontWeight: 600 }}>
          {t.productsPage.allProducts}
        </p>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, lineHeight: 1 }}>
          {t.productsPage.shop}
        </h1>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: isMobile ? "0 24px 80px" : "0 48px 120px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {products.map(product => (
            <div key={product.name} style={{
              background: "#fff", border: "1px solid #ebebeb",
              display: "flex", flexDirection: "column",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
            >
              <div style={{ background: product.bg, aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {product.image
                  ? product.detailsPath
                    ? <Link to={product.detailsPath} aria-label={product.name} style={{ display: "block", width: "100%", height: "100%" }}><img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 65%" }} /></Link>
                    : <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Image</p>
                }
              </div>
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#009f6c" }}>
                  {product.tag}
                </span>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>{product.detailsPath ? <Link to={product.detailsPath} style={{ color: "inherit", textDecoration: "none" }}>{product.name}</Link> : product.name}</h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0, flex: 1 }}>{product.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{product.price}</span>
                  {product.detailsPath ? <Link to={product.detailsPath} style={{ fontSize: 11, fontWeight: 700, background: "#111", color: "#fff", padding: "10px 20px", textDecoration: "none" }}>{lang === "zh" ? "查看商品" : "View Product"}</Link> : <button
                    onClick={() => addToCart({ name: product.name, price: product.price, bg: product.bg, image: product.image })}
                    style={{
                      fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                      fontWeight: 700, background: "#111", color: "#fff",
                      border: "none", padding: "10px 20px", cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#333"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
                  >
                    {t.productsPage.addToCart}
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

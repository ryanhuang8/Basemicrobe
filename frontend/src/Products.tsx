import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import psylliumImg from "./assets/psyllium_colon_cleanse.png";
import fizzC from "./assets/fruit_fizz_c.png";
import veganLeather from "./assets/leather.png";

const PRODUCTS = [
  {
    name: "Psyllium Colon Cleanse",
    desc: "Natural fiber formula for digestive health and gentle daily cleansing.",
    price: "$22.50",
    tag: "Health",
    bg: "#e8e4de",
    image: psylliumImg,
  },
  {
    name: "Fruit Fizz-C",
    desc: "Effervescent vitamin C blend with real fruit extracts for daily immunity support.",
    price: "$13 / pack",
    tag: "Wellness",
    bg: "#dde8d8",
    image: fizzC,
  },
  {
    name: "Vegan Leather",
    desc: "Plant-based, plastic-free leather alternative crafted from natural microbes.",
    price: "Ask for price",
    tag: "Materials",
    bg: "#e4ddd6",
    image: veganLeather,
  },
];

export default function Products() {
  const { addToCart, totalItems } = useCart();

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: "#111", background: "#fafaf8", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 48px",
        background: "rgba(250,250,248,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em", textDecoration: "none", color: "#111" }}>
            BASEMICROBE
          </Link>
          {[
            { label: "About", href: "/#about" },
            { label: "Contact", href: "/#contact" },
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

      {/* PAGE HEADER */}
      <div style={{ padding: "140px 48px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 16, fontWeight: 600 }}>
          All Products
        </p>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, lineHeight: 1 }}>
          Shop
        </h1>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: "0 48px 120px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PRODUCTS.map(product => (
            <div key={product.name} style={{
              background: "#fff", border: "1px solid #ebebeb",
              display: "flex", flexDirection: "column",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
            >
              {/* Image */}
              <div style={{
                background: product.bg,
                aspectRatio: "4 / 3",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                {product.image
                  ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Image</p>
                }
              </div>

              {/* Card body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <span style={{
                  fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                  fontWeight: 700, color: "#7aab6e",
                }}>
                  {product.tag}
                </span>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
                  {product.name}
                </h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0, flex: 1 }}>
                  {product.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
                    {product.price}
                  </span>
                  <button
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
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

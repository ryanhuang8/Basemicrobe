import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useIsMobile } from "./useIsMobile";
import logoImg from "./assets/basemicrobe-logo.png";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const numericTotal = items.reduce((sum, item) => {
    const match = item.price.match(/[\d.]+/);
    return sum + (match ? parseFloat(match[0]) * item.quantity : 0);
  }, 0);

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
            color: "#fff", background: "#009f6c",
            padding: isMobile ? "8px 14px" : "9px 20px",
            textTransform: "uppercase", fontWeight: 600,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#00b87d"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#009f6c"}
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

      {/* PAGE CONTENT */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "120px 20px 80px" : "140px 48px 120px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 16, fontWeight: 600 }}>
          Your Cart
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 48px", lineHeight: 1 }}>
          {totalItems === 0 ? "Cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
        </h1>

        {items.length === 0 ? (
          <div>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>You haven't added anything yet.</p>
            <Link to="/products" style={{
              fontSize: 12, letterSpacing: "0.12em", textDecoration: "none",
              color: "#fff", background: "#009f6c", padding: "14px 32px",
              textTransform: "uppercase", fontWeight: 700, display: "inline-block",
            }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div>
            {/* Items */}
            <div style={{ borderTop: "1px solid #e5e5e5", marginBottom: 40 }}>
              {items.map(item => (
                <div key={item.name} style={{
                  display: "flex", alignItems: "center", gap: isMobile ? 12 : 24,
                  padding: "20px 0", borderBottom: "1px solid #e5e5e5",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}>
                  {/* Image */}
                  <div style={{
                    width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, flexShrink: 0,
                    background: item.bg, overflow: "hidden",
                  }}>
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : null
                    }
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: isMobile ? "calc(100% - 76px)" : "auto" }}>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>{item.name}</p>
                    <p style={{ fontSize: 14, color: "#666", margin: 0 }}>{item.price}</p>
                  </div>

                  {/* Quantity + Remove row on mobile */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, width: isMobile ? "100%" : "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #ddd" }}>
                      <button onClick={() => updateQuantity(item.name, item.quantity - 1)} style={{
                        width: 32, height: 32, border: "none", background: "transparent",
                        cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>−</button>
                      <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, item.quantity + 1)} style={{
                        width: 32, height: 32, border: "none", background: "transparent",
                        cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.name)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 12, color: "#999", letterSpacing: "0.06em",
                      textTransform: "uppercase", fontWeight: 600,
                      transition: "color 0.2s", padding: 0,
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#999"}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: isMobile ? "100%" : 320 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "#666" }}>Subtotal</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    ${numericTotal.toFixed(2)}
                    {items.some(i => i.price === "Ask for price") && " + custom pricing"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, paddingTop: 16, borderTop: "1px solid #e5e5e5" }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>
                    ${numericTotal.toFixed(2)}
                    {items.some(i => i.price === "Ask for price") && "+"}
                  </span>
                </div>
                {error && (
                  <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 12, textAlign: "center" }}>{error}</p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  style={{
                    width: "100%", fontSize: 12, letterSpacing: "0.12em",
                    textTransform: "uppercase", fontWeight: 700,
                    background: loading ? "#555" : "#111", color: "#fff", border: "none",
                    padding: "16px", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#333"; }}
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#111"; }}
                >
                  {loading ? "Redirecting..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

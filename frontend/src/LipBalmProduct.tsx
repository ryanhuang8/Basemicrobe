import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useLanguage } from "./LanguageContext";
import LangSwitcher from "./LangSwitcher";
import logo from "./assets/basemicrobe-logo.png";
import { lipBalm, lipBalmCopy } from "./lipBalm";
import "./LipBalmProduct.css";

export default function LipBalmProduct() {
  const { lang, t } = useLanguage();
  const copy = lipBalmCopy[lang];
  const { addToCart, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function handleAddToCart() {
    for (let count = 0; count < quantity; count += 1) {
      addToCart({
        name: `${copy.name} · ${copy.style}`,
        price: lipBalm.price,
        image: lipBalm.image,
        bg: lipBalm.bg,
      });
    }
    setAdded(true);
  }

  return (
    <div className="lip-product-page" lang={lang}>
      <nav className="lip-nav" aria-label={lang === "zh" ? "主导航" : "Main navigation"}>
        <Link className="lip-brand" to="/">
          <img src={logo} alt="" width="26" height="20" />
          <span>BASEMICROBE</span>
        </Link>
        <div className="lip-nav-actions">
          <LangSwitcher />
          <Link className="lip-shop-link" to="/products">{t.footer.shop}</Link>
          <Link className="lip-cart-link" to="/cart" aria-label={`${t.cart.yourCart} (${totalItems})`}>
            <FaShoppingCart size={20} />
            {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
        </div>
      </nav>

      <main className="lip-product-main">
        <Link to="/products" className="lip-back">← {copy.back}</Link>
        <div className="lip-product-layout">
          <div className="lip-gallery">
            <img className="lip-main-image" src={lipBalm.image} alt={copy.imageAlt} width="1712" height="2120" fetchPriority="high" />
          </div>

          <section className="lip-purchase" aria-labelledby="lip-product-title">
            <p className="lip-eyebrow">BASEMICROBE · {copy.tag}</p>
            <h1 id="lip-product-title">{copy.name}</h1>
            <p className="lip-intro">{copy.shortDescription}</p>
            <div className="lip-price"><strong>{lipBalm.price}</strong><span>{copy.unit}</span></div>
            <div className="lip-formula"><span>{copy.styleLabel}</span><strong>{copy.style}</strong></div>
            <div className="lip-quantity-row">
              <span id="lip-quantity-label">{copy.quantity}</span>
              <div className="lip-stepper" role="group" aria-labelledby="lip-quantity-label">
                <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity === 1} aria-label={copy.decrease}>−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => setQuantity(q => Math.min(99, q + 1))} disabled={quantity === 99} aria-label={copy.increase}>+</button>
              </div>
            </div>
            <button type="button" className="lip-add-button" onClick={handleAddToCart}>
              {copy.addToCart}<span>· ${(lipBalm.unitPrice * quantity).toFixed(2)}</span>
            </button>
            <div className="lip-cart-feedback" role="status">
              {added && <><span>{copy.added} </span><Link to="/cart">{copy.viewCart} →</Link></>}
            </div>
          </section>

          <div className="lip-details">
            {copy.details.map((section, index) => (
              <details key={`${lang}-${index}`} open={index === 0}>
                <summary>{section.title}<span aria-hidden="true" className="lip-chevron" /></summary>
                <div className="lip-detail-body">
                  {"paragraphs" in section && section.paragraphs?.map(p => <p key={p}>{p}</p>)}
                  {"items" in section && section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

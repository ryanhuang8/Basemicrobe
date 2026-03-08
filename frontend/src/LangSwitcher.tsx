import { useLanguage } from "./LanguageContext";

export default function LangSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang } = useLanguage();
  const active = onDark ? "#fff" : "#111";
  const inactive = "#888";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}>
      <button
        onClick={() => setLang("en")}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: "2px 4px",
          color: lang === "en" ? active : inactive,
          fontWeight: 600, fontSize: 12, fontFamily: "inherit",
          transition: "color 0.2s",
        }}
      >
        EN
      </button>
      <span style={{ color: inactive, fontSize: 11 }}>|</span>
      <button
        onClick={() => setLang("zh")}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: "2px 4px",
          color: lang === "zh" ? active : inactive,
          fontWeight: 600, fontSize: 12, fontFamily: "inherit",
          transition: "color 0.2s",
        }}
      >
        中文
      </button>
    </div>
  );
}

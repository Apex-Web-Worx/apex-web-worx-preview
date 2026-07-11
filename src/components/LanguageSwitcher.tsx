import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium tracking-widest select-none">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 transition-colors ${
          language === "en"
            ? "text-primary"
            : "text-foreground/40 hover:text-foreground/70"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-foreground/20">|</span>
      <button
        onClick={() => setLanguage("ru")}
        className={`px-2 py-1 transition-colors ${
          language === "ru"
            ? "text-primary"
            : "text-foreground/40 hover:text-foreground/70"
        }`}
        aria-label="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
}

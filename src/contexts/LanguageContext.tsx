import React, { createContext, useContext, useState } from "react";
import { translations } from "../constants/translastions";

type Language = "pt" | "en";
type TranslationType = typeof translations.pt;

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  texts: TranslationType;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("appLanguage");
    return saved === "pt" || saved === "en" ? saved : "en";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === "pt" ? "en" : "pt";
      localStorage.setItem("appLanguage", newLang);
      return newLang;
    });
  };

  const value = {
    language,
    toggleLanguage,
    texts: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

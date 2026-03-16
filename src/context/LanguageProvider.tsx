import { createContext, useContext, useState, ReactNode } from "react";
import userData from "../data/userData.json";

export type Language = "en" | "ja";
export type UserData = typeof userData.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: UserData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("portfolio-lang");
    return (stored === "ja" ? "ja" : "en") as Language;
  });

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem("portfolio-lang", lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, data: userData[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

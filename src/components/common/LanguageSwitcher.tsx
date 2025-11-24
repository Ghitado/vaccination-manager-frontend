import { IconButton, Tooltip } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Tooltip
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <IconButton onClick={toggleLanguage} color="inherit" sx={{ ml: 1 }}>
        <span style={{ fontSize: "1.2rem" }}>
          {language === "pt" ? "🇺🇸" : "🇧🇷"}
        </span>
      </IconButton>
    </Tooltip>
  );
};

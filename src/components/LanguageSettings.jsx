"use client";

import { useLanguageContext } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { t } from "@/lib/translations";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
];

export default function LanguageSettings() {
  const { language, updateLanguage, loading } = useLanguageContext();

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t(language, "languageSettings.title")}</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => updateLanguage(lang.code)}
            className={`p-4 rounded-lg border-2 font-medium transition-all ${
              language === lang.code
                ? "bg-blue-50 border-blue-600 text-blue-900"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
            } hover:shadow-md`}
          >
            <div className="text-2xl mb-2">{lang.flag}</div>
            <div className="text-sm font-medium">{lang.name}</div>
            {language === lang.code && (
              <div className="text-xs text-blue-600 mt-1 font-bold">✓ {t(language, "languageSettings.selected")}</div>
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {t(language, "languageSettings.description")}
      </p>
    </div>
  );
}

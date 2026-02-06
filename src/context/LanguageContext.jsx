"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await fetch("/api/user/language");
        if (response.ok) {
          const data = await response.json();
          const lang = data.language || "en";
          setLanguage(lang);
        } else {
          setLanguage("en");
        }
      } catch (error) {
        console.error("Failed to fetch language:", error);
        setLanguage("en");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, []);

  const updateLanguage = async (newLanguage) => {
    try {
      setLanguage(newLanguage);
      
      const response = await fetch("/api/user/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (!response.ok) {
        console.error("Failed to save language preference");
        setLanguage(newLanguage);
      }
      return true;
    } catch (error) {
      console.error("Failed to update language:", error);
      setLanguage(newLanguage);
      return true;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, loading, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return context;
}

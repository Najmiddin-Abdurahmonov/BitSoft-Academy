import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function useLanguage() {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchLanguage = async () => {
      try {
        const response = await fetch("/api/user/language");
        if (response.ok) {
          const data = await response.json();
          setLanguage(data.language || "en");
        }
      } catch (error) {
        console.error("Failed to fetch language:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [user]);

  const updateLanguage = async (newLanguage) => {
    try {
      const response = await fetch("/api/user/language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (response.ok) {
        setLanguage(newLanguage);
        return true;
      }
    } catch (error) {
      console.error("Failed to update language:", error);
    }
    return false;
  };

  return { language, loading, updateLanguage };
}

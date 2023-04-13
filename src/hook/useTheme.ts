import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = localStorage.getItem("theme");

      return storedTheme ? storedTheme : "dark";
    }

    return "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const doc = document.documentElement;
    doc.classList.remove("light", "dark");
    doc.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;

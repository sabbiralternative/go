import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme || "dark");

    if (theme === "dark") {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
    }
    if (theme === "light") {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
    }
  }, [theme]);

  const stateInfo = { theme, setTheme };
  return (
    <ThemeContext.Provider value={stateInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

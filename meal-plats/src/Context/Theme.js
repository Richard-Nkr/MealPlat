import { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
    backgroundColor: "#33691E",
    color: "white",
    background: "#BDBDBD",
    boxShadow: "8px 8px 10px 0 rgb(255, 255, 255)",

  },
  light: {
    backgroundColor: "#9CCC65",
    color: "black",
    background: "white",
    boxShadow: "8px 8px 10px 0 rgb(0, 0, 0)",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
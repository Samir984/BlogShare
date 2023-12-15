/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [{ themeMode }, setThemeMode] = useLocalStorage("light", "theme");
  console.log(themeMode);

  useEffect(() => {
    if (themeMode === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [themeMode]);

 
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };

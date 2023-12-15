import { ThemeProvider, useTheme } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div>Yep</div>
      <Theme />
    </ThemeProvider>
  );
}
function Theme() {
  const { setThemeMode, themeMode } = useTheme();
  return (
    <button
      onClick={() =>
        setThemeMode((prev) =>
          prev.themeMode === "light"
            ? { themeMode: "dark" }
            : { themeMode: "light" }
        )
      }
    >
      {themeMode}s
    </button>
  );
}

export default App;

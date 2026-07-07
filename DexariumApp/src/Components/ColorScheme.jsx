import { useEffect, useState } from "react"

function ColorScheme() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "light";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches;
  });
    useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLightMode ? "light" : "dark"
    );

    localStorage.setItem(
      "theme",
      isLightMode ? "light" : "dark"
    );
  }, [isLightMode]);

  return (
    <button onClick={() => setIsLightMode((prev) => !prev)}>
      {isLightMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
}
export default ColorScheme
export function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
  
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
  
  export function applyStoredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  
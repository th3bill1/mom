import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className="hover:cursor-pointer"
      onClick={() => setTheme((previous) => (previous === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

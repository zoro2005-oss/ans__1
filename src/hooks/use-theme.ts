import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "reveillon31-theme";

/**
 * Script inline execute avant le premier rendu : applique le theme memorise (ou
 * celui du systeme) sur <html>. Il doit rester synchrone et sans dependance,
 * sinon la page clignote en theme clair avant d'accepter le dark.
 */
export const THEME_BOOT_SCRIPT = `try{var k="reveillon31-theme",s=localStorage.getItem(k),m=window.matchMedia("(prefers-color-scheme: dark)").matches,d=s?s==="dark":m,r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}`;

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Bascule clair / sombre. L'etat vit dans la classe `dark` de <html> et la
 * preference est conservee dans localStorage ; l'ecoute du systeme n'est
 * active que tant que l'utilisateur n'a pas choisi explicitement.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Stockage indisponible : le theme reste valable pour la session. */
    }
    setTheme(next);
  }, []);

  const toggle = useCallback(() => {
    apply(readTheme() === "dark" ? "light" : "dark");
  }, [apply]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return;
      const next: Theme = event.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return { theme, setTheme: apply, toggle };
}

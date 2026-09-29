import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Bascule entre le theme sombre et le theme clair.
 *
 * L'icone montree est toujours celle de la theme *cible* : la lune invite a
 * passer en sombre, le soleil a passer en clair. `aria-pressed` et le libelle
 * `aria-label` rendent l'etat announces aux lecteurs d'ecran.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={next === "dark" ? "Passer en thème sombre" : "Passer en thème clair"}
      title={next === "dark" ? "Thème sombre" : "Thème clair"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" className="h-4.5 w-4.5" />
      ) : (
        <Moon aria-hidden="true" className="h-4.5 w-4.5" />
      )}
    </button>
  );
}

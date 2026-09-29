import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Intensité de l'attraction, de 0 à 1. */
  strength?: number;
  /** Marge au-delà de laquelle le bouton revient à sa place, en px. */
  radius?: number;
};

/**
 * Rend ses enfants « magnétiques » : le bouton suit légèrement le curseur à
 * l'approche, comme s'il était attiré par le pointeur.
 *
 * Désactivé sur les appareils tactiles (`hover: none`) et si l'utilisateur limite
 * les animations. La translation est appliquée à l'enveloppe, jamais au bouton
 * lui-même, pour ne pas écraser ses `transform` Tailwind.
 */
export function Magnetic({ children, className, strength = 0.35, radius = 90 }: MagneticProps) {
  const area = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = area.current;
    if (!element || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let dispose = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !area.current) return;

      const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

      const reset = () => {
        xTo(0);
        yTo(0);
      };

      const onMove = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const limit = Math.max(bounds.width, bounds.height) / 2 + radius;

        if (Math.hypot(dx, dy) > limit) {
          reset();
          return;
        }

        const falloff = 1 - Math.hypot(dx, dy) / limit;
        xTo(dx * strength * falloff);
        yTo(dy * strength * falloff);
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", reset);
      dispose = () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", reset);
        gsap.killTweensOf(element);
      };
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, [reduced, strength, radius]);

  return (
    <span ref={area} className={cn("magnetic inline-flex", className)}>
      {children}
    </span>
  );
}

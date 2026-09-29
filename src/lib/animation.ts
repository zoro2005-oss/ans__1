import { useEffect, useState } from "react";

type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let bundle: Promise<GsapBundle> | undefined;

/**
 * GSAP est chargé à la demande : il pèse ~70 ko et n'est nécessaire qu'après
 * le premier rendu. Le module est mis en cache pour les animations suivantes.
 */
export function loadGsap(): Promise<GsapBundle> {
  bundle ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return bundle;
}

/**
 * `true` si l'utilisateur a demandé à limiter les animations.
 *
 * Vaut `false` au premier rendu (serveur inclus) puis se met à jour après le
 * montage : les composants Avoident ainsi de rendre une version « statique »
 * qui serait immédiatement remplacée par une version animée — et inversement.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

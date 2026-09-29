const COLORS = ["var(--gold)", "var(--champagne)", "var(--violet)", "var(--foreground)"];

export type ConfettiOptions = {
  /** Nombre de particules. */
  count?: number | undefined;
  /** Point d'origine en coordonnées viewport. */
  origin?: { x: number; y: number } | undefined;
  /** Portée horizontale du jet, en px. */
  spread?: number | undefined;
  /** Durée de vie d'une particule, en secondes. */
  life?: number | undefined;
};

/**
 * Explosion de confettis montée dans le DOM, sans dépendance GSAP : suffisant
 * pour un one-shot et considerably plus léger sur le chemin critique du
 * panier (le module GSAP y est déjà chargé par ailleurs).
 */
export function burstConfetti({
  count = 18,
  origin,
  spread = 220,
  life = 1.1,
}: ConfettiOptions = {}) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const host = document.createElement("div");
  host.className = "confetti-burst";
  const source = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.6;
    const distance = (0.35 + Math.random() * 0.65) * spread;
    const duration = life * (0.7 + Math.random() * 0.6);

    particle.className = "confetti-particle";
    particle.style.background = COLORS[index % COLORS.length] ?? "var(--gold)";
    particle.style.left = `${source.x}px`;
    particle.style.top = `${source.y}px`;

    const animation = particle.animate(
      [
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${
            Math.sin(angle) * distance + 90
          }px)) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: duration * 1000, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
    );

    host.appendChild(particle);
    animation.onfinish = () => particle.remove();
  }

  document.body.appendChild(host);
  window.setTimeout(() => host.remove(), life * 1000 + 400);
}

/** Confettis de pleine page, utilisés à la confirmation de commande. */
export function celebrateOrder() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const host = document.createElement("div");
  host.className = "confetti-burst";
  const colors = ["var(--gold)", "var(--champagne)", "var(--violet)", "var(--success)"];

  for (let index = 0; index < 90; index += 1) {
    const particle = document.createElement("span");
    particle.className = "confetti-particle";
    particle.style.background = colors[index % colors.length] ?? "var(--gold)";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${-10 - Math.random() * 20}vh`;

    const duration = 2.2 + Math.random() * 1.8;
    const animation = particle.animate(
      [
        { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 0 },
        {
          transform: `translate3d(${(Math.random() - 0.5) * 240}px, 60px, 0) rotate(180deg)`,
          opacity: 1,
          offset: 0.25,
        },
        {
          transform: `translate3d(${(Math.random() - 0.5) * 320}px, 118vh, 0) rotate(${
            360 + Math.random() * 540
          }deg)`,
          opacity: 0,
        },
      ],
      { duration: duration * 1000, easing: "cubic-bezier(.25,.6,.35,1)", fill: "forwards" },
    );

    host.appendChild(particle);
    animation.onfinish = () => particle.remove();
  }

  document.body.appendChild(host);
  window.setTimeout(() => host.remove(), 5000);
}

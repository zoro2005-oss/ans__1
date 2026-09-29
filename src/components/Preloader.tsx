import { useEffect, useRef, useState } from "react";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";

const SESSION_KEY = "r31-preloader-seen";

/**
 * Intro plein écran : monogramme, compte de 0 à 100, puis rideau qui se retire.
 *
 * N'apparaît qu'une fois par session (sessionStorage) et jamais si l'utilisateur
 * limite les animations. Le verrou de défilement est posé pendant l'intro et
 * relâché à la fois sur la fin de l'animation et au démontage, pour ne jamais
 * laisser la page bloquée.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    if (seen || reduced) return;
    setVisible(true);
  }, [reduced]);

  useEffect(() => {
    if (!visible) return;
    const element = root.current;
    if (!element) return;

    document.body.style.overflow = "hidden";
    let revert = () => {};
    let cancelled = false;

    const finish = () => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      setVisible(false);
    };

    // Filet de sécurité : si GSAP ne se charge pas, l'intro ne doit pas
    // laisser la page verrouillée.
    const failsafe = window.setTimeout(finish, 5000);

    void loadGsap()
      .then(({ gsap }) => {
        if (cancelled || !root.current) return;
        window.clearTimeout(failsafe);

        const context = gsap.context(() => {
          const value = { n: 0 };
          const timeline = gsap.timeline({ onComplete: finish });

          timeline
            .to(value, {
              n: 100,
              duration: 1.5,
              ease: "power2.inOut",
              onUpdate: () => {
                if (counter.current)
                  counter.current.textContent = String(Math.round(value.n)).padStart(3, "0");
              },
            })
            .to(
              element.querySelector("[data-preloader-bar]"),
              { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
              0,
            )
            .to(element.querySelectorAll("[data-preloader-item]"), {
              yPercent: -120,
              opacity: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.inOut",
            })
            .to(element, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.15");
        }, element);

        revert = () => context.revert();
      })
      .catch(() => {
        if (cancelled) return;
        window.clearTimeout(failsafe);
        finish();
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      revert();
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={root}
      className="preloader"
      role="status"
      aria-live="polite"
      aria-label="Chargement de la vitrine"
    >
      <div className="preloader-inner">
        <div data-preloader-item className="preloader-mark">
          R31
        </div>
        <p data-preloader-item className="preloader-kicker">
          Réveillon 31 · Cotonou
        </p>
        <div data-preloader-item className="preloader-counter">
          <span ref={counter}>000</span>
        </div>
        <div className="preloader-track">
          <span data-preloader-bar className="preloader-bar" />
        </div>
      </div>
    </div>
  );
}

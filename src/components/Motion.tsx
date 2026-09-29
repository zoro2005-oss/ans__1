import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";
import { cn } from "@/lib/utils";

type SplitProps = {
  /** Texte à révéler. */
  children: string;
  /** Balise rendue. */
  as?: ElementType;
  className?: string;
  /** Partie du texte rendue en or italique (comparaison insensible à la casse et à la ponctuation). */
  accent?: string | undefined;
};

type SplitWordsProps = {
  text: string;
  as: ElementType;
  rootRef: RefObject<HTMLElement | null>;
  className?: string | undefined;
  accent?: string | undefined;
};

function SplitWords({ text, accent, className, as: Tag, rootRef }: SplitWordsProps) {
  const words: string[] = text.split(" ");
  const normalize = (value: string) => value.toLowerCase().replace(/[^\p{L}]/gu, "");
  const accentWords = new Set((accent ?? "").split(" ").map(normalize));

  const rendered = words.map((word, wordIndex) => (
    <span
      className={cn("split-word", accentWords.has(normalize(word)) && "split-accent")}
      key={`${word}-${wordIndex}`}
      aria-hidden="true"
    >
      {[...word].map((char, charIndex) => (
        <span className="split-char" data-char="" key={`${char}-${charIndex}`}>
          {char}
        </span>
      ))}
      {wordIndex < words.length - 1 ? " " : null}
    </span>
  ));

  return createElement(
    Tag,
    { ref: rootRef, className: cn("split-text", className), "aria-label": text },
    rendered,
  );
}

/**
 * Révèle un texte caractère par caractère au montage.
 *
 * Chaque mot est un conteneur `inline-block`, donc le retour à la ligne se fait
 * naturellement sur les espaces, sans avoir à mesurer le rendu. Le texte reste
 * lisible pour les lecteurs d'écran (`aria-label` sur le conteneur, caractères
 * masqués), et l'animation est annulée si l'utilisateur limite les animations.
 */
export function SplitText({
  children,
  as = "span",
  className,
  accent,
  delay = 0.15,
}: SplitProps & { delay?: number }) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = root.current;
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        gsap.from(element.querySelectorAll("[data-char]"), {
          yPercent: 118,
          opacity: 0,
          rotateX: -55,
          transformOrigin: "50% 100%",
          duration: 0.9,
          delay,
          stagger: 0.022,
          ease: "power3.out",
        });
      }, element);
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced, children, delay]);

  return (
    <SplitWords text={children} accent={accent} as={as} className={className} rootRef={root} />
  );
}

/** Même découpe, mais déclenchée à l'entrée dans le viewport. */
export function SplitTextOnScroll({ children, as = "h2", className, accent }: SplitProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = root.current;
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        gsap.from(element.querySelectorAll("[data-char]"), {
          yPercent: 115,
          opacity: 0,
          duration: 0.85,
          stagger: 0.016,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%" },
        });
      }, element);
      revert = () => {
        context.revert();
        ScrollTrigger.refresh();
      };
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced, children]);

  return (
    <SplitWords text={children} accent={accent} as={as} className={className} rootRef={root} />
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage vertical de départ, en px. */
  y?: number;
  delay?: number;
};

/** Apparition simple au scroll, pour les blocs qui ne sont pas du texte. */
export function Reveal({ children, className, y = 42, delay = 0 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = root.current;
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        gsap.from(element, {
          y,
          opacity: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      }, element);
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced, y, delay]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

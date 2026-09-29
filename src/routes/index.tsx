import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, type ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MessageCircle,
  Quote,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/newyear-hero.jpg";
import partyPackImage from "@/assets/party-pack.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { SmartImage } from "@/components/SmartImage";
import { Magnetic } from "@/components/Magnetic";
import { Reveal, SplitText, SplitTextOnScroll } from "@/components/Motion";
import { formatPrice, partyPacks, products } from "@/data/products";
import {
  contactDetails,
  faq,
  flashOffer,
  flashOfferDeadline,
  gallery,
  reviews,
  socialProof,
  trustBadges,
} from "@/data/site";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";
import { nextNewYear, useCountdown, type TimeLeft } from "@/hooks/use-countdown";

const HeroScene = lazy(() => import("@/components/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Réveillon 31 — Fais du 31 une nuit inoubliable" },
      {
        name: "description",
        content:
          "Décoration, tenues, cadeaux et packs de fête livrés à Cotonou pour un réveillon inoubliable.",
      },
      { property: "og:title", content: "Réveillon 31 — La fête commence ici" },
      { property: "og:description", content: "La sélection premium du Nouvel An au Bénin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const pad = (value: number) => String(value).padStart(2, "0");

function CountdownCells({ value }: { value: TimeLeft }) {
  const cells = [
    { value: value.days, label: "Jours" },
    { value: value.hours, label: "Heures" },
    { value: value.minutes, label: "Minutes" },
    { value: value.seconds, label: "Secondes" },
  ];
  return (
    <div className="grid max-w-xl grid-cols-4 border-y border-border/70 py-4">
      {cells.map((cell) => (
        <div key={cell.label} className="border-r border-border/60 px-2 first:pl-0 last:border-0">
          <strong className="block font-display text-2xl tabular-nums text-foreground sm:text-4xl">
            {pad(cell.value)}
          </strong>
          <span className="text-[0.56rem] uppercase tracking-[0.12em] text-muted-foreground">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function NewYearCountdown() {
  const timeLeft = useCountdown(() => nextNewYear());
  return (
    <div>
      <p className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-primary">
        {timeLeft.expired ? "Le jour J est arrivé" : `Cap sur le ${timeLeft.label}`}
      </p>
      <CountdownCells value={timeLeft} />
    </div>
  );
}

function FlashTimer() {
  const timeLeft = useCountdown(() => flashOfferDeadline());
  if (timeLeft.expired) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        L’offre {flashOffer.code} est terminée — contactez-nous pour un devis de dernière minute.
      </p>
    );
  }
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          [timeLeft.days, "Jours"],
          [timeLeft.hours, "Heures"],
          [timeLeft.minutes, "Min"],
          [timeLeft.seconds, "Sec"],
        ].map(([value, label]) => (
          <span
            key={label}
            className="flex min-w-16 flex-col border border-primary/40 bg-background/60 px-3 py-2 text-center"
          >
            <strong className="font-display text-xl tabular-nums text-primary">
              {pad(Number(value))}
            </strong>
            <span className="text-[0.5rem] uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {flashOffer.pitch} Code{" "}
        <strong className="rounded-sm bg-primary px-2 py-0.5 text-primary-foreground">
          {flashOffer.code}
        </strong>
      </p>
    </>
  );
}

/** Parallaxe douce sur l'image du hero. */
function useHeroParallax(root: React.RefObject<HTMLElement | null>) {
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
        gsap.to("[data-parallax]", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: true },
        });
      }, element);
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced, root]);
}

function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  useHeroParallax(root);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
          gsap.from(grid.children, {
            y: 55,
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 82%" },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax-slow]").forEach((figure) => {
          gsap.fromTo(
            figure,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: figure,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      }, element);
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  const selection = products.filter((product) => product.featured).concat(products.slice(10, 11));
  const spotlight = products.filter((product) => product.oldPrice).slice(0, 2);

  return (
    <div ref={root}>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden pt-20">
        <SmartImage
          src={heroImage}
          alt="Amis élégants célébrant le Nouvel An sur un toit à Cotonou"
          width={1920}
          height={1088}
          data-parallax=""
          className="absolute inset-0 h-[112%] w-full"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 hidden opacity-55 lg:block">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <HeroFallback />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-10 px-5 pb-14 pt-32 md:px-8 lg:grid-cols-[1fr_.72fr] lg:pb-20">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-primary">
              Cotonou · Édition réveillon
            </p>
            <h1 className="display-wide max-w-4xl font-display text-5xl leading-[1.03] text-foreground sm:text-7xl lg:text-[6.4rem]">
              <SplitText as="span" className="block" delay={0.15}>
                Fais du 31
              </SplitText>
              <SplitText as="span" className="block italic text-primary" delay={0.3}>
                une nuit
              </SplitText>
              <SplitText as="span" className="block" delay={0.45}>
                inoubliable.
              </SplitText>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-6 max-w-lg text-sm leading-7 text-foreground/80 sm:text-base">
                Décors spectaculaires, tenues choisies et tables prêtes à célébrer. Tout ce qu’il
                faut, livré avant minuit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg" className="h-12 px-7">
                    <Link to="/catalogue">
                      Commander <ArrowRight />
                    </Link>
                  </Button>
                </Magnetic>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 border-foreground/30 bg-background/20 px-7 backdrop-blur"
                >
                  <Link to="/packs">Voir les packs</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="self-end lg:justify-self-end">
            <NewYearCountdown />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card px-5 py-6 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-3">
          {trustBadges.map(({ title, text }) => (
            <TrustBadge key={title} title={title} text={text} />
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">La sélection R31</p>
              <SplitTextOnScroll as="h2" className="section-title" accent="du grand soir">
                Les essentiels du grand soir
              </SplitTextOnScroll>
            </div>
            <Button asChild variant="link" className="hidden shrink-0 sm:inline-flex">
              <Link to="/catalogue">
                Tout voir <ArrowRight />
              </Link>
            </Button>
          </div>
          <div data-stagger className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {selection.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-secondary px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <figure data-parallax-slow="">
            <SmartImage
              src={partyPackImage}
              alt="Table de réveillon noire et or dressée pour une soirée entre amis"
              width={1600}
              height={912}
              className="aspect-[4/3] rounded-sm"
            />
          </figure>
          <Reveal>
            <p className="section-kicker">Packs soirée</p>
            <SplitTextOnScroll as="h2" className="section-title" accent="Vous célébrez.">
              On s’occupe de tout. Vous célébrez.
            </SplitTextOnScroll>
            <div className="mt-10 space-y-3">
              {partyPacks.map((pack) => (
                <div
                  key={pack.name}
                  className="flex items-center justify-between gap-4 border-b border-border py-5"
                >
                  <div>
                    <p className="font-display text-2xl">
                      Pack {pack.name}{" "}
                      {pack.popular && (
                        <span className="ml-2 align-middle text-[0.55rem] uppercase tracking-[0.16em] text-primary">
                          Le plus populaire
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{pack.people}</p>
                  </div>
                  <strong className="shrink-0 text-sm text-primary">
                    {formatPrice(pack.price)}
                  </strong>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8">
              <Link to="/packs">
                Composer ma soirée <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="section-kicker">Offre flash</p>
              <SplitTextOnScroll as="h2" className="section-title" accent="à prix de fête.">
                L’éclat à prix de fête.
              </SplitTextOnScroll>
            </div>
            <Reveal>
              <div className="border-l border-primary pl-6">
                <div className="flex items-center gap-2 text-primary">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.18em]">{flashOffer.label}</span>
                </div>
                <FlashTimer />
              </div>
            </Reveal>
          </div>

          <div data-stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {spotlight.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="section-kicker">Ils ont célébré avec nous</p>
            <SplitTextOnScroll as="h2" className="section-title" accent="qui brillent encore.">
              Des souvenirs qui brillent encore.
            </SplitTextOnScroll>
            <p className="mt-6 text-sm text-muted-foreground">
              <BadgeCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
              {new Intl.NumberFormat("fr-FR").format(socialProof.orders)} commandes de démonstration
              · {socialProof.rating}/5 sur {socialProof.reviewCount} avis
            </p>
          </div>
          <div data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote
                key={review.name}
                className="flex h-full flex-col border border-border p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm">{review.name}</p>
                    <p className="text-[0.7rem] text-muted-foreground">{review.city}</p>
                  </div>
                </div>
                <div
                  className="mt-4 flex gap-0.5 text-primary"
                  aria-label={`${review.rating} sur 5`}
                >
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <Quote className="mb-4 mt-6 text-primary" aria-hidden="true" />
                <p className="font-display text-xl leading-8">« {review.quote} »</p>
                <footer className="mt-auto pt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Avis de démonstration
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Galerie</p>
              <SplitTextOnScroll as="h2" className="section-title">
                La soirée en images
              </SplitTextOnScroll>
            </div>
          </div>
          <div
            data-stagger
            className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4"
          >
            {gallery.map((item, index) => (
              <figure
                key={item.src}
                className={`group relative overflow-hidden rounded-sm ${
                  index === 0 || index === 5
                    ? "col-span-2 row-span-2"
                    : item.tall
                      ? "row-span-2"
                      : ""
                }`}
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  style={{ objectPosition: item.position }}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-[0.7rem] text-foreground/90">
                  {item.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[.7fr_1fr]">
          <div>
            <p className="section-kicker">Questions fréquentes</p>
            <SplitTextOnScroll as="h2" className="section-title" accent="faire la fête.">
              Avant de faire la fête.
            </SplitTextOnScroll>
            <Button asChild variant="outline" className="mt-8">
              <a href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Poser une question
              </a>
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-6 text-base">{item.question}</AccordionTrigger>
                <AccordionContent className="max-w-xl leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <figure className="relative overflow-hidden rounded-sm">
              <SmartImage
                src={partyPackImage}
                alt="Buffet doré et décor noir pour le réveillon"
                width={1600}
                height={912}
                className="aspect-[16/9] w-full"
              />
              <figcaption className="absolute inset-0 flex flex-col items-start justify-center gap-5 bg-background/60 p-8 md:p-14">
                <p className="section-kicker">Prêt à célébrer ?</p>
                <h2 className="display-wide max-w-xl font-display text-4xl sm:text-5xl">
                  Votre 31 commence par un clic.
                </h2>
                <Magnetic>
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link to="/catalogue">
                      Découvrir la sélection <ArrowRight />
                    </Link>
                  </Button>
                </Magnetic>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function TrustBadge({ title, text }: { title: string; text: string }) {
  const icons: Record<string, ComponentType<{ className?: string }>> = {
    "Livraison rapide": Truck,
    "Paiement démo": ShieldCheck,
    "Satisfait ou remboursé": RotateCcw,
  };
  const Icon = icons[title] ?? BadgeCheck;
  return (
    <div className="flex items-center gap-4">
      <Icon className="shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

/**
 * Repli 2D pour les écrans tactiles : une nappe de confettis or et violet en
 * absolu, animée par CSS. Évite de lancer WebGL sur mobile tout en gardant
 * l'ambiance festive du hero.
 */
function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      {Array.from({ length: 28 }, (_, index) => (
        <span
          key={index}
          className="hero-spark"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 53) % 100}%`,
            animationDelay: `${(index % 7) * 0.6}s`,
            animationDuration: `${5 + (index % 5) * 1.1}s`,
            opacity: 0.25 + (index % 4) * 0.15,
          }}
        />
      ))}
    </div>
  );
}

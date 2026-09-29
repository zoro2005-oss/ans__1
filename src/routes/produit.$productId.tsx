import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, ChevronRight, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/SmartImage";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Motion";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, getProduct, products } from "@/data/products";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";

export const Route = createFileRoute("/produit/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Réveillon 31` : "Produit introuvable" },
      {
        name: "description",
        content: loaderData?.description ?? "Ce produit n’est pas disponible.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.name} — Réveillon 31` : "Produit introuvable",
      },
      {
        property: "og:description",
        content: loaderData?.description ?? "Ce produit n’est pas disponible.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="page-shell px-5 text-center">
      <h1 className="font-display text-5xl">Produit introuvable</h1>
      <p className="mt-4 text-muted-foreground">Cette référence n’est plus au catalogue.</p>
      <Button asChild className="mt-6">
        <Link to="/catalogue">Retour au catalogue</Link>
      </Button>
    </div>
  ),
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  useEffect(() => {
    if (reduced) return;
    const element = root.current;
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const context = gsap.context(() => {
        gsap.from("[data-product-media]", {
          scale: 1.08,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
        gsap.from("[data-product-item]", {
          y: 26,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.15,
          ease: "power3.out",
        });
      }, element);
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced, product.id]);

  const saving = product.oldPrice ? product.oldPrice - product.price : 0;
  const savingRate = product.oldPrice ? Math.round((saving / product.oldPrice) * 100) : 0;

  return (
    <div className="page-shell" ref={root}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <nav
          aria-label="Fil d'Ariane"
          className="mb-10 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link to="/catalogue" className="transition-colors hover:text-primary">
            Catalogue
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span aria-current="page" className="text-foreground">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div data-product-media className="relative">
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 border border-primary bg-background/85 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-primary backdrop-blur">
                {product.badge}
              </span>
            )}
            <SmartImage
              src={product.image}
              alt={product.imageAlt}
              width={1024}
              height={1024}
              style={{ objectPosition: product.imagePosition }}
              className="aspect-square rounded-sm"
            />
          </div>

          <div>
            <p data-product-item className="section-kicker">
              {product.category}
            </p>
            <h1
              data-product-item
              className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              {product.name}
            </h1>

            <div data-product-item className="mt-6 flex flex-wrap items-baseline gap-3">
              <strong className="font-display text-3xl text-primary">
                {formatPrice(product.price)}
              </strong>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="border border-primary/50 px-2 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                    Économisez {savingRate} %
                  </span>
                </>
              )}
            </div>

            <p
              data-product-item
              className="mt-8 max-w-lg text-base leading-8 text-muted-foreground"
            >
              {product.description}
            </p>

            <ul data-product-item className="mt-8 space-y-3 border-y border-border py-6">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>

            <div data-product-item className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus />
                </Button>
                <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <Magnetic className="flex-1">
                <Button
                  className="h-12 w-full"
                  onClick={(event) =>
                    addItem(product, quantity, { x: event.clientX, y: event.clientY })
                  }
                >
                  Ajouter au panier — {formatPrice(product.price * quantity)}
                </Button>
              </Magnetic>
            </div>

            <div
              data-product-item
              className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground"
            >
              <span className="flex flex-col items-center gap-2">
                <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                Livraison rapide
              </span>
              <span className="flex flex-col items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                Paiement démo
              </span>
              <span className="flex flex-col items-center gap-2">
                <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
                Retour facile
              </span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-28 border-t border-border pt-16">
            <h2 className="section-title mb-12">Dans la même catégorie</h2>
            <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        <Reveal>
          <div className="mt-20 flex justify-center">
            <Button asChild variant="link">
              <Link to="/catalogue">
                <ArrowLeft aria-hidden="true" /> Revenir au catalogue
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

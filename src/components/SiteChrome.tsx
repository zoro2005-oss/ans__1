import { Link, useRouterState } from "@tanstack/react-router";
import {
  House,
  LayoutGrid,
  MessageCircle,
  Minus,
  PartyPopper,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { SmartImage } from "@/components/SmartImage";
import { formatPrice } from "@/data/products";
import { contactDetails, socialProof } from "@/data/site";
import { loadGsap, usePrefersReducedMotion } from "@/lib/animation";

const NAV = [
  ["/catalogue", "La sélection"],
  ["/packs", "Packs soirée"],
  ["/contact", "Contact"],
] as const;

const BOTTOM_NAV: { to: string; label: string; Icon: LucideIcon }[] = [
  { to: "/", label: "Accueil", Icon: House },
  { to: "/catalogue", label: "Catalogue", Icon: LayoutGrid },
  { to: "/packs", label: "Packs", Icon: PartyPopper },
  { to: "/panier", label: "Panier", Icon: ShoppingBag },
  { to: "/contact", label: "Contact", Icon: MessageCircle },
];

export function Header() {
  const { count, setOpen } = useCart();
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = document.querySelector("[data-header]");
    if (!element) return;

    let revert = () => {};
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !element) return;
      const context = gsap.context(() => {
        gsap.from(element, { yPercent: -100, duration: 0.8, ease: "power3.out" });
      });
      revert = () => context.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [currentPath, reduced]);

  return (
    <header
      data-header
      className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl"
    >
      {/* La largeur utile et les gouttieres se resserrent a mesure que l'ecran
          rapetisse, jusqu'a ce qu'il ne reste que le monogramme. */}
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:gap-5 sm:px-6 md:gap-6 md:px-8 lg:h-20 lg:gap-8">
        <Link to="/" className="flex items-baseline gap-2" aria-label="Réveillon 31, accueil">
          <span className="font-display text-2xl text-primary">R31</span>
          <span className="hidden text-[0.58rem] uppercase tracking-[0.25em] text-muted-foreground lg:inline">
            Réveillon
          </span>
        </Link>

        <nav
          className="hidden items-center gap-4 md:flex md:gap-4 lg:gap-8"
          aria-label="Navigation principale"
        >
          {NAV.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary md:text-xs md:tracking-[0.14em] lg:tracking-[0.16em]"
              activeProps={{ className: "text-primary" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden md:inline-flex"
            aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
            onClick={() => setOpen(true)}
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

/**
 * Barre de navigation inferieure, reservee aux ecrans etroits. Elle prend le
 * relais de la navigation haute : celle-ci n'affiche plus que le monogramme et
 * le bouton de theme. Le panier mene directement a la page complete plutot
 * qu'au mini-tiroir lateral, reserves a l'ecran large.
 */
export function BottomNav() {
  const { count } = useCart();

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
        {BOTTOM_NAV.map(({ to, label, Icon }) => {
          const isCart = to === "/panier";
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-label={isCart ? `Panier, ${count} article${count > 1 ? "s" : ""}` : undefined}
                className="relative flex w-full flex-col items-center gap-1 px-1 py-2.5 text-muted-foreground transition-colors"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: to === "/" }}
              >
                <span className="relative">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                  {isCart && count > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] leading-none font-bold text-primary-foreground">
                      {count}
                    </span>
                  )}
                </span>
                <span className="text-[0.58rem] tracking-[0.08em] uppercase">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CartDrawer() {
  const { items, isOpen, setOpen, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-border bg-background sm:max-w-md">
        <SheetTitle className="font-display text-3xl">Votre panier</SheetTitle>
        <SheetDescription>
          {items.length
            ? `${items.length} sélection${items.length > 1 ? "s" : ""} pour le grand soir.`
            : "Votre soirée commence ici."}
        </SheetDescription>

        <div className="mt-8 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-1">
          {items.length === 0 && (
            <div className="border-y border-border py-12 text-center text-sm text-muted-foreground">
              Votre panier est vide.
            </div>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-border pb-5">
              <Link
                to="/produit/$productId"
                params={{ productId: item.id }}
                onClick={() => setOpen(false)}
              >
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt}
                  width={90}
                  height={90}
                  className="h-24 w-20 shrink-0 rounded-sm"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg">{item.name}</p>
                <p className="mt-1 text-xs text-primary">{formatPrice(item.price)}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    aria-label={`Diminuer la quantité de ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-xs tabular-nums">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    aria-label={`Augmenter la quantité de ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-7 w-7 text-muted-foreground"
                    aria-label={`Supprimer ${item.name} du panier`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t border-border pt-5">
            <div className="mb-4 flex items-baseline justify-between text-sm">
              <span>Sous-total</span>
              <strong className="tabular-nums">{formatPrice(subtotal)}</strong>
            </div>
            <Button asChild className="h-12 w-full" onClick={() => setOpen(false)}>
              <Link to="/panier">Voir le panier</Link>
            </Button>
            <p className="mt-3 text-center text-[0.65rem] text-muted-foreground">
              Livraison offerte · paiement simulé
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-5 pb-8 pt-16 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl text-primary">R31</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            La sélection qui transforme votre réveillon à Cotonou et environs, du premier éclat au
            dernier toast.
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary" aria-hidden="true">
              ★
            </span>
            {socialProof.rating}/5 · {socialProof.reviewCount} avis de démonstration
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary">Explorer</p>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">
              Accueil
            </Link>
            <Link to="/catalogue" className="transition-colors hover:text-primary">
              Catalogue
            </Link>
            <Link to="/packs" className="transition-colors hover:text-primary">
              Packs soirée
            </Link>
            <Link to="/panier" className="transition-colors hover:text-primary">
              Panier
            </Link>
            <Link to="/contact" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary">Service</p>
          <p className="text-sm leading-7 text-muted-foreground">
            Lun–Sam · 8h–20h
            <br />
            {contactDetails.city}
            <br />
            <a
              className="transition-colors hover:text-primary"
              href={`https://wa.me/${contactDetails.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              {contactDetails.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col gap-3 border-t border-border pt-6 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Réveillon 31 — vitrine de démonstration</span>
        <span className="text-primary">Mode démo : aucun paiement réel</span>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const { items, subtotal } = useCart();

  const message = items.length
    ? `Bonjour R31, voici ma sélection : ${items
        .map((item) => `${item.quantity}× ${item.name}`)
        .join(", ")} — Total ${formatPrice(subtotal)}.`
    : "Bonjour R31, je souhaite préparer mon réveillon.";

  return (
    <a
      href={`https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(message.slice(0, 600))}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="whatsapp-fab fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-2xl transition-transform hover:scale-105 sm:right-5 md:right-5 md:bottom-5"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        focusable="false"
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2m0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.24 8.2" />
      </svg>
    </a>
  );
}

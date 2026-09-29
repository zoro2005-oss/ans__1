import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmartImage } from "@/components/SmartImage";
import { Magnetic } from "@/components/Magnetic";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/data/products";
import { flashOffer } from "@/data/site";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Votre panier — Réveillon 31" },
      {
        name: "description",
        content: "Vérifiez votre sélection du réveillon et appliquez votre code promotionnel.",
      },
      { property: "og:title", content: "Votre panier — Réveillon 31" },
      { property: "og:description", content: "Votre sélection pour le grand soir." },
      { property: "og:image", content: "/images/og-image.webp" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  const discount = applied ? Math.round(subtotal * flashOffer.rate) : 0;
  const total = subtotal - discount;

  const applyPromo = () => {
    const valid = promo.trim().toUpperCase() === flashOffer.code;
    setApplied(valid);
    setMessage(
      valid
        ? `Remise de ${Math.round(flashOffer.rate * 100)} % appliquée.`
        : "Ce code n’est pas reconnu.",
    );
  };

  if (!items.length) {
    return (
      <div className="page-shell">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <p className="section-kicker">Votre sélection</p>
          <h1 className="section-title">Presque prêt pour minuit.</h1>
          <div className="mt-12 border-y border-border py-24 text-center">
            <p className="text-muted-foreground">Votre panier est encore vide.</p>
            <Button asChild className="mt-6">
              <Link to="/catalogue">Découvrir la sélection</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <p className="section-kicker">Votre sélection</p>
        <h1 className="section-title">Presque prêt pour minuit.</h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[90px_1fr] gap-5 border-b border-border pb-5 sm:grid-cols-[120px_1fr_auto]"
              >
                <Link to="/produit/$productId" params={{ productId: item.id }}>
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    width={120}
                    height={120}
                    className="aspect-square rounded-sm"
                  />
                </Link>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.category}
                  </p>
                  <h2 className="mt-1 font-display text-2xl">
                    <Link to="/produit/$productId" params={{ productId: item.id }}>
                      {item.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-primary">{formatPrice(item.price)}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Diminuer la quantité de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Augmenter la quantité de ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <div className="col-start-2 flex items-center justify-between sm:col-start-3 sm:flex-col sm:items-end">
                  <strong className="tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Supprimer ${item.name} du panier`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Récapitulatif</h2>

            <div className="mt-6 flex gap-2">
              <Input
                value={promo}
                maxLength={24}
                aria-label="Code promotionnel"
                onChange={(event) => setPromo(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") applyPromo();
                }}
                placeholder="Code promo"
              />
              <Button variant="outline" onClick={applyPromo}>
                Appliquer
              </Button>
            </div>
            {message && (
              <p
                role="status"
                className={`mt-2 flex items-center gap-2 text-xs ${applied ? "text-success" : "text-destructive"}`}
              >
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                {message}
              </p>
            )}

            <div className="mt-7 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {applied && (
                <div className="flex justify-between text-primary">
                  <span>Remise {flashOffer.code}</span>
                  <span className="tabular-nums">− {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>Offerte</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4 text-lg">
                <strong>Total</strong>
                <strong className="font-display text-2xl text-primary tabular-nums">
                  {formatPrice(total)}
                </strong>
              </div>
            </div>

            <Magnetic className="mt-7 w-full">
              <Button asChild className="h-12 w-full">
                <Link to="/paiement" search={{ promo: applied ? flashOffer.code : undefined }}>
                  Continuer vers le paiement
                </Link>
              </Button>
            </Magnetic>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-[0.65rem] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Paiement entièrement simulé, aucun débit réel.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

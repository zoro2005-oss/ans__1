import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/SmartImage";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card group relative min-w-0">
      {product.badge && (
        <span className="badge-sale border border-primary bg-background/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.16em] text-primary backdrop-blur">
          {product.badge}
        </span>
      )}

      <Link
        to="/produit/$productId"
        params={{ productId: product.id }}
        className="block overflow-hidden rounded-sm bg-card"
      >
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          width={1024}
          height={1024}
          style={{ objectPosition: product.imagePosition }}
          className="aspect-square transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="mb-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            {product.category}
          </p>
          <Link
            to="/produit/$productId"
            params={{ productId: product.id }}
            className="font-display text-xl leading-tight text-foreground transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <strong className="text-primary">{formatPrice(product.price)}</strong>
            {product.oldPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
        <Button
          size="icon"
          aria-label={`Ajouter ${product.name} au panier`}
          className="h-11 w-11 shrink-0 rounded-full"
          onClick={(event) => addItem(product, 1, { x: event.clientX, y: event.clientY })}
        >
          <Plus />
        </Button>
      </div>
    </article>
  );
}

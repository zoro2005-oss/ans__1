import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/data/products";

type Sort = "featured" | "low" | "high";

const sortLabels: Record<Sort, string> = {
  featured: "Sélection",
  low: "Prix croissant",
  high: "Prix décroissant",
};

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue — Réveillon 31" },
      {
        name: "description",
        content:
          "Explorez notre sélection Nouvel An : décoration, tenues, cadeaux, table et étincelles.",
      },
      { property: "og:title", content: "Catalogue — Réveillon 31" },
      {
        property: "og:description",
        content: "Tout pour composer une nuit inoubliable à Cotonou.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const [category, setCategory] = useState<Category>("Tout");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const query = search.toLowerCase().trim();
    const result = products.filter(
      (product) =>
        (category === "Tout" || product.category === category) &&
        (product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)),
    );

    return [...result].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
    );
  }, [category, search, sort]);

  const filtersActive = category !== "Tout" || search.trim().length > 0;

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <nav
          aria-label="Fil d'Ariane"
          className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span aria-current="page" className="text-foreground">
            Catalogue
          </span>
        </nav>

        <p className="section-kicker">Tous les essentiels</p>
        <h1 className="section-title">Votre nuit, à votre manière.</h1>

        <div className="mt-12 flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap border px-4 py-2 text-xs transition-colors ${
                  category === item
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Rechercher un produit</span>
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={search}
                maxLength={80}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher"
                className="pl-9"
              />
            </label>
            <label className="relative flex items-center">
              <span className="sr-only">Trier les produits</span>
              <SlidersHorizontal
                className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="h-9 appearance-none border border-input bg-background py-0 pl-9 pr-8 text-xs text-foreground"
              >
                {(Object.keys(sortLabels) as Sort[]).map((key) => (
                  <option key={key} value={key}>
                    {sortLabels[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <p aria-live="polite">
            {visible.length} article{visible.length > 1 ? "s" : ""}
            {category !== "Tout" && ` en ${category}`}
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                setCategory("Tout");
                setSearch("");
              }}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Réinitialiser
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!visible.length && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">Aucun article ne correspond.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Essayez un autre mot-clé ou repartez de toute la sélection.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("Tout");
                setSearch("");
              }}
              className="mt-6 border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Voir les {products.length} articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

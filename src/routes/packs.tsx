import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/SmartImage";
import { Magnetic } from "@/components/Magnetic";
import { Reveal, SplitTextOnScroll } from "@/components/Motion";
import { formatPrice, partyPacks } from "@/data/products";
import partyPackImage from "@/assets/party-pack.jpg";
import { contactDetails, trustBadges } from "@/data/site";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs soirée — Réveillon 31" },
      { name: "description", content: "Choisissez votre pack de fête Famille, Amis ou VIP." },
      { property: "og:title", content: "Packs soirée — Réveillon 31" },
      {
        property: "og:description",
        content: "Des formules prêtes à célébrer pour chaque nombre d’invités.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PacksPage,
});

function PacksPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="section-kicker">Packs soirée</p>
            <SplitTextOnScroll as="h1" className="section-title" accent="Célébrez.">
              Recevez. Célébrez.
            </SplitTextOnScroll>
            <p className="mt-6 max-w-md leading-8 text-muted-foreground">
              Trois formules prêtes à l’emploi, du souper en famille à la grande soirée. Vous
              choisissez la taille, nous composons le décor, la table et les accessoires.
            </p>
          </div>
          <SmartImage
            src={partyPackImage}
            alt="Table de réveillon noire et or dressée pour une soirée entre amis"
            width={1600}
            height={912}
            className="aspect-[16/9] rounded-sm"
          />
        </div>

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {partyPacks.map((pack) => (
            <article
              key={pack.name}
              className={`relative flex flex-col border p-7 ${
                pack.popular
                  ? "border-primary bg-secondary lg:-translate-y-4"
                  : "border-border bg-card"
              }`}
            >
              {pack.popular && (
                <span className="mb-5 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Le plus populaire
                </span>
              )}
              <p className="font-display text-4xl">Pack {pack.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{pack.people}</p>
              <p className="mt-8 font-display text-3xl text-primary tabular-nums">
                {formatPrice(pack.price)}
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                soit {formatPrice(Math.round(pack.price / 6))} par personne (sur la base de 6)
              </p>
              <ul className="my-8 flex-1 space-y-4">
                {pack.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Magnetic>
                <Button asChild className="w-full" variant={pack.popular ? "default" : "outline"}>
                  <Link to="/contact">Demander ce pack</Link>
                </Button>
              </Magnetic>
            </article>
          ))}
        </div>

        <Reveal>
          <section className="mt-20 border border-border bg-card p-8 md:p-12">
            <h2 className="font-display text-3xl">Tout est compris</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {trustBadges.map((badge) => (
                <div key={badge.title}>
                  <p className="text-sm text-foreground">{badge.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{badge.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-muted-foreground">
              Une question sur la composition ? Écrivez-nous sur WhatsApp au{" "}
              <a
                className="text-primary underline underline-offset-4"
                href={`https://wa.me/${contactDetails.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {contactDetails.phone}
              </a>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/Magnetic";
import { contactDetails } from "@/data/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  phone: z.string().regex(/^[0-9 +()-]{8,20}$/, "Numéro invalide."),
  message: z.string().trim().min(5, "Décrivez votre projet en quelques mots.").max(600),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Réveillon 31" },
      {
        name: "description",
        content: "Contactez Réveillon 31 pour composer votre fête à Cotonou.",
      },
      { property: "og:title", content: "Contact — Réveillon 31" },
      {
        property: "og:description",
        content: "Parlons de votre soirée et composons une sélection sur mesure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [error, setError] = useState("");

  const submit = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Complétez correctement les trois champs.");
      return;
    }

    setError("");
    const { name, phone, message } = result.data;
    const text = encodeURIComponent(
      `Bonjour R31, je suis ${name}. ${message} Téléphone : ${phone}`.slice(0, 800),
    );
    window.open(
      `https://wa.me/${contactDetails.whatsapp}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p className="section-kicker">Parlons de votre soirée</p>
          <h1 className="section-title">Votre réveillon, sur mesure.</h1>
          <p className="mt-6 max-w-md leading-8 text-muted-foreground">
            Une question, un grand nombre d’invités ou une envie particulière ? Écrivez-nous
            directement sur WhatsApp : nous répondons du lundi au samedi.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <p className="flex items-center gap-3">
              <Phone className="shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${contactDetails.phone.replaceAll(" ", "")}`}>{contactDetails.phone}</a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="shrink-0 text-primary" aria-hidden="true" />
              {contactDetails.city}
            </p>
            <p className="flex items-center gap-3">
              <Clock3 className="shrink-0 text-primary" aria-hidden="true" />
              {contactDetails.hours}
            </p>
          </div>

          <Button asChild variant="outline" className="mt-10">
            <a href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Ouvrir la discussion
            </a>
          </Button>
        </div>

        <div className="border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl">Votre message</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Le formulaire prépare le message et l’ouvre dans WhatsApp — rien n’est envoyé à un
            serveur.
          </p>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Nom
              </span>
              <Input
                value={form.name}
                maxLength={100}
                autoComplete="name"
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Téléphone
              </span>
              <Input
                value={form.phone}
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Votre projet
              </span>
              <Textarea
                value={form.message}
                maxLength={600}
                rows={6}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Magnetic className="w-full">
              <Button className="w-full" onClick={submit}>
                <MessageCircle aria-hidden="true" /> Continuer sur WhatsApp
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

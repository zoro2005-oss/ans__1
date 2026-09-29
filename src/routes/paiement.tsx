import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CreditCard,
  LoaderCircle,
  Lock,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/data/products";
import { flashOffer } from "@/data/site";
import { celebrateOrder } from "@/lib/confetti";
import { paymentMethods, processPayment, type PaymentMethod } from "@/lib/payment";

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  phone: z.string().regex(/^[0-9 +()-]{8,20}$/, "Indiquez un numéro valide."),
  address: z.string().trim().min(5, "Précisez votre adresse.").max(240),
});

const mobileSchema = z.object({
  number: z.string().regex(/^[0-9 ]{8,20}$/, "Indiquez un numéro valide."),
});

const cardSchema = z.object({
  number: z.string().regex(/^(?:\d{4} ){3}\d{4}$|^\d{12,19}$/, "Numéro de carte invalide."),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Format MM/AA attendu."),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV invalide."),
});

type Stage = "details" | "payment" | "processing" | "success" | "failure";
type ReceiptLine = { id: string; name: string; quantity: number; price: number };
/** Instantané figé au moment de la confirmation : le panier est vidé juste après. */
type Order = {
  orderNumber: string;
  transactionId: string;
  method: PaymentMethod;
  lines: ReceiptLine[];
  subtotal: number;
  discount: number;
  total: number;
};

export const Route = createFileRoute("/paiement")({
  validateSearch: (search: Record<string, unknown>) => ({
    promo: search["promo"] === flashOffer.code ? flashOffer.code : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Paiement démo — Réveillon 31" },
      {
        name: "description",
        content: "Finalisez votre commande de démonstration en deux étapes simples.",
      },
      { property: "og:title", content: "Paiement démo — Réveillon 31" },
      { property: "og:description", content: "Un parcours réaliste sans aucun débit réel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block text-[0.7rem] text-muted-foreground">{hint}</span>}
    </label>
  );
}

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { promo } = Route.useSearch();

  const [stage, setStage] = useState<Stage>("details");
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const [method, setMethod] = useState<PaymentMethod>("mtn");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [failure, setFailure] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const total = Math.round(subtotal * (1 - (promo ? flashOffer.rate : 0)));
  const discount = subtotal - total;

  useEffect(() => {
    if (stage !== "success") return;
    celebrateOrder();
    successRef.current?.focus();
  }, [stage]);

  const submitDetails = () => {
    const result = detailsSchema.safeParse(details);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Vérifiez vos informations.");
      return;
    }
    setError("");
    setStage("payment");
  };

  const submitPayment = async () => {
    const instrument =
      method === "card"
        ? cardSchema.safeParse(card)
        : mobileSchema.safeParse({ number: mobileNumber });

    if (!instrument.success) {
      setError(instrument.error.issues[0]?.message ?? "Vérifiez les informations saisies.");
      return;
    }

    setError("");
    setStage("processing");

    const result = await processPayment({
      amount: total,
      method,
      instrument: method === "card" ? card.number.replaceAll(" ", "") : mobileNumber,
    });

    if (!result.success) {
      setFailure(result.reason);
      setStage("failure");
      return;
    }

    setOrder({
      orderNumber: result.orderNumber,
      transactionId: result.transactionId,
      method,
      lines: items.map(({ id, name, quantity, price }) => ({ id, name, quantity, price })),
      subtotal,
      discount,
      total,
    });
    clearCart();
    setStage("success");
  };

  const downloadReceipt = () => {
    if (!order) return;
    const lines = [
      "REVEILLON 31 — REÇU DE DÉMONSTRATION",
      `Commande    : ${order.orderNumber}`,
      `Transaction : ${order.transactionId}`,
      `Client     : ${details.name}`,
      `Téléphone   : ${details.phone}`,
      `Adresse    : ${details.address}`,
      `Paiement    : ${paymentMethods.find((item) => item.id === order.method)?.label ?? order.method}`,
      "",
      ...order.lines.map(
        (item) => `${item.quantity} x ${item.name} — ${formatPrice(item.price * item.quantity)}`,
      ),
      "",
      `Sous-total : ${formatPrice(order.subtotal)}`,
    ];
    if (order.discount > 0) {
      lines.push(`Remise ${flashOffer.code} : - ${formatPrice(order.discount)}`);
    }
    lines.push(
      `TOTAL      : ${formatPrice(order.total)}`,
      "",
      "Aucun paiement réel n'a été effectué.",
    );

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `recu-${order.orderNumber}.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (stage === "success" && order) {
    return (
      <div className="page-shell px-5">
        <div
          ref={successRef}
          tabIndex={-1}
          className="mx-auto max-w-xl text-center focus:outline-none"
        >
          <div className="success-mark mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="h-12 w-12" />
          </div>
          <p className="section-kicker mt-10">Commande confirmée</p>
          <h1 className="font-display text-5xl sm:text-6xl">La fête peut commencer.</h1>
          <p className="mt-6 leading-8 text-muted-foreground">
            Votre commande de démonstration{" "}
            <strong className="text-foreground">{order.orderNumber}</strong> a bien été enregistrée.
            Aucun paiement réel n’a été effectué.
          </p>

          <div className="mt-10 border border-border bg-card p-6 text-left">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-muted-foreground">Total réglé (démo)</span>
              <strong className="font-display text-2xl text-primary">
                {formatPrice(order.total)}
              </strong>
            </div>
            {order.discount > 0 && (
              <div className="mt-2 flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Remise {flashOffer.code}</span>
                <span className="text-primary">− {formatPrice(order.discount)}</span>
              </div>
            )}
            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
              {order.lines.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {item.quantity}× {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.7rem] text-muted-foreground">
              {paymentMethods.find((item) => item.id === order.method)?.label} · transaction{" "}
              {order.transactionId}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={downloadReceipt}>Télécharger le reçu</Button>
            <Button asChild variant="outline">
              <Link to="/">Retour à l’accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="page-shell px-5 text-center">
        <h1 className="font-display text-5xl">Votre panier est vide.</h1>
        <Button asChild className="mt-6">
          <Link to="/catalogue">Voir le catalogue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="mb-8 flex items-center justify-between gap-4 border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary">
          <span className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Mode démo : aucun paiement réel
          </span>
          <span>Étape {stage === "details" ? 1 : 2}/2</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <section>
            {stage === "details" && (
              <>
                <p className="section-kicker">Finaliser</p>
                <h1 className="font-display text-5xl">Où livrer la fête ?</h1>
                <div className="mt-9 space-y-5">
                  <Field label="Nom complet">
                    <Input
                      maxLength={100}
                      autoComplete="name"
                      value={details.name}
                      onChange={(event) => setDetails({ ...details, name: event.target.value })}
                    />
                  </Field>
                  <Field label="Téléphone">
                    <Input
                      maxLength={20}
                      inputMode="tel"
                      autoComplete="tel"
                      value={details.phone}
                      onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                    />
                  </Field>
                  <Field label="Adresse de livraison" hint="Quartier, repère, point de livraison.">
                    <Input
                      maxLength={240}
                      autoComplete="street-address"
                      value={details.address}
                      onChange={(event) => setDetails({ ...details, address: event.target.value })}
                    />
                  </Field>
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <Button className="h-12 w-full sm:w-auto" onClick={submitDetails}>
                    Continuer vers le paiement
                  </Button>
                </div>
              </>
            )}

            {stage === "payment" && (
              <>
                <p className="section-kicker">Paiement</p>
                <h1 className="font-display text-5xl">Comment souhaitez-vous payer ?</h1>

                <div className="mt-9 grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={method === item.id}
                      onClick={() => {
                        setMethod(item.id);
                        setError("");
                      }}
                      className={`flex min-h-24 items-start gap-3 border p-4 text-left transition-colors ${
                        method === item.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {item.id === "card" ? (
                        <CreditCard className="mt-0.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Smartphone className="mt-0.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        <span className="block text-sm">{item.label}</span>
                        <span className="mt-1 block text-[0.7rem] text-muted-foreground">
                          {item.hint}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  {method === "card" ? (
                    <div className="space-y-5">
                      <Field label="Numéro de carte démo" hint="Utilisez 4242 4242 4242 4242.">
                        <Input
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength={23}
                          placeholder="4242 4242 4242 4242"
                          value={card.number}
                          onChange={(event) => setCard({ ...card, number: event.target.value })}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-5">
                        <Field label="Expiration">
                          <Input
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            maxLength={5}
                            placeholder="12/29"
                            value={card.expiry}
                            onChange={(event) => setCard({ ...card, expiry: event.target.value })}
                          />
                        </Field>
                        <Field label="CVV">
                          <Input
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            maxLength={4}
                            placeholder="123"
                            value={card.cvv}
                            onChange={(event) => setCard({ ...card, cvv: event.target.value })}
                          />
                        </Field>
                      </div>
                    </div>
                  ) : (
                    <Field
                      label="Numéro Mobile Money"
                      hint="Le même numéro que celui indiqué pour la livraison."
                    >
                      <Input
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={20}
                        value={mobileNumber}
                        onChange={(event) => setMobileNumber(event.target.value)}
                        placeholder="01 XX XX XX XX"
                      />
                    </Field>
                  )}
                </div>

                {error && (
                  <p role="alert" className="mt-4 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <div className="mt-8 flex gap-3">
                  <Button variant="outline" onClick={() => setStage("details")}>
                    <ArrowLeft aria-hidden="true" /> Retour
                  </Button>
                  <Button className="flex-1" onClick={submitPayment}>
                    Simuler {formatPrice(total)}
                  </Button>
                </div>
              </>
            )}

            {stage === "processing" && (
              <div className="py-16 text-center">
                <LoaderCircle
                  className="mx-auto h-12 w-12 animate-spin text-primary"
                  aria-hidden="true"
                />
                <h1 className="mt-8 font-display text-4xl">Validez sur votre téléphone…</h1>
                <p className="mx-auto mt-4 max-w-sm leading-8 text-muted-foreground">
                  {method === "card"
                    ? "Votre banque autorise la transaction de démonstration…"
                    : "Ouvrez votre application Mobile Money et validez la demande de paiement."}
                </p>
                <p className="mt-6 text-[0.7rem] text-muted-foreground">
                  Ne fermez pas cette page.
                </p>
              </div>
            )}

            {stage === "failure" && (
              <div className="py-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-destructive">
                  <TriangleAlert className="h-8 w-8" aria-hidden="true" />
                </div>
                <h1 className="mt-8 font-display text-4xl">Paiement non abouti</h1>
                <p role="alert" className="mt-4 max-w-md leading-8 text-muted-foreground">
                  {failure}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Aucun montant n’a été débité. Vous pouvez réessayer.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={submitPayment}>Réessayer</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFailure("");
                      setStage("payment");
                    }}
                  >
                    Changer de moyen de paiement
                  </Button>
                </div>
              </div>
            )}
          </section>

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Votre soirée</h2>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}× {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            {discount > 0 && (
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Remise {flashOffer.code}</span>
                <span className="text-primary">− {formatPrice(discount)}</span>
              </div>
            )}
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <strong>Total</strong>
              <strong className="font-display text-2xl text-primary">{formatPrice(total)}</strong>
            </div>
            <p className="mt-5 text-[0.68rem] leading-5 text-muted-foreground">
              Montant indicatif. Aucun débit réel, aucune donnée transmise.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

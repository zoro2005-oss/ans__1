export type PaymentMethod = "mtn" | "moov" | "celtiis" | "card";

export const paymentMethods: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: "mtn", label: "MTN Mobile Money", hint: "Validation sur votre téléphone" },
  { id: "moov", label: "Moov Money", hint: "Validation sur votre téléphone" },
  { id: "celtiis", label: "Celtiis Cash", hint: "Validation sur votre téléphone" },
  { id: "card", label: "Carte bancaire", hint: "Démonstration, aucune donnée transmise" },
];

export type PaymentRequest = {
  amount: number;
  method: PaymentMethod;
  /** Numéro Mobile Money ou carte saisi, déjà validé. */
  instrument?: string;
};

export type PaymentResult =
  | {
      success: true;
      orderNumber: string;
      transactionId: string;
      method: PaymentMethod;
      amount: number;
    }
  | { success: false; reason: string; retryable: boolean };

/** Délai de « traitement » du opérateur, en ms. */
const PROCESSING_MS = 3400;

/** Part des transactions volontairement refusées, pour que la démo soit réaliste. */
const FAILURE_RATE = 0.1;

const FAILURE_REASONS = [
  "Solde insuffisant sur le compte de démonstration.",
  "Demande refusée par l’opérateur mobile money.",
  "Code de confirmation incorrect saisi sur le téléphone.",
  "Connexion réseau interrompue pendant la validation.",
];

/**
 * Point de branchement du paiement.
 *
 * Cette fonction est la seule à remplacer le jour où l'on passe en production :
 * elle reçoit le montant, le moyen et l'instrument, et renvoie un résultat
 * discriminated union. Le reste du tunnel ne fait qu'afficher `success`.
 *
 * Aucune transaction réelle n'est émise : la réponse est un `setTimeout` assorti
 * d'un taux d'échec de 10 %.
 */
export async function processPayment({ amount, method }: PaymentRequest): Promise<PaymentResult> {
  await new Promise((resolve) => window.setTimeout(resolve, PROCESSING_MS));

  if (Math.random() < FAILURE_RATE) {
    return {
      success: false,
      reason:
        FAILURE_REASONS[Math.floor(Math.random() * FAILURE_REASONS.length)] ?? "Paiement refusé.",
      retryable: true,
    };
  }

  return {
    success: true,
    orderNumber: `R31-${Math.floor(100000 + Math.random() * 900000)}`,
    transactionId: `TX-${Date.now().toString(36).toUpperCase()}`,
    method,
    amount,
  };
}

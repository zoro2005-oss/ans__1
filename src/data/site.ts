/** Contenus éditoriaux du site — textes et médias hors catalogue produits. */

/** Réassurance affichée sous le hero. */
export const trustBadges = [
  { title: "Livraison rapide", text: "Cotonou & environs" },
  { title: "Paiement démo", text: "Aucun débit réel" },
  { title: "Satisfait ou remboursé", text: "Conditions transparentes" },
] as const;

/**
 * Offre flash : la remise est valable jusqu'au 15 décembre de l'année courante.
 * Résolue à la volée pour que le compte à rebours reste juste d'une année sur l'autre.
 */
export function flashOfferDeadline(reference = new Date()) {
  return new Date(reference.getFullYear(), 11, 15, 23, 59, 59);
}

export const flashOffer = {
  code: "NOUVELAN",
  /** Remise appliquée au panier puis reportée sur le paiement. */
  rate: 0.1,
  /** « Jusqu'au 15 décembre » */
  label: "Jusqu'au 15 décembre",
  pitch:
    "Profitez de 10 % avec le code NOUVELAN. Livraison garantie avant le 31 pour toute commande confirmée avant la date limite.",
} as const;

export type Review = {
  name: string;
  city: string;
  quote: string;
  avatar: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "Afi D.",
    city: "Cotonou",
    quote: "Tout était magnifique et livré à temps. Notre salon était méconnaissable.",
    avatar: "/images/avis-afi-d.webp",
    rating: 5,
  },
  {
    name: "Marius K.",
    city: "Abomey-Calavi",
    quote: "Le pack Amis nous a évité tout le stress. Une vraie belle surprise.",
    avatar: "/images/avis-marius-k.webp",
    rating: 5,
  },
  {
    name: "Nadia S.",
    city: "Porto-Novo",
    quote: "La sélection est chic, les détails soignés et le service très réactif.",
    avatar: "/images/avis-nadia-s.webp",
    rating: 5,
  },
];

/** Preuve sociale — chiffres de démonstration, signalés comme tels dans l'interface. */
export const socialProof = {
  orders: 1200,
  rating: 4.9,
  reviewCount: 187,
} as const;

export type GalleryItem = {
  src: string;
  alt: string;
  /** `tall` occupe deux lignes dans la grille. */
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/galerie-1.webp",
    alt: "Amis qui trinquent à minuit dans un salon décoré noir et or",
  },
  {
    src: "/images/galerie-2.webp",
    alt: "Coin buffet doré où les invités se servent eux-mêmes",
  },
  {
    src: "/images/galerie-3.webp",
    alt: "Cadeau ouvert sous des guirlandes lumineuses",
    tall: true,
  },
  {
    src: "/images/galerie-4.webp",
    alt: "Couple dansant dans un salon éclairé par une boule à facettes",
  },
  {
    src: "/images/galerie-5.webp",
    alt: "Gorge à sequins renvoyant des reflets violets et dorés",
  },
  {
    src: "/images/galerie-6.webp",
    alt: "Verres vides et confettis sur une table noire au lendemain du réveillon",
  },
];

export type Faq = { question: string; answer: string };

export const faq: Faq[] = [
  {
    question: "Livrez-vous partout au Bénin ?",
    answer:
      "Cette vitrine présente une livraison à Cotonou et dans les environs. Les autres destinations sont confirmées au cas par cas via WhatsApp.",
  },
  {
    question: "Le paiement est-il réel ?",
    answer:
      "Non. Tout le parcours est une démonstration : aucun compte n’est débité et aucune donnée bancaire n’est transmise. Le parcours reproduit l’expérience d’un paiement Mobile Money pour vous permettre de tester le tunnel de conversion.",
  },
  {
    question: "Puis-je modifier mon pack ?",
    answer:
      "Oui, contactez-nous via WhatsApp pour composer une sélection adaptée à votre nombre d’invités et à votre budget.",
  },
  {
    question: "Comment fonctionne le code NOUVELAN ?",
    answer:
      "Saisissez-le dans le panier pour appliquer une remise de démonstration de 10 % sur l’ensemble de votre sélection.",
  },
  {
    question: "Quand ma commande sera-t-elle livrée ?",
    answer:
      "Toute commande confirmée avant le 15 décembre est livrée à Cotonou avant le 31 décembre. Passé ce délai, la livraison est organisée sous 48 h.",
  },
];

export const contactDetails = {
  phone: "+229 01 90 00 31 31",
  /** Numéro au format international, sans `+`, pour les liens wa.me. */
  whatsapp: "2290190003131",
  city: "Cotonou, Bénin",
  hours: "Réponse du lundi au samedi, 8h–20h",
} as const;

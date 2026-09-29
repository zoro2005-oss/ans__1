/** Contenus éditoriaux du site — textes et médias hors catalogue produits. */
import collectionA from "@/assets/product-collection-a.jpg";
import collectionB from "@/assets/product-collection-b.jpg";
import partyPack from "@/assets/party-pack.jpg";
import heroImage from "@/assets/newyear-hero.jpg";

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
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "Afi D.",
    city: "Cotonou",
    quote: "Tout était magnifique et livré à temps. Notre salon était méconnaissable.",
    rating: 5,
  },
  {
    name: "Marius K.",
    city: "Abomey-Calavi",
    quote: "Le pack Amis nous a évité tout le stress. Une vraie belle surprise.",
    rating: 5,
  },
  {
    name: "Nadia S.",
    city: "Porto-Novo",
    quote: "La sélection est chic, les détails soignés et le service très réactif.",
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
  /** Recadrage `object-position`, pour varier les zones visibles d'une même photo. */
  position: string;
  /** `tall` occupe deux lignes dans la grille. */
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: heroImage,
    position: "50% 42%",
    alt: "Amis élégants célébrant le Nouvel An sur un toit à Cotonou",
  },
  {
    src: partyPack,
    position: "28% 60%",
    alt: "Table de réveillon noire et or dressée pour une soirée entre amis",
  },
  {
    src: collectionA,
    position: "60% 40%",
    alt: "Sélection cadeau et champagne en décor noir et or",
    tall: true,
  },
  {
    src: collectionB,
    position: "30% 30%",
    alt: "Tenue de soirée noire et accessoires dorés",
  },
  {
    src: collectionB,
    position: "70% 78%",
    alt: "Chaussures et nœud doré pour compléter la tenue",
  },
  {
    src: partyPack,
    position: "74% 28%",
    alt: "Vaisselle et décor de table assortis en noir et or",
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
  email: "poviessivoucherias@gmail.com",
  city: "Cotonou, Bénin",
  hours: "Réponse du lundi au samedi, 8h–20h",
} as const;

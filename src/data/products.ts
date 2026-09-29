import collectionA from "@/assets/product-collection-a.jpg";
import collectionB from "@/assets/product-collection-b.jpg";
import partyPack from "@/assets/party-pack.jpg";

export const categories = [
  "Tout",
  "Décoration",
  "Tenues de soirée",
  "Cadeaux",
  "Repas & boissons",
  "Feux d'artifice",
] as const;

export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "Tout">;
  price: number;
  oldPrice?: number;
  /** Les quatre photos de la campagne sont partagées entre plusieurs fiches. */
  image: string;
  /** Recadrage `object-position`, pour montrer une zone différente de la photo. */
  imagePosition: string;
  imageAlt: string;
  description: string;
  details: string[];
  featured?: boolean;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "coffret-minuit",
    name: "Coffret Minuit",
    category: "Cadeaux",
    price: 28500,
    oldPrice: 34000,
    image: collectionA,
    imagePosition: "67% 44%",
    imageAlt: "Sélection cadeau et champagne en décor noir et or",
    description:
      "Un coffret noir et or prêt à offrir, garni de douceurs, d’une mini bouteille et d’accessoires de fête.",
    details: [
      "Boîte rigide magnetisable et réutilisable",
      "Ruban et carte manuscrite inclus",
      "Emballage cadeau offert",
    ],
    featured: true,
    badge: "Coup de cœur",
  },
  {
    id: "duo-champagne",
    name: "Duo de flûtes Éclat",
    category: "Décoration",
    price: 18000,
    image: collectionA,
    imagePosition: "45% 36%",
    imageAlt: "Bouteille et flûtes dorées en décor noir et or",
    description: "Deux flûtes élancées pour porter le toast de minuit avec élégance.",
    details: ["Verre soufflé, base fine", "Sans plomb", "Lavable au lave-vaisselle"],
  },
  {
    id: "seau-dore",
    name: "Seau à glace doré",
    category: "Décoration",
    price: 22000,
    image: collectionA,
    imagePosition: "10% 22%",
    imageAlt: "Buffet doré et décor noir pour le réveillon",
    description: "Une pièce lumineuse qui garde vos bouteilles fraîches toute la soirée.",
    details: [
      "Métal doré finition brillante",
      "Double paroi isolante",
      "Compatible bouteilles 75 cl",
    ],
  },
  {
    id: "boule-disco",
    name: "Boule à facettes Royale",
    category: "Décoration",
    price: 26500,
    oldPrice: 32000,
    image: collectionB,
    imagePosition: "63% 34%",
    imageAlt: "Boule à facettes dorée et accessoires de soirée",
    description: "Des éclats mouvants pour transformer le salon en piste de danse.",
    details: ["30 cm, surfacé", "Moteur LED rotatif", "Câble 5 m"],
    featured: true,
    badge: "-17 %",
  },
  {
    id: "robe-nocturne",
    name: "Robe Nocturne",
    category: "Tenues de soirée",
    price: 68000,
    image: collectionB,
    imagePosition: "23% 32%",
    imageAlt: "Robe noire à sequins et accessoires dorés",
    description: "Une robe noire à sequins, coupe fluide et reflets subtils pour le réveillon.",
    details: ["Satin de polyester recyclé", "Taille élastiquée", "Guide des tailles fourni"],
  },
  {
    id: "sandales-lumiere",
    name: "Sandales Lumière",
    category: "Tenues de soirée",
    price: 42000,
    image: collectionB,
    imagePosition: "15% 82%",
    imageAlt: "Chaussures dorées et éléments de fête",
    description: "Des sandales dorées à talon fin, pensées pour danser jusqu’à l’aube.",
    details: ["Talon 9 cm stabilized", "Semelle cuir", "Boucles réglables"],
  },
  {
    id: "noeud-or",
    name: "Nœud papillon Or",
    category: "Tenues de soirée",
    price: 9500,
    image: collectionB,
    imagePosition: "67% 82%",
    imageAlt: "Nœud doré et accessoires de soirée",
    description: "La touche finale d’une tenue de soirée nette et festive.",
    details: ["Satin reliant ton sur ton", "Attache réglable", "Se porte aussi en bracelet"],
  },
  {
    id: "parfum-2027",
    name: "Parfum Première Nuit",
    category: "Cadeaux",
    price: 39500,
    image: collectionB,
    imagePosition: "72% 62%",
    imageAlt: "Parfum et accessoires dorés pour la soirée",
    description: "Une fragrance chaude et ambrée présentée dans un écrin noir satiné.",
    details: ["Eau de parfum 50 ml", "Notes : bergamote, ambre, musc", "Écrin inclus"],
  },
  {
    id: "bulles-prestige",
    name: "Bulles Prestige",
    category: "Repas & boissons",
    price: 24500,
    oldPrice: 29000,
    image: collectionA,
    imagePosition: "14% 16%",
    imageAlt: "Bouteille pétillante et flûtes en décor noir et or",
    description: "Une bouteille pétillante sans alcool et deux flûtes pour célébrer ensemble.",
    details: ["1 bouteille 75 cl + 2 flûtes", "Sans alcool, à base de raisin", "Servi glacé"],
    featured: true,
    badge: "-16 %",
  },
  {
    id: "plateau-douceurs",
    name: "Plateau Douceurs de Minuit",
    category: "Repas & boissons",
    price: 32000,
    image: partyPack,
    imagePosition: "44% 64%",
    imageAlt: "Buffet de réveillon noir et or",
    description: "Un assortiment généreux de petits fours salés et de douceurs fines.",
    details: ["≈ 40 pièces", "Adapté à 6 personnes", "Vaisselle de présentation incluse"],
  },
  {
    id: "table-six",
    name: "Table de fête pour six",
    category: "Repas & boissons",
    price: 89000,
    image: partyPack,
    imagePosition: "55% 58%",
    imageAlt: "Table de fête dressée en noir et or",
    description: "Une sélection complète pour six convives, livrée prête à dresser.",
    details: ["Assiettes, verres et couverts pour 6", "Nappe et serviettes", "Bougées centerpiece"],
  },
  {
    id: "fontaine-etincelles",
    name: "Fontaines Étincelles",
    category: "Feux d'artifice",
    price: 12500,
    image: collectionB,
    imagePosition: "92% 22%",
    imageAlt: "Accessoires de soirée en noir et or",
    description:
      "Six fontaines lumineuses à utiliser exclusivement en extérieur selon les consignes.",
    details: ["Lot de 6", "Durée ≈ 20 s chacune", "Usage extérieur uniquement"],
  },
  {
    id: "cierges-magiques",
    name: "Cierges Magiques",
    category: "Feux d'artifice",
    price: 4500,
    image: collectionB,
    imagePosition: "90% 22%",
    imageAlt: "Décor de soirée noir et or",
    description: "Douze cierges scintillants pour illuminer les photos de minuit.",
    details: ["Lot de 12", "≈ 40 s de combustion", "Tenir à distance des cheveux"],
  },
  {
    id: "kit-table-or",
    name: "Kit Table Or & Noir",
    category: "Décoration",
    price: 19500,
    image: partyPack,
    imagePosition: "53% 82%",
    imageAlt: "Vaisselle et décor de table noir et or",
    description: "Assiettes, serviettes, anneaux et confettis coordonnés pour six personnes.",
    details: ["Pour 6 personnes", "24 pièces", "Confettis metal or et noir inclus"],
  },
  {
    id: "ballons-minuit",
    name: "Arche Ballons Minuit",
    category: "Décoration",
    price: 35000,
    oldPrice: 42000,
    image: partyPack,
    imagePosition: "9% 20%",
    imageAlt: "Table de réveillon noire et or",
    description: "Une arche spectaculaire noir, or et transparent, livrée en kit complet.",
    details: ["≈ 90 ballons", "Kit de fixation et ruban", "Montage 20 min"],
    badge: "-17 %",
  },
];

export type PartyPack = {
  name: string;
  people: string;
  price: number;
  items: string[];
  popular?: boolean;
};

export const partyPacks: PartyPack[] = [
  {
    name: "Famille",
    people: "4 à 6 personnes",
    price: 75000,
    items: ["Kit table complet", "Plateau de douceurs", "Ballons & cotillons"],
  },
  {
    name: "Amis",
    people: "8 à 10 personnes",
    price: 145000,
    items: ["Décor noir & or", "Buffet généreux", "Bulles & accessoires photo"],
    popular: true,
  },
  {
    name: "VIP",
    people: "12 à 16 personnes",
    price: 295000,
    items: ["Scénographie premium", "Buffet Signature", "Service de mise en place"],
  },
];

export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;

export const getProduct = (id: string) => products.find((product) => product.id === id);

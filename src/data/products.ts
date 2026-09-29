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
  /** Chemin dans /public/images — voir IMAGES_PROMPTS.md pour les prompts de remplacement. */
  image: string;
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
    image: "/images/coffret-minuit.webp",
    imageAlt: "Coffret cadeau noir et or ouvert, garni de douceurs et d’accessoires de fête",
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
    image: "/images/duo-flutes-eclat.webp",
    imageAlt: "Deux flûtes à champagne élancées sur fond noir",
    description: "Deux flûtes élancées pour porter le toast de minuit avec élégance.",
    details: ["Verre soufflé, base fine", "Sans plomb", "Lavable au lave-vaisselle"],
  },
  {
    id: "seau-dore",
    name: "Seau à glace doré",
    category: "Décoration",
    price: 22000,
    image: "/images/seau-a-glace-dore.webp",
    imageAlt: "Seau à glace doré poli avec une bouteille de champagne",
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
    image: "/images/boule-a-facettes-royale.webp",
    imageAlt: "Boule à facettes mirroring jetant des reflets dorés et violets",
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
    image: "/images/robe-nocturne.webp",
    imageAlt: "Robe de soirée longue noire à sequins",
    description: "Une robe noire à sequins, coupe fluide et reflets subtils pour le réveillon.",
    details: ["Satin de polyester recyclé", "Taille élastiquée", "Guide des tailles fourni"],
  },
  {
    id: "sandales-lumiere",
    name: "Sandales Lumière",
    category: "Tenues de soirée",
    price: 42000,
    image: "/images/sandales-lumiere.webp",
    imageAlt: "Sandales à talon doré photographiées de trois quarts",
    description: "Des sandales dorées à talon fin, pensées pour danser jusqu’à l’aube.",
    details: ["Talon 9 cm stabilized", "Semelle cuir", "Boucles réglables"],
  },
  {
    id: "noeud-or",
    name: "Nœud papillon Or",
    category: "Tenues de soirée",
    price: 9500,
    image: "/images/noeud-papillon-or.webp",
    imageAlt: "Nœud papillon en satin doré sur un col de chemise noir",
    description: "La touche finale d’une tenue de soirée nette et festive.",
    details: ["Satin reliant ton sur ton", "Attache réglable", "Se porte aussi en bracelet"],
  },
  {
    id: "parfum-2027",
    name: "Parfum Première Nuit",
    category: "Cadeaux",
    price: 39500,
    image: "/images/parfum-premiere-nuit.webp",
    imageAlt: "Flacon de parfum ambré dans un écrin de satin noir",
    description: "Une fragrance chaude et ambrée présentée dans un écrin noir satiné.",
    details: ["Eau de parfum 50 ml", "Notes : bergamote, ambre, musc", "Écrin inclus"],
  },
  {
    id: "bulles-prestige",
    name: "Bulles Prestige",
    category: "Repas & boissons",
    price: 24500,
    oldPrice: 29000,
    image: "/images/bulles-prestige.webp",
    imageAlt: "Bouteille de pétillante sans alcool et deux flûtes remplies",
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
    image: "/images/plateau-douceurs.webp",
    imageAlt: "Plateau de petits fours salés et de douceurs sur fond noir et or",
    description: "Un assortiment généreux de petits fours salés et de douceurs fines.",
    details: ["≈ 40 pièces", "Adapté à 6 personnes", "Vaisselle de présentation incluse"],
  },
  {
    id: "table-six",
    name: "Table de fête pour six",
    category: "Repas & boissons",
    price: 89000,
    image: "/images/table-fete-six.webp",
    imageAlt: "Table de fête dressée pour six avec nappe noire et assiettes dorées",
    description: "Une sélection complète pour six convives, livrée prête à dresser.",
    details: ["Assiettes, verres et couverts pour 6", "Nappe et serviettes", "Bougées centerpiece"],
  },
  {
    id: "fontaine-etincelles",
    name: "Fontaines Étincelles",
    category: "Feux d'artifice",
    price: 12500,
    image: "/images/fontaines-etcincelles.webp",
    imageAlt: "Fontaines pyrotechniques dorées projetant des étincelles dans la nuit",
    description:
      "Six fontaines lumineuses à utiliser exclusivement en extérieur selon les consignes.",
    details: ["Lot de 6", "Durée ≈ 20 s chacune", "Usage extérieur uniquement"],
  },
  {
    id: "cierges-magiques",
    name: "Cierges Magiques",
    category: "Feux d'artifice",
    price: 4500,
    image: "/images/cierges-magiques.webp",
    imageAlt: "Douze cierges magiques scintillants tenus dans des mains",
    description: "Douze cierges scintillants pour illuminer les photos de minuit.",
    details: ["Lot de 12", "≈ 40 s de combustion", "Tenir à distance des cheveux"],
  },
  {
    id: "kit-table-or",
    name: "Kit Table Or & Noir",
    category: "Décoration",
    price: 19500,
    image: "/images/kit-table-or-noir.webp",
    imageAlt: "Set de vaisselle à bord doré, serviettes noires et confettis",
    description: "Assiettes, serviettes, anneaux et confettis coordonnés pour six personnes.",
    details: ["Pour 6 personnes", "24 pièces", "Confettis metal or et noir inclus"],
  },
  {
    id: "ballons-minuit",
    name: "Arche Ballons Minuit",
    category: "Décoration",
    price: 35000,
    oldPrice: 42000,
    image: "/images/arche-ballons-minuit.webp",
    imageAlt: "Arche de ballons noirs, dorés et transparents en cours de montage",
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

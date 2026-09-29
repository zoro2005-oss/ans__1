# Countdown Chic

Tu es un développeur front-end senior et designer UI/UX. Crée un site vitrine de type e-commerce sur le thème du NOUVEL AN, complet, prêt à lancer, avec un rendu premium et très animé.

## Concept

Boutique en ligne "vitrine" : elle ressemble à un vrai site e-commerce (catalogue, panier, checkout) mais les paiements sont SIMULÉS (aucun vrai débit). Le site est en français et pensé pour le Bénin (prix en FCFA).

## Stack

- React + Vite + Tailwind CSS
- GSAP (avec ScrollTrigger) pour toutes les animations de scroll et d'interface
- three.js pour les effets 3D
- Aucun backend : données produits en JSON local, panier stocké en état React + localStorage
- Déployable sur Vercel

## Design

- Thème noir profond + or/champagne, touches de violet néon
- Typographie élégante (titres serif ou display, texte sans-serif)
- Mobile-first, parfaitement responsive
- Micro-interactions partout : hover, boutons magnétiques, curseur personnalisé sur desktop

## Animations (obligatoires)

- three.js : scène 3D dans le hero (feux d'artifice en particules ou boules à facettes / ballons dorés flottants) réactive à la souris, avec fallback léger sur mobile
- GSAP : intro animée (preloader avec compte à rebours), apparition des sections au scroll (ScrollTrigger), parallaxe, texte qui se révèle lettre par lettre, cartes produits qui entrent en cascade
- Compte à rebours en temps réel jusqu'au 31 décembre à minuit
- Confettis / explosion de particules à l'ajout au panier et à la confirmation de commande
- Transitions fluides entre pages

## Pages et sections

1. Hero : accroche forte ("Fais du 31 une nuit inoubliable"), gros bouton "Commander", compte à rebours, scène 3D
2. Catalogue : produits en grille avec filtres par catégorie (Décoration, Tenues de soirée, Cadeaux, Repas & boissons, Feux d'artifice) + recherche + tri
3. Packs Soirée : 3 packs (Famille, Amis, VIP), celui du milieu mis en avant "Le plus populaire"
4. Offres flash avec timer et prix barré + badge de réduction
5. Avis clients, section "Pourquoi nous choisir" (livraison rapide, paiement sécurisé, satisfait ou remboursé), FAQ, galerie
6. Page produit détaillée (galerie, description, quantité, bouton ajouter)
7. Panier : mini-panier qui glisse sur le côté + page panier complète (quantités, total, code promo fictif "NOUVELAN")
8. Checkout en 2 étapes maximum
9. Contact avec bouton WhatsApp flottant (message pré-rempli avec le récapitulatif de commande)
10. Footer complet

## Checkout simulé (très réaliste)

- Étape 1 : nom, téléphone, adresse de livraison
- Étape 2 : choix du paiement : MTN Mobile Money, Moov Money, Celtiis Cash, Carte bancaire
- Mobile Money : saisie du numéro, puis écran "Validez le paiement sur votre téléphone..." avec spinner de 3 à 4 secondes
- Écran de succès animé (check vert, confettis GSAP, numéro de commande, reçu récapitulatif téléchargeable)
- Sous le capot : simple setTimeout qui renvoie "succès" (option : 10 % d'échec aléatoire pour le réalisme), aucun vrai paiement
- Architecture propre pour remplacer plus tard par FedaPay ou KKiaPay (fonction unique processPayment() à brancher)
- OBLIGATOIRE : bandeau discret "Mode démo : aucun paiement réel" dans le footer et sur la page de paiement

## Persuasion (conversion)

- Preuve sociale : avis, nombre de commandes, notifications "X vient de commander..." (données d'exemple, marquées comme démo)
- Urgence réelle : offre valable jusqu'à une date précise, "livraison garantie avant le 31"
- Réassurance : badges paiement sécurisé, livraison, retour
- CTA clair et répété, checkout sans friction, boutons WhatsApp
- Pas de faux stock ("plus que 2 !")

## Qualité du code

- Structure claire : /components, /pages, /data, /hooks, /lib
- 12 à 16 produits d'exemple réalistes avec prix en FCFA et images (Unsplash ou placeholders)
- Nettoyage propre des animations GSAP et three.js (useEffect cleanup, gsap.context)
- Performances : lazy loading, pixelRatio limité, réduction des particules sur mobile, respect de prefers-reduced-motion
- Accessibilité de base (alt, contrastes, focus)

## Images (génération obligatoire)

- Génère toutes les images du site toi-même (hero, produits, packs, catégories, galerie, bannières, avatars des avis, image de partage OpenGraph). N'utilise pas de placeholders gris.
- Style visuel unique pour tout le site : photographie de produit premium, fond sombre, éclairage cinématographique, touches or/champagne et violet néon, ambiance fête du Nouvel An, bokeh, paillettes.
- Format : produits en carré 1:1 (1024x1024), hero et bannières en 16:9, fichiers .webp optimisés, noms clairs (ex: pack-vip.webp) rangés dans /public/images.
- Si tu ne peux pas générer d'images directement : crée un fichier IMAGES_PROMPTS.md avec, pour CHAQUE image, un prompt détaillé en anglais prêt à coller dans Midjourney / DALL·E / Leonardo (sujet, style, éclairage, cadrage, ratio), et branche le site sur ces noms de fichiers. En attendant, utilise des images Unsplash temporaires avec les mêmes noms pour que le site s'affiche déjà.
- Prévois un composant <SmartImage> avec lazy loading, effet blur-up et image de secours si le fichier manque.
- Toutes les images doivent avoir un texte alt en français.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c48f7f69-9b1c-4c54-bfb6-e10dfea30cd1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

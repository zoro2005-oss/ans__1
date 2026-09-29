# Boutique Nouvel An — plan de réalisation

## Expérience proposée

- Créer une boutique vitrine française, pensée pour le Bénin, avec prix en FCFA et identité noir profond, champagne/or et accents violet électrique.
- Faire de la page d’accueil une expérience de vente complète : scène 3D festive, compte à rebours vers le prochain 31 décembre, catalogue filtrable, packs, offres flash, galerie, avis, réassurance, FAQ et pied de page.
- Générer une campagne photo cohérente pour le hero, les produits, les packs, la galerie et les avis, puis intégrer ces visuels avec chargement progressif et solution de secours.

## Navigation et parcours d’achat

- Ajouter les pages Accueil, Catalogue, Produit, Panier, Paiement en deux étapes et Contact.
- Fournir 15 produits locaux et festifs, répartis entre Décoration, Tenues de soirée, Cadeaux, Repas & boissons et Feux d’artifice.
- Mettre en place recherche, filtres, tri, quantités, mini-panier latéral, code promo `NOUVELAN`, total et persistance du panier dans le navigateur.
- Préparer un bouton WhatsApp flottant avec un récapitulatif de commande prérempli.

## Paiement démo

- Étape 1 : identité, téléphone et adresse de livraison.
- Étape 2 : MTN Mobile Money, Moov Money, Celtiis Cash ou carte bancaire, avec champs adaptés.
- Simuler le traitement pendant 3 à 4 secondes via une fonction unique `processPayment()`, puis afficher une confirmation animée, un numéro de commande et un reçu téléchargeable.
- Afficher clairement « Mode démo : aucun paiement réel » sur le paiement et dans le pied de page, sans déclencher de transaction réelle.

## Mouvement et finition

- Créer une scène 3D procédurale de boules à facettes, ballons et particules dorées, réactive au pointeur, allégée sur mobile et désactivable selon les préférences d’animation.
- Utiliser GSAP et ScrollTrigger pour le préchargement, les révélations de texte, les entrées en cascade, la parallaxe et les transitions.
- Ajouter des confettis à l’ajout au panier et à la confirmation, un curseur sur mesure et des boutons magnétiques sur ordinateur.
- Respecter les contrastes, le clavier, les textes alternatifs, le chargement différé des images et des dimensions stables sur mobile.

## Vérification

- Contrôler le rendu de toutes les pages sur ordinateur et mobile.
- Tester le parcours réel : filtre produit → fiche → ajout → panier → promo → paiement démo → reçu.
- Vérifier la scène 3D, les animations réduites, la persistance du panier, les liens WhatsApp et l’absence d’erreurs visibles.

## Détails techniques

- Conserver l’architecture TanStack Start/Vite existante et utiliser son routage natif.
- Ajouter React Three Fiber/three.js et GSAP ; isoler la 3D côté navigateur et plafonner le ratio de pixels.
- Organiser les données, l’état panier, les fonctions de paiement et les éléments visuels dans des modules séparés.
- Utiliser uniquement des données locales et le stockage du navigateur ; aucun service distant ni vrai paiement.

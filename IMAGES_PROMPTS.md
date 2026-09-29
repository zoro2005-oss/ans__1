# IMAGES_PROMPTS — campagne photo « Réveillon 31 »

Les images actuellement servies par le site ont été **dérivées par recadrage** des
4 photos sources de `src/assets/` (voir l'historique de génération). Elles
fonctionnent, mais plusieurs produits partagent le même sujet.

Ce fichier contient, pour **chaque image** attendue par le site, un prompt
anglais prêt à coller dans Midjourney / DALL·E / Leonardo / Flux. Les
**noms de fichiers sont ceux réellement utilisés par le code** : si tu remplaces
`public/images/<nom>.webp` par le rendu généré, **aucune modification de code
n'est nécessaire**.

Après remplacement, lance :

```sh
python3 scripts/generate-lqip.py   # regénère les placeholders blur-up
```

## Direction artistique commune

À coller en tête de chaque prompt, ou à utiliser comme **style reference** :

```
Premium New Year's Eve product photography, deep near-black background (#0b0a0f),
champagne and 24k gold key light with warm rim lighting, subtle electric violet
accent light, cinematic contrast, bokeh sparkle, fine glitter particles in the air,
shallow depth of field, shot on 85mm f/1.4, editorial luxury catalogue, no text,
no logo, no watermark, high-end festive mood
```

Négatifs recommandés (Midjourney) :

```
--no text, watermark, logo, people faces, distorted hands, oversaturated, plastic
```

**Ratios** : produits `1:1`, hero et bannières `16:9`, galerie `4:5`, avatars `1:1`,
OpenGraph `1200x630`.

---

## 1. Hero — `hero-reveillon.webp` (16:9, 1920x1080)

```
Luxury New Year's Eve rooftop party in Cotonou, Benin, seen slightly from below:
elegant West African friends in black tie and sequined gowns raising champagne
flutes, golden confetti mid-air, warm gold bokeh string lights overhead, city
lights blurred far behind, deep near-black sky, cinematic wide shot, generous
empty space on the left third for text overlay --ar 16:9 --style raw
```

Variante mobile `hero-reveillon-portrait.webp` (`4:5`, 900x1200) : même scène,
recadrage vertical centré sur lesASIC toast, personnages en haut du cadre.

## 2. Bannières

| Fichier               | Ratio | Prompt                                                                                                                                                                                                              |
| --------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packs-banniere.webp` | 16:9  | `Gourmet New Year's Eve buffet table styled in black and gold, tiered stands of small pastries, champagne tower, gold cutlery, candlelight, deep black backdrop, overhead three-quarter angle, cinematic --ar 16:9` |
| `offre-banniere.webp` | 16:9  | `Elegant gift hamper open on black velvet, gold ribbon, champagne bottle and macarons inside, dramatic single gold light, macro depth of field, festive bokeh background --ar 16:9`                                 |

## 3. Produits — `1:1`, 1024x1024

Chaque produit a son **propre fichier**. Le sujet doit être centré, marges
égales, fond noir uni, éclairage identique à la direction artistique commune
(pour que la grille catalogue reste homogène).

| Fichier                        | Produit                    | Prompt (après la DA commune)                                                                                                                                             |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `coffret-minuit.webp`          | Coffret Minuit             | `an open rigid black gift box with gold interior, filled with gold-wrapped sweets, a mini champagne bottle and festive trinkets, lid tilted open, centered hero product` |
| `duo-flutes-eclat.webp`        | Duo de flûtes Éclat        | `a pair of slender tall champagne flutes standing side by side, gold rim, crystal catching a violet rim light, condensation droplets, centered`                          |
| `seau-a-glace-dore.webp`       | Seau à glace doré          | `a polished gold ice bucket holding a champagne bottle, faceted metallic surface reflecting violet highlights, centered, slight water droplets`                          |
| `bulles-prestige.webp`         | Bulles Prestige            | `a chilled non-alcoholic sparkling bottle in black foil with two filled flutes beside it, ice cubes, fine bubbles rising, centered`                                      |
| `boule-a-facettes-royale.webp` | Boule à facettes Royale    | `a large disco ball in mid-air, hundreds of mirror facets throwing gold and violet light spots across a black wall, centered, motion in the reflections`                 |
| `robe-nocturne.webp`           | Robe Nocturne              | `a floor-length black sequin evening gown on an elegant mannequin, subtle sequin reflections, draped neckline, centered full-length`                                     |
| `sandales-lumiere.webp`        | Sandales Lumière           | `a pair of gold stiletto sandals with fine straps, photographed from a low three-quarter angle on a reflective black surface, centered`                                  |
| `noeud-papillon-or.webp`       | Nœud papillon Or           | `a gold satin bow tie on a folded black shirt collar, macro close-up, crisp fabric texture, centered`                                                                    |
| `parfum-premiere-nuit.webp`    | Parfum Première Nuit       | `an amber perfume bottle in a black satin-lined presentation case, warm glowing liquid, gold cap, centered`                                                              |
| `fontaines-etcincelles.webp`   | Fontaines Étincelles       | `six sparkling fountain fireworks on a dark outdoor terrace, dense golden sparks shooting upward, safety goggles resting nearby, night, dramatic`                        |
| `cierges-magiques.webp`        | Cierges Magiques           | `a dozen glowing sparklers held in elegant hands against a black night background, warm white spark showers, shallow depth of field`                                     |
| `plateau-douceurs.webp`        | Plateau Douceurs de Minuit | `a generous party platter of mini savoury canapés and fine pastries on a matte black and gold tray, overhead flat lay, centered`                                         |
| `table-fete-six.webp`          | Table de fête pour six     | `a complete laid table for six, black linen, gold chargers, crystal glasses, taper candles, confetti on the cloth, three-quarter angle`                                  |
| `kit-table-or-noir.webp`       | Kit Table Or & Noir        | `a coordinated tableware set for six arranged in a grid on a black surface: gold-rimmed plates, black napkins, gold cutlery, confetti scatter, flat lay`                 |
| `arche-ballons-minuit.webp`    | Arche Ballons Minuit       | `a large black, gold and transparent balloon arch kit laid out and partly assembled in a bright corner of a room, festive, wide`                                         |

## 4. Galerie — `4:5`, 800x1000

Ambiance « soirée réelle », pas de packshot. Les six fichiers doivent raconter
une progression : avant → pendant → après minuit.

| Fichier          | Prompt (après la DA commune)                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `galerie-1.webp` | `friends clinking champagne flutes in a decorated living room at midnight, candid, motion blur on the hands` |
| `galerie-2.webp` | `a gold-decorated buffet corner with guests serving themselves, warm candlelight, candid documentary style`  |
| `galerie-3.webp` | `a gift being opened under a tree of warm fairy lights, hands and ribbon in focus, faces out of frame`       |
| `galerie-4.webp` | `a couple dancing in a dim living room lit by a disco ball, confetti in the air, candid`                     |
| `galerie-5.webp` | `a close-up of a sequined outfit catching violet and gold light, motion blur, abstract elegance`             |
| `galerie-6.webp` | `the morning after: empty glasses and confetti on a black table, single shaft of sunlight, quiet mood`       |

## 5. Avatars d'avis — `1:1`, 200x200

Trois portraits, cadrage buste, sourire naturel, lumière chaude. Ils doivent
sembler venir de trois personnes distinctes.

| Fichier              | Prompt                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `avis-afi-d.webp`    | `headshot portrait of a smiling West African woman in her thirties, short curly hair, gold earrings, dark warm background, natural warm light, sharp focus on eyes` |
| `avis-marius-k.webp` | `headshot portrait of a smiling West African man in his forties, short beard, black turtleneck, dark warm background, natural warm light`                           |
| `avis-nadia-s.webp`  | `headshot portrait of a smiling West African woman in her late twenties, long straight hair, minimal gold jewellery, dark warm background`                          |

> Alternative sans visage : des monogrammes dorés sur fond sombre (ce qui est
> actuellement servi). Les deux fonctionnent, les monogrammes évitent tout
> risque de visage généré peu naturel en petit format.

## 6. Partage OpenGraph — `og-image.webp` (1200x630)

```
Luxury New Year's Eve still life: black marble table, champagne bottle, two gold
flutes, gold confetti, deep black background, dramatic gold and violet rim light,
cinematic, wide composition with clear space in the centre for a title --ar 1.91:1
```

Le texte « RÉVEILLON 31 » est **composé par le site** (actuellement incrusté par
ImageMagick). Si tu fournis une image sans texte, régénère la version texte avec :

```sh
magick public/images/og-image.webp \
  -font DejaVu-Serif -fill '#e8cd8a' -gravity center -pointsize 92 -kerning 8 \
  -annotate +0-36 'REVEILLON 31' \
  -font DejaVu-Sans -fill '#cfc6b4' -pointsize 28 -kerning 6 \
  -annotate +0+50 'FAIS DU 31 UNE NUIT INOUBLIABLE' \
  webp:public/images/og-image.webp
```

## 7. Image de secours — `fallback.webp`

Dégradé radial violet sombre vers noir, 1024x1024. Utilisé automatiquement par
`SmartImage` si un fichier est introuvable — **ne pas la supprimer**, et ne pas la
remplacer par une photo (elle doit rester neutre et sombre).

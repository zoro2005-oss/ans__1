/**
 * Placeholders LQIP (low quality image placeholder) generes depuis public/images.
 * Chaque entree est un webp de 20px de large encode en base64, affiche en
 * fond pendant le chargement de l'image reelle (effet blur-up).
 * Voir components/SmartImage.tsx.
 *
 * Regenerer : `python3 scripts/generate-lqip.py`
 */
export const lqip: Record<string, string> & { fallback: string } = {
  "arche-ballons-minuit":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABQAwCdASoUABQAPwlysFGrpqSisBgIAXAhCWkAAEKUa0QYAAD+8CUY26DgVPRXRn+auZAGnc5PbmSgcAA=",
  "avis-afi-d":
    "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAwCdASoUABQAPwluslIrpaSisBgIAXAhCWMAAC51ygiCbxHQmEAA/u6EDQpq0U1hp8bFmJ1NB70EyBc5lzG5alI4jsZT99CKC76ZRSDvyOlvS161R8Pffua9LxjKC5hAAA==",
  "avis-marius-k":
    "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoUABQAPwl4s1MrpySiqAqpcCEJYwDGQBEdEZcntTWLwsWOoAD+7oQyp9QcLB1iIvuobb0VaCDeo/ssPfIJHGmRzQh/yk/nWnTEGMNUZoRvnBX/Rk1gArrMEtj+F3z533juHyiu7iEobPAA",
  "avis-nadia-s":
    "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoUABQAPwluslIrpaSisBgIAXAhCWMAygGLfG+3BMQmZSXj1YoAAP7uhA5EwJOgEfV1Kp8qx1NMZquWgPfmbObBvay1//KsovKeq3O/OK+0t5dDjX3qe3leOwkgAA==",
  "boule-a-facettes-royale":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAgCdASoUABQAPwl6sVOrp6QiqAqpcCEJaQAAOshrgAD+8EHJ4zY/0VlbRz6mAwAAAA==",
  "bulles-prestige":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAwAwCdASoUABQAPwl4sFOrpyQiqAqpcCEJaQAAQXsqz4wAAP7wJQbhV1o9n35+G6V4QHgGj5YAAA==",
  "cierges-magiques":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAwCdASoUABQAPwl8tVSrp6SjKAgBcCEJaQDPZBbISMAA/vAlH4xrExFKsjsra7i2VNYTY4EXi46HcfQAAA==",
  "coffret-minuit":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAQAwCdASoUABQAPwl8tVUrp6SjKAgBcCEJaQAAQnQ08gAA/vAkbjxZP6cXC/Ojy0c1JwOiKD/cj5/AAAA=",
  "duo-flutes-eclat":
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAAAwAwCdASoUABQAPwl8tVUrp6SjKAgBcCEJZwAAPPR98V4AAP7v6js9ZcbQIS2vs6sNHX/Bt5z4RfhpnUJvAAAA",
  fallback:
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAQAwCdASoUABQAPwl6tFUrpySjKAgBcCEJZwDPZBmTsQAA/u+CE7X0/ocVYXaAQAAAAA==",
  "fontaines-etcincelles":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAgCdASoUABQAPwl6sVOrp6QiqAqpcCEJaQAAPlQ2AAD+8Fb81OaesAAAAA==",
  "galerie-1":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAwCdASoUABkAPwl8tlUrp6SjKAgBcCEJaQAAPPSCz24PJAD+8Fb37O14suHRnKXEGd3TXgxyAAAA",
  "galerie-2":
    "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABwAwCdASoUABkAPwl4s1MrpySiqAqpcCEJZwAAPgBQul/dG4AA/vAHRZKJrhbHFCSwMt66RMjskMYk2y2jGzpEwFgAAA==",
  "galerie-3":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAwCdASoUABkAPwl0sFGrpqSiqA1RcCEJZwDL4Bg9KaIA/vAlHJBM+ZjHRs/jKo/sxhanBED1Tmm0lmDEW6IAAAA=",
  "galerie-4":
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAwCdASoUABkAPwl6sVErqCSisBgIAXAhCWcAvdAQ7/AcuPjQplAA/vC9zkcFGP3Z9MOvWkOcJeBmXKe0AAAA",
  "galerie-5":
    "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAgCdASoUABkAPwl8tlUrp6SkKAgBcCEJaQAAP8h4AAD+8FsMGzvThl1OCuFSAAA=",
  "galerie-6":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABwAwCdASoUABkAPvlmqU+qpaQiN/qoAVAfCWMAzfwqMPI9MAAA/vCNdrTtrZ3YTgV/ObkLKl3P3OSoum8c0joyFOLMlwDQmQAAAA==",
  "hero-reveillon":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAgCdASoUAAsAPwlwr0+rpiQiMAgBcCEJZwAAhFgAAP7wJf9IhZxmFh4+9yz0QAAAAA==",
  "hero-reveillon-portrait":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQBACdASoUABsAPwlyslGrpqSisBgIAXAhCWcAzYQWiSw1CieUdoWpQAD+8AdT+adZzKNs4IwUkey8GGy/9sy7oK7pRygA",
  "kit-table-or-noir":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAABQAwCdASoUABQAPwl8tVUrpySjKAgBcCEJZwAAPPR9spOqIAD+8AiG/iP/0WeF5UwfVRm+DPPbVo97wFAAAA==",
  "noeud-papillon-or":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAwCdASoUABQAPwl4sFOrpyUiqAqpcCEJZwAAQYFj84+UAAD+8EHbroPWiXaLtORWq6sROthusAAA",
  "offre-banniere":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAgCdASoUAAsAPwlwrk+rpqQiMAgBcCEJaQAAe/QAAP7wJha9+EzYyplUp9Bq9AAAAA==",
  "og-image":
    "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUAAsAPwlusFArpiSisAgBcCEJZwAAW+soW2GAAP7yoVrVp7brXkf7bk+1zAAA",
  "packs-banniere":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAwAwCdASoUAAsAPwlur0+rpiQiMAgBcCEJZwAAetHVvV+QAP7wJLqBzclp+F+UFAAAAA==",
  "parfum-premiere-nuit":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAQAwCdASoUABQAPwl0tVKrpqUiqAqpcCEJZwAAQtHCLwAA/vAHVvnLBNbpI144lzCP9Vmn5ctpo2OAAAA=",
  "plateau-douceurs":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAAAwAwCdASoUABQAPwl2sVGrpySisBgIAXAhCWcAz6AXznSOAP7wJR6kcpJ23njwJTRYSlLeQAA=",
  "robe-nocturne":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADwAgCdASoUABQAPwl+tlUrqCSjKAgBcCEJaQAAPaXUAAD+8Fc+/laaAAA=",
  "sandales-lumiere":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAgCdASoUABQAPwl4sVOrpyQiqAqpcCEJZwAAQXvBAAD+8CZMOiCNAUawMdXaKI7MPiPqpIAAAA==",
  "seau-a-glace-dore":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAgCdASoUABQAPwl6sFOrp6QiqAqpcCEJaQAAQYHiUAD+8CZMn/Vo2SKimpR9sdpjq99u82LtlYNEUAA=",
  "table-fete-six":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAgCdASoUABQAPwl4tFMrpyUiqAqpcCEJZwAAOuKU0AD+8CZMn6Rif4n3czB4aqTtjyccAAA=",
};

export const lqipFor = (name: string) => lqip[name] ?? lqip.fallback ?? "";

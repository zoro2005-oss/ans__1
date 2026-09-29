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
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAwCdASoUABQAPwlysFGrpqSisBgIAXAhCWkAAC51sK/fzfgQT1UAAP7yob1mqiZtZAq9b7NX3CbNX29jgAAA",
  "avis-afi-d":
    "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQBACdASoUABQAPwlsslKrpSSisBgIAXAhCWMAzFgQ7/ETuWyvq4iHAAD+7oQNCmrTTq7wOvuxE+M/hrh/UGNlSFmtIynCdQKpgnawaZB3Rss2K4O9t3HKn1dL/BydXUYd4QAA",
  "avis-marius-k":
    "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABwBACdASoUABQAPwl4s1MrpySiqAqpcCEJYwDGQywA2gOhbhvFiryEOtVCiAD+7oQyjDginhqOuVI8a5AcgDt93jS/fIJHFGLh8EoTC7HGjHODXtcZRJQKgDTNkb9FT11OH851py4eeiOit81pPG1IAAA=",
  "avis-nadia-s":
    "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAwCdASoUABQAPwluslIrpaSisBgIAXAhCWMAzuwQ7+O7cDnXzzAAAP7uhA5EwiYMLW91oL/oX1CodWyEcZng/uGYod9S3MSaSG+c1YlSNav6CFVKvueMUj1X52PT5LcAAA==",
  "boule-a-facettes-royale":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAgCdASoUABQAPwl6sFOrp6QiqAqpcCEJZwAAOshrgAD+8EHJ4zY/0VlbRz6mAwAAAA==",
  "bulles-prestige":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAQAwCdASoUABQAPwl4sFOrpyQiqAqpcCEJaQAAOuCrPEAA/vAlBuFXWj2ffn4bpXhAeAZL4ygAAA==",
  "cierges-magiques":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAwCdASoUABQAPwl8tlUrp6SjKAgBcCEJZwDPZBbIOWAA/vAlH4xrExFKsjsra7i2VNYTY4EXir7nn88AAA==",
  "coffret-minuit":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAQAwCdASoUABQAPwl8tVUrp6SjKAgBcCEJaQAAQnQ08gAA/vAkbjxZP6cXC/Ojy0c1JwOiKD/cj5/AAAA=",
  "duo-flutes-eclat":
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAABQAwCdASoUABQAPwl8tVSrp6SjKAgBcCEJZwDO7BZlykzkAAD+7+o7PWXG0CEtr7OrDR0VM5l3Q14SFyp4AAAA",
  fallback:
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAQAwCdASoUABQAPwl6tFUrpySjKAgBcCEJZwDPZBmTsQAA/u+CE7X0/ocVYXaAQAAAAA==",
  "fontaines-etcincelles":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAgCdASoUABQAPwl6slOrp6QiqAqpcCEJaQAAPlQ2AAD+8Fb81OaesAAAAA==",
  "galerie-1":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAwCdASoUABkAPwl8tlUrp6SjKAgBcCEJaQAAPPSCz24PJAD+8Fb37O14suHRnKXEGd3TXgxyAAAA",
  "galerie-2":
    "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABwAwCdASoUABkAPwl4s1MrpySiqAqpcCEJZwAAPgBQul/dG4AA/vAHRZKJrhbHFCSwMt66RMjskMYk2y2jGzpEwFgAAA==",
  "galerie-3":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAwAwCdASoUABkAPwl0r1GrpqQiqA1RcCEJZwDO7BhKx48AAP7wJRyQTPmYx0bP4yqP74u7FWhBYdDA0Ixr44hPwAA=",
  "galerie-4":
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAwCdASoUABkAPwl6sVErqCSisBgIAXAhCWcAvdAQ7/AcuPjQsSAA/vC9zkcFGQvDmX54eNex56gM0fl1wAAA",
  "galerie-5":
    "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAgCdASoUABkAPwl8tlUrp6SkKAgBcCEJaQAAP8h4AAD+8FsMGzvThl1OCuFSAAA=",
  "galerie-6":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABwAwCdASoUABkAPvlmqU+qpaQiN/qoAVAfCWMAzfwqMPI9MAAA/vCNdrTtrZ3YTgV/ObkLKl3P3OSoum8c0joyFOLMlwDQmQAAAA==",
  "hero-reveillon":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAgCdASoUAAsAPwlwr0+rpiQiMAgBcCEJZwAAhFgAAP7wJf9IhZxmFh4+9yz0QAAAAA==",
  "hero-reveillon-portrait":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAwCdASoUABsAPwlyslGrpqSisBgIAXAhCWcAzYQWiSw1Cjf8gAD+8AdT+adZzKNs4IwUkey8GJi1Z2Whwc95UwyOAAAA",
  "kit-table-or-noir":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAQAwCdASoUABQAPwl6tFSrpySjKAgBcCEJZwAAPPR98LgA/vAIhv4j/9FnheVMH1UZvgz1E4zGcIAA",
  "noeud-papillon-or":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAwCdASoUABQAPwl4sFOrpyUiqAqpcCEJZwAAQYFj84+UAAD+8EHbroPWiXaLtORWq6sROthusAAA",
  "offre-banniere":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAgCdASoUAAsAPwlwrk+rpqQiMAgBcCEJaQAAe/QAAP7wJha9+EzYyplUp9Bq9AAAAA==",
  "og-image":
    "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUAAsAPwlusFArpiSisAgBcCEJZwAAW+soW2GAAP7yoVrVp7brXkf7bk+1zAAA",
  "packs-banniere":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAwAwCdASoUAAsAPwlur0+rpiQiMAgBcCEJZwAAetHVvV+QAP7wJLqBzclp+F+UFAAAAA==",
  "parfum-premiere-nuit":
    "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAAAwAwCdASoUABQAPwl0tVKrpqUiqAqpcCEJZwAAQtCUgE5AAP7wB1b5ywTW6SNeOJcwy3PH/cxcxSrYF+7Y4AAA",
  "plateau-douceurs":
    "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUABQAPwl2sVGrpySisBgIAXAhCWcA0FQY88SgAP7wJR6kbstV6LcxVIujIPgA",
  "robe-nocturne":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADwAgCdASoUABQAPwl+t1UrqCUjKAgBcCEJaQAAPaXUAAD+8Fc+/laaAAA=",
  "sandales-lumiere":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAgCdASoUABQAPwl4sVOrpyQiqAqpcCEJZwAAQXvBAAD+8CZMOiCNAUawMdXaKI7MPiPqpIAAAA==",
  "seau-a-glace-dore":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAgCdASoUABQAPwl6sFOrp6QiqAqpcCEJZwAAQYHiUAD+8CZMn/Vo2SKimpR9sdpjq99u82LtlYNEUAA=",
  "table-fete-six":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAgCdASoUABQAPwl4tFMrpyUiqAqpcCEJZwAAOuKU0AD+8CZMn6Rif4n3czB4aqTtjyccAAA=",
};

export const lqipFor = (name: string) => lqip[name] ?? lqip.fallback ?? "";

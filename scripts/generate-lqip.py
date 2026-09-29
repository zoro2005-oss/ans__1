#!/usr/bin/env python3
"""Regenere src/data/image-lqip.ts a partir de public/images/*.webp.

A lancer apres avoir remplace les images du site (par exemple avec la campagne
generee depuis IMAGES_PROMPTS.md) pour rafraichir les placeholders blur-up.

    python3 scripts/generate-lqip.py

 necessite ImageMagick (`magick`) dans le PATH.
"""

from __future__ import annotations

import base64
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "public", "images")
TARGET = os.path.join(ROOT, "src", "data", "image-lqip.ts")
WIDTH = 20
QUALITY = 32

HEADER = '''/**
 * Placeholders LQIP (low quality image placeholder) generes depuis public/images.
 * Chaque entree est un webp de {width}px de large encode en base64, affiche en
 * fond pendant le chargement de l'image reelle (effet blur-up).
 * Voir components/SmartImage.tsx.
 *
 * Regenerer : `python3 scripts/generate-lqip.py`
 */
'''


def main() -> int:
    if not os.path.isdir(IMAGES):
        print(f"dossier introuvable : {IMAGES}", file=sys.stderr)
        return 1

    names = sorted(f[: -len(".webp")] for f in os.listdir(IMAGES) if f.endswith(".webp"))
    if not names:
        print("aucune image .webp dans public/images", file=sys.stderr)
        return 1

    # Mise en forme alignee sur Prettier : la valeur d'un data-URI depasse la
    # largeur d'impression, donc Prettier la passe a la ligne suivante. La cle
    # `fallback` reste sans guillemets, les autres en contiennent.
    def entry(name: str) -> str:
        key = name if name.isidentifier() else f'"{name}"'
        return f'  {key}:\n    "data:image/webp;base64,{lqip(name)}",'

    lines = [entry(name) for name in names]
    content = (
        HEADER.format(width=WIDTH)
        + "export const lqip: Record<string, string> & { fallback: string } = {\n"
        + "\n".join(lines)
        + "\n};\n\n"
        + "export const lqipFor = (name: string) => lqip[name] ?? lqip.fallback ?? \"\";\n"
    )

    os.makedirs(os.path.dirname(TARGET), exist_ok=True)
    with open(TARGET, "w", encoding="utf-8") as handle:
        handle.write(content)

    print(f"{len(names)} LQIP ecrits dans {os.path.relpath(TARGET, ROOT)} ({len(content)} octets)")
    return 0


def lqip(name: str) -> str:
    raw = subprocess.run(
        [
            "magick",
            os.path.join(IMAGES, f"{name}.webp"),
            "-resize",
            f"{WIDTH}x",
            "-quality",
            str(QUALITY),
            "webp:-",
        ],
        capture_output=True,
        check=True,
    ).stdout
    return base64.b64encode(raw).decode("ascii")


if __name__ == "__main__":
    raise SystemExit(main())

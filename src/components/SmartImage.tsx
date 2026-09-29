import { useState } from "react";
import { lqipFor } from "@/data/image-lqip";
import { cn } from "@/lib/utils";

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Remplacée automatiquement par `fallback` si le chargement échoue. */
  fallback?: string;
  /** Désactive le placeholder blur-up (utile pour les images au-dessus de la ligne de flottaison). */
  eager?: boolean;
};

const FALLBACK_SRC = "/images/fallback.webp";

/**
 * Image à chargement progressif : affiche un placeholder LQIP très flou le temps
 * que la vraie image arrive, puis fait un fondu. Si le fichier est introuvable
 * on bascule sur `fallback` (ou sur le dégradé sombre de la campagne) au lieu
 * d'afficher l'icône cassée du navigateur.
 */
export function SmartImage({
  className,
  alt,
  fallback,
  eager = false,
  onLoad,
  onError,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const source = failed ? (fallback ?? FALLBACK_SRC) : props.src;
  const placeholder = lqipFor(
    String(source ?? "")
      .replace(/^.*\//, "")
      .replace(/\.webp$/, ""),
  );

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: placeholder ? `url("${placeholder}")` : undefined,
          filter: "blur(14px)",
          opacity: loaded ? 0 : 1,
        }}
      />
      <img
        {...props}
        src={source}
        alt={alt}
        loading={eager ? "eager" : (props.loading ?? "lazy")}
        decoding="async"
        className={cn(
          "h-full w-full transition-[opacity,transform] duration-700",
          loaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
        )}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          if (!failed) setFailed(true);
          onError?.(event);
        }}
      />
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string };

export function SmartImage({
  className,
  alt,
  fallback,
  onLoad,
  onError,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-secondary transition-opacity duration-700",
          loaded && "opacity-0",
        )}
      />
      <img
        {...props}
        alt={alt}
        className={cn(
          "h-full w-full transition duration-700",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
        )}
        src={failed && fallback ? fallback : props.src}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          if (!failed && fallback) setFailed(true);
          onError?.(event);
        }}
      />
    </div>
  );
}

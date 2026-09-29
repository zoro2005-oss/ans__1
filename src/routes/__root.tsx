import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/components/CartProvider";
import { BottomNav, CartDrawer, Footer, Header, WhatsAppButton } from "@/components/SiteChrome";
import { Preloader } from "@/components/Preloader";
import { THEME_BOOT_SCRIPT } from "@/hooks/use-theme";

function NotFoundComponent() {
  return (
    <div className="page-shell flex items-center bg-background px-5">
      <div className="mx-auto max-w-md text-center">
        <p className="section-kicker">Erreur 404</p>
        <h1 className="font-display text-6xl">Page introuvable</h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Cette page n’existe pas ou a été déplacée. La sélection, elle, est toujours là.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l’accueil
          </Link>
          <Link
            to="/catalogue"
            className="inline-flex h-11 items-center justify-center border border-input px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="page-shell flex items-center bg-background px-5">
      <div className="mx-auto max-w-md text-center">
        <p className="section-kicker">Erreur 500</p>
        <h1 className="font-display text-5xl">Cette page n’a pas pu se charger</h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Un problème est survenu de notre côté. Réessayez, ou revenez à l’accueil pour reprendre
          votre sélection.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center border border-input px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Réveillon 31 — Tout pour un réveillon inoubliable à Cotonou" },
      {
        name: "description",
        content:
          "Décoration, tenues, cadeaux, packs de fête et feux d’artifice — livrés à Cotonou pour le 31 décembre.",
      },
      { name: "author", content: "Réveillon 31" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Réveillon 31" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap",
      },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "256x256" },
    ],
    scripts: [
      {
        children: THEME_BOOT_SCRIPT,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Preloader />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <BottomNav />
      </CartProvider>
    </QueryClientProvider>
  );
}

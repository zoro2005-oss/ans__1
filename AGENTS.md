<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project architecture

- Keep commerce state entirely client-side through `CartProvider` and localStorage because this showcase intentionally has no backend.
- Keep the Three.js celebration isolated in a dynamically loaded client-only component because the app is server-rendered.
- Use TanStack file routes for every shareable storefront page because product, catalog, cart, checkout, and contact need independent URLs and metadata.

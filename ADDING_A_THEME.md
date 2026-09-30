# Adding a theme to RDK Retro UI

This file documents the canonical theme-development workflow. Do not develop themes directly in `RDK_UI_CSS_PUBLIC`; that public repository is a generated consumer mirror.

Use the Theme Contract and Agent Guide in this repository as the public reference.

1. Create scoped CSS in `src/themes/<id>.css`. The registry-driven build includes it in `src/index.css` only after promotion to active. Meet every token in `docs/data/theme-contract.json`.
2. Register the theme once in `docs/data/themes.json`: ID, label, maturity `status`, `lifecycle`, role, source, `docsRoute`, `nativeShowcase`, description, and public/default flags.
3. Keep a theme excluded from consumer distributions until its API and capabilities have been validated. Active themes enter combined CSS; archived themes keep standalone CSS.
4. Before active promotion, add its viewport profile and widths to `docs/data/theme-capabilities.json`.
5. Before active promotion, evaluate all shared components there as `supported`, `fallback`, or `unsupported`. Add advice for fallback and unsupported components.
6. Register any theme-specific primitives there with classes, description, and semantic markup. Keep their CSS scoped to the theme.
7. When a public presentation is ready, build a Native Showcase at the registered route. Check `docs/showcase/shared/` for shared-markup compatibility.
8. Generate docs after promotion; the theme page, selectors, Support Matrix, and contextual onboarding use the registries. Check the quick start, installation, component advice, theme selector behavior, and Native Showcase links across all active themes.
9. Run the repository's build and browser checks, then verify the generated public mirror. Keep development-only QA pages out of the consumer distribution.
10. Update release notes and version only when a release decision is made.

A theme does not need to support every shared component or copy the Console 94 composition. Use native semantic HTML and let application CSS own layout.

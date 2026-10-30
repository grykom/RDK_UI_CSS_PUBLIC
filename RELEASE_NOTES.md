# RDK UI 0.3.0

RDK UI 0.3.0 brings shared Button size/ghost/icon modifiers, Badge padding and `data-accent` support in every theme, a refreshed Czarek OS palette, buttons, forms and feedback, accessibility contrast fixes, and a richer Czarek OS Native Showcase. Themes keep their own lifecycle labels (Czarek OS, Terminal OS and Dark Horse remain public alpha themes); the package version is no longer a pre-release.

## Upgrading from 0.2.0-alpha.2

Checklist for projects that consume RDK (applications, Auto RDK, agents). Replace the CSS files and keep `fonts/` beside them; class names are unchanged and no markup change is required. Then review:

1. **Badge padding.** `.rdk-badge` now has built-in padding (`0.25em 0.6em`) and `white-space: nowrap`. Remove local badge padding patches. Long labels no longer wrap; allow for this in narrow table cells.
2. **Badge `data-accent`.** Badge accepts `data-accent` in every theme and it wins over the semantic class (`rdk-badge-warning`, Czarek `cz-status-warning`). Remove workarounds that forced accent colors on badges.
3. **New button modifiers.** `rdk-btn-sm`, `rdk-btn-lg`, `rdk-btn-ghost` and `rdk-btn-icon` work in Czarek OS, Terminal OS and Dark Horse. Replace local size/ghost/icon CSS with them. An icon-only button needs `aria-label`. In Terminal OS small and icon buttons stay 44px tall on phones (≤500px).
4. **Utilities vs. theme values.** Tailwind/application utilities override shared RDK defaults, but values set by a theme stylesheet (unlayered) win over utilities. Change such values in application CSS with a theme-scoped selector.
5. **Accent palette.** Accents are exactly `green red blue pink amber orange violet cyan`. Czarek OS uses a new balanced palette; Czarek `amber` is a bright gold fill (`#e8c52c`) with dark text, outline amber uses `#776100` text. Amber in other themes is unchanged.
6. **Czarek OS buttons.** No hover scaling, flatter elevation. `rdk-btn-danger`, `rdk-btn-success`, `rdk-btn-special` render as red/green/pink outline buttons. Outline text darkens on hover and press (contrast ≥ 4.5:1). Use `rdk-btn-outline` with `data-accent` for colored outlines.
7. **Czarek OS forms.** Invalid fields (`aria-invalid="true"`) are blue-tinted with a blue border (previously slate); dirty fields (`data-dirty="true"`) are light amber with an amber-ink border. Keep error message text in the normal text color; the field carries the state.
8. **Czarek OS feedback.** Notice and Toast success/danger/info (Notice also special) use green/red/blue/pink; warning keeps the author look (dark red `#991b1b` on light amber). The first child (usually `<strong>`) carries the tone and following text is neutral. Single-line notices without child elements keep the tone on all text.
9. **Czarek OS badges and tables.** Badge radius is `.3rem` (`cz-status-pill` keeps `.6rem`); success/danger/info/special use green/red/blue/pink. Table rows with `data-state="warning"` get a 3px amber-ink left marker; set `--cz-row-marker` to another accent token to change it.
10. **Terminal OS badge** padding is `0 .2em` (theme value).

When converting an application to Czarek OS, consider the new "Czarek OS composition guidelines" (recommendations, not requirements; an existing layout such as a desktop with windows stays) in RDK_AGENT_GUIDE.md (icons in buttons, Slim vs. Standard tables, small typography, Native Showcase elements first, status words, forms, density, feedback).

Visual QA after upgrading: check badges in tables and narrow layouts, Czarek invalid/dirty fields, Notice/Toast text, and any locally restyled buttons.

## Details

Czarek OS now follows the original author's compact form density, neutral-first action surfaces, calmer status palette, and continuous diagnostic disclosure treatment. The public Patterns documentation covers Field with Unit, Section Header, Status Pill / Status Readout, and Diagnostic / Expandable Record. An optional Enhanced Select reference implementation is available under `examples/czarek-os/enhanced-select/`; RDK remains CSS-first with no required JavaScript runtime.

The author micro-fix adds the opt-in `cz-number-no-spin` appearance helper for native number inputs. Czarek OS warning Badge, Notice and Toast foregrounds use the author's dark red `#991b1b` on their light-amber surfaces; native spinners remain the default without the helper.

The fidelity follow-up seals Outline soft elevation against shared retro shadows in compatibility CSS, restores calm dirty/invalid hover and 1px focus, aligns Enhanced Select state appearance with native fields while retaining state backgrounds on hover, restores the Tooltip pointer for below-anchor placement, and adds the reusable `cz-status-pill` large status/readout helper.

Buttons gain shared `rdk-btn-sm` / `rdk-btn-lg` size modifiers, `rdk-btn-ghost` (no surface until hover) and `rdk-btn-icon` (square) in every active theme. Utilities override these shared defaults; values set by a theme stylesheet win over utilities and are changed in application CSS. Czarek OS buttons no longer scale on hover, use flatter elevation, and render `rdk-btn-danger`, `rdk-btn-success` and `rdk-btn-special` as red, green and pink outline buttons. Czarek OS accents use one balanced palette; Czarek amber is now a bright gold fill (`#e8c52c`) with dark text, and outline amber keeps the darker `#776100` text in every state. Amber in other themes is unchanged.

Badge now has built-in padding (`0.25em 0.6em`) and does not wrap. It accepts `data-accent` in every theme; the attribute takes precedence over the semantic class. In Czarek OS accent badges match outline buttons, success/danger/info/special use green/red/blue/pink, warning keeps the author status look, and the badge radius is smaller (`cz-status-pill` keeps its larger radius). Migration: local badge padding patches can be removed; utilities override the shared default padding (not the Terminal OS theme padding), but custom padding rules that lose to `.rdk-badge` in the cascade no longer apply.

Czarek OS forms and feedback: invalid fields use a lightly tinted blue surface with a blue border, dirty fields a light amber surface; Notice and Toast success, danger, info (and Notice special) use the same green, red, blue and pink colors as Badge, while warning keeps the author palette. Notice and Toast titles carry the tone while body text stays neutral; the warning table-row marker is a 3px amber line (`--cz-row-marker` changes it); disabled navigation items are more legible. Outline buttons, semantic buttons and accent badges darken their text on hover and press to keep 4.5:1 contrast. The Native Showcase adds interactive table examples, summary cards, an accent preview and a sticky section index; these remain application examples, not new APIs.

# RDK UI 0.2.0-alpha.2

Dark Horse is the first public alpha for control, monitoring, dashboards, and focused utility applications. Its Native Showcase presents Control Window, Control Panel, Workspace, and Operational Components, including the Instrument Display and the final neutral, accent, success, info, warning, and danger signal roles. The shared Support Matrix lists 24 supported components and Tooltip as fallback. Dark Horse is included in the active combined stylesheet and has normal, minified, and Tailwind 3.4 compatibility standalone bundles. Console 94 remains archived and outside the combined CSS.

# RDK UI 0.2.0-alpha.1

This release adds complete standalone CSS bundles for Console 94, Terminal OS, and Czarek OS. The existing combined CSS remains the default for simple installation and runtime theme switching. Single-theme consumers can load a smaller standalone normal or minified file; Tailwind 3.4 Preflight consumers can use a matching unlayered compatibility file. Every standalone bundle includes the shared RDK core, components, effects, and font declarations, with only its selected theme. Keep dist/fonts/ beside copied CSS. Public theme metadata drives generation.

---

# RDK UI 0.1.0-alpha.8

This release promotes the Czarek OS Enhanced Select appearance to an alpha theme-specific CSS primitive and adds Measurement Readout and Section Icon. Select keyboard and value behavior remain application-owned; the Native Showcase JavaScript is example code. The shared native Select is unchanged. Dirty means unsaved, invalid means an error, and invalid styling wins when both states are present.

Stat Tile / Stat Grid and Field with Unit / Prefix / Suffix are documented Patterns using existing components and ordinary application layout. No shared component, runtime package, LCD support, or cross-theme API was added. The focused browser regression covers Chrome and Firefox at 390, 414, 768 and 1440 px, including keyboard states, reduced motion, and theme scoping.

---

# RDK UI 0.1.0-alpha.7

This release adds a generated unlayered compatibility stylesheet for Tailwind 3.4 with default Preflight. The standard built CSS remains layered. In a Tailwind 3 app, load the compiled Tailwind CSS first, then rdk-retro-ui.compat.min.css, and keep the sibling fonts/ directory beside it. Browser checks cover the green Console 94 solid button, hover, keyboard focus, and representative form controls.

IBM Plex Sans and Source Sans 3 now ship preferred WOFF2 files with their original TTF fallbacks and OFL notices. The compatibility CSS and fonts are available alongside the built CSS. No shared components, themes, or capability states changed.

---

# RDK UI 0.1.0-alpha.6

This release keeps the visual and component contracts of alpha.5. Routine browser and package checks run without writing screenshots. Historical phase visual scripts remain available for manual verification.

The legacy IBM Plex Mono Regular file remains available for consumers that need the static font face. Terminal OS button brackets remain an accepted accessible-name trade-off, and progress and warning intentionally share amber while their marker text distinguishes them.

---

# RDK UI 0.1.0-alpha.5

Terminal OS now uses a neutral black and graphite base, a self-hosted IBM Plex Mono variable font with real weights 400, 600, and 700, and a mono-first theme root. The font is shipped as WOFF2 with TTF fallback. Terminal Marker explicitly supports neutral and adds amber progress alongside cyan info. Notice and Toast have intrinsic padding for built-CSS consumers, and the Vanilla example includes a Terminal OS fixture.

The agent guide and Installation page describe supported token overrides. The Native Showcase demonstrates the new palette, font weights, seven Marker tones, and plain Notice/Toast. Terminal OS passed Chrome and Firefox checks at 390, 430, 768, and 1440 px. Console 94 and Czarek OS regression checks passed; the shared component count remains 25. Workflow/Stepper remains a Pattern.

CSS-generated button brackets are included in accessible names in Chrome and Firefox; this alpha release accepts that small spoken decoration without changing the shared Button API. Applications that require an exact accessible name may set an aria-label on the button. Real Android Chrome and iOS Safari device QA remain pending.

---

# RDK UI 0.1.0-alpha.4

Czarek OS is the third public theme. It brings a slate-led, content-first visual system for dense administration and production workspaces. Editable fields and enabled buttons have restrained elevation; actions use subtle hover scale with reduced-motion support. Success, warning, neutral, and destructive states have distinct colors.

The Czarek OS Native Showcase presents a compact bakery ingredient workspace with filters, a dense table, tabs, settings, a loading button, notices, and toasts. Shared components, theme recipes, compositions, and application-owned patterns are visibly labelled. Its Source Sans 3 variable font is bundled with its SIL OFL 1.1 notice. The Field Group currency prefix renders the euro symbol correctly. Native Select remains native; enhanced Select, Combobox, and Field Group remain application-owned recipes rather than shared components.

The documentation shell now follows the selected theme: Console 94 keeps its warm equipment character, Terminal OS uses compact navy terminal-inspired chrome, and Czarek OS uses its dark slate navigation and cool content canvas. The Support Matrix lists 16 supported, 6 fallback, and 3 unsupported shared components for Czarek OS. Console 94 and Terminal OS retain their existing public contracts. Windows Chrome and Firefox tests cover 1440, 768, 430, 414, and 390 px. Safari and real Android/iOS device QA remain pending.

---

# RDK UI 0.1.0-alpha.3

Terminal OS joins Console 94 as the second official alpha theme. The release adds a generated per-theme Support Matrix and component Theme support sections. Terminal OS has 17 supported, 5 fallback, and 3 unsupported shared components. Terminal Window is the first public theme-specific primitive. The Terminal OS Native Showcase is its canonical composition; the Shared Showcase remains a compatibility view. Multi-theme documentation and the consumer agent guide now describe this split.

Earlier updates improved compact interaction targets and Tooltip contrast. Console 94 passed pixel regression with 15 identical representative captures.

## Known limitations

- Android Chrome real-device QA: pending.
- iOS Safari real-device QA: pending.
- Terminal OS is compact-first, but is not yet a mobile-stable release.

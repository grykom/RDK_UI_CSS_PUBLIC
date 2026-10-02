# Unreleased — Czarek OS author alignment

Czarek OS now follows the original author's compact form density, neutral-first action surfaces, slate-led invalid fields, calmer status palette, and continuous diagnostic disclosure treatment. The public Patterns documentation covers Field with Unit, Section Header, Status Pill / Status Readout, and Diagnostic / Expandable Record. An optional Enhanced Select reference implementation is available under `examples/czarek-os/enhanced-select/`; RDK remains CSS-first with no required JavaScript runtime. The package version remains `0.2.0-alpha.2` until an owner release decision.

The author micro-fix adds the opt-in `cz-number-no-spin` appearance helper for native number inputs. Czarek OS warning Badge, Notice and Toast foregrounds use the author's dark red `#991b1b` on their light-amber surfaces; native spinners remain the default without the helper.

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

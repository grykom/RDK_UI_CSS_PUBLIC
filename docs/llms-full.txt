# RDK Retro UI — Agent Guide

Read this file before building UI with RDK Retro UI. Czarek OS, Terminal OS, and Dark Horse are active; Console 94 is archived. It describes the consumer contract for RDK source CSS, built CSS, and the `@rdk/retro-ui` package archive. RDK is CSS; your application supplies layout, state, and behavior.

## TL;DR - Start here

Choose active `czarek-os`, `terminal-os`, or `dark-horse`, then read the selected theme's support matrix in `docs/data/theme-capabilities.json`. Application HTML and Tailwind/application CSS own content, layout, responsive geometry and behavior. Use shared components for proven cross-theme roles; combine them into Patterns when a composition repeats. Use a theme-specific primitive only for that theme's reusable visual grammar. Ordinary text and one-off content can remain ordinary HTML. Customize the appearance with documented theme tokens, not copied component selectors.

**Start with ordinary HTML. Promote to a Pattern when composition repeats. Promote to a theme-specific primitive when the visual grammar belongs to one theme. Promote to a shared component only after repeated cross-theme evidence.** For deeper theme guidance, see [Adding a Theme](ADDING_A_THEME.md); maintainers also use the canonical `project/iterations/THEME_ARCHITECTURE_POLICY.md`.

## 1. What RDK is

RDK is a framework-agnostic, CSS-first visual layer. Czarek OS, Terminal OS, and Dark Horse are active public alpha themes. Console 94 remains available as an archived standalone legacy theme. It works with Tailwind CSS v4 or with ordinary application CSS. It does not ship a JavaScript component framework.

### Theme lifecycle

`status` describes maturity; `lifecycle` describes distribution. Active Czarek OS, Terminal OS, and Dark Horse receive new work and are in the combined CSS and main selector. Dark Horse is alpha: its 24 supported shared components and one Tooltip fallback are documented; minor refinements may continue before stable. Archived Console 94 receives critical compatibility fixes only, remains available through its standalone CSS and archive reference, and is excluded from the combined CSS and main selector. Choose Czarek OS for content and productivity, Terminal OS for compact terminal interfaces, or Dark Horse for control surfaces, monitoring, dashboards, and focused utilities. Choose Console 94 only when the user explicitly requests the legacy theme and load `rdk-retro-ui.console-94.min.css` with sibling fonts. Dark Horse is selected with `data-rdk-theme="dark-horse"` and its standalone CSS is `rdk-retro-ui.dark-horse.min.css` (or `rdk-retro-ui.dark-horse.compat.min.css` for Tailwind 3.4 Preflight).

## 2. Golden rule

**Tailwind/application CSS controls geometry and layout. RDK controls visual identity.**

```html
<button type="button" class="rdk-btn rdk-btn-solid h-10 px-4 text-sm" data-accent="blue">Save</button>
```

`rdk-btn` and `rdk-btn-solid` provide the surface and interaction styling. `data-accent` selects its visual accent. `h-10`, `px-4`, and `text-sm` set dimensions and type size in Tailwind. Use ordinary app CSS for those dimensions when Tailwind is absent. Do not invent `rdk-flex`, `rdk-gap-4`, `rdk-w-full`, or `rdk-grid-cols-2`.

### Composition before componentization

| Ask | Use |
| --- | --- |
| Mainly content or a one-off arrangement? | Ordinary semantic HTML. |
| Repeatable composition of existing pieces? | Pattern. |
| Reusable visual construct meaningful in one theme? | Theme-specific primitive. |
| Reusable semantic UI role across themes and applications? | Shared component. |

Do not wrap every text fragment in an RDK class. Reuse an existing theme primitive instead of recreating it in application CSS. Do not force a Console 94 metaphor into another theme for parity or choose a fallback component when a supported native alternative exists. Patterns may mix RDK classes, ordinary HTML and application/Tailwind utilities. Check the selected theme's capability state before composing.

In Terminal OS, Terminal Window, Prompt, Cursor and Marker are theme-specific primitives; a timestamp or log sentence is ordinary HTML; a complete launcher/session is a Pattern. Page layout and polling belong to the application. Neutral is a valid/default state such as `[ IDLE ]`; muted deliberately de-emphasizes secondary or inactive content such as an old timestamp or `[ -- ]`. Marker tones are neutral, progress, info, success, warning, danger and muted. Progress is an active/waiting amber state; info is cyan. Progress and warning intentionally share amber; their visible marker text distinguishes them.

## 3. Installation modes

The package is **not** published to the public npm registry. The owner may provide a verified `.tgz` archive. Install the supplied file in your project with `npm install ./path/to/rdk-retro-ui-VERSION.tgz`, replacing the path and version with the provided values.

**Installed tarball + Tailwind v4 source:**

```css
@import "tailwindcss";
@source "./index.html";
@import "@rdk/retro-ui/source.css";
```

Point `@source` at all templates/components containing utility class names. This import order and package path were tested in a separate Vite consumer. `@rdk/retro-ui` also exports the same source CSS.

**Built CSS without a Tailwind build integration:** copy `node_modules/@rdk/retro-ui/dist/rdk-retro-ui.css` (or `.min.css`) together with its sibling `dist/fonts/` into one static asset directory; load the CSS with a normal `<link>`. The package exports `@rdk/retro-ui/dist.css`, `@rdk/retro-ui/dist.min.css`, and `@rdk/retro-ui/fonts/*` for bundlers. The CSS uses relative `./fonts/` URLs. Your application CSS supplies geometry.

**Choosing a built bundle:** The combined dist/rdk-retro-ui.min.css is the default for simple installation and runtime theme switching. For an application committed to one theme, use its smaller dist/rdk-retro-ui.THEME.min.css or the package export @rdk/retro-ui/themes/THEME.min.css, where THEME is a registered public ID. The standalone bundle already contains all shared core, components, effects and font declarations; load only that bundle with sibling fonts/ and set data-rdk-theme as usual. Switching to a different theme requires the combined bundle or loading the additional theme bundle. For Tailwind 3.4 with default Preflight, use the matching THEME.compat.min.css variant after compiled Tailwind CSS.

**Prebuilt CSS with an existing Tailwind project:** for Tailwind 3.4 with default Preflight, copy the generated `dist/rdk-retro-ui.compat.min.css` and the sibling `dist/fonts/` directory. Load the application's compiled Tailwind CSS first, then the RDK compatibility CSS. Tailwind 3 Preflight emits an unlayered reset that overrides normal layered RDK declarations regardless of link order; the generated compatibility build keeps RDK's rules unlayered. Use the normal layered build for a project without Tailwind integration. See Installation for a complete HTML example. The package also exports `@rdk/retro-ui/compat.css` and `@rdk/retro-ui/compat.min.css`. This compatibility path is verified with Tailwind 3.4 and default Preflight.

**Repository/local source:** after Tailwind, import the local `src/index.css` from the RDK checkout by its real relative path. This is useful while developing RDK.

**Public consumer mirror:** clone or download RDK_UI_CSS_PUBLIC for source CSS, built CSS, fonts, examples, and documentation. Bundle or copy CSS and sibling fonts into your application; GitHub Pages is for documentation and demos.

## 4. Minimal setup

Put the CSS import in your application entry stylesheet. Ensure the built CSS and `fonts/` retain their sibling relationship if copying files. Choose `czarek-os`, `terminal-os`, or `dark-horse` with `data-rdk-theme` on `<html>` or a containing element. The example below uses Czarek OS. Then combine semantic HTML, RDK appearance classes, and your layout utilities.

## 5. Theme activation

```html
<html lang="en" data-rdk-theme="czarek-os">
```

Use the active public IDs `czarek-os`, `terminal-os`, and `dark-horse` for new applications; `console-94` is a public archived ID for legacy use only. Component class names and semantic states are shared, but capability varies by theme: apply `data-rdk-theme` on an ancestor or root, check the Support Matrix, and choose supported patterns for native compositions. Do not hard-code Console 94 color, surface, shadow, or type values in application CSS. Console 94 uses IBM Plex Sans for UI/display and IBM Plex Mono for readouts; keep its local font files accessible. Its radius is R1 (`--rdk-radius`) and its decorative vent is V1B. Tailwind/application CSS owns layout; the RDK theme owns visual identity.

## 6. Tailwind + RDK responsibility split

Use Tailwind or application CSS for grid/flex, width, spacing, padding, type size, breakpoints, overflow, and positioning. Use RDK for component surfaces, borders, shadows, palette, states, focus styling, and decorative motifs. Tailwind classes can compose with `rdk-*` classes; they do not replace semantic controls. Built RDK CSS does not include Tailwind layout utilities.

## 7. Public component catalog

Foundations/primitives: Label, Display Title, Bevel, Pressed Bevel, Recessed, Plastic, Vent.

Forms/actions: Button, Input, Select, Textarea, Checkbox, Radio, Toggle, Range.

Content/status: Panel, Card, Badge, LCD, Status LED, Progress, Segments, Disclosure.

Navigation/data: Navigation Item, Tabs, Table, Breadcrumbs.

Layers/feedback: Menu, Dialog, Tooltip, Notice, Toast.

## 8. Component usage contracts

| Component | Public classes | Contract |
| --- | --- | --- |
| Label / Display Title | `rdk-label`, `rdk-display-title` | Typography treatments; use real headings and labels. |
| Bevel / Pressed Bevel | `rdk-bevel`, `rdk-bevel-pressed` | Surface effects, not controls by themselves. |
| Recessed / Plastic / Vent | `rdk-recessed`, `rdk-plastic`, `rdk-vent` | Enclosure details; vent is decorative, never a data display. |
| Button | `rdk-btn` with `rdk-btn-primary`, `rdk-btn-success`, `rdk-btn-danger`, `rdk-btn-special`, `rdk-btn-solid`, or `rdk-btn-outline` | Use `<button>` for actions; solid/outline accept `data-accent`. Set size/padding separately. Use `aria-pressed` only for a true toggle action. |
| Input | `rdk-input` | Use labeled native `<input>`; `aria-invalid="true"` marks an error. Preserve `readonly` vs `disabled`. |
| Select | `rdk-select` | Use labeled native `<select>`; supports `disabled` and `aria-invalid="true"`. |
| Textarea | `rdk-textarea` | Use labeled native `<textarea>`; supports `readonly`, `disabled`, and `aria-invalid="true"`. |
| Checkbox | `rdk-checkbox` | Native `<input type="checkbox">` inside/with a label. JS may set `indeterminate`. |
| Radio | `rdk-radio` | Native radios with common `name`; group with `<fieldset>` and `<legend>`. |
| Toggle | `rdk-toggle` | Native checkbox with `role="switch"` and a label; it is user input, not a status lamp. |
| Panel | `rdk-panel`, `rdk-panel-recessed` | Static enclosure/content grouping; choose semantic container. |
| Card | `rdk-card`, `rdk-card-interactive` | Use static article/section, or a real button/link for interactive cards. App updates `aria-pressed` or `aria-current`. |
| Badge | `rdk-badge` with `rdk-badge-neutral`, `rdk-badge-success`, `rdk-badge-warning`, `rdk-badge-danger`, `rdk-badge-info`, `rdk-badge-special` | Informational text status, never color alone. |
| LCD | `rdk-lcd` | Textual readout; `data-state="off"` is an off appearance. Keep readable text. |
| Status LED | `rdk-status-led` | Output/status indicator; supports `data-color="red|blue|pink"` and `data-state="off"`. Give an accessible status name nearby or on the element. |
| Progress | `rdk-progress` | Use native `<progress value max>` and a label; accepts `data-accent`. Omit `value` for indeterminate. |
| Segments | `rdk-segments` | Segmented status/value; child `<span data-active>` marks active cells. Give the group a textual name/value such as `role="progressbar"` with ARIA values. Accepts `data-accent`. |
| Disclosure | `rdk-disclosure`, `rdk-disclosure-summary`, `rdk-disclosure-body` | Use native `<details>` with a first-child `<summary>`. Browser owns `open`, click, Enter/Space and focus. Neutral styling; no accent or required JS. |
| Range | `rdk-range` | Use labeled native `<input type="range">`. Supports eight `data-accent` values on the thumb; neutral track in Chrome and Firefox. Browser owns keyboard/drag/disabled. App may show the current value in text. |
| Breadcrumbs | `rdk-breadcrumbs`, `rdk-breadcrumb` | Use named `<nav>` with `<ol>/<li>`. Put `aria-current="page"` on the plain-text current item. CSS separators are decorative; links and layout remain native. |
| Navigation Item | `rdk-nav-item`, `rdk-nav-item-icon`, `rdk-nav-item-label`, `rdk-nav-item-meta` | Use `<a>` for navigation with `aria-current="page"`; use `<button>` and `aria-pressed` for local selection. Accepts `data-accent`. |
| Tabs | `rdk-tabs`, `rdk-tab` | App manages `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, focus, `hidden`, and arrow/Home/End keys. |
| Table | `rdk-table` | Use real table/caption/headers. `data-align="numeric"` aligns numbers; `tr[data-state="warning"]` adds a warning rail. |
| Menu | `rdk-menu`, `rdk-menu-item`, `rdk-menu-separator`, `rdk-menu-label` | App opens/closes menu and implements focus, arrows, Escape, and item selection. Disabled item uses native `disabled` or `aria-disabled`. `data-tone="danger"` marks a danger item. |
| Dialog | `rdk-dialog`, `rdk-dialog-header`, `rdk-dialog-body`, `rdk-dialog-footer` | Prefer native `<dialog>` and `showModal()`/`close()`; app wires triggers and return focus. |
| Tooltip | `rdk-tooltip` | Supplemental help, never required information. CSS supports hover/focus-within or `data-open="true"`; app owns any JS positioning/show-hide. |
| Notice | `rdk-notice` with `rdk-notice-neutral`, `rdk-notice-success`, `rdk-notice-warning`, `rdk-notice-danger`, `rdk-notice-info`, `rdk-notice-special` | Inline semantic feedback; include readable message. Variants convey meaning. |
| Toast | `rdk-toast` with `rdk-toast-neutral`, `rdk-toast-success`, `rdk-toast-warning`, `rdk-toast-danger`, `rdk-toast-info` | Temporary feedback; app owns lifecycle, dismissal, live-region policy, and timing. |

## 9. Accent system

Exactly eight categorical accents are supported: `green`, `red`, `blue`, `pink`, `amber`, `orange`, `violet`, `cyan`. These components accept `data-accent` when you want to choose a specific categorical accent: Navigation Item, Solid Button, Outline Button, Progress, Segments, or Range. Blue is the shared baseline accent. A theme may define its native default when `data-accent` is omitted; Dark Horse uses amber for native active/selected emphasis. Semantic variants such as `rdk-notice-danger` and `rdk-badge-success` carry meaning; do not replace them with arbitrary categorical accents. Status LED has its narrower `data-color` contract, not `data-accent`.

## 10. Public CSS variables

The public tokens shared by every registered theme are:

- Surfaces/structure: `--rdk-case`, `--rdk-surface`, `--rdk-surface-raised`, `--rdk-surface-recessed`, `--rdk-structure`, `--rdk-border`, `--rdk-border-dark`, `--rdk-highlight`, `--rdk-shadow`.
- Text/type: `--rdk-text`, `--rdk-text-muted`, `--rdk-font-ui`, `--rdk-font-display`, `--rdk-font-mono`.
- Accent/focus: `--rdk-accent-green`, `--rdk-accent-red`, `--rdk-accent-blue`, `--rdk-accent-pink`, `--rdk-accent-amber`, `--rdk-accent-orange`, `--rdk-accent-violet`, `--rdk-accent-cyan`, `--rdk-focus`.
- LCD/fields: `--rdk-lcd`, `--rdk-lcd-ink`, `--rdk-lcd-off`, `--rdk-lcd-off-surface`, `--rdk-lcd-border`, `--rdk-lcd-border-dark`, `--rdk-field`, `--rdk-placeholder`.
- Radius: `--rdk-radius`.

These are the supported theme customization surface; inspect docs/data/themes.json for IDs and docs/colors/ for live values. Override them on the selected theme root after importing RDK CSS. This keeps component semantics and allows an intentional departure from the Native Showcase appearance; the consuming project owns final contrast and brand QA. Variables with the private underscore prefix are implementation details. Choose documented component variants and avoid copying or rewriting `.rdk-*` selectors.

```css
:root[data-rdk-theme="terminal-os"] {
  --rdk-case: #050607;
  --rdk-surface: #101316;
  --rdk-font-ui: "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace;
  --rdk-font-display: var(--rdk-font-ui);
  --rdk-font-mono: var(--rdk-font-ui);
}
```

The named local fonts in this example are optional consumer-provided fonts. RDK itself bundles IBM Plex Mono locally and makes no runtime font request.

## 11. Layout and responsive rules

Build mobile-first. Give narrow screens one column and add `sm:`/`md:`/`lg:` columns only when content fits. Apply `min-w-0` to flex/grid children with long text, use `overflow-x-auto` around wide data tables, and check 390 px and desktop widths. Do not depend on RDK for spacing or responsive layout. Keep enough touch area around controls with Tailwind or app CSS.

## 12. Accessibility rules

Use native controls, labels, fieldsets, caption/header cells, and visible focus. Use `aria-current` for current navigation, `aria-selected` on tabs, and `aria-pressed` only for toggled buttons. Distinguish `disabled` from `readonly`. Use native `<dialog>` when possible. Implement keyboard control for menus and tabs. Tooltips only supplement visible/available information. Label progress and expose its value textually. Color must not be the only state carrier. In Terminal OS, CSS-generated Button brackets are included in the accessible name in tested Chrome and Firefox (for example, "[ Execute ]"). This alpha release accepts the small spoken decoration without changing shared Button markup. CSS pseudo-elements cannot receive aria-hidden; removing brackets from the spoken name later may require real aria-hidden markup and a shared Button contract change. If an application requires the exact name "Execute", it may set aria-label="Execute" on that button and keep the label synchronized with visible text. This guide does not claim universal WCAG certification.

## 13. Interactive behavior ownership

RDK is not a JavaScript framework. Native Button, Input, Checkbox, Radio, Toggle, Select, Progress, Range, and Disclosure keep their browser behavior. RDK styles Menu, Tabs, Toast, Tooltip, Dialog, and Navigation Item, but your application owns opening, selection, keyboard handling, state updates, focus management, and lifecycle. Prefer native `<dialog>.showModal()` for modal behavior. Scripts in the docs are demos, not package APIs; do not copy them blindly.

Django templates, HTMX and other stacks may combine their own attributes with RDK classes. For example, `<div class="rdk-panel" hx-get="/session/status" hx-trigger="every 1s" hx-swap="outerHTML">Session ready</div>` uses application-owned `hx-*` behavior. RDK supplies no polling, timer, routing, AJAX or workflow-state behavior and has no HTMX/Django runtime dependency.

## 14. Copy-ready examples

### Action button

```html
<button type="button" class="rdk-btn rdk-btn-solid h-10 px-4 text-sm" data-accent="blue">Save</button>
```

### Form field

```html
<label class="grid gap-2" for="station-name"><span class="rdk-label">Station name</span></label>
<input id="station-name" class="rdk-input h-10 w-full px-3" aria-describedby="station-help">
<p id="station-help">Shown in the console.</p>
```

### Navigation list item

```html
<nav aria-label="Sections" class="grid gap-2">
  <a class="rdk-nav-item" data-accent="amber" href="/overview" aria-current="page">
    <span class="rdk-nav-item-label">Overview</span><span class="rdk-nav-item-meta">12</span>
  </a>
</nav>
```

### Status/readout panel

```html
<section class="rdk-panel grid gap-4 p-5 sm:grid-cols-2" aria-label="Station A4 status">
  <div><span class="rdk-label">Station A4</span><div class="rdk-lcd mt-3 p-4" aria-label="State: ready">READY 94</div></div>
  <p><span class="rdk-status-led" role="img" aria-label="Online"></span> Online</p>
</section>
```

### Progress

```html
<label class="grid gap-2">Calibration · 68%<progress class="rdk-progress w-full" data-accent="cyan" value="68" max="100">68%</progress></label>
```

### Disclosure

```html
<details class="rdk-disclosure">
  <summary class="rdk-disclosure-summary">Calibration details</summary>
  <div class="rdk-disclosure-body">Sensor A4 is ready.</div>
</details>
```

### Range

```html
<label for="gain">Gain</label>
<input id="gain" type="range" class="rdk-range w-full" data-accent="cyan" min="0" max="100" value="68">
```

### Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol class="rdk-breadcrumbs">
    <li class="rdk-breadcrumb"><a href="/">Library</a></li>
    <li class="rdk-breadcrumb" aria-current="page">Calibration</li>
  </ol>
</nav>
```

### Data table wrapper

```html
<div class="overflow-x-auto"><table class="rdk-table min-w-full"><caption>Stations</caption><thead><tr><th scope="col">Station</th><th scope="col" data-align="numeric">Load</th></tr></thead><tbody><tr><th scope="row">A4</th><td data-align="numeric">68%</td></tr></tbody></table></div>
```

### Menu trigger + menu markup

```html
<div class="relative">
  <button type="button" class="rdk-btn h-10 px-4" aria-haspopup="menu" aria-expanded="false" aria-controls="station-menu">Actions</button>
  <div id="station-menu" class="rdk-menu absolute z-10 w-48 p-2" role="menu" hidden>
    <button type="button" class="rdk-menu-item px-3 py-2" role="menuitem">Refresh</button>
    <button type="button" class="rdk-menu-item px-3 py-2" role="menuitem" data-tone="danger">Delete</button>
  </div>
</div>
```

Your app must update `aria-expanded`, `hidden`, focus, arrow-key movement, and Escape behavior.

### Native dialog

```html
<button type="button" class="rdk-btn h-10 px-4" id="open-settings">Settings</button>
<dialog class="rdk-dialog w-full max-w-lg" id="settings-dialog" aria-labelledby="settings-title">
  <div class="rdk-dialog-header p-4"><h2 id="settings-title">Settings</h2></div>
  <div class="rdk-dialog-body p-4">Edit station settings.</div>
  <div class="rdk-dialog-footer p-4"><button type="button" class="rdk-btn h-10 px-4" id="close-settings">Close</button></div>
</dialog>
```

Wire `open-settings` to `settings-dialog.showModal()` and `close-settings` to `.close()` in app JS.

### Notice

```html
<div class="rdk-notice rdk-notice-success p-4" role="status"><strong>Saved.</strong> Station settings are up to date.</div>
```

## 15. Patterns

Compose components according to meaning: a form groups labeled native fields and actions; a control panel groups status, LCD, progress, and actions; a data view wraps a semantic table; a navigation list uses anchors for routes and buttons for local selection. Keep feedback in a Notice for persistent inline messages and a Toast for transient messages. Keep overlay behavior in application code. The documentation has `patterns/form/`, `patterns/control-panel/`, `patterns/status/`, `patterns/data-table/`, `patterns/overlays/`, and `patterns/navigation-list/` under its site root. The public Patterns page also has theme-aware Workflow / Stepper, Empty State, and Sensor / Readout recipes. Compose form rows with ordinary labels, fields, help and error text.

## 16. Things you must not do

- Do not recreate RDK appearance in project CSS, add arbitrary component border radii, or replace IBM Plex without intentionally changing theme.
- Do not use Vent as progress/status data, Status LED as input, Radio as output, or Toggle as a lamp.
- Do not invent `rdk-*` layout utilities or assume every component accepts `data-accent`.
- Do not use color alone for state or paint every surface in an accent color.
- Do not replace native controls with generic `<div>` elements.
- Do not assume documentation demo JavaScript ships in the package.
- Do not modify public RDK classes inside a consuming project.
- Do not use a public npm install command or use GitHub Pages as a production CSS CDN.

## 17. Decision checklist before generating UI

1. What semantic component is this?
2. Which public `rdk-*` class owns its appearance?
3. Which layout and size belong to Tailwind or app CSS?
4. Does this component actually support `data-accent`?
5. Does native HTML already provide the right semantics?
6. Which interactions need app JavaScript?
7. Are keyboard, focus, labels, and state text preserved?
8. Am I overriding RDK appearance locally when I should reuse it?

## 18. Where to find deeper documentation

The public human documentation has Overview, Installation, Colors, Components, Patterns, and CSS Classes under docs/. Its Demo link opens the selected native showcase. Detailed architecture, capability data, primitive contracts and application behavior remain in this guide and the machine-readable registries.

## 19. Version / compatibility

This guide describes RDK `0.2.0-alpha.2` with Tailwind v4 source and Tailwind 3.4 Preflight compatibility paths. `package.json` is the version source of truth. The validated Node/Vite build uses Tailwind 4.3.3 from `package-lock.json`; an optional Windows CLI download is also pinned to 4.3.3. The standalone tool is a convenience, not a package requirement. Built CSS can also be used with an existing Tailwind pipeline.

## Multi-theme support

RDK has three active themes: choose `czarek-os` for content and productivity, `terminal-os` for compact-first terminal interfaces, or `dark-horse` for control surfaces, monitoring, dashboards, and focused utility applications. Console 94 remains public as a standalone archived theme. Terminal OS is an official alpha theme, verified in desktop Chrome and Firefox at emulated 390, 430, 768, and 1440 px. Android Chrome and iOS Safari real-device QA are pending; do not describe it as mobile-stable.

Read the canonical capability manifest at docs/data/theme-capabilities.json and the human Components page at docs/components/ before selecting components. Every shared component has one of three statuses per theme: supported means a native, tested shared pattern; fallback means usable but not preferred for a native composition; unsupported means it should not be used in new interfaces for that theme. Console 94 has 25 supported shared components. Terminal OS has 17 supported, 5 fallback, and 3 unsupported. Czarek OS has 16 supported, 6 fallback, and 3 unsupported. Dark Horse has 24 supported and one fallback (Tooltip), with no unsupported shared components. In Terminal OS, Toggle, Badge, Card, Progress, and Tooltip are fallback. Segments, LCD, and Status LED are unsupported. Prefer Checkbox for a boolean choice and text status instead of Status LED.

Shared components such as Button, Input, Table, and Dialog keep their semantic HTML API across themes. A theme-specific primitive belongs to one theme and need not be ported to another. Terminal OS owns Terminal Window (`rdk-terminal-window`, `rdk-terminal-window-bar`, `rdk-terminal-window-body`), Prompt (`rdk-terminal-prompt`), Cursor (`rdk-terminal-cursor`) and Marker (`rdk-terminal-marker`). These classes are styled only under `data-rdk-theme="terminal-os"`; they provide visual treatment, not layout or behavior. Keep prompt text and marker text in selectable HTML, for example `<span class="rdk-terminal-marker" data-tone="warning">[ WARN ]</span>`. The Cursor is decorative with `aria-hidden="true"`; it stays visible without blinking under reduced motion. Log lines, timestamps and commands remain ordinary HTML. The colored window dots are decoration.

### Dark Horse consumer contract

Choose `dark-horse` for control surfaces, monitoring, dashboards, and focused utility applications. The theme can be composed from ordinary shared components, or use a Control Window for a small focused utility, a Control Panel for contained operational work, or a Workspace for a larger application. These are options; theme support does not require any particular application layout.

Dark Horse amber means active, selected, or primary operational emphasis. Warning uses a separate orange signal. Neutral means structural or standby, success means nominal or healthy, info means informational or connected, and danger means error, offline, or critical. Keep the state named in text.

Dark Horse supports 24 shared components. Tooltip is the only fallback: use it for supplementary, non-critical information; positioning belongs to the application. Segments remains the segmented progress/readout component and does not add selection semantics. The theme is alpha, and its visual refinements or theme-specific patterns may change before stable.

Theme-specific patterns are not shared component APIs: Control Window (`rdk-dark-horse-window`), Control Panel (`rdk-dark-horse-control-panel`), Workspace (`rdk-dark-horse-workspace`), Metric (`rdk-dark-horse-metric`, `rdk-dark-horse-metric-label`, `rdk-dark-horse-metric-meta`, `rdk-dark-horse-metric-unit`, `rdk-dark-horse-metric-value`, `rdk-dark-horse-metric-value-line`), Status Row (`rdk-dark-horse-status`, `rdk-dark-horse-status-mark`, `rdk-dark-horse-status-name`, `rdk-dark-horse-status-value`), Device / Output Tile (`rdk-dark-horse-device-tile`, `rdk-dark-horse-device-tile-copy`, `rdk-dark-horse-device-tile-marker`, `rdk-dark-horse-device-tile-meta`, `rdk-dark-horse-device-tile-name`, `rdk-dark-horse-device-tile-state`), Telemetry Row (`rdk-dark-horse-telemetry-label`, `rdk-dark-horse-telemetry-meter`, `rdk-dark-horse-telemetry-row`, `rdk-dark-horse-telemetry-state`, `rdk-dark-horse-telemetry-value`), Event / Log Row (`rdk-dark-horse-event-copy`, `rdk-dark-horse-event-detail`, `rdk-dark-horse-event-row`, `rdk-dark-horse-event-state`, `rdk-dark-horse-event-time`, `rdk-dark-horse-event-title`), Micro-status (`rdk-dark-horse-micro-status`), and Instrument Display (`rdk-dark-horse-instrument`, `rdk-dark-horse-instrument--compact`, `rdk-dark-horse-instrument-channel`, `rdk-dark-horse-instrument-header`, `rdk-dark-horse-instrument-label`, `rdk-dark-horse-instrument-mark`, `rdk-dark-horse-instrument-meta`, `rdk-dark-horse-instrument-readings`, `rdk-dark-horse-instrument-title`, `rdk-dark-horse-instrument-unit`, `rdk-dark-horse-instrument-value`, `rdk-dark-horse-instrument-value-line`, `rdk-dark-horse-meter`). Keep the application layout and behavior in application-owned code.



The [Dark Horse Native Showcase](docs/showcase/dark-horse/), [Terminal OS Native Showcase](docs/showcase/terminal-os/), [Czarek OS Native Showcase](docs/showcase/czarek-os/), and [archived Console 94 Showcase](docs/showcase/console-94/) are canonical visual presentations of their themes. A Native Showcase may include shared components, theme-specific patterns and compositions without changing shared API or capability status. The Compatibility Showcase demonstrates shared component styling across themes. Choose shared components from the capability manifest, use registered theme-specific primitives only in their theme, and keep native semantics and application behavior in your app.

### Czarek OS consumer contract

Start with shared semantic classes such as rdk-btn, rdk-input, rdk-select, rdk-textarea, rdk-panel, rdk-card, rdk-tabs, rdk-table, rdk-badge, rdk-notice, and rdk-toast. Check docs/components/ and docs/data/theme-capabilities.json before choosing other components. The [Czarek OS Colors page](docs/colors/) shows active visual tokens; the [Czarek OS Native Showcase](docs/showcase/czarek-os/) is the canonical presentation: approved Stage A visual patterns appear first, followed by a compact bakery operations workspace. The documentation shell also follows the selected theme.

Slate is the baseline for surfaces, text, navigation, focus, and primary actions. Use emerald for success, amber/orange for warning or unsaved attention, slate for neutral information, and red for destructive actions or hard failure. Do not recreate Czarek OS by scattering arbitrary Tailwind slate utilities around unrelated markup. The theme styles editable fields and enabled action buttons with restrained elevation; static Panel and Card stay flat. Enabled buttons scale subtly on hover, with reduced-motion support.

Source Sans 3 is bundled locally and licensed separately under SIL OFL 1.1. Lucide outline icons are recommended, not required by RDK. A leading icon may use the Czarek OS-only `cz-btn-icon` recipe. An icon-only button needs an accessible name. A busy action keeps its label, toggles `aria-busy="true"` and `disabled` in application JavaScript, and swaps `cz-btn-leading` for the CSS-driven `cz-btn-loader`; restore both states after completion.

The shared `rdk-select` remains a native `<select>` with a browser-owned popup. Enhanced Select is a Czarek OS alpha visual primitive: `cz-select`, `cz-select-trigger`, `cz-select-value`, `cz-select-chevron`, `cz-select-menu`, `cz-select-option`, and `cz-select-option-check`. Use a combobox trigger with `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` and `aria-activedescendant` while open; use a listbox with options whose `aria-selected` is the selection source of truth. `data-active` marks the keyboard highlight independently of hover. The application owns all keys, focus, selection, synchronization and popup placement; RDK ships no select runtime. Editable Combobox remains a candidate. Field with Unit stays a Pattern; the Native Showcase demonstrates a suffix and a euro prefix. A Czarek OS field or enhanced trigger may use `data-dirty="true"` for an unsaved amber/orange state; `aria-invalid="true"` means invalid and visually wins when both are present. Error messages still need text and `aria-describedby`. Use shared `rdk-badge-warning`, `rdk-notice-warning`, or `rdk-toast-warning` for new warning states. Existing Czarek OS `cz-status-warning` remains a compatible theme-specific alias.

Use `cz-readout`, `cz-readout-value`, and `cz-readout-unit` for modern technical values; this does not change Czarek OS LCD support. `cz-section-icon` styles a decorative SVG surface beside ordinary heading markup. Stat Tile / Stat Grid and Field with Unit / Prefix / Suffix are Patterns, not new primitive or shared component classes; the application supplies their grid, wrapper and form behavior.

The Native Showcase uses application JavaScript for Enhanced Select, Combobox, filters, Tabs, dirty state, saving, and Toast. Enhanced Select behavior on that page is fixture code, not an RDK JavaScript API. Reuse documented recipes and keep behavior in the application. Czarek OS was verified in Windows Chrome and Firefox at 1440, 768, 430, 414, and 390 px; Safari and real mobile devices remain untested.

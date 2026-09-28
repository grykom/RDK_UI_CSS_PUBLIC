# RDK Retro UI — Agent Guide

Read this file before building UI with RDK Retro UI / Console 94 or Terminal OS. It describes the consumer contract for RDK source CSS, built CSS, and the privately shared `@rdk/retro-ui` tarball. RDK is CSS; your application supplies layout, state, and behavior.

## 1. What RDK is

RDK is a framework-agnostic, CSS-first visual layer with two public themes: Console 94 uses warm equipment surfaces, while Terminal OS uses a compact blue-black terminal language. It works with Tailwind CSS v4 or with ordinary application CSS. It does not ship a JavaScript component framework.

## 2. Golden rule

**Tailwind/application CSS controls geometry and layout. RDK controls visual identity.**

```html
<button type="button" class="rdk-btn rdk-btn-solid h-10 px-4 text-sm" data-accent="blue">Save</button>
```

`rdk-btn` and `rdk-btn-solid` provide the surface and interaction styling. `data-accent` selects its visual accent. `h-10`, `px-4`, and `text-sm` set dimensions and type size in Tailwind. Use ordinary app CSS for those dimensions when Tailwind is absent. Do not invent `rdk-flex`, `rdk-gap-4`, `rdk-w-full`, or `rdk-grid-cols-2`.

## 3. Installation modes

The package is **not** available from the public npm registry. The public consumer mirror is RDK_UI_CSS_PUBLIC. The owner runs `npm run release:prepare` in the RDK checkout and shares `release/rdk-retro-ui-<version>.tgz` directly. In your own project, install the supplied file with `npm install ./path/to/rdk-retro-ui-VERSION.tgz` after replacing the path and version.

**Installed tarball + Tailwind v4 source:**

```css
@import "tailwindcss";
@source "./index.html";
@import "@rdk/retro-ui/source.css";
```

Point `@source` at all templates/components containing utility class names. This import order and package path were tested in a separate Vite consumer. `@rdk/retro-ui` also exports the same source CSS.

**Built CSS without Tailwind:** copy `node_modules/@rdk/retro-ui/dist/rdk-retro-ui.css` (or `.min.css`) together with its sibling `dist/fonts/` into one static asset directory; load the CSS with a normal `<link>`. The package exports `@rdk/retro-ui/dist.css`, `@rdk/retro-ui/dist.min.css`, and `@rdk/retro-ui/fonts/*` for bundlers. The CSS uses relative `./fonts/` URLs. Your application CSS supplies geometry.

**Repository/local source:** after Tailwind, import the local `src/index.css` from the RDK checkout by its real relative path. This is useful while developing RDK.

**Public consumer mirror:** clone or download RDK_UI_CSS_PUBLIC for source CSS, built CSS, fonts, examples, and documentation. Bundle or copy CSS and sibling fonts into your application; GitHub Pages is for documentation and demos.

## 4. Minimal setup

Put the CSS import in your application entry stylesheet. Ensure the built CSS and `fonts/` retain their sibling relationship if copying files. Choose `console-94` or `terminal-os` with `data-rdk-theme` on `<html>` or a containing element. The example below uses Console 94. Then combine semantic HTML, RDK appearance classes, and your layout utilities.

## 5. Theme activation

```html
<html lang="en" data-rdk-theme="console-94">
```

Use only registered public theme IDs; the public choices are `console-94` (stable identity) and `terminal-os` (alpha identity). Component class names and semantic states are shared, but capability varies by theme: apply `data-rdk-theme` on an ancestor or root, check the Support Matrix, and choose supported patterns for native compositions. Do not hard-code Console 94 color, surface, shadow, or type values in application CSS. Console 94 uses IBM Plex Sans for UI/display and IBM Plex Mono for readouts; keep its local font files accessible. Its radius is R1 (`--rdk-radius`) and its decorative vent is V1B. Tailwind/application CSS owns layout; the RDK theme owns visual identity.

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
| Badge | `rdk-badge` with `rdk-badge-neutral`, `rdk-badge-success`, `rdk-badge-danger`, `rdk-badge-info`, `rdk-badge-special` | Informational text status, never color alone. |
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
| Notice | `rdk-notice` with `rdk-notice-neutral`, `rdk-notice-success`, `rdk-notice-danger`, `rdk-notice-info`, `rdk-notice-special` | Inline semantic feedback; include readable message. Variants convey meaning. |
| Toast | `rdk-toast` with `rdk-toast-neutral`, `rdk-toast-success`, `rdk-toast-danger`, `rdk-toast-info` | Temporary feedback; app owns lifecycle, dismissal, live-region policy, and timing. |

## 9. Accent system

Exactly eight categorical accents are supported: `green`, `red`, `blue`, `pink`, `amber`, `orange`, `violet`, `cyan`. Use `data-accent="blue"` only on Navigation Item, Solid Button, Outline Button, Progress, Segments, or Range. Blue is the default for these. Semantic variants such as `rdk-notice-danger` and `rdk-badge-success` carry meaning; do not replace them with arbitrary categorical accents. Status LED has its narrower `data-color` contract, not `data-accent`.

## 10. Public CSS variables

The public tokens shared by every registered theme are:

- Surfaces/structure: `--rdk-case`, `--rdk-surface`, `--rdk-surface-raised`, `--rdk-surface-recessed`, `--rdk-structure`, `--rdk-border`, `--rdk-border-dark`, `--rdk-highlight`, `--rdk-shadow`.
- Text/type: `--rdk-text`, `--rdk-text-muted`, `--rdk-font-ui`, `--rdk-font-display`, `--rdk-font-mono`.
- Accent/focus: `--rdk-accent-green`, `--rdk-accent-red`, `--rdk-accent-blue`, `--rdk-accent-pink`, `--rdk-accent-amber`, `--rdk-accent-orange`, `--rdk-accent-violet`, `--rdk-accent-cyan`, `--rdk-focus`.
- LCD/fields: `--rdk-lcd`, `--rdk-lcd-ink`, `--rdk-lcd-off`, `--rdk-lcd-off-surface`, `--rdk-lcd-border`, `--rdk-lcd-border-dark`, `--rdk-field`, `--rdk-placeholder`.
- Radius: `--rdk-radius`.

These are theme tokens; inspect `/docs/reference/themes/` for available IDs and `/docs/reference/variables/` for values and context. `--_rdk-*` variables are internal implementation details. Select documented component variants instead of overriding implementation variables.

## 11. Layout and responsive rules

Build mobile-first. Give narrow screens one column and add `sm:`/`md:`/`lg:` columns only when content fits. Apply `min-w-0` to flex/grid children with long text, use `overflow-x-auto` around wide data tables, and check 390 px and desktop widths. Do not depend on RDK for spacing or responsive layout. Keep enough touch area around controls with Tailwind or app CSS.

## 12. Accessibility rules

Use native controls, labels, fieldsets, caption/header cells, and visible focus. Use `aria-current` for current navigation, `aria-selected` on tabs, and `aria-pressed` only for toggled buttons. Distinguish `disabled` from `readonly`. Use native `<dialog>` when possible. Implement keyboard control for menus and tabs. Tooltips only supplement visible/available information. Label progress and expose its value textually. Color must not be the only state carrier. This guide does not claim universal WCAG certification.

## 13. Interactive behavior ownership

RDK is not a JavaScript framework. Native Button, Input, Checkbox, Radio, Toggle, Select, Progress, Range, and Disclosure keep their browser behavior. RDK styles Menu, Tabs, Toast, Tooltip, Dialog, and Navigation Item, but your application owns opening, selection, keyboard handling, state updates, focus management, and lifecycle. Prefer native `<dialog>.showModal()` for modal behavior. Scripts in the docs are demos, not package APIs; do not copy them blindly.

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

Compose components according to meaning: a form groups labeled native fields and actions; a control panel groups status, LCD, progress, and actions; a data view wraps a semantic table; a navigation list uses anchors for routes and buttons for local selection. Keep feedback in a Notice for persistent inline messages and a Toast for transient messages. Keep overlay behavior in application code. The documentation has `patterns/form/`, `patterns/control-panel/`, `patterns/status/`, `patterns/data-table/`, `patterns/overlays/`, and `patterns/navigation-list/` under its site root.

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

The documentation has `installation/`, `components/`, `reference/classes/`, `reference/variables/`, `reference/accessibility/`, `playground/`, `showcase/` (the active theme Native Showcase), `showcase/shared/` (Compatibility Showcase), and `examples/` under its site root. In a local development checkout, browse the same routes with `npm run dev`. This guide is sufficient for first-pass use; those pages provide detailed behavior and visuals.

## 19. Version / compatibility

This guide describes RDK `0.1.0-alpha.3` and Tailwind CSS v4 integration. `package.json` is the version source of truth. The validated Node/Vite build uses Tailwind 4.3.3 from `package-lock.json`; an optional Windows CLI download is also pinned to 4.3.3. The standalone tool is a convenience, not a package requirement. Built CSS can be used without Tailwind.

## Multi-theme support and Terminal OS

RDK has two public theme identities. Choose `console-94` for its warm equipment language, or `terminal-os` for a compact-first blue-black terminal language. Terminal OS is an official alpha theme, verified in desktop Chrome and Firefox at emulated 390, 430, 768, and 1440 px. Android Chrome and iOS Safari real-device QA are pending; do not describe it as mobile-stable.

Read the canonical [Support Matrix](docs/support/) and [Terminal OS theme page](docs/reference/themes/terminal-os/) before selecting components. Every shared component has one of three statuses per theme: `supported` means a native pattern that passed required state QA; `fallback` means usable and accessible but not preferred for a native composition; `unsupported` means it should not be used in new interfaces for that theme. Console 94 has 25 supported shared components. Terminal OS has 17 supported, 5 fallback, and 3 unsupported. In Terminal OS, Toggle, Badge, Card, Progress, and Tooltip are fallback. Segments, LCD, and Status LED are unsupported. Prefer Checkbox for a boolean choice and text status instead of Status LED. The capability manifest is `docs/data/theme-capabilities.json` in the public mirror.

Shared components such as Button, Input, Table, and Dialog keep their semantic HTML API across themes. A theme-specific primitive belongs to one theme and need not be ported to another. Terminal OS owns Terminal Window: `rdk-terminal-window`, `rdk-terminal-window-bar`, and `rdk-terminal-window-body`. These classes are only styled under `data-rdk-theme="terminal-os"`. They create a window frame, title bar, and content inset; application CSS or Tailwind still owns placement, widths, and page layout. The colored window dots are decoration. Prompts, log lines, timestamps, `[ OK ]`, and `[ WARN ]` are ordinary HTML content, not separate RDK components.

The [Terminal OS Native Showcase](docs/showcase/terminal-os/) and [Console 94 Native Showcase](docs/showcase/console-94/) are canonical theme compositions. The [Compatibility Showcase](docs/showcase/shared/) compares common markup across themes. The [Showcase entry](docs/showcase/) opens the active theme Native Showcase. Choose components from the Support Matrix, use the theme page for theme-specific primitives, and keep native semantics and application behavior in your app.

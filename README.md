# RDK Retro UI

Consumer distribution mirror for **RDK Retro UI 0.2.0-alpha.2**, a framework-agnostic CSS visual layer. Czarek OS, Terminal OS and Dark Horse are active public alpha themes. Czarek OS serves general content and productivity, Terminal OS compact terminal interfaces, and Dark Horse control, monitoring, dashboards, and focused utility applications. Console 94 is archived but remains available as standalone legacy CSS. Development happens in a separate canonical repository.

**Tailwind or application CSS controls geometry. RDK controls visual identity.**

## Quick start

Clone or download this mirror. In a Tailwind v4 project, import Tailwind and [the RDK source](src/index.css) in that order:

```css
@import "tailwindcss";
@import "./path/to/RDK/src/index.css";
```

For an app without Tailwind build integration, copy [the built CSS](dist/rdk-retro-ui.css) and its sibling [fonts](dist/fonts/) into your app. Choose active `czarek-os`, `terminal-os`, or `dark-horse` with `data-rdk-theme`, then combine RDK appearance classes with your own layout CSS. This example uses Dark Horse:

```html
<html data-rdk-theme="dark-horse">
  <button class="rdk-btn rdk-btn-solid" data-accent="amber">Apply profile</button>
</html>
```

For Tailwind 3.4 with default Preflight, load your app's compiled Tailwind CSS first and then [the generated RDK compatibility CSS](dist/rdk-retro-ui.compat.min.css), with [fonts](dist/fonts/) beside it. The normal layered CSS is for modern source integration or an app without this reset.

The [combined CSS](dist/rdk-retro-ui.min.css) supports switching between active Czarek OS, Terminal OS, and Dark Horse. For one fixed active theme, use [Czarek OS](dist/rdk-retro-ui.czarek-os.min.css), [Terminal OS](dist/rdk-retro-ui.terminal-os.min.css), or [Dark Horse](dist/rdk-retro-ui.dark-horse.min.css) alone with sibling fonts. [Console 94](dist/rdk-retro-ui.console-94.min.css) is an archived standalone option; see its [archive reference](docs/archive/console-94/). Each standalone file includes the full shared styling; do not load the combined CSS alongside it. Switching to another theme requires the combined CSS or that theme's additional bundle. Tailwind 3.4 Preflight users can choose the matching .compat.min.css file.

Read [the agent guide](RDK_AGENT_GUIDE.md) for the full API contract and [release notes](RELEASE_NOTES.md) for 0.2.0-alpha.2. Explore the [Dark Horse Native Showcase](docs/showcase/dark-horse/), [Vanilla example](examples/vanilla/README.md), [Terminal OS built-CSS example](examples/vanilla/terminal-os.html), and [Tailwind example](examples/tailwind/README.md).

## Documentation and demos

Live documentation and demos: [https://grykom.github.io/RDK_UI_CSS_PUBLIC/](https://grykom.github.io/RDK_UI_CSS_PUBLIC/). The human site has [Overview](https://grykom.github.io/RDK_UI_CSS_PUBLIC/), [Installation](https://grykom.github.io/RDK_UI_CSS_PUBLIC/installation/), [Colors](https://grykom.github.io/RDK_UI_CSS_PUBLIC/colors/), [Components](https://grykom.github.io/RDK_UI_CSS_PUBLIC/components/), [Support Matrix](https://grykom.github.io/RDK_UI_CSS_PUBLIC/support/), [Patterns](https://grykom.github.io/RDK_UI_CSS_PUBLIC/patterns/), and [CSS Classes](https://grykom.github.io/RDK_UI_CSS_PUBLIC/css-classes/). Demo opens the selected theme's native showcase. [Vanilla demo](https://grykom.github.io/RDK_UI_CSS_PUBLIC/demos/vanilla/) and [Tailwind demo](https://grykom.github.io/RDK_UI_CSS_PUBLIC/demos/tailwind/) remain available. CSS should be bundled or copied into each application; GitHub Pages is documentation and demos, not the production CSS delivery contract.

The documentation selector lists active themes and persists the selection. Dark Horse supports 24 shared components; Tooltip is a readable visual fallback for supplementary, non-critical information. Its amber accent represents active emphasis, while warning uses orange. The package is not published to the public npm registry. Tested browser targets: Chrome and Firefox on Windows at desktop, tablet, and mobile widths. Safari, iOS, and Android remain untested.

## License

RDK Retro UI code is available under the [MIT License](LICENSE). IBM Plex, Source Sans 3, and Barlow font files retain their own OFL notices in src/fonts/, dist/fonts/, and docs/.

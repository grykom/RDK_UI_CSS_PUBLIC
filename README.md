# RDK Retro UI

Consumer distribution mirror for **RDK Retro UI 0.1.0-alpha.6**, a framework-agnostic CSS visual layer. Console 94 uses warm equipment surfaces. Terminal OS is an official compact-first alpha theme. Czarek OS is a slate-led content-first alpha theme. Development happens in a separate canonical repository.

**Tailwind or application CSS controls geometry. RDK controls visual identity.**

## Quick start

Clone or download this mirror. In a Tailwind v4 project, import Tailwind and [the RDK source](src/index.css) in that order:

```css
@import "tailwindcss";
@import "./path/to/RDK/src/index.css";
```

For an app without Tailwind, copy [the built CSS](dist/rdk-retro-ui.css) and its sibling [fonts](dist/fonts/) into your app. Choose `console-94`, `terminal-os`, or `czarek-os` with `data-rdk-theme`, then combine RDK appearance classes with your own layout CSS. This example uses Console 94:

```html
<html data-rdk-theme="console-94">
  <button class="rdk-btn rdk-btn-solid" data-accent="blue">Save</button>
</html>
```

Read [the agent guide](RDK_AGENT_GUIDE.md) for the full API contract and [release notes](RELEASE_NOTES.md) for 0.1.0-alpha.6. Explore the [Vanilla example](examples/vanilla/README.md), [Terminal OS built-CSS example](examples/vanilla/terminal-os.html), and [Tailwind example](examples/tailwind/README.md).

## Documentation and demos

GitHub Pages: [https://grykom.github.io/RDK_UI_CSS_PUBLIC/](https://grykom.github.io/RDK_UI_CSS_PUBLIC/) (available after the owner enables Pages from main:/docs). The human site has [Overview](https://grykom.github.io/RDK_UI_CSS_PUBLIC/), [Installation](https://grykom.github.io/RDK_UI_CSS_PUBLIC/installation/), [Colors](https://grykom.github.io/RDK_UI_CSS_PUBLIC/colors/), [Components](https://grykom.github.io/RDK_UI_CSS_PUBLIC/components/), [Patterns](https://grykom.github.io/RDK_UI_CSS_PUBLIC/patterns/), and [CSS Classes](https://grykom.github.io/RDK_UI_CSS_PUBLIC/css-classes/). Demo opens the selected theme's native showcase. [Vanilla demo](https://grykom.github.io/RDK_UI_CSS_PUBLIC/demos/vanilla/) and [Tailwind demo](https://grykom.github.io/RDK_UI_CSS_PUBLIC/demos/tailwind/) remain available. CSS should be bundled or copied into each application; GitHub Pages is documentation and demos, not the production CSS delivery contract.

The documentation selector persists the selected theme. The package is not published to the public npm registry. Tested browser targets: Chrome and Firefox on Windows at desktop, tablet, and mobile widths. Safari, iOS, and Android remain untested.

## License

RDK Retro UI code is available under the [MIT License](LICENSE). IBM Plex, Source Sans 3, and Barlow font files retain their own OFL notices in src/fonts/, dist/fonts/, and docs/.

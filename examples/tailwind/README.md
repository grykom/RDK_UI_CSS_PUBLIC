# Tailwind v4 example

This is a separate Vite application that imports the real RDK source entrypoint. Its `src/app.css` contains:

```css
@import "tailwindcss";
@source "../index.html";
@source "./app.js";
@import "../../../src/index.css";
```

Run from `examples/tailwind/`:

```bash
npm install
npm run dev
npm run build
npm run preview
```

The local path requires this example to remain inside the repository. RDK classes provide surfaces, bevels, colors, typography and interaction states. Tailwind classes provide grid, flex, gap, padding, width and responsive breakpoints. The application imports no documentation CSS or JavaScript. Vite copies the font URLs referenced by RDK into its own `dist/assets/` during build.

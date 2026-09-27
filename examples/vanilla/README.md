# Vanilla example

This is a real static consumer of the **built** `../../dist/rdk-retro-ui.css`. It does not run Tailwind or Node in the consuming application.

From the repository root, build the library once if `dist/rdk-retro-ui.css` is absent, then serve the root:

```bash
npm run build:css
python -m http.server 4173
```

Open `http://localhost:4173/examples/vanilla/`. After the CSS artifact exists, viewing the example requires only the Python static server. Serve the repository root so the relative `../../dist/` path and its `fonts/` folder resolve.

`example.css` owns layout, spacing, width and responsive rules. The linked RDK CSS owns the surfaces, typography, colors and component states. `app.js` implements this example's local interactions. No documentation CSS or scripts are imported.

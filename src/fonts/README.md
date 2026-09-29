# Self-hosted fonts for Console 94 and Terminal OS

The active themes load these files locally through `src/index.css`:

- `IBMPlexSans-variable.ttf` and `IBMPlexSans-variable.woff2` — [Google Fonts / IBM Plex Sans](https://github.com/google/fonts/tree/main/ofl/ibmplexsans)
- `IBMPlexMono-Regular.ttf` — [Google Fonts / IBM Plex Mono](https://github.com/google/fonts/tree/main/ofl/ibmplexmono) (retained for compatibility)
- `IBMPlexMono-variable.ttf` and `IBMPlexMono-variable.woff2` - [IBM Plex Mono Variable 1.0.0](https://www.npmjs.com/package/@ibm/plex-mono-variable), upright weight axis 100-700

The WOFF2 Sans file was converted from the bundled TTF without changing its character map or variable axes. The original IBM Plex TTF sources are unmodified and distributed under the [SIL Open Font License 1.1](OFL.txt), Copyright © 2017 IBM Corp., with Reserved Font Name “Plex”. `npm run build:css` copies the font files and licence to `dist/fonts/`, next to the built CSS. Polish glyph coverage is checked by `scripts/visual_qa_1_2.py`.

## Czarek OS

`SourceSans3-variable.ttf` is the unmodified upright variable font from [Google Fonts / Source Sans 3](https://github.com/google/fonts/tree/main/ofl/sourcesans3). Adobe's [SIL OFL 1.1 notice](SourceSans3-OFL.txt) is retained separately. Czarek OS loads it locally through `src/index.css`, with Helvetica Neue, Arial, and sans-serif fallbacks. The build copies both font formats and the notice to `dist/fonts/`.

The Source Sans 3 WOFF2 was converted from the bundled TTF, preserving its character map and variable weight axis. Both WOFF2 files are preferred by the browser; TTF remains as fallback. All corresponding OFL notices ship with the source, package, and public mirror.

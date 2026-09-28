# IBM Plex fonts used by Console 94

The active theme loads these files locally through `src/index.css`:

- `IBMPlexSans-variable.ttf` — [Google Fonts / IBM Plex Sans](https://github.com/google/fonts/tree/main/ofl/ibmplexsans)
- `IBMPlexMono-Regular.ttf` — [Google Fonts / IBM Plex Mono](https://github.com/google/fonts/tree/main/ofl/ibmplexmono)

Both files are unmodified and distributed under the [SIL Open Font License 1.1](OFL.txt), Copyright © 2017 IBM Corp., with Reserved Font Name “Plex”. `npm run build:css` copies the font files and licence to `dist/fonts/`, next to the built CSS. Polish glyph coverage is checked by `scripts/visual_qa_1_2.py`.

## Czarek OS

`SourceSans3-variable.ttf` is the unmodified upright variable font from [Google Fonts / Source Sans 3](https://github.com/google/fonts/tree/main/ofl/sourcesans3). Adobe's [SIL OFL 1.1 notice](SourceSans3-OFL.txt) is retained separately. Czarek OS loads it locally through `src/index.css`, with Helvetica Neue, Arial, and sans-serif fallbacks. The build copies both the font and the notice to `dist/fonts/`.

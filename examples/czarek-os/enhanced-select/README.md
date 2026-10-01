# Czarek OS Enhanced Select reference

RDK does not require this script. `czarek-select.js` is an application-owned reference implementation that you may copy or adapt. An application using another framework can implement the same visual contract without this file. RDK supplies only the `cz-select-*` appearance classes; your application owns keyboard interaction, focus, placement, value changes, validation, and lifecycle.

The native `<select>` remains the form value source and is usable without JavaScript. Use an explicit label, then mark the select for enhancement:

```html
<label class="rdk-label" for="profile">Configuration profile</label>
<select id="profile" name="profile" class="rdk-select" data-cz-select>
  <option value="standard">Standard</option>
  <option value="focused">Focused work</option>
</select>
<script src="./czarek-select.js" defer></script>
```

The script creates a `.cz-select` shell with `.cz-select-trigger`, `.cz-select-value`, `.cz-select-chevron`, `.cz-select-menu`, `.cz-select-option`, and `.cz-select-option-check`. Preserve combobox/listbox/option roles and `aria-expanded`, `aria-controls`, `aria-selected`, and `aria-activedescendant`. Place and size the popup in application CSS, as `example.css` does. Keep error/help text associated through `aria-describedby`; apply `data-dirty="true"` and `aria-invalid="true"` to the native select when appropriate. The script mirrors those states to the visual trigger. Invalid appearance wins over dirty appearance.

`window.CzarekSelect.init(root)` enhances matching selects; `sync(select)` or `syncAll(root)` refreshes the visual state after an application changes native values programmatically; `destroy(select)` restores the native control. `input` and `change` events are dispatched on the native select when a user chooses an option. For changed option lists, destroy and reinitialize the control. The script keeps disabled options out of keyboard navigation and observes disabled, invalid, dirty, and description attributes, including disabled fieldsets.

From the repository root, run `npm run build:css` and serve the root with `python -m http.server 4173`. Open `/examples/czarek-os/enhanced-select/`. The same example is copied into the public documentation demos during mirror preparation.

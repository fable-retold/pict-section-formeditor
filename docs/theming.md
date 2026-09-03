# Theming

The form editor paints entirely through CSS custom properties. It ships a
complete light **and** dark appearance of its own, and defers to the host
application's theme whenever one is installed.

## The short version

- Drop the view in and it looks right in light and dark, with no setup.
- Define the ecosystem's `--theme-color-*` tokens and the editor adopts them.
- Dark mode follows `[data-theme="dark"]`, `.theme-dark`, or the OS setting.

## How dark mode is triggered

The editor responds to three signals, in this order of authority:

| Signal | Set by | Wins over |
|---|---|---|
| `[data-theme="light"]` on `<html>` | Bulma / HeadLight | everything — forces light |
| `[data-theme="dark"]` on `<html>` | Bulma / HeadLight | the OS setting |
| `.theme-dark` on `<html>` | `pict-provider-theme` | the OS setting |
| `@media (prefers-color-scheme: dark)` | the operating system | nothing |

The OS branch is guarded by `:root:not([data-theme="light"])`, so a user who
explicitly picks light on a dark-mode machine still gets light. This matches
what `pict-section-form`'s tabular ColumnChooser does, so the two modules agree
inside the same application.

Setting no attribute and no class is the "follow the OS" state.

## The `--pfe-*` alias layer

Every colour in the module resolves through a `--pfe-*` alias declared at the
top of the view's CSS, rather than referencing `--theme-color-*` inline:

```css
:root                       { --pfe-bg-panel: var(--theme-color-background-panel, #FFF);    }
[data-theme="dark"],
.theme-dark                 { --pfe-bg-panel: var(--theme-color-background-panel, #242B36); }
```

```css
.pict-fe-panel { background: var(--pfe-bg-panel); }
```

Three reasons for the indirection:

1. **Dark mode is affordable.** 84 aliases are declared per mode. Re-declaring
   the 750+ colour-bearing rules per mode would run to thousands of lines.
2. **Roles stay separate.** One ecosystem token often serves several roles
   here. `--theme-color-status-error` drove error *text*, error *borders* and
   pale error *background tints*. Chaining all three to one token meant any
   host defining it turned the pale tints solid red. Each role now has its own
   alias, and tint aliases chain to an optional `-background` variant instead.
3. **The host still wins.** The host token is the *inner* reference of every
   alias, so only the fallback varies by mode.

### Naming

`<role>-<token>` — `bg-panel`, `text-primary`, `border-default`.

- `-tint` marks the pale band of a colour that also has a solid form:
  `bg-error` is a solid red badge, `bg-error-tint` a pale error panel.
- `-on-<family>-<name>` marks a cross-family use, where a colour from one
  family is used in another role: `border-on-bg-tertiary` is a border drawn in
  the tertiary *background* colour.
- `text-on-brand` is the label colour for text sitting on a brand-coloured
  fill. It is deliberately **not** `background-panel`, which is what it used to
  chain to — that rendered dark text on a brand button under a dark host theme.

## Overriding from a host application

Define any of the tokens below on `:root` (or anywhere above the editor) and
the editor picks them up. You do not need to define all of them; each alias
falls back to a mode-appropriate value.

```css
:root
{
    --theme-color-background-panel: #ffffff;
    --theme-color-text-primary:     #1f2733;
    --theme-color-brand-primary:    #156dd1;
}
```

### Tokens consumed

**Surfaces** `background-panel` `background-secondary` `background-tertiary`
`background-hover`

**Text** `text-primary` `text-secondary` `text-muted` `text-on-brand`

**Borders** `border-default` `border-light`

**Brand** `brand-primary` `brand-primary-hover` `brand-accent`

**Status** `status-success` `status-warning` `status-error` `status-info`

**Status tints** (optional; pale panel fills — define these rather than letting
the solid status colour flood a tinted panel) `status-success-background`
`status-warning-background` `status-error-background` `status-info-background`
`brand-accent-background`

**Syntax** `syntax-keyword` `syntax-string` `syntax-number` `syntax-comment`
`syntax-operator` `syntax-punctuation` `syntax-function` `syntax-property`
`syntax-tag` `syntax-attrname` `syntax-attrvalue` `syntax-variable`

**Editor chrome** `editor-gutter-border` `editor-linenumber-text`

**Categorical series** `data-1` … `data-12` — the DataType and InputType
histograms. A purpose-built ramp rather than reused status colours, so the bars
stay mutually distinguishable and a green bar does not read as "healthy".

Syntax and editor-chrome tokens are the same family `pict-section-code`
consumes, so the help-body samples and the Solver Editor's panes agree.

## Icon colours

Icons paint through SVG `fill=` / `stroke=` attributes, which accept `var()`,
so they follow the theme with no re-render. Override them through the provider
rather than CSS:

```javascript
pict.addView('MyEditor',
{
    Iconography: { Colors: { Primary: 'var(--my-icon-colour)' } }
}, libPictSectionFormEditor);
```

`Colors` merges one level deep, so overriding one entry keeps the other three.

## Maintaining the layer

The alias block is generated. When adding a rule, reference an existing alias
if one fits; add a new one only for a genuinely new role, and declare it in
**all three** blocks — light, the explicit-dark block, and the media-query
block.

The `Theming` suite in `test/Pict-Section-FormEditor_tests.js` enforces this.
It fails if an alias is referenced but never declared, if an alias is missing
from a dark block, or if a colour literal appears outside the layer. A missing
alias has no visual symptom in light mode — the property simply resolves to
nothing — which is why it is covered by a test rather than left to review.

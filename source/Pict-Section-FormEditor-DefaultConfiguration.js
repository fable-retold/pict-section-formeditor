module.exports = (
{
	ViewIdentifier: 'Pict-FormEditor',

	DefaultRenderable: 'FormEditor-Container',
	DefaultDestinationAddress: '#FormEditor-Container',

	AutoRender: false,

	// Address in AppData where the form configuration manifest lives
	ManifestDataAddress: false,

	// Which tab is active by default: 'formoverview', 'visual', 'objecteditor', 'json', etc.
	ActiveTab: 'formoverview',

	// Extended descriptor properties to display in the Input properties panel.
	// Each entry defines a custom field that maps to a dot-notation address
	// within the Descriptor object (e.g. 'PictForm.Units' for Descriptor.PictForm.Units).
	//
	// Example:
	// [
	//     { Name: 'Units', Address: 'PictForm.Units', DataType: 'String' },
	//     { Name: 'Extra Data', Address: 'ExtraData', DataType: 'String' },
	//     { Name: 'Entity', Address: 'PictForm.Configuration.Entity', DataType: 'String' }
	// ]
	//
	// Each entry supports:
	//   Name        - Display label in the properties panel
	//   Address     - Dot-notation path relative to the Descriptor (required)
	//   DataType    - 'String' (default), 'Number', or 'Boolean'
	//   Description - Optional tooltip / placeholder text
	ExtendedDescriptorProperties: [],

	CSS: /*css*/`
/* ═══════════════════════════════════════════════════════════════════════
   THEME TOKEN LAYER
   ───────────────────────────────────────────────────────────────────────
   Every colour in this module resolves through a --pfe-* alias declared
   here rather than referencing --theme-color-* inline. Three reasons:

   1. DARK MODE. Each alias carries a mode-appropriate fallback, so the
      editor renders correctly with NO host theme installed. Declaring
       84 aliases per mode costs a few hundred lines; re-declaring
      the 750+ colour-bearing rules per mode would cost thousands.

   2. ROLE SEPARATION. One --theme-color-* token often served several
      roles here -- --theme-color-status-error drove error TEXT, error
      BORDERS and pale error BACKGROUND TINTS. Chaining all three to one
      token meant any host defining it turned the pale tints solid red.
      Tint aliases now chain to an optional <token>-background instead,
      so they stay tints whatever the host sets the status colour to.

   3. LIGHT FIDELITY. Sites sharing a token often carried slightly
      different fallbacks. Aliases were derived by clustering those
      fallbacks perceptually (CIE Lab, ΔE <= 4), so the un-themed light
      appearance is preserved to within a just-noticeable difference.

   A host defining --theme-color-* still wins: the host token is the
   INNER reference of each alias, so only the fallback varies by mode.

   Dark mode responds to three signals, matching pict-section-form's
   tabular ColumnChooser: the [data-theme] attribute (Bulma / HeadLight),
   the .theme-dark class (pict-provider-theme), and the OS preference --
   the last guarded by :not([data-theme="light"]) so an explicit light
   choice still wins. Aliases sit on :root rather than .pict-formeditor
   because this module portals modals and popovers to <body>.

   Generated -- see docs/theming.md before hand-editing.
   ═══════════════════════════════════════════════════════════════════════ */
:root
{
	/* Surfaces */
	--pfe-bg-panel:                  var(--theme-color-background-panel, #FFF);
	--pfe-bg-secondary:              var(--theme-color-background-secondary, #F5F0E8);
	--pfe-bg-hover:                  var(--theme-color-background-hover, #EDE8DF);
	--pfe-bg-tertiary:               var(--theme-color-background-tertiary, #E8E3DA);
	--pfe-bg-brand:                  var(--theme-color-brand-primary, #9E6B47);
	--pfe-bg-brand-hover:            var(--theme-color-brand-primary-hover, #8A5C3B);
	--pfe-bg-error:                  var(--theme-color-status-error, #C0392B);
	--pfe-bg-error-tint:             var(--theme-color-status-error-background, #FDF2F2);
	--pfe-bg-success:                var(--theme-color-status-success, #2E7D32);
	--pfe-bg-success-tint:           var(--theme-color-status-success-background, #C8E6C9);
	--pfe-bg-on-text-muted:          var(--theme-color-text-muted, #A89E92);
	--pfe-bg-warning:                var(--theme-color-status-warning, #D4A373);
	--pfe-bg-warning-tint:           var(--theme-color-status-warning-background, #F3EAE0);
	--pfe-bg-info:                   var(--theme-color-status-info-background, #E8EDF2);
	--pfe-bg-accent:                 var(--theme-color-brand-accent-background, #F0E8F5);
	--pfe-bg-on-text-secondary:      var(--theme-color-text-secondary, #8A7F72);

	/* Text */
	--pfe-text-primary:              var(--theme-color-text-primary, #3D3229);
	--pfe-text-secondary:            var(--theme-color-text-secondary, #8A7F72);
	--pfe-text-on-brand:             var(--theme-color-text-on-brand, #FFF);
	--pfe-text-error:                var(--theme-color-status-error, #A04040);
	--pfe-text-error-tint:           var(--theme-color-status-error, #C0A0A0);
	--pfe-text-muted:                var(--theme-color-text-muted, #B0A89E);
	--pfe-text-success:              var(--theme-color-status-success, #6B7F5A);
	--pfe-text-on-border-default:    var(--theme-color-border-default, #C5BFAE);
	--pfe-text-info:                 var(--theme-color-status-info, #264653);
	--pfe-text-info-tint:            var(--theme-color-status-info, #5A7F9E);
	--pfe-text-brand:                var(--theme-color-brand-primary, #9E6B47);
	--pfe-text-warning:              var(--theme-color-status-warning, #92400E);
	--pfe-text-warning-tint:         var(--theme-color-status-warning, #D4A373);
	--pfe-text-on-border-light:      var(--theme-color-border-light, #D4CFC6);
	--pfe-text-accent:               var(--theme-color-brand-accent, #B07BAC);

	/* Borders */
	--pfe-border-on-bg-tertiary:     var(--theme-color-background-tertiary, #E8E3DA);
	--pfe-border-brand:              var(--theme-color-brand-primary, #9E6B47);
	--pfe-border-default:            var(--theme-color-border-default, #C5BFAE);
	--pfe-border-on-text-muted:      var(--theme-color-text-muted, #C4B9A8);
	--pfe-border-brand-hover:        var(--theme-color-brand-primary-hover, #87593B);
	--pfe-border-error:              var(--theme-color-status-error, #A04040);
	--pfe-border-error-tint:         var(--theme-color-status-error-background, #E0B0B0);
	--pfe-border-on-bg-secondary:    var(--theme-color-background-secondary, #F0ECE4);
	--pfe-border-success:            var(--theme-color-status-success, #6B8F5A);
	--pfe-border-success-tint:       var(--theme-color-status-success, #22C55E);
	--pfe-border-light:              var(--theme-color-border-light, #D4CFC6);
	--pfe-border-warning:            var(--theme-color-status-warning, #8B6914);
	--pfe-border-warning-tint:       var(--theme-color-status-warning, #D4A373);
	--pfe-border-on-bg-hover:        var(--theme-color-background-hover, #E8E0D4);
	--pfe-border-info:               var(--theme-color-status-info, #5A7F9E);
	--pfe-border-accent:             var(--theme-color-brand-accent, #B07BAC);
	--pfe-border-on-text-secondary:  var(--theme-color-text-secondary, #8A7F72);

	/* Icon paint */
	--pfe-icon-primary:              var(--theme-color-text-primary, #3D3229);

	/* Chrome */
	--pfe-shadow-brand:              var(--theme-color-brand-primary, #9E6B47);
	--pfe-outline-brand:             var(--theme-color-brand-primary, #9E6B47);
	--pfe-caret-brand:               var(--theme-color-brand-primary, #9E6B47);

	/* Effects */
	--pfe-focus-ring:                rgba(158, 107, 71, 0.15);
	--pfe-shadow:                    rgba(61, 50, 41, 0.12);
	--pfe-shadow-strong:             rgba(61, 50, 41, 0.25);
	--pfe-scrim:                     rgba(61, 50, 41, 0.40);
	--pfe-bg-brand-tint:             rgba(158, 107, 71, 0.05);
	--pfe-bg-brand-tint-soft:        rgba(158, 107, 71, 0.03);

	/* Syntax */
	--pfe-syntax-keyword:            var(--theme-color-syntax-keyword, #A626A4);
	--pfe-syntax-string:             var(--theme-color-syntax-string, #50A14F);
	--pfe-syntax-number:             var(--theme-color-syntax-number, #986801);
	--pfe-syntax-comment:            var(--theme-color-syntax-comment, #A0A1A7);
	--pfe-syntax-operator:           var(--theme-color-syntax-operator, #0184BC);
	--pfe-syntax-punctuation:        var(--theme-color-syntax-punctuation, #3D3229);
	--pfe-syntax-function:           var(--theme-color-syntax-function, #4078F2);
	--pfe-syntax-property:           var(--theme-color-syntax-property, #E45649);
	--pfe-syntax-tag:                var(--theme-color-syntax-tag, #E45649);
	--pfe-syntax-attrname:           var(--theme-color-syntax-attrname, #986801);
	--pfe-syntax-attrvalue:          var(--theme-color-syntax-attrvalue, #50A14F);
	--pfe-syntax-variable:           var(--theme-color-syntax-variable, #7C3AED);
	--pfe-code-gutter-border:        var(--theme-color-editor-gutter-border, #DDD6CB);
	--pfe-code-linenumber:           var(--theme-color-editor-linenumber-text, #A09589);

	/* Categorical data series */
	--pfe-data-1:                    var(--theme-color-data-1, #3357C7);
	--pfe-data-2:                    var(--theme-color-data-2, #C75033);
	--pfe-data-3:                    var(--theme-color-data-3, #2E7A3A);
	--pfe-data-4:                    var(--theme-color-data-4, #A86B00);
	--pfe-data-5:                    var(--theme-color-data-5, #6B3AAC);
	--pfe-data-6:                    var(--theme-color-data-6, #0E7C86);
	--pfe-data-7:                    var(--theme-color-data-7, #C63A8E);
	--pfe-data-8:                    var(--theme-color-data-8, #7A6A00);
	--pfe-data-9:                    var(--theme-color-data-9, #41608A);
	--pfe-data-10:                   var(--theme-color-data-10, #9C3B3B);
	--pfe-data-11:                   var(--theme-color-data-11, #1F7A6B);
	--pfe-data-12:                   var(--theme-color-data-12, #8A3FA0);
}

/* Dark -- explicit opt-in via attribute or class. */
[data-theme="dark"],
.theme-dark
{
	/* Surfaces */
	--pfe-bg-panel:                  var(--theme-color-background-panel, #2A2A2A);
	--pfe-bg-secondary:              var(--theme-color-background-secondary, #2D2A24);
	--pfe-bg-hover:                  var(--theme-color-background-hover, #2D2A24);
	--pfe-bg-tertiary:               var(--theme-color-background-tertiary, #2D2A24);
	--pfe-bg-brand:                  var(--theme-color-brand-primary, #442100);
	--pfe-bg-brand-hover:            var(--theme-color-brand-primary-hover, #432103);
	--pfe-bg-error:                  var(--theme-color-status-error, #670000);
	--pfe-bg-error-tint:             var(--theme-color-status-error-background, #362F2F);
	--pfe-bg-success:                var(--theme-color-status-success, #003400);
	--pfe-bg-success-tint:           var(--theme-color-status-success-background, #203522);
	--pfe-bg-on-text-muted:          var(--theme-color-text-muted, #302920);
	--pfe-bg-warning:                var(--theme-color-status-warning, #412300);
	--pfe-bg-warning-tint:           var(--theme-color-status-warning-background, #352F29);
	--pfe-bg-info:                   var(--theme-color-status-info-background, #272A2E);
	--pfe-bg-accent:                 var(--theme-color-brand-accent-background, #2D2831);
	--pfe-bg-on-text-secondary:      var(--theme-color-text-secondary, #30291F);

	/* Text */
	--pfe-text-primary:              var(--theme-color-text-primary, #CBBFB5);
	--pfe-text-secondary:            var(--theme-color-text-secondary, #CABFB3);
	--pfe-text-on-brand:             var(--theme-color-text-on-brand, #C1C1C1);
	--pfe-text-error:                var(--theme-color-status-error, #FFA8A2);
	--pfe-text-error-tint:           var(--theme-color-status-error, #D7BABA);
	--pfe-text-muted:                var(--theme-color-text-muted, #C7C0B7);
	--pfe-text-success:              var(--theme-color-status-success, #B5C7A4);
	--pfe-text-on-border-default:    var(--theme-color-border-default, #C6C1B2);
	--pfe-text-info:                 var(--theme-color-status-info, #AAC5D2);
	--pfe-text-info-tint:            var(--theme-color-status-info, #A6C4E1);
	--pfe-text-brand:                var(--theme-color-brand-primary, #E9B795);
	--pfe-text-warning:              var(--theme-color-status-warning, #FFAC7E);
	--pfe-text-warning-tint:         var(--theme-color-status-warning, #E5B98F);
	--pfe-text-on-border-light:      var(--theme-color-border-light, #C5C0B9);
	--pfe-text-accent:               var(--theme-color-brand-accent, #E2B2DD);

	/* Borders */
	--pfe-border-on-bg-tertiary:     var(--theme-color-background-tertiary, #4E4B44);
	--pfe-border-brand:              var(--theme-color-brand-primary, #6B4224);
	--pfe-border-default:            var(--theme-color-border-default, #4F4B3E);
	--pfe-border-on-text-muted:      var(--theme-color-text-muted, #524A3D);
	--pfe-border-brand-hover:        var(--theme-color-brand-primary-hover, #694228);
	--pfe-border-error:              var(--theme-color-status-error, #832F30);
	--pfe-border-error-tint:         var(--theme-color-status-error-background, #664242);
	--pfe-border-on-bg-secondary:    var(--theme-color-background-secondary, #4E4B45);
	--pfe-border-success:            var(--theme-color-status-success, #355328);
	--pfe-border-success-tint:       var(--theme-color-status-success, #005C05);
	--pfe-border-light:              var(--theme-color-border-light, #4F4B44);
	--pfe-border-warning:            var(--theme-color-status-warning, #624700);
	--pfe-border-warning-tint:       var(--theme-color-status-warning, #67441E);
	--pfe-border-on-bg-hover:        var(--theme-color-background-hover, #504B42);
	--pfe-border-info:               var(--theme-color-status-info, #2D4F68);
	--pfe-border-accent:             var(--theme-color-brand-accent, #673C65);
	--pfe-border-on-text-secondary:  var(--theme-color-text-secondary, #534A3F);

	/* Icon paint */
	--pfe-icon-primary:              var(--theme-color-text-primary, #E6E9EE);

	/* Chrome */
	--pfe-shadow-brand:              var(--theme-color-brand-primary, #D4A07E);
	--pfe-outline-brand:             var(--theme-color-brand-primary, #D4A07E);
	--pfe-caret-brand:               var(--theme-color-brand-primary, #D4A07E);

	/* Effects */
	--pfe-focus-ring:                rgba(201, 156, 122, 0.30);
	--pfe-shadow:                    rgba(0, 0, 0, 0.55);
	--pfe-shadow-strong:             rgba(0, 0, 0, 0.70);
	--pfe-scrim:                     rgba(0, 0, 0, 0.65);
	--pfe-bg-brand-tint:             rgba(201, 156, 122, 0.10);
	--pfe-bg-brand-tint-soft:        rgba(201, 156, 122, 0.06);

	/* Syntax */
	--pfe-syntax-keyword:            var(--theme-color-syntax-keyword, #C678DD);
	--pfe-syntax-string:             var(--theme-color-syntax-string, #98C379);
	--pfe-syntax-number:             var(--theme-color-syntax-number, #D19A66);
	--pfe-syntax-comment:            var(--theme-color-syntax-comment, #7F848E);
	--pfe-syntax-operator:           var(--theme-color-syntax-operator, #56B6C2);
	--pfe-syntax-punctuation:        var(--theme-color-syntax-punctuation, #ABB2BF);
	--pfe-syntax-function:           var(--theme-color-syntax-function, #61AFEF);
	--pfe-syntax-property:           var(--theme-color-syntax-property, #E06C75);
	--pfe-syntax-tag:                var(--theme-color-syntax-tag, #E06C75);
	--pfe-syntax-attrname:           var(--theme-color-syntax-attrname, #D19A66);
	--pfe-syntax-attrvalue:          var(--theme-color-syntax-attrvalue, #98C379);
	--pfe-syntax-variable:           var(--theme-color-syntax-variable, #C8A2FF);
	--pfe-code-gutter-border:        var(--theme-color-editor-gutter-border, #333B47);
	--pfe-code-linenumber:           var(--theme-color-editor-linenumber-text, #6B7480);

	/* Categorical data series */
	--pfe-data-1:                    var(--theme-color-data-1, #7FA6FF);
	--pfe-data-2:                    var(--theme-color-data-2, #FF9E7A);
	--pfe-data-3:                    var(--theme-color-data-3, #6FD08C);
	--pfe-data-4:                    var(--theme-color-data-4, #E5B24D);
	--pfe-data-5:                    var(--theme-color-data-5, #B99BFF);
	--pfe-data-6:                    var(--theme-color-data-6, #5FCBD6);
	--pfe-data-7:                    var(--theme-color-data-7, #F58FC6);
	--pfe-data-8:                    var(--theme-color-data-8, #CFC26A);
	--pfe-data-9:                    var(--theme-color-data-9, #93B4D6);
	--pfe-data-10:                   var(--theme-color-data-10, #E38B8B);
	--pfe-data-11:                   var(--theme-color-data-11, #6FD3BE);
	--pfe-data-12:                   var(--theme-color-data-12, #D19BE0);
}

/* Dark -- OS preference, unless an explicit light choice is in force. */
@media (prefers-color-scheme: dark)
{
	:root:not([data-theme="light"])
	{
		/* Surfaces */
		--pfe-bg-panel:                  var(--theme-color-background-panel, #2A2A2A);
		--pfe-bg-secondary:              var(--theme-color-background-secondary, #2D2A24);
		--pfe-bg-hover:                  var(--theme-color-background-hover, #2D2A24);
		--pfe-bg-tertiary:               var(--theme-color-background-tertiary, #2D2A24);
		--pfe-bg-brand:                  var(--theme-color-brand-primary, #442100);
		--pfe-bg-brand-hover:            var(--theme-color-brand-primary-hover, #432103);
		--pfe-bg-error:                  var(--theme-color-status-error, #670000);
		--pfe-bg-error-tint:             var(--theme-color-status-error-background, #362F2F);
		--pfe-bg-success:                var(--theme-color-status-success, #003400);
		--pfe-bg-success-tint:           var(--theme-color-status-success-background, #203522);
		--pfe-bg-on-text-muted:          var(--theme-color-text-muted, #302920);
		--pfe-bg-warning:                var(--theme-color-status-warning, #412300);
		--pfe-bg-warning-tint:           var(--theme-color-status-warning-background, #352F29);
		--pfe-bg-info:                   var(--theme-color-status-info-background, #272A2E);
		--pfe-bg-accent:                 var(--theme-color-brand-accent-background, #2D2831);
		--pfe-bg-on-text-secondary:      var(--theme-color-text-secondary, #30291F);
	
		/* Text */
		--pfe-text-primary:              var(--theme-color-text-primary, #CBBFB5);
		--pfe-text-secondary:            var(--theme-color-text-secondary, #CABFB3);
		--pfe-text-on-brand:             var(--theme-color-text-on-brand, #C1C1C1);
		--pfe-text-error:                var(--theme-color-status-error, #FFA8A2);
		--pfe-text-error-tint:           var(--theme-color-status-error, #D7BABA);
		--pfe-text-muted:                var(--theme-color-text-muted, #C7C0B7);
		--pfe-text-success:              var(--theme-color-status-success, #B5C7A4);
		--pfe-text-on-border-default:    var(--theme-color-border-default, #C6C1B2);
		--pfe-text-info:                 var(--theme-color-status-info, #AAC5D2);
		--pfe-text-info-tint:            var(--theme-color-status-info, #A6C4E1);
		--pfe-text-brand:                var(--theme-color-brand-primary, #E9B795);
		--pfe-text-warning:              var(--theme-color-status-warning, #FFAC7E);
		--pfe-text-warning-tint:         var(--theme-color-status-warning, #E5B98F);
		--pfe-text-on-border-light:      var(--theme-color-border-light, #C5C0B9);
		--pfe-text-accent:               var(--theme-color-brand-accent, #E2B2DD);
	
		/* Borders */
		--pfe-border-on-bg-tertiary:     var(--theme-color-background-tertiary, #4E4B44);
		--pfe-border-brand:              var(--theme-color-brand-primary, #6B4224);
		--pfe-border-default:            var(--theme-color-border-default, #4F4B3E);
		--pfe-border-on-text-muted:      var(--theme-color-text-muted, #524A3D);
		--pfe-border-brand-hover:        var(--theme-color-brand-primary-hover, #694228);
		--pfe-border-error:              var(--theme-color-status-error, #832F30);
		--pfe-border-error-tint:         var(--theme-color-status-error-background, #664242);
		--pfe-border-on-bg-secondary:    var(--theme-color-background-secondary, #4E4B45);
		--pfe-border-success:            var(--theme-color-status-success, #355328);
		--pfe-border-success-tint:       var(--theme-color-status-success, #005C05);
		--pfe-border-light:              var(--theme-color-border-light, #4F4B44);
		--pfe-border-warning:            var(--theme-color-status-warning, #624700);
		--pfe-border-warning-tint:       var(--theme-color-status-warning, #67441E);
		--pfe-border-on-bg-hover:        var(--theme-color-background-hover, #504B42);
		--pfe-border-info:               var(--theme-color-status-info, #2D4F68);
		--pfe-border-accent:             var(--theme-color-brand-accent, #673C65);
		--pfe-border-on-text-secondary:  var(--theme-color-text-secondary, #534A3F);
	
		/* Icon paint */
		--pfe-icon-primary:              var(--theme-color-text-primary, #E6E9EE);
	
		/* Chrome */
		--pfe-shadow-brand:              var(--theme-color-brand-primary, #D4A07E);
		--pfe-outline-brand:             var(--theme-color-brand-primary, #D4A07E);
		--pfe-caret-brand:               var(--theme-color-brand-primary, #D4A07E);
	
		/* Effects */
		--pfe-focus-ring:                rgba(201, 156, 122, 0.30);
		--pfe-shadow:                    rgba(0, 0, 0, 0.55);
		--pfe-shadow-strong:             rgba(0, 0, 0, 0.70);
		--pfe-scrim:                     rgba(0, 0, 0, 0.65);
		--pfe-bg-brand-tint:             rgba(201, 156, 122, 0.10);
		--pfe-bg-brand-tint-soft:        rgba(201, 156, 122, 0.06);
	
		/* Syntax */
		--pfe-syntax-keyword:            var(--theme-color-syntax-keyword, #C678DD);
		--pfe-syntax-string:             var(--theme-color-syntax-string, #98C379);
		--pfe-syntax-number:             var(--theme-color-syntax-number, #D19A66);
		--pfe-syntax-comment:            var(--theme-color-syntax-comment, #7F848E);
		--pfe-syntax-operator:           var(--theme-color-syntax-operator, #56B6C2);
		--pfe-syntax-punctuation:        var(--theme-color-syntax-punctuation, #ABB2BF);
		--pfe-syntax-function:           var(--theme-color-syntax-function, #61AFEF);
		--pfe-syntax-property:           var(--theme-color-syntax-property, #E06C75);
		--pfe-syntax-tag:                var(--theme-color-syntax-tag, #E06C75);
		--pfe-syntax-attrname:           var(--theme-color-syntax-attrname, #D19A66);
		--pfe-syntax-attrvalue:          var(--theme-color-syntax-attrvalue, #98C379);
		--pfe-syntax-variable:           var(--theme-color-syntax-variable, #C8A2FF);
		--pfe-code-gutter-border:        var(--theme-color-editor-gutter-border, #333B47);
		--pfe-code-linenumber:           var(--theme-color-editor-linenumber-text, #6B7480);
	
		/* Categorical data series */
		--pfe-data-1:                    var(--theme-color-data-1, #7FA6FF);
		--pfe-data-2:                    var(--theme-color-data-2, #FF9E7A);
		--pfe-data-3:                    var(--theme-color-data-3, #6FD08C);
		--pfe-data-4:                    var(--theme-color-data-4, #E5B24D);
		--pfe-data-5:                    var(--theme-color-data-5, #B99BFF);
		--pfe-data-6:                    var(--theme-color-data-6, #5FCBD6);
		--pfe-data-7:                    var(--theme-color-data-7, #F58FC6);
		--pfe-data-8:                    var(--theme-color-data-8, #CFC26A);
		--pfe-data-9:                    var(--theme-color-data-9, #93B4D6);
		--pfe-data-10:                   var(--theme-color-data-10, #E38B8B);
		--pfe-data-11:                   var(--theme-color-data-11, #6FD3BE);
		--pfe-data-12:                   var(--theme-color-data-12, #D19BE0);
	}
}

.pict-formeditor
{
	position: relative;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	font-size: 14px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 120px);
}

/* ---- Tab Bar ---- */
.pict-fe-tabbar
{
	display: flex;
	background: var(--pfe-bg-secondary);
	padding: 0;
	margin: 0;
}
.pict-fe-tab
{
	padding: 10px 20px;
	cursor: pointer;
	border: none;
	background: none;
	font-size: 13px;
	font-weight: 500;
	color: var(--pfe-text-secondary);
	border-top: 2px solid transparent;
	transition: color 0.15s, border-color 0.15s;
	user-select: none;
}
.pict-fe-tab:hover
{
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-hover);
}
.pict-fe-tab-active
{
	color: var(--pfe-text-primary);
	border-top-color: var(--pfe-border-brand);
	background: var(--pfe-bg-panel);
}

/* ---- Tab Content Panels ---- */
.pict-fe-tabcontent
{
	display: none;
	padding: 16px;
	flex: 1;
	min-height: 0;
	overflow: auto;
}
.pict-fe-tabcontent-active
{
	display: flex;
	flex-direction: column;
}

/* ---- Visual Editor ---- */
.pict-fe-visual-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12px;
}
.pict-fe-visual-header h3
{
	margin: 0;
	font-size: 15px;
	font-weight: 600;
	color: var(--pfe-text-primary);
}
.pict-fe-btn
{
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 6px 12px;
	border-radius: 4px;
	border: 1px solid var(--pfe-border-default);
	background: var(--pfe-bg-secondary);
	cursor: pointer;
	font-size: 12px;
	font-weight: 500;
	color: var(--pfe-text-primary);
	user-select: none;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-btn:hover
{
	background: var(--pfe-bg-tertiary);
	border-color: var(--pfe-border-on-text-muted);
}
.pict-fe-btn-primary
{
	background: var(--pfe-bg-brand);
	border-color: var(--pfe-border-brand);
	color: var(--pfe-text-on-brand);
}
.pict-fe-btn-primary:hover
{
	background: var(--pfe-bg-brand-hover);
	border-color: var(--pfe-border-brand-hover);
}
.pict-fe-btn-danger
{
	border-color: color-mix(in srgb, var(--pfe-border-error-tint) 25%, transparent);
	background: color-mix(in srgb, var(--pfe-bg-error-tint) 8%, transparent);
	color: var(--pfe-text-error);
}
.pict-fe-btn-danger:hover
{
	background: color-mix(in srgb, var(--pfe-bg-error-tint) 18%, transparent);
	border-color: color-mix(in srgb, var(--pfe-border-error-tint) 40%, transparent);
}
.pict-fe-btn-sm
{
	padding: 3px 8px;
	font-size: 11px;
}

/* ---- Section Cards ---- */
.pict-fe-sections-list
{
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.pict-fe-section-card
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	background: var(--pfe-bg-panel);
}
.pict-fe-section-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 14px;
	background: var(--pfe-bg-secondary);
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px 6px 0 0;
}
.pict-fe-section-header:hover
{
	background: var(--pfe-bg-hover);
}
.pict-fe-section-header-labels
{
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
	gap: 8px;
}
.pict-fe-section-title
{
	font-weight: 600;
	font-size: 14px;
	color: var(--pfe-text-primary);
	cursor: pointer;
	border-bottom: 1px dashed transparent;
}
.pict-fe-section-title:hover
{
	border-bottom-color: var(--pfe-border-default);
}
.pict-fe-section-hash
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
	font-family: monospace;
	margin-left: auto;
	cursor: pointer;
	border-bottom: 1px dashed transparent;
}
.pict-fe-section-hash:hover
{
	border-bottom-color: var(--pfe-border-default);
}
.pict-fe-section-actions
{
	display: flex;
	gap: 6px;
	align-items: center;
	margin-left: 12px;
	flex-shrink: 0;
}
.pict-fe-section-body
{
	padding: 12px 14px;
}

/* ---- Inline Edit Modal ---- */
.pict-fe-inline-edit-input
{
	padding: 2px 6px;
	border: 1px solid var(--pfe-border-brand);
	border-radius: 3px;
	font-size: inherit;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
	outline: none;
	min-width: 80px;
}
.pict-fe-inline-edit-input.pict-fe-inline-edit-hash
{
	font-family: monospace;
	font-size: 11px;
	text-align: right;
}
.pict-fe-inline-edit-select
{
	padding: 1px 4px;
	border: 1px solid var(--pfe-border-brand);
	border-radius: 3px;
	font-size: 11px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
	outline: none;
	cursor: pointer;
}

/* ---- Group Cards ---- */
.pict-fe-groups-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8px;
}
.pict-fe-groups-header h4
{
	margin: 0;
	font-size: 13px;
	font-weight: 600;
	color: var(--pfe-text-secondary);
	text-transform: uppercase;
	letter-spacing: 0.5px;
}
.pict-fe-groups-list
{
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.pict-fe-group-card
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
}
.pict-fe-group-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	background: var(--pfe-bg-panel);
	border-bottom: 1px solid var(--pfe-border-on-bg-secondary);
	border-radius: 4px 4px 0 0;
}
.pict-fe-group-header-labels
{
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
	gap: 6px;
}
.pict-fe-group-title
{
	font-weight: 500;
	font-size: 13px;
	color: var(--pfe-text-primary);
	cursor: pointer;
	border-bottom: 1px dashed transparent;
}
.pict-fe-group-title:hover
{
	border-bottom-color: var(--pfe-border-default);
}
.pict-fe-group-hash
{
	font-size: 11px;
	color: var(--pfe-text-muted);
	font-family: monospace;
	margin-left: auto;
	cursor: pointer;
	border-bottom: 1px dashed transparent;
}
.pict-fe-group-hash:hover
{
	border-bottom-color: var(--pfe-border-default);
}
.pict-fe-group-layout
{
	font-size: 11px;
	color: var(--pfe-text-success);
	background: var(--pfe-bg-hover);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 9px;
	padding: 1px 8px;
	cursor: pointer;
	font-weight: 500;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-group-layout:hover
{
	background: color-mix(in srgb, var(--pfe-bg-success-tint) 18%, transparent);
	border-color: color-mix(in srgb, var(--pfe-border-success-tint) 35%, transparent);
}
.pict-fe-group-body
{
	padding: 8px 12px;
}
.pict-fe-group-fields
{
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 6px;
}
.pict-fe-group-actions
{
	display: flex;
	gap: 4px;
	align-items: center;
	margin-left: 12px;
	flex-shrink: 0;
}

/* ---- Inline Field Editor ---- */
.pict-fe-field-label
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
	margin-bottom: 2px;
}
.pict-fe-field-input
{
	width: 100%;
	padding: 4px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 13px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
}
.pict-fe-field-input:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-field-select
{
	width: 100%;
	padding: 4px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 13px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
}

/* ---- Row and Input ---- */
.pict-fe-group-body
{
	padding: 8px 12px;
}
.pict-fe-row
{
	border: 1px solid var(--pfe-border-on-bg-secondary);
	border-radius: 4px;
	margin-bottom: 6px;
	background: var(--pfe-bg-panel);
}
.pict-fe-row-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 8px;
	background: var(--pfe-bg-panel);
	border-bottom: 1px solid var(--pfe-border-on-bg-secondary);
	border-radius: 4px 4px 0 0;
}
.pict-fe-row-label
{
	font-size: 10px;
	font-weight: 500;
	color: var(--pfe-text-on-border-default);
	text-transform: uppercase;
	letter-spacing: 0.3px;
	margin-left: 4px;
}
.pict-fe-row-actions
{
	display: flex;
	gap: 3px;
	align-items: center;
	opacity: 0;
	transition: opacity 0.15s;
}
.pict-fe-row:hover .pict-fe-row-actions
{
	opacity: 1;
}
.pict-fe-row-inputs
{
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 6px 8px;
	align-items: center;
	min-height: 28px;
}
.pict-fe-input
{
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 3px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	font-size: 12px;
	cursor: pointer;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-input:hover
{
	border-color: var(--pfe-border-default);
	background: var(--pfe-bg-panel);
}
.pict-fe-input-selected
{
	border-color: var(--pfe-border-brand);
	background: var(--pfe-bg-secondary);
	box-shadow: 0 0 0 1px var(--pfe-shadow-brand);
}
.pict-fe-input-ordinal
{
	font-size: 9px;
	color: var(--pfe-text-muted);
	min-width: 14px;
	text-align: center;
}
.pict-fe-input-name
{
	font-size: 11px;
	color: var(--pfe-text-primary);
	font-weight: 500;
	white-space: nowrap;
}
.pict-fe-input-remove
{
	padding: 1px 4px;
	font-size: 10px;
	opacity: 0;
	transition: opacity 0.15s;
}
.pict-fe-input:hover .pict-fe-input-remove
{
	opacity: 1;
}
.pict-fe-add-input
{
	opacity: 0.3;
	transition: opacity 0.15s;
}
.pict-fe-row-inputs:hover .pict-fe-add-input
{
	opacity: 1;
}
.pict-fe-add-row
{
	opacity: 0.3;
	transition: opacity 0.15s;
	margin-top: 4px;
}
.pict-fe-group-card:hover .pict-fe-add-row
{
	opacity: 1;
}

/* ---- Tabular / RecordSet Group Body ---- */
.pict-fe-tabular-body
{
	padding: 10px 12px;
}
.pict-fe-tabular-fields
{
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
	margin-bottom: 10px;
}
.pict-fe-tabular-field
{
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.pict-fe-field-label
{
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--pfe-text-secondary);
}
.pict-fe-field-input
{
	font-family: inherit;
	font-size: 12px;
	padding: 4px 6px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-info);
}
.pict-fe-field-input:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-field-select
{
	font-family: inherit;
	font-size: 12px;
	padding: 4px 6px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-info);
	min-width: 0;
	flex: 1;
}
.pict-fe-field-select:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-tabular-columns-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 0;
	margin-bottom: 6px;
	border-top: 1px solid var(--pfe-border-on-bg-secondary);
	padding-top: 8px;
}
.pict-fe-tabular-columns-list
{
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 6px 0;
	align-items: center;
	min-height: 28px;
}
.pict-fe-refmanifest-selector
{
	display: flex;
	gap: 4px;
	align-items: center;
}
.pict-fe-refmanifest-selector select
{
	flex: 1;
	min-width: 0;
}
.pict-fe-refmanifest-badge
{
	font-size: 10px;
	color: var(--pfe-text-success);
	background: var(--pfe-bg-hover);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 9px;
	padding: 2px 10px;
	margin-bottom: 10px;
	display: inline-block;
	font-weight: 500;
}

/* ---- Iconography ---- */
.pict-fe-icon
{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	line-height: 0;
}
.pict-fe-icon svg
{
	display: block;
}
.pict-fe-icon-section
{
	opacity: 0.7;
}
.pict-fe-icon-group
{
	opacity: 0.6;
}
.pict-fe-icon-row
{
	opacity: 0.45;
}
.pict-fe-icon-input
{
	opacity: 0.4;
}
.pict-fe-icon-datatype
{
	opacity: 0.55;
}
.pict-fe-icon-inputtype-chip
{
	margin-right: 2px;
	opacity: 0.7;
}
.pict-fe-icon-picker
{
	margin-right: 4px;
	opacity: 0.65;
	vertical-align: middle;
}
.pict-fe-icon-add
{
	opacity: 0.8;
	margin-right: 2px;
}

/* ---- Drag and Drop ---- */
.pict-fe-drag-handle
{
	cursor: grab;
	opacity: 0.35;
	margin-right: 4px;
	display: inline-flex;
	align-items: center;
	transition: opacity 0.15s;
}
.pict-fe-drag-handle:hover
{
	opacity: 0.7;
}
.pict-fe-drag-handle:active
{
	cursor: grabbing;
}
.pict-fe-dragging
{
	opacity: 0.4;
}
.pict-fe-drag-over
{
	outline: 2px dashed var(--pfe-outline-brand);
	outline-offset: -2px;
	background: var(--pfe-bg-brand-tint);
}
.pict-fe-drag-insert-before
{
	position: relative;
	background: var(--pfe-bg-brand-tint-soft);
}
.pict-fe-drag-insert-before::before
{
	content: '';
	position: absolute;
	top: -1px;
	left: 0;
	right: 0;
	height: 3px;
	background: var(--pfe-bg-brand);
	border-radius: 2px;
	z-index: 10;
	pointer-events: none;
}
.pict-fe-drag-insert-after
{
	position: relative;
	background: var(--pfe-bg-brand-tint-soft);
}
.pict-fe-drag-insert-after::after
{
	content: '';
	position: absolute;
	bottom: -1px;
	left: 0;
	right: 0;
	height: 3px;
	background: var(--pfe-bg-brand);
	border-radius: 2px;
	z-index: 10;
	pointer-events: none;
}

/* ---- Editor Layout: tab content + toggle + properties panel ---- */
.pict-fe-editor-layout
{
	display: flex;
	gap: 0;
	flex: 1;
	min-height: 0;
	overflow: hidden;
}
.pict-fe-editor-content
{
	flex: 1;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.pict-fe-panel-toggle
{
	width: 14px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: col-resize;
	background: var(--pfe-bg-secondary);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	margin: 6px 0;
	color: var(--pfe-text-muted);
	font-size: 10px;
	user-select: none;
	transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.pict-fe-panel-toggle:hover
{
	background: var(--pfe-bg-tertiary);
	border-color: var(--pfe-border-light);
	color: var(--pfe-text-primary);
}
.pict-fe-panel-toggle:active
{
	background: var(--pfe-bg-tertiary);
	border-color: var(--pfe-border-default);
}
.pict-fe-panel-toggle-grip
{
	width: 4px;
	height: 32px;
	border-radius: 2px;
	background: var(--pfe-bg-tertiary);
	transition: background 0.15s;
}
.pict-fe-panel-toggle:hover .pict-fe-panel-toggle-grip
{
	background: var(--pfe-bg-on-text-muted);
}
.pict-fe-properties-panel
{
	width: 0;
	overflow: hidden;
	border-left: 1px solid transparent;
	background: var(--pfe-bg-panel);
	display: flex;
	flex-direction: column;
}
.pict-fe-properties-panel-open
{
	overflow-y: auto;
	overflow-x: hidden;
	border-left-color: var(--pfe-border-on-bg-tertiary);
}

/* ---- Panel Tabs ---- */
.pict-fe-panel-tabbar
{
	display: flex;
	background: var(--pfe-bg-secondary);
	padding: 0;
	margin: 0;
	flex-shrink: 0;
	overflow: hidden;
	position: relative;
}
.pict-fe-panel-tab
{
	padding: 7px 8px;
	cursor: pointer;
	border: none;
	background: none;
	font-size: 11px;
	font-weight: 600;
	color: var(--pfe-text-secondary);
	border-top: 2px solid transparent;
	transition: color 0.15s, border-color 0.15s;
	text-align: center;
	user-select: none;
	white-space: nowrap;
	flex-shrink: 0;
}
.pict-fe-panel-tab:hover
{
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-tertiary);
}
.pict-fe-panel-tab-active
{
	color: var(--pfe-text-primary);
	border-top-color: var(--pfe-border-brand);
	background: var(--pfe-bg-panel);
}
/* Overflow hamburger menu button */
.pict-fe-panel-tab-overflow-btn
{
	display: none;
	padding: 7px 8px;
	cursor: pointer;
	border: none;
	background: var(--pfe-bg-secondary);
	font-size: 13px;
	font-weight: 600;
	color: var(--pfe-text-secondary);
	border-top: 2px solid transparent;
	user-select: none;
	flex-shrink: 0;
	margin-left: auto;
	position: relative;
}
.pict-fe-panel-tab-overflow-btn:hover
{
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-tertiary);
}
.pict-fe-panel-tab-overflow-btn-visible
{
	display: block;
}
/* Dropdown menu for overflowed tabs */
.pict-fe-panel-tab-overflow-menu
{
	display: none;
	position: absolute;
	top: 100%;
	right: 0;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 0 0 4px 4px;
	box-shadow: 0 4px 12px var(--pfe-shadow);
	z-index: 20;
	min-width: 100px;
}
.pict-fe-panel-tab-overflow-menu-open
{
	display: block;
}
.pict-fe-panel-tab-overflow-item
{
	display: block;
	width: 100%;
	padding: 8px 14px;
	border: none;
	background: none;
	font-size: 12px;
	font-weight: 500;
	color: var(--pfe-text-secondary);
	text-align: left;
	cursor: pointer;
	white-space: nowrap;
}
.pict-fe-panel-tab-overflow-item:hover
{
	background: var(--pfe-bg-secondary);
	color: var(--pfe-text-primary);
}
.pict-fe-panel-tab-overflow-item-active
{
	color: var(--pfe-text-brand);
	font-weight: 600;
}
.pict-fe-panel-tab-content
{
	display: none;
}
.pict-fe-panel-tab-content-active
{
	display: block;
	flex: 1;
	overflow-y: auto;
	min-height: 0;
}

/* ---- Form Dashboard ---- */
.pict-fe-form-identity
{
	padding: 12px 12px 4px 12px;
}
.pict-fe-form-identity-heading
{
	font-size: 11px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-brand);
	margin-bottom: 8px;
}
.pict-fe-form-field
{
	margin-bottom: 8px;
}
.pict-fe-form-field-label
{
	display: block;
	font-size: 11px;
	font-weight: 600;
	color: var(--pfe-text-secondary);
	margin-bottom: 3px;
}
.pict-fe-form-dashboard-heading
{
	font-size: 11px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-brand);
	padding: 8px 12px 4px 12px;
}

/* ---- Stats Grid ---- */
.pict-fe-stats-grid
{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 6px;
	padding: 4px 12px 8px 12px;
}
.pict-fe-stats-card
{
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 5px;
	padding: 8px 6px;
	text-align: center;
}
.pict-fe-stats-value
{
	font-size: 20px;
	font-weight: 700;
	color: var(--pfe-text-brand);
	line-height: 1.1;
	margin-bottom: 2px;
}
.pict-fe-stats-label
{
	font-size: 8px;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--pfe-text-secondary);
	font-weight: 600;
}

/* ---- Histogram Bars ---- */
.pict-fe-histogram
{
	padding: 4px 12px 8px 12px;
}
.pict-fe-histogram-row
{
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 4px;
	font-size: 11px;
}
.pict-fe-histogram-label
{
	flex: 0 0 80px;
	color: var(--pfe-text-primary);
	font-weight: 500;
	text-align: right;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-histogram-bar-wrap
{
	flex: 1;
	display: block;
	height: 14px;
	background: var(--pfe-bg-secondary);
	border-radius: 3px;
	overflow: hidden;
}
.pict-fe-histogram-bar
{
	display: block;
	height: 100%;
	background: var(--pfe-bg-warning);
	border-radius: 3px;
	min-width: 2px;
	transition: width 0.2s ease;
}
.pict-fe-histogram-count
{
	flex: 0 0 24px;
	text-align: right;
	font-weight: 600;
	color: var(--pfe-text-brand);
	font-size: 11px;
}

/* ---- Input Selector ---- */
.pict-fe-input-selector
{
	padding: 8px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
}
.pict-fe-input-selector-select
{
	width: 100%;
	padding: 5px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 12px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
	cursor: pointer;
}
.pict-fe-input-selector-select:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}

/* ---- Properties Panel ---- */
.pict-fe-props-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	background: var(--pfe-bg-secondary);
	flex-shrink: 0;
}
.pict-fe-props-header-title
{
	font-size: 12px;
	font-weight: 600;
	color: var(--pfe-text-primary);
	text-transform: uppercase;
	letter-spacing: 0.4px;
}
.pict-fe-props-close
{
	background: none;
	border: none;
	font-size: 16px;
	color: var(--pfe-text-secondary);
	cursor: pointer;
	padding: 0 4px;
	line-height: 1;
}
.pict-fe-props-close:hover
{
	color: var(--pfe-text-error);
}
.pict-fe-props-body
{
	padding: 12px;
}
.pict-fe-props-field
{
	margin-bottom: 10px;
}
.pict-fe-props-label
{
	font-size: 10px;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--pfe-text-secondary);
	margin-bottom: 3px;
}
.pict-fe-props-input
{
	width: 100%;
	padding: 5px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 13px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
}
.pict-fe-props-input:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-props-input-mono
{
	font-family: monospace;
	font-size: 12px;
}
.pict-fe-props-value-readonly
{
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-secondary);
	padding: 5px 8px;
	background: var(--pfe-bg-secondary);
	border-radius: 3px;
	word-break: break-all;
}
.pict-fe-props-inputtype-btn
{
	width: 100%;
	padding: 5px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 13px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	cursor: pointer;
	text-align: left;
	box-sizing: border-box;
}
.pict-fe-props-inputtype-btn:hover
{
	border-color: var(--pfe-border-default);
	background: var(--pfe-bg-panel);
}
.pict-fe-props-address-row
{
	display: flex;
	align-items: center;
	gap: 4px;
}
.pict-fe-props-address-row .pict-fe-props-input
{
	flex: 1;
	min-width: 0;
}
.pict-fe-props-address-confirm,
.pict-fe-props-address-cancel
{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 14px;
	cursor: pointer;
	padding: 0;
	line-height: 1;
	flex-shrink: 0;
}
.pict-fe-props-address-confirm
{
	background: var(--pfe-bg-hover);
	color: var(--pfe-text-success);
}
.pict-fe-props-address-confirm:hover
{
	background: color-mix(in srgb, var(--pfe-bg-success-tint) 30%, transparent);
	border-color: var(--pfe-border-success);
}
.pict-fe-props-address-cancel
{
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-error);
}
.pict-fe-props-address-cancel:hover
{
	background: var(--pfe-bg-hover);
	border-color: var(--pfe-border-error);
}
.pict-fe-props-position-row
{
	display: flex;
	align-items: center;
	gap: 6px;
}
.pict-fe-props-position-label
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
	font-weight: 600;
	white-space: nowrap;
}
.pict-fe-props-section-divider
{
	border-top: 1px solid var(--pfe-border-on-bg-tertiary);
	margin: 14px 0 10px 0;
}
.pict-fe-props-solver-info
{
	padding: 0;
}
.pict-fe-props-solver-info-heading
{
	font-size: 11px;
	font-weight: 600;
	color: var(--pfe-text-brand);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 6px;
}
.pict-fe-props-solver-info-label
{
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-secondary);
	margin-top: 6px;
	margin-bottom: 2px;
}
.pict-fe-props-solver-info-expr
{
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	padding: 3px 6px;
	margin: 2px 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-props-solver-info-assignment
{
	border-left: 3px solid var(--pfe-border-brand);
	padding-left: 6px;
	font-weight: 600;
}
.pict-fe-props-solver-info-link
{
	cursor: pointer;
	transition: background 0.15s, border-color 0.15s;
}
.pict-fe-props-solver-info-link:hover
{
	background: var(--pfe-bg-hover);
	border-color: var(--pfe-border-brand);
	color: var(--pfe-text-primary);
}
.pict-fe-props-placeholder
{
	font-size: 11px;
	color: var(--pfe-text-muted);
	font-style: italic;
	text-align: center;
	padding: 8px;
}
.pict-fe-props-section-header
{
	font-size: 11px;
	font-weight: 600;
	color: var(--pfe-text-brand);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	padding: 8px 12px 0 12px;
	margin-bottom: 10px;
}
.pict-fe-props-textarea
{
	width: 100%;
	padding: 6px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-family: monospace;
	font-size: 12px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	resize: vertical;
	box-sizing: border-box;
}
.pict-fe-props-textarea:focus
{
	border-color: var(--pfe-border-brand);
	outline: none;
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-props-checkbox-label
{
	display: flex;
	align-items: flex-start;
	gap: 6px;
	font-size: 11px;
	color: var(--pfe-text-primary);
	cursor: pointer;
	line-height: 1.4;
}
.pict-fe-props-checkbox
{
	margin-top: 2px;
	flex-shrink: 0;
}

/* ---- InputType Picker Overlay ---- */
.pict-fe-inputtype-overlay
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
}
.pict-fe-inputtype-picker
{
	position: fixed;
	z-index: 10000;
	width: 340px;
	max-height: 420px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-light);
	border-radius: 8px;
	box-shadow: 0 8px 24px var(--pfe-shadow), 0 2px 8px var(--pfe-shadow);
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.pict-fe-inputtype-picker-search
{
	padding: 10px 12px 8px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-secondary);
}
.pict-fe-inputtype-picker-search-input
{
	width: 100%;
	padding: 7px 10px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 5px;
	font-size: 13px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
	outline: none;
	transition: border-color 0.15s, box-shadow 0.15s;
}
.pict-fe-inputtype-picker-search-input:focus
{
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-inputtype-picker-default
{
	padding: 4px 8px;
	border-bottom: 1px solid var(--pfe-border-on-bg-secondary);
}
.pict-fe-inputtype-picker-categories
{
	overflow-y: auto;
	flex: 1;
	padding: 4px 0;
}
.pict-fe-inputtype-picker-category
{
	padding: 0 0 2px 0;
}
.pict-fe-inputtype-picker-category-label
{
	padding: 8px 12px 3px 12px;
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.6px;
	color: var(--pfe-text-brand);
}
.pict-fe-inputtype-picker-item
{
	padding: 6px 12px;
	cursor: pointer;
	transition: background 0.1s;
}
.pict-fe-inputtype-picker-item:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-inputtype-picker-item-active
{
	background: var(--pfe-bg-hover);
}
.pict-fe-inputtype-picker-item-active:hover
{
	background: var(--pfe-bg-hover);
}
.pict-fe-inputtype-picker-item-name
{
	display: flex;
	align-items: center;
	font-size: 13px;
	font-weight: 500;
	color: var(--pfe-text-primary);
}
.pict-fe-inputtype-picker-item-desc
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
	margin-top: 1px;
}
.pict-fe-inputtype-picker-empty
{
	padding: 16px 12px;
	text-align: center;
	color: var(--pfe-text-muted);
	font-style: italic;
	font-size: 12px;
}

/* ---- Content Editor Overlay (Markdown/HTML) ---- */
.pict-fe-content-editor-overlay
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--pfe-scrim);
	z-index: 9998;
}
.pict-fe-content-editor
{
	position: fixed;
	top: 5vh;
	left: 10vw;
	width: 80vw;
	height: 90vh;
	background: var(--pfe-bg-panel);
	border-radius: 8px;
	box-shadow: 0 8px 32px var(--pfe-shadow-strong);
	z-index: 9999;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.pict-fe-content-editor-header
{
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-bottom: 1px solid var(--pfe-border-light);
	background: var(--pfe-bg-panel);
	flex-shrink: 0;
}
.pict-fe-content-editor-title
{
	flex: 1;
	font-weight: 600;
	font-size: 14px;
	color: var(--pfe-text-primary);
}
.pict-fe-content-editor-close
{
	background: var(--pfe-bg-brand);
	color: var(--pfe-text-on-brand);
	border: none;
	border-radius: 4px;
	padding: 6px 16px;
	cursor: pointer;
	font-size: 13px;
	font-weight: 500;
}
.pict-fe-content-editor-close:hover
{
	background: var(--pfe-bg-brand-hover);
}
.pict-fe-content-editor-body
{
	flex: 1;
	overflow: auto;
	padding: 0;
}
.pict-fe-content-editor-fallback
{
	width: 100%;
	height: 100%;
	border: none;
	padding: 16px;
	font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
	font-size: 13px;
	line-height: 1.6;
	color: var(--pfe-text-primary);
	resize: none;
	outline: none;
	box-sizing: border-box;
}
.pict-fe-props-content-edit-btn
{
	width: 100%;
	padding: 8px 12px;
	background: var(--pfe-bg-brand);
	color: var(--pfe-text-on-brand);
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
}
.pict-fe-props-content-edit-btn:hover
{
	background: var(--pfe-bg-brand-hover);
}

/* ---- Manifest Summary ---- */
.pict-fe-manifest-summary
{
	margin-top: 6px;
	padding: 6px 8px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	font-size: 11px;
	color: var(--pfe-text-primary);
}
.pict-fe-manifest-summary-error
{
	color: var(--pfe-text-error);
	font-style: italic;
	background: color-mix(in srgb, var(--pfe-bg-error-tint) 5%, transparent);
	border-color: var(--pfe-border-error-tint);
}
.pict-fe-manifest-summary-stats
{
	display: flex;
	gap: 12px;
	margin-bottom: 3px;
}
.pict-fe-manifest-summary-stat
{
	white-space: nowrap;
}
.pict-fe-manifest-summary-stat strong
{
	color: var(--pfe-text-brand);
	font-weight: 700;
}
.pict-fe-manifest-summary-types
{
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
}
.pict-fe-manifest-summary-type
{
	font-size: 10px;
	padding: 1px 5px;
	background: var(--pfe-bg-hover);
	border-radius: 3px;
	color: var(--pfe-text-secondary);
	white-space: nowrap;
}

/* ---- Solver List ---- */
.pict-fe-solver-list-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 6px;
}
.pict-fe-solver-list-title
{
	font-size: 10px;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--pfe-text-secondary);
}
.pict-fe-solver-add-btn
{
	padding: 2px 8px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-brand);
	font-size: 11px;
	font-weight: 600;
	cursor: pointer;
	line-height: 1.4;
}
.pict-fe-solver-add-btn:hover
{
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-brand);
}
.pict-fe-solver-entry
{
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 6px 8px;
	margin-bottom: 4px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
	transition: border-color 0.1s, opacity 0.1s;
}
.pict-fe-solver-entry:hover
{
	border-color: var(--pfe-border-light);
}
.pict-fe-solver-entry.pict-fe-dragging
{
	opacity: 0.4;
}
.pict-fe-solver-entry.pict-fe-drag-over
{
	outline: 2px dashed var(--pfe-outline-brand);
	outline-offset: -2px;
	background: var(--pfe-bg-brand-tint);
}
.pict-fe-solver-expression
{
	width: 100%;
	padding: 4px 6px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
}
.pict-fe-solver-expression:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-solver-bottom-row
{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.pict-fe-solver-bottom-left
{
	display: flex;
	align-items: center;
	gap: 2px;
}
.pict-fe-solver-bottom-right
{
	display: flex;
	align-items: center;
	gap: 2px;
}
.pict-fe-solver-ordinal
{
	width: 40px;
	padding: 2px 4px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	text-align: center;
	box-sizing: border-box;
}
.pict-fe-solver-ordinal:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-solver-btn
{
	padding: 1px 4px;
	border: 1px solid transparent;
	border-radius: 2px;
	background: none;
	cursor: pointer;
	font-size: 12px;
	line-height: 1;
	color: var(--pfe-text-muted);
}
.pict-fe-solver-btn:hover
{
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-light);
}
.pict-fe-solver-btn-remove,
.pict-fe-solver-btn-expand
{
	opacity: 0;
	transition: opacity 0.15s;
}
.pict-fe-solver-entry:hover .pict-fe-solver-btn-remove,
.pict-fe-solver-entry:hover .pict-fe-solver-btn-expand
{
	opacity: 1;
}
.pict-fe-solver-btn-remove
{
	color: color-mix(in srgb, var(--pfe-text-error-tint) 45%, transparent);
}
.pict-fe-solver-btn-remove:hover
{
	color: var(--pfe-text-error);
	background: var(--pfe-bg-hover);
	border-color: var(--pfe-border-error-tint);
}
.pict-fe-solver-btn-armed
{
	opacity: 1 !important;
	color: var(--pfe-text-on-brand) !important;
	background: var(--pfe-bg-error) !important;
	border-color: var(--pfe-border-error) !important;
	font-size: 10px;
	padding: 1px 6px;
}
.pict-fe-solver-btn-armed:hover
{
	background: var(--pfe-bg-error) !important;
}
.pict-fe-solver-drag-handle
{
	cursor: grab;
	opacity: 0.35;
	font-size: 10px;
	display: inline-flex;
	align-items: center;
	transition: opacity 0.15s;
	padding: 1px 2px;
	color: var(--pfe-text-secondary);
}
.pict-fe-solver-drag-handle:hover
{
	opacity: 0.7;
}
.pict-fe-solver-drag-handle:active
{
	cursor: grabbing;
}
.pict-fe-solver-empty
{
	padding: 8px;
	text-align: center;
	font-size: 11px;
	color: var(--pfe-text-muted);
	font-style: italic;
}
.pict-fe-solver-btn-expand
{
	color: var(--pfe-text-muted);
}
.pict-fe-solver-btn-expand:hover
{
	color: var(--pfe-text-brand);
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-light);
}

/* ---- Solver Code Editor ---- */
/* ---- Solver Editor / Reference Styles ---- */
.pict-fe-solver-code-editor-container
{
	width: 100%;
	min-height: 120px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	overflow: auto;
	box-sizing: border-box;
}
.pict-fe-solver-code-editor-container:focus-within
{
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
/* Remove pict-section-code default border since our container provides it */
.pict-fe-solver-code-editor-container .pict-code-editor-wrap
{
	border: none;
	border-radius: 0;
}
/* Warm palette overrides to match form editor.
   pict-section-code styles this surface with its own
   .pict-code-editor-wrap .X selectors, which tie with a bare
   .pict-fe-solver-code-editor-container .X on specificity and win on source
   order. Naming the wrap class here keeps these one class ahead, so they land
   without reaching for !important. */
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor
{
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	caret-color: var(--pfe-caret-brand);
	font-size: 13px;
}
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-line-numbers
{
	background: var(--pfe-bg-secondary);
	border-right-color: var(--pfe-border-on-bg-tertiary);
	color: var(--pfe-text-muted);
}
/* Syntax highlighting token colors for solver DSL */
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .keyword { color: var(--pfe-syntax-keyword); font-weight: 600; }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .string { color: var(--pfe-syntax-string); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .number { color: var(--pfe-syntax-number); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .property { color: var(--pfe-syntax-property); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .operator { color: var(--pfe-syntax-operator); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .comment { color: var(--pfe-syntax-comment); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .punctuation { color: var(--pfe-syntax-punctuation); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .function-name { color: var(--pfe-syntax-function); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .attr-name { color: var(--pfe-syntax-attrname); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .attr-value { color: var(--pfe-syntax-attrvalue); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .builtin { color: var(--pfe-syntax-number); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .tag { color: var(--pfe-syntax-tag); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .type { color: var(--pfe-syntax-keyword); }
.pict-fe-solver-code-editor-container .pict-code-editor-wrap .pict-code-editor .variable { color: var(--pfe-syntax-variable); }
.pict-fe-solver-modal-ordinal-row
{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 10px;
}
.pict-fe-solver-modal-reference
{
	margin-top: 14px;
	border-top: 1px solid var(--pfe-border-on-bg-tertiary);
	padding-top: 12px;
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
.pict-fe-solver-modal-reference-header
{
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 8px;
}
.pict-fe-solver-modal-reference-search
{
	flex: 1;
	padding: 4px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 12px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
}
.pict-fe-solver-modal-reference-search:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-solver-modal-reference-list
{
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
}
.pict-fe-solver-modal-reference-group
{
	padding: 6px 10px 2px 10px;
	font-size: 9px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-brand);
	background: var(--pfe-bg-secondary);
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	position: sticky;
	top: 0;
}
.pict-fe-solver-modal-reference-item
{
	display: flex;
	flex-direction: column;
	padding: 5px 10px;
	cursor: pointer;
	border-bottom: 1px solid var(--pfe-border-on-bg-secondary);
	transition: background 0.1s;
}
.pict-fe-solver-modal-reference-item:last-child
{
	border-bottom: none;
}
.pict-fe-solver-modal-reference-item:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-solver-modal-reference-row
{
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 8px;
}
.pict-fe-solver-modal-reference-name
{
	font-size: 12px;
	font-weight: 600;
	color: var(--pfe-text-primary);
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-solver-modal-reference-hash
{
	font-family: monospace;
	font-size: 10px;
	color: var(--pfe-text-secondary);
	white-space: nowrap;
	flex-shrink: 0;
}
.pict-fe-solver-modal-reference-address
{
	font-family: monospace;
	font-size: 10px;
	color: var(--pfe-text-muted);
	white-space: nowrap;
	flex-shrink: 0;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pict-fe-solver-modal-reference-item-expanded
{
	background: var(--pfe-bg-secondary);
	border-left: 3px solid var(--pfe-border-brand);
	padding-left: 9px;
}
.pict-fe-solver-modal-reference-insert-btn
{
	font-size: 12px;
	padding: 4px 14px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	cursor: pointer;
	font-weight: 500;
	flex-shrink: 0;
	transition: background 0.1s, color 0.1s, opacity 0.12s;
	opacity: 0;
	font-family: inherit;
}
.pict-fe-solver-modal-reference-item:hover .pict-fe-solver-modal-reference-insert-btn
{
	opacity: 1;
}
.pict-fe-solver-modal-reference-insert-btn:hover
{
	background: var(--pfe-bg-brand);
	color: var(--pfe-text-on-brand);
	border-color: var(--pfe-border-brand);
}
.pict-fe-solver-modal-reference-detail
{
	border-top: 1px dashed var(--pfe-border-light);
	margin-top: 6px;
	padding-top: 6px;
}
.pict-fe-solver-modal-reference-detail-label
{
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-secondary);
	margin-top: 4px;
	margin-bottom: 2px;
}
.pict-fe-solver-modal-reference-detail-equation
{
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	padding: 3px 6px;
	margin: 2px 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-solver-modal-reference-detail-assignment
{
	border-left: 3px solid var(--pfe-border-brand);
	font-weight: 600;
	padding-left: 6px;
}
.pict-fe-solver-modal-reference-detail-link
{
	cursor: pointer;
	transition: background 0.15s, border-color 0.15s;
}
.pict-fe-solver-modal-reference-detail-link:hover
{
	background: var(--pfe-bg-hover);
	border-color: var(--pfe-border-brand);
	color: var(--pfe-text-primary);
}
.pict-fe-solver-modal-reference-detail-empty
{
	font-size: 10px;
	font-style: italic;
	color: var(--pfe-text-muted);
	padding: 4px 0;
}
.pict-fe-solver-modal-btn
{
	padding: 6px 16px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 4px;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-solver-modal-btn:hover
{
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-default);
}
.pict-fe-solver-modal-btn-save
{
	background: var(--pfe-bg-brand);
	color: var(--pfe-text-on-brand);
	border-color: var(--pfe-border-brand);
}
.pict-fe-solver-modal-btn-save:hover
{
	background: var(--pfe-bg-brand-hover);
	border-color: var(--pfe-border-brand-hover);
}

/* ---- Solver Editor Bottom Tabs ---- */
.pict-fe-solver-bottom-tabbar
{
	display: flex;
	gap: 0;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	margin-top: 14px;
	flex-shrink: 0;
}
.pict-fe-solver-bottom-tab
{
	padding: 5px 12px;
	font-size: 11px;
	font-weight: 500;
	color: var(--pfe-text-secondary);
	background: none;
	border: none;
	border-bottom: 2px solid transparent;
	cursor: pointer;
	transition: color 0.12s, border-color 0.12s;
	font-family: inherit;
}
.pict-fe-solver-bottom-tab:hover
{
	color: var(--pfe-text-primary);
}
.pict-fe-solver-bottom-tab-active
{
	color: var(--pfe-text-brand);
	font-weight: 600;
	border-bottom-color: var(--pfe-border-brand);
}
.pict-fe-solver-linter-spinner
{
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-left: 6px;
	border: 1.5px solid var(--pfe-border-on-bg-tertiary);
	border-top-color: var(--pfe-border-brand);
	border-radius: 50%;
	opacity: 0;
	animation: pict-fe-solver-linter-spin 0.6s linear infinite;
	transition: opacity 0.1s;
	vertical-align: middle;
	position: relative;
	top: -0.5px;
}
.pict-fe-solver-linter-spinner-visible
{
	opacity: 0.7;
}
@keyframes pict-fe-solver-linter-spin
{
	to { transform: rotate(360deg); }
}
.pict-fe-solver-bottom-content
{
	display: none;
}
.pict-fe-solver-bottom-content-active
{
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
}

/* ---- Expression Linter ---- */
.pict-fe-solver-linter-output
{
	padding: 8px 0;
	flex: 1;
	min-height: 0;
	overflow-y: auto;
}
.pict-fe-solver-linter-section-label
{
	font-size: 9px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--pfe-text-secondary);
	margin-bottom: 4px;
}
.pict-fe-solver-linter-section-label + .pict-fe-solver-linter-section-label,
.pict-fe-solver-linter-tokens + .pict-fe-solver-linter-section-label,
.pict-fe-solver-linter-messages + .pict-fe-solver-linter-section-label,
.pict-fe-solver-linter-descriptors + .pict-fe-solver-linter-section-label,
.pict-fe-solver-linter-docs + .pict-fe-solver-linter-section-label
{
	margin-top: 14px;
}
.pict-fe-solver-linter-tokens
{
	display: flex;
	flex-wrap: wrap;
	gap: 3px;
	padding: 6px 8px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	margin-bottom: 10px;
	min-height: 24px;
	align-items: center;
}
.pict-fe-solver-linter-token
{
	display: inline-block;
	padding: 2px 6px;
	border-radius: 3px;
	font-family: monospace;
	font-size: 12px;
	line-height: 1.4;
	white-space: nowrap;
}
.pict-fe-solver-linter-token-constant
{
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 10%, transparent);
	color: var(--pfe-syntax-number);
}
.pict-fe-solver-linter-token-symbol
{
	background: color-mix(in srgb, var(--pfe-bg-info) 10%, transparent);
	color: var(--pfe-syntax-property);
}
.pict-fe-solver-linter-token-operator
{
	background: color-mix(in srgb, var(--pfe-bg-info) 10%, transparent);
	color: var(--pfe-syntax-operator);
	font-weight: 600;
}
.pict-fe-solver-linter-token-function
{
	background: var(--pfe-bg-secondary);
	color: var(--pfe-syntax-function);
	font-weight: 600;
}
.pict-fe-solver-linter-token-string
{
	background: color-mix(in srgb, var(--pfe-bg-success-tint) 10%, transparent);
	color: var(--pfe-syntax-string);
}
.pict-fe-solver-linter-token-stateaddress
{
	background: color-mix(in srgb, var(--pfe-bg-accent) 15%, transparent);
	color: var(--pfe-syntax-variable);
}
.pict-fe-solver-linter-token-assignment
{
	background: var(--pfe-bg-secondary);
	color: var(--pfe-syntax-operator);
	font-weight: 700;
}
.pict-fe-solver-linter-token-parenthesis
{
	background: var(--pfe-bg-secondary);
	color: var(--pfe-syntax-punctuation);
	font-weight: 600;
}
.pict-fe-solver-linter-messages
{
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.pict-fe-solver-linter-message
{
	font-size: 11px;
	padding: 5px 8px;
	border-radius: 3px;
	line-height: 1.4;
}
.pict-fe-solver-linter-message-error
{
	background: var(--pfe-bg-hover);
	color: var(--pfe-text-error);
	border-left: 3px solid var(--pfe-border-error);
}
.pict-fe-solver-linter-message-warning
{
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 8%, transparent);
	color: color-mix(in srgb, var(--pfe-text-warning) 100%, transparent);
	border-left: 3px solid var(--pfe-border-warning-tint);
}
.pict-fe-solver-linter-ok
{
	font-size: 11px;
	color: var(--pfe-text-success);
	background: color-mix(in srgb, var(--pfe-bg-success-tint) 6%, transparent);
	padding: 5px 8px;
	border-radius: 3px;
	border-left: 3px solid var(--pfe-border-success-tint);
}
.pict-fe-solver-linter-empty
{
	font-size: 11px;
	color: var(--pfe-text-muted);
	font-style: italic;
	padding: 8px 0;
}
.pict-fe-solver-linter-token-link
{
	text-decoration: none;
	cursor: pointer;
}
.pict-fe-solver-linter-token-linked
{
	cursor: pointer;
	border-bottom: 1px dashed currentColor;
}
.pict-fe-solver-linter-token-link:hover .pict-fe-solver-linter-token-linked
{
	filter: brightness(0.85);
}
.pict-fe-solver-linter-docs
{
	display: flex;
	flex-wrap: wrap;
	gap: 4px 8px;
	padding: 6px 0;
}
.pict-fe-solver-linter-doc-link
{
	display: inline-block;
	font-size: 11px;
	color: var(--pfe-text-brand);
	text-decoration: none;
	padding: 2px 8px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	cursor: pointer;
	transition: background 0.12s, border-color 0.12s;
}
.pict-fe-solver-linter-doc-link:hover
{
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-light);
}

/* ---- Linter Token References (Descriptors) ---- */
.pict-fe-solver-linter-descriptors
{
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 6px 0;
}
.pict-fe-solver-linter-descriptor
{
	padding: 8px 10px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
}
.pict-fe-solver-linter-descriptor-row
{
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
}
.pict-fe-solver-linter-descriptor-row + .pict-fe-solver-linter-descriptor-row
{
	margin-top: 3px;
}
.pict-fe-solver-linter-descriptor-name
{
	font-size: 12px;
	font-weight: 600;
	color: var(--pfe-text-primary);
}
.pict-fe-solver-linter-descriptor-type
{
	font-size: 10px;
	font-weight: 600;
	color: var(--pfe-text-on-brand);
	background: var(--pfe-bg-brand);
	padding: 1px 6px;
	border-radius: 3px;
	text-transform: uppercase;
	letter-spacing: 0.03em;
}
.pict-fe-solver-linter-descriptor-detail
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
	font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, monospace;
}
.pict-fe-solver-linter-descriptor-solver-label
{
	font-size: 9px;
	font-weight: 700;
	color: var(--pfe-text-secondary);
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-top: 5px;
}
.pict-fe-solver-linter-descriptor-solver-link
{
	font-size: 11px;
	font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, monospace;
	color: var(--pfe-text-brand);
	padding: 2px 6px;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	cursor: pointer;
	margin-top: 2px;
	transition: background 0.12s, border-color 0.12s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pict-fe-solver-linter-descriptor-solver-link:hover
{
	background: var(--pfe-bg-secondary);
	border-color: var(--pfe-border-light);
}

/* ---- Searchable Selector Dropdown ---- */
.pict-fe-searchable-selector
{
	padding: 8px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	position: relative;
}
.pict-fe-searchable-selector-input
{
	width: 100%;
	padding: 5px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 12px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
	cursor: text;
}
.pict-fe-searchable-selector-input:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-searchable-selector-input::placeholder
{
	color: var(--pfe-text-muted);
	font-style: italic;
}
.pict-fe-searchable-selector-list
{
	display: none;
	position: absolute;
	left: 12px;
	right: 12px;
	top: 100%;
	max-height: 260px;
	overflow-y: auto;
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-light);
	border-radius: 0 0 5px 5px;
	box-shadow: 0 6px 16px var(--pfe-shadow);
	z-index: 100;
	margin-top: -1px;
}
.pict-fe-searchable-selector-list-open
{
	display: block;
}
.pict-fe-searchable-selector-group-label
{
	padding: 6px 10px 2px 10px;
	font-size: 9px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-brand);
	background: var(--pfe-bg-panel);
}
.pict-fe-searchable-selector-subgroup-label
{
	padding: 4px 10px 2px 18px;
	font-size: 9px;
	font-weight: 600;
	letter-spacing: 0.3px;
	color: var(--pfe-text-secondary);
	background: var(--pfe-bg-panel);
}
.pict-fe-searchable-selector-item-indented
{
	padding-left: 22px;
}
.pict-fe-searchable-selector-item
{
	padding: 5px 10px;
	font-size: 12px;
	color: var(--pfe-text-primary);
	cursor: pointer;
	transition: background 0.08s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pict-fe-searchable-selector-item:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-searchable-selector-item-active
{
	background: var(--pfe-bg-hover);
	font-weight: 500;
}
.pict-fe-searchable-selector-item-active:hover
{
	background: var(--pfe-bg-hover);
}
.pict-fe-searchable-selector-empty
{
	padding: 10px;
	text-align: center;
	font-size: 11px;
	color: var(--pfe-text-muted);
	font-style: italic;
}

/* ---- Empty State ---- */
.pict-fe-empty
{
	text-align: center;
	padding: 24px;
	color: var(--pfe-text-muted);
	font-style: italic;
}

/* ---- JSON Tab (Code Editor) ---- */
.pict-fe-tabcontent .pict-code-editor-wrap
{
	flex: 1;
	min-height: 200px;
}

/* ---- Object Editor Tab ---- */
.pict-fe-tabcontent .pict-objecteditor
{
	flex: 1;
	min-height: 200px;
}

/* ---- Options Tab: Option Entries ---- */
.pict-fe-option-entries
{
	display: flex;
	flex-direction: column;
	gap: 0;
	margin-bottom: 8px;
}
.pict-fe-option-entry
{
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 4px 0;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	transition: background 0.1s;
}
.pict-fe-option-entry:hover
{
	background: var(--pfe-bg-panel);
}
.pict-fe-option-entry-readonly
{
	cursor: default;
	padding: 3px 6px;
}
.pict-fe-option-drag-handle
{
	cursor: grab;
	color: var(--pfe-text-muted);
	font-size: 14px;
	flex-shrink: 0;
	width: 16px;
	text-align: center;
	user-select: none;
}
.pict-fe-option-drag-handle:active
{
	cursor: grabbing;
}
.pict-fe-option-id
{
	font-family: monospace;
	font-size: 12px;
	padding: 3px 6px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	width: 30%;
	min-width: 60px;
	flex-shrink: 0;
}
.pict-fe-option-text
{
	font-size: 12px;
	padding: 3px 6px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 3px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	flex: 1;
	min-width: 0;
}
.pict-fe-option-id-preview,
.pict-fe-option-text-preview
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
}
.pict-fe-option-id-preview
{
	font-family: monospace;
	width: 30%;
	min-width: 60px;
	flex-shrink: 0;
}
.pict-fe-option-text-preview
{
	flex: 1;
	min-width: 0;
}
.pict-fe-option-remove
{
	background: none;
	border: none;
	color: var(--pfe-text-muted);
	cursor: pointer;
	font-size: 12px;
	padding: 2px 4px;
	border-radius: 3px;
	flex-shrink: 0;
	opacity: 0;
	transition: opacity 0.15s, background 0.1s, color 0.1s;
}
.pict-fe-option-entry:hover .pict-fe-option-remove
{
	opacity: 1;
}
.pict-fe-option-remove:hover
{
	background: var(--pfe-bg-secondary);
	color: var(--pfe-text-error);
}
.pict-fe-option-remove-armed
{
	background: var(--pfe-bg-error) !important;
	color: var(--pfe-text-on-brand) !important;
	opacity: 1 !important;
	font-size: 10px;
	padding: 2px 6px;
}
.pict-fe-option-add-btn
{
	display: block;
	width: 100%;
	padding: 6px;
	margin-top: 4px;
	margin-bottom: 12px;
	border: 1px dashed var(--pfe-border-on-text-muted);
	border-radius: 4px;
	background: transparent;
	color: var(--pfe-text-brand);
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-option-add-btn:hover
{
	background: var(--pfe-bg-panel);
	border-color: var(--pfe-border-brand);
}

/* ---- Options Tab: Source Toggle ---- */
.pict-fe-option-source-toggle
{
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 10px;
	padding: 6px 0;
}
.pict-fe-option-source-radio
{
	display: flex;
	align-items: center;
	gap: 3px;
	font-size: 12px;
	color: var(--pfe-text-primary);
	cursor: pointer;
}
.pict-fe-option-source-radio input[type="radio"]
{
	margin: 0;
	cursor: pointer;
}

/* ---- Options Tab: Named Option Lists ---- */
.pict-fe-named-list-card
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	margin-bottom: 8px;
	overflow: hidden;
}
.pict-fe-named-list-header
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 10px;
	cursor: pointer;
	background: var(--pfe-bg-panel);
	transition: background 0.1s;
	user-select: none;
}
.pict-fe-named-list-header:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-named-list-header-expanded
{
	background: var(--pfe-bg-secondary);
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	border-left: 3px solid var(--pfe-border-brand);
	padding-left: 7px;
}
.pict-fe-named-list-arrow
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
	flex-shrink: 0;
	width: 12px;
}
.pict-fe-named-list-name
{
	font-size: 13px;
	font-weight: 500;
	color: var(--pfe-text-primary);
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-named-list-count
{
	font-size: 10px;
	color: var(--pfe-text-secondary);
	flex-shrink: 0;
}
.pict-fe-named-list-body
{
	padding: 10px;
}
.pict-fe-named-list-props
{
	margin-top: 8px;
	border-top: 1px dashed var(--pfe-border-on-bg-tertiary);
	padding-top: 8px;
}
.pict-fe-named-list-delete-btn
{
	display: block;
	width: 100%;
	padding: 5px;
	margin-top: 8px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 4px;
	background: transparent;
	color: var(--pfe-text-secondary);
	font-size: 11px;
	cursor: pointer;
	transition: background 0.1s, color 0.1s, border-color 0.1s;
}
.pict-fe-named-list-delete-btn:hover
{
	background: color-mix(in srgb, var(--pfe-bg-error-tint) 6%, transparent);
	color: var(--pfe-text-error);
	border-color: color-mix(in srgb, var(--pfe-border-error-tint) 40%, transparent);
}
.pict-fe-named-list-delete-btn-armed
{
	background: var(--pfe-bg-error) !important;
	color: var(--pfe-text-on-brand) !important;
	border-color: var(--pfe-border-error) !important;
}
.pict-fe-named-list-add-btn
{
	display: block;
	width: 100%;
	padding: 8px;
	margin-top: 4px;
	border: 1px dashed var(--pfe-border-on-text-muted);
	border-radius: 4px;
	background: transparent;
	color: var(--pfe-text-brand);
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-named-list-add-btn:hover
{
	background: var(--pfe-bg-panel);
	border-color: var(--pfe-border-brand);
}

/* ---- Data Tab: Section Dividers ---- */
.pict-fe-data-section-divider
{
	height: 1px;
	background: var(--pfe-bg-tertiary);
	margin: 14px 0;
}

/* ---- Data Tab: Scope Selector ---- */
.pict-fe-data-scope-selector
{
	margin-bottom: 10px;
}

/* ---- Data Tab: PickList Cards ---- */
.pict-fe-picklist-card
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	margin-bottom: 8px;
	overflow: hidden;
}
.pict-fe-picklist-header
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 10px;
	cursor: pointer;
	background: var(--pfe-bg-panel);
	transition: background 0.1s;
	user-select: none;
}
.pict-fe-picklist-header:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-picklist-header-expanded
{
	background: var(--pfe-bg-secondary);
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	border-left: 3px solid var(--pfe-border-brand);
	padding-left: 7px;
}
.pict-fe-picklist-name
{
	font-size: 13px;
	font-weight: 500;
	color: var(--pfe-text-primary);
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-picklist-body
{
	padding: 10px;
}

/* ---- Data Tab: Provider Entries ---- */
.pict-fe-provider-entry
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	margin-bottom: 4px;
	background: var(--pfe-bg-panel);
	cursor: grab;
	transition: background 0.1s, box-shadow 0.1s;
}
.pict-fe-provider-entry:hover
{
	background: var(--pfe-bg-panel);
	box-shadow: 0 1px 3px var(--pfe-shadow);
}
.pict-fe-provider-drag-handle
{
	color: var(--pfe-text-muted);
	font-size: 14px;
	cursor: grab;
	user-select: none;
	flex-shrink: 0;
}
.pict-fe-provider-drag-handle:active
{
	cursor: grabbing;
}
.pict-fe-provider-name
{
	font-size: 12px;
	font-weight: 500;
	color: var(--pfe-text-primary);
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-provider-remove
{
	background: none;
	border: none;
	color: var(--pfe-text-muted);
	font-size: 13px;
	cursor: pointer;
	padding: 2px 4px;
	border-radius: 3px;
	transition: color 0.1s, background 0.1s;
	flex-shrink: 0;
}
.pict-fe-provider-entry:hover .pict-fe-provider-remove
{
	color: var(--pfe-text-secondary);
}
.pict-fe-provider-remove:hover
{
	color: var(--pfe-text-error);
	background: color-mix(in srgb, var(--pfe-bg-error-tint) 6%, transparent);
}
.pict-fe-provider-remove-armed
{
	background: var(--pfe-bg-error) !important;
	color: var(--pfe-text-on-brand) !important;
	font-size: 10px;
	font-weight: 600;
}
.pict-fe-provider-add-select
{
	width: 100%;
	padding: 6px 8px;
	margin-top: 4px;
	border: 1px dashed var(--pfe-border-on-text-muted);
	border-radius: 4px;
	background: transparent;
	color: var(--pfe-text-brand);
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: background 0.1s, border-color 0.1s;
}
.pict-fe-provider-add-select:hover
{
	background: var(--pfe-bg-panel);
	border-color: var(--pfe-border-brand);
}

/* ---- Data Tab: Entity Bundle ---- */
.pict-fe-entity-bundle-card
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	margin-bottom: 8px;
	overflow: hidden;
}
.pict-fe-entity-bundle-triggers
{
	margin-top: 10px;
	padding: 10px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 6px;
	background: var(--pfe-bg-panel);
}

/* ---- Solvers Tab ---- */
.pict-fe-solvers-health-ok
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
	background: color-mix(in srgb, var(--pfe-bg-success-tint) 8%, transparent);
	border: 1px solid color-mix(in srgb, var(--pfe-border-success-tint) 30%, transparent);
	border-left: 3px solid var(--pfe-border-success);
	border-radius: 4px;
	padding: 8px 12px;
	margin: 8px 0;
}
.pict-fe-solvers-health-issue
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	margin: 6px 0;
	overflow: hidden;
}
.pict-fe-solvers-health-issue-header
{
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	background: var(--pfe-bg-panel);
	cursor: pointer;
	font-size: 12px;
	font-weight: 500;
	color: var(--pfe-text-primary);
	transition: background 0.15s;
}
.pict-fe-solvers-health-issue-header:hover
{
	background: var(--pfe-bg-panel);
}
.pict-fe-solvers-health-issue-count
{
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 20px;
	height: 18px;
	padding: 0 6px;
	border-radius: 9px;
	font-size: 10px;
	font-weight: 700;
	color: var(--pfe-text-on-brand);
}
.pict-fe-solvers-health-issue-items
{
	padding: 6px 12px 10px 12px;
	border-top: 1px solid var(--pfe-border-on-bg-tertiary);
	background: var(--pfe-bg-panel);
}
.pict-fe-solvers-health-issue-item
{
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	padding: 3px 6px;
	margin: 2px 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
	transition: background 0.15s, border-color 0.15s;
}
.pict-fe-solvers-health-issue-item:hover
{
	background: var(--pfe-bg-hover);
	border-color: var(--pfe-border-brand);
	color: var(--pfe-text-primary);
}
.pict-fe-solvers-health-issue-detail
{
	font-size: 10px;
	color: var(--pfe-text-secondary);
	margin: 2px 0 4px 0;
}
.pict-fe-solvers-ordinal-group
{
	margin-bottom: 14px;
}
.pict-fe-solvers-ordinal-header
{
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-brand);
	margin-bottom: 6px;
	padding-bottom: 4px;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
}
.pict-fe-solvers-seq-entry
{
	display: flex;
	flex-direction: column;
	gap: 3px;
	padding: 6px 8px;
	margin-bottom: 4px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
	transition: border-color 0.15s;
}
.pict-fe-solvers-seq-entry:hover
{
	border-color: var(--pfe-border-light);
}
.pict-fe-solvers-seq-meta
{
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 10px;
	color: var(--pfe-text-secondary);
}
.pict-fe-solvers-badge-section
{
	display: inline-block;
	padding: 1px 6px;
	border-radius: 3px;
	font-size: 9px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.3px;
	background: var(--pfe-bg-secondary);
	color: var(--pfe-text-brand);
	border: 1px solid var(--pfe-border-light);
}
.pict-fe-solvers-badge-group
{
	display: inline-block;
	padding: 1px 6px;
	border-radius: 3px;
	font-size: 9px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.3px;
	background: color-mix(in srgb, var(--pfe-bg-info) 8%, transparent);
	color: var(--pfe-text-info-tint);
	border: 1px solid var(--pfe-border-info);
}
.pict-fe-solvers-flow-node
{
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 5px;
	margin-bottom: 8px;
	background: var(--pfe-bg-panel);
	overflow: hidden;
}
.pict-fe-solvers-flow-hash
{
	font-family: monospace;
	font-size: 12px;
	font-weight: 700;
	color: var(--pfe-text-primary);
	padding: 8px 12px;
	background: var(--pfe-bg-secondary);
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
}
.pict-fe-solvers-flow-relationship
{
	display: flex;
	align-items: flex-start;
	gap: 6px;
	padding: 4px 12px 4px 20px;
}
.pict-fe-solvers-flow-relationship:last-child
{
	padding-bottom: 8px;
}
.pict-fe-solvers-flow-arrow
{
	flex-shrink: 0;
	font-size: 13px;
	line-height: 20px;
	color: var(--pfe-text-brand);
}
.pict-fe-solvers-flow-label
{
	flex-shrink: 0;
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.3px;
	color: var(--pfe-text-secondary);
	line-height: 20px;
	min-width: 80px;
}
.pict-fe-solvers-flow-expr
{
	flex: 1;
	min-width: 0;
}

/* ---- Solver Editor Tab ---- */
.pict-fe-solver-editor-breadcrumb
{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 2px;
	padding: 8px 12px;
	margin-bottom: 10px;
	background: var(--pfe-bg-secondary);
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	font-size: 11px;
	color: var(--pfe-text-secondary);
}
.pict-fe-solver-editor-breadcrumb-item
{
	cursor: pointer;
	color: var(--pfe-text-brand);
	padding: 2px 4px;
	border-radius: 3px;
	transition: background 0.15s;
	max-width: 220px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-solver-editor-breadcrumb-item:hover
{
	background: var(--pfe-bg-hover);
	color: var(--pfe-text-primary);
}
.pict-fe-solver-editor-breadcrumb-sep
{
	color: var(--pfe-text-muted);
	font-size: 10px;
	user-select: none;
}
.pict-fe-solver-editor-breadcrumb-current
{
	font-weight: 600;
	color: var(--pfe-text-primary);
	padding: 2px 4px;
	max-width: 280px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.pict-fe-solver-editor-header
{
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0 0 10px 0;
	margin-bottom: 10px;
	border-bottom: 1px solid var(--pfe-border-on-bg-tertiary);
	font-size: 12px;
	color: var(--pfe-text-primary);
}
.pict-fe-solver-editor-header-context
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
}
.pict-fe-solver-editor-body
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
	min-height: 0;
}
.pict-fe-solver-editor-actions
{
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	padding: 10px 16px;
	border-top: 1px solid var(--pfe-border-on-bg-tertiary);
	background: var(--pfe-bg-panel);
	position: sticky;
	bottom: -16px;
	margin: 0 -16px -16px -16px;
	z-index: 2;
}
.pict-fe-solver-editor-list-heading
{
	font-size: 12px;
	font-weight: 600;
	color: var(--pfe-text-primary);
	margin-bottom: 8px;
}
.pict-fe-solver-editor-list-empty
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
	padding: 8px 0;
}
/* ---- Add Solver Helper ---- */
.pict-fe-add-solver-helper
{
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 0;
}
.pict-fe-add-solver-helper select
{
	flex: 1;
	min-width: 0;
	padding: 5px 8px;
	border: 1px solid var(--pfe-border-light);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	font-size: 12px;
	font-family: inherit;
}
.pict-fe-add-solver-helper .pict-fe-solver-add-btn
{
	flex-shrink: 0;
}
.pict-fe-add-solver-helper select:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}

/* ---- Import Tab ---- */
.pict-fe-import-container
{
	display: flex;
	flex-direction: column;
	gap: 16px;
	max-width: 640px;
}
.pict-fe-import-title
{
	margin: 0;
	font-size: 15px;
	font-weight: 600;
	color: var(--pfe-text-primary);
}
.pict-fe-import-description
{
	margin: 0;
	font-size: 13px;
	color: var(--pfe-text-secondary);
	line-height: 1.5;
}
.pict-fe-import-dropzone
{
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 200px;
	border: 2px dashed var(--pfe-border-default);
	border-radius: 8px;
	background: var(--pfe-bg-panel);
	cursor: pointer;
	transition: border-color 0.15s, background 0.15s;
}
.pict-fe-import-dropzone:hover
{
	border-color: var(--pfe-border-brand);
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 8%, transparent);
}
.pict-fe-import-dropzone-active
{
	border-color: var(--pfe-border-brand);
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 15%, transparent);
	border-style: solid;
}
.pict-fe-import-dropzone-content
{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	pointer-events: none;
}
.pict-fe-import-dropzone-icon
{
	color: var(--pfe-text-on-border-default);
}
.pict-fe-import-dropzone-icon svg
{
	width: 48px;
	height: 48px;
}
.pict-fe-import-dropzone-text
{
	font-size: 16px;
	font-weight: 600;
	color: var(--pfe-text-primary);
}
.pict-fe-import-dropzone-subtext
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
}
.pict-fe-import-file-input
{
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	overflow: hidden;
	opacity: 0;
}
.pict-fe-import-status
{
	min-height: 0;
}
.pict-fe-import-status-success
{
	padding: 10px 14px;
	background: var(--pfe-bg-hover);
	border: 1px solid var(--pfe-border-success-tint);
	border-radius: 6px;
	font-size: 13px;
	color: var(--pfe-text-success);
	line-height: 1.5;
}
.pict-fe-import-status-error
{
	padding: 10px 14px;
	background: var(--pfe-bg-hover);
	border: 1px solid var(--pfe-border-error-tint);
	border-radius: 6px;
	font-size: 13px;
	color: var(--pfe-text-error);
	line-height: 1.5;
}

/* ---- Export Buttons ---- */
.pict-fe-export-buttons
{
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
.pict-fe-export-btn
{
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 8px 16px;
	border: 1px solid var(--pfe-border-default);
	border-radius: 6px;
	background: var(--pfe-bg-panel);
	color: var(--pfe-text-primary);
	font-size: 13px;
	font-weight: 600;
	cursor: pointer;
	transition: border-color 0.15s, background 0.15s;
}
.pict-fe-export-btn:hover
{
	border-color: var(--pfe-border-brand);
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 8%, transparent);
}
.pict-fe-export-btn:active
{
	background: color-mix(in srgb, var(--pfe-bg-warning-tint) 15%, transparent);
}
.pict-fe-export-btn svg
{
	flex-shrink: 0;
}
.pict-fe-import-export-divider
{
	border: none;
	border-top: 1px solid var(--pfe-border-on-bg-hover);
	margin: 4px 0;
}

/* ---- Toast Notifications ---- */
.pict-fe-toast-container
{
	position: absolute;
	top: 56px;
	right: 16px;
	z-index: 9000;
	display: flex;
	flex-direction: column;
	gap: 8px;
	pointer-events: none;
}
.pict-fe-toast
{
	pointer-events: auto;
	padding: 10px 18px;
	border-radius: 6px;
	font-size: 13px;
	font-weight: 500;
	line-height: 1.4;
	box-shadow: 0 4px 12px var(--pfe-shadow);
	cursor: pointer;
	opacity: 0;
	transform: translateX(30px);
	transition: opacity 0.25s ease, transform 0.25s ease;
	max-width: 480px;
}
.pict-fe-toast-visible
{
	opacity: 1;
	transform: translateX(0);
}
.pict-fe-toast-exit
{
	opacity: 0;
	transform: translateX(30px);
}
.pict-fe-toast-success
{
	background: var(--pfe-bg-success);
	color: var(--pfe-text-on-brand);
}
.pict-fe-toast-error
{
	background: var(--pfe-bg-error);
	color: var(--pfe-text-on-brand);
}

/* ---- Preview Tab ---- */
.pict-fe-preview-container
{
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
}
.pict-fe-preview-actions
{
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 0 0 8px 0;
	flex-shrink: 0;
}
.pict-fe-preview-load-btn
{
	padding: 5px 14px;
	font-size: 11px;
	font-weight: 600;
	font-family: inherit;
	color: var(--pfe-text-on-brand);
	background: var(--pfe-bg-brand);
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.12s;
}
.pict-fe-preview-load-btn:hover
{
	background: var(--pfe-bg-brand-hover);
}
.pict-fe-preview-status
{
	font-size: 11px;
	color: var(--pfe-text-secondary);
	font-style: italic;
}
.pict-fe-preview-viewport
{
	flex: 1;
	min-height: 0;
	overflow: auto;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 4px;
	background: var(--pfe-bg-panel);
	padding: 12px;
}
.pict-fe-preview-placeholder
{
	font-size: 12px;
	color: var(--pfe-text-muted);
	font-style: italic;
	text-align: center;
	padding: 24px 0;
}
.pict-fe-preview-loading
{
	font-size: 12px;
	color: var(--pfe-text-secondary);
	font-style: italic;
	text-align: center;
	padding: 24px 0;
}
.pict-fe-preview-error
{
	font-size: 12px;
	color: var(--pfe-text-error);
	background: var(--pfe-bg-hover);
	border: 1px solid var(--pfe-border-error-tint);
	border-radius: 4px;
	padding: 10px 12px;
}

/* ---- Help Tab ---- */
.pict-fe-help-container
{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	min-height: 0;
}
.pict-fe-help-nav
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 4px 12px;
	font-size: 11px;
	color: var(--pfe-text-secondary);
	flex-shrink: 0;
}
.pict-fe-help-nav:empty
{
	display: none;
}
.pict-fe-help-nav a
{
	color: var(--pfe-text-brand);
	text-decoration: none;
	cursor: pointer;
}
.pict-fe-help-nav a:hover
{
	text-decoration: underline;
}
.pict-fe-help-nav .pict-fe-help-nav-sep
{
	color: var(--pfe-text-on-border-light);
}
.pict-fe-help-body
{
	flex: 1;
	overflow-y: auto;
}
/* Scale down pict-content base styles for sidebar context */
.pict-fe-help-body .pict-content
{
	max-width: none !important;
	padding: 12px !important;
	margin: 0 !important;
}
.pict-fe-help-body .pict-content h1
{
	font-size: 1.3em !important;
	margin-top: 0 !important;
}
.pict-fe-help-body .pict-content h2
{
	font-size: 1.15em !important;
}
.pict-fe-help-body .pict-content h3
{
	font-size: 1.05em !important;
}
.pict-fe-help-body .pict-content p
{
	font-size: 13px !important;
	line-height: 1.6 !important;
}
.pict-fe-help-body .pict-content a
{
	color: var(--pfe-text-brand) !important;
}
.pict-fe-help-body .pict-content code
{
	background: var(--pfe-bg-secondary) !important;
	color: var(--pfe-text-primary) !important;
	padding: 1px 5px !important;
	border-radius: 3px !important;
	font-size: 12px !important;
}
.pict-fe-help-body .pict-content pre
{
	background: var(--pfe-bg-secondary) !important;
	color: var(--pfe-text-primary) !important;
	padding: 10px 16px !important;
	border-radius: 4px !important;
	overflow-x: auto !important;
	font-size: 12px !important;
	line-height: 1.5 !important;
	margin: 8px 0 !important;
}
.pict-fe-help-body .pict-content .pict-content-code-wrap pre,
.pict-fe-help-body .pict-content-code-wrap pre
{
	background: var(--pfe-bg-secondary) !important;
	color: var(--pfe-text-primary) !important;
	padding: 10px 16px 10px 56px !important;
	border-radius: 4px !important;
	overflow-x: auto !important;
	font-size: 12px !important;
	line-height: 1.5 !important;
	margin: 0 !important;
}
.pict-fe-help-body .pict-content pre code,
.pict-fe-help-body .pict-content .pict-content-code-wrap pre code,
.pict-fe-help-body .pict-content-code-wrap pre code
{
	background: none !important;
	color: inherit !important;
	padding: 0 !important;
	font-size: inherit !important;
}
.pict-fe-help-body .pict-content .pict-content-code-wrap,
.pict-fe-help-body .pict-content-code-wrap
{
	margin: 8px 0 !important;
	background: var(--pfe-bg-secondary) !important;
	border-radius: 4px !important;
	border: 1px solid var(--pfe-border-on-bg-tertiary) !important;
	overflow-x: auto !important;
	overflow-y: hidden !important;
	font-size: 12px !important;
	line-height: 1.5 !important;
}
.pict-fe-help-body .pict-content .pict-content-code-wrap .pict-content-code-line-numbers,
.pict-fe-help-body .pict-content-code-wrap .pict-content-code-line-numbers
{
	background: var(--pfe-bg-hover) !important;
	border-right: 1px solid var(--pfe-code-gutter-border) !important;
	color: var(--pfe-code-linenumber) !important;
	font-size: 12px !important;
	line-height: 1.5 !important;
	padding: 10px 0 !important;
}
.pict-fe-help-body .pict-content .pict-content-code-wrap .keyword,
.pict-fe-help-body .pict-content-code-wrap .keyword { color: var(--pfe-syntax-keyword) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .string,
.pict-fe-help-body .pict-content-code-wrap .string { color: var(--pfe-syntax-string) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .number,
.pict-fe-help-body .pict-content-code-wrap .number { color: var(--pfe-syntax-number) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .comment,
.pict-fe-help-body .pict-content-code-wrap .comment { color: var(--pfe-syntax-comment) !important; font-style: italic !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .operator,
.pict-fe-help-body .pict-content-code-wrap .operator { color: var(--pfe-syntax-operator) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .punctuation,
.pict-fe-help-body .pict-content-code-wrap .punctuation { color: var(--pfe-syntax-punctuation) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .function-name,
.pict-fe-help-body .pict-content-code-wrap .function-name { color: var(--pfe-syntax-function) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .property,
.pict-fe-help-body .pict-content-code-wrap .property { color: var(--pfe-syntax-property) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .tag,
.pict-fe-help-body .pict-content-code-wrap .tag { color: var(--pfe-syntax-tag) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .attr-name,
.pict-fe-help-body .pict-content-code-wrap .attr-name { color: var(--pfe-syntax-attrname) !important; }
.pict-fe-help-body .pict-content .pict-content-code-wrap .attr-value,
.pict-fe-help-body .pict-content-code-wrap .attr-value { color: var(--pfe-syntax-attrvalue) !important; }

/* ---- JSON Tab Header ---- */
.pict-fe-json-header
{
	display: flex;
	align-items: center;
	padding: 6px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-hover);
	background: var(--pfe-bg-panel);
}
.pict-fe-json-readonly-label
{
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	color: var(--pfe-text-primary);
	cursor: pointer;
	user-select: none;
}
.pict-fe-json-readonly-label input[type="checkbox"]
{
	cursor: pointer;
}

/* ---- Form Overview Tab ---- */
.pict-fe-overview-header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	border-bottom: 1px solid var(--pfe-border-on-bg-hover);
}
.pict-fe-overview-title
{
	font-size: 15px;
	font-weight: 600;
	color: var(--pfe-text-primary);
}
.pict-fe-overview-labels
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 6px 2px 6px;
}
.pict-fe-overview-label
{
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--pfe-text-secondary);
	padding: 0 6px;
}
.pict-fe-overview-actions-spacer
{
	width: 64px;
	flex-shrink: 0;
}
.pict-fe-overview-tree
{
	display: flex;
	flex-direction: column;
	padding: 4px 6px;
}
.pict-fe-overview-row
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 3px 6px;
	border-radius: 3px;
	transition: background 0.1s;
}
.pict-fe-overview-row:hover
{
	background: var(--pfe-bg-secondary);
}
.pict-fe-overview-section
{
	font-weight: 600;
	margin-top: 6px;
}
.pict-fe-overview-section:first-child
{
	margin-top: 0;
}
.pict-fe-overview-group
{
	font-weight: 500;
}
.pict-fe-overview-input
{
	font-weight: 400;
}
.pict-fe-overview-indent
{
	flex-shrink: 0;
}
.pict-fe-overview-depth-0
{
	width: 0px;
}
.pict-fe-overview-depth-1
{
	width: 20px;
	border-left: 2px solid var(--pfe-border-on-bg-hover);
	margin-left: 6px;
	height: 100%;
}
.pict-fe-overview-depth-2
{
	width: 40px;
	border-left: 2px solid var(--pfe-border-on-bg-hover);
	margin-left: 26px;
	height: 100%;
}
.pict-fe-overview-icon
{
	flex-shrink: 0;
	display: flex;
	align-items: center;
	width: 16px;
}
.pict-fe-overview-field
{
	padding: 3px 6px;
	border: 1px solid var(--pfe-border-on-bg-tertiary);
	border-radius: 3px;
	font-size: 12px;
	font-family: inherit;
	color: var(--pfe-text-primary);
	background: var(--pfe-bg-panel);
	box-sizing: border-box;
	transition: border-color 0.15s, box-shadow 0.15s;
	min-width: 0;
}
.pict-fe-overview-field:focus
{
	outline: none;
	border-color: var(--pfe-border-brand);
	box-shadow: 0 0 0 2px var(--pfe-focus-ring);
}
.pict-fe-overview-field-name
{
	flex: 2;
	min-width: 80px;
}
.pict-fe-overview-field-hash
{
	flex: 2;
	min-width: 60px;
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-secondary);
}
.pict-fe-overview-field-address
{
	flex: 3;
	min-width: 80px;
	font-family: monospace;
	font-size: 11px;
	color: var(--pfe-text-success);
}
.pict-fe-overview-actions
{
	display: flex;
	gap: 4px;
	flex-shrink: 0;
}
.pict-fe-overview-empty
{
	padding: 24px;
	text-align: center;
	color: var(--pfe-text-secondary);
	font-size: 13px;
}
.pict-fe-overview-empty-inline
{
	color: var(--pfe-text-secondary);
	font-size: 12px;
	font-style: italic;
	padding: 4px 0;
}
.pict-fe-overview-row-separator
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 2px 6px;
	margin-top: 2px;
}
.pict-fe-overview-row-separator-label
{
	font-size: 10px;
	color: var(--pfe-text-secondary);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	white-space: nowrap;
	font-weight: 600;
}
.pict-fe-overview-row-separator-line
{
	flex: 1;
	height: 1px;
	background: var(--pfe-border-on-bg-tertiary);
	border: none;
}
.pict-fe-overview-column
{
	font-weight: 400;
}
.pict-fe-overview-layout-badge
{
	display: inline-block;
	font-size: 10px;
	padding: 1px 6px;
	border-radius: 3px;
	background: var(--pfe-bg-hover);
	color: var(--pfe-text-secondary);
	white-space: nowrap;
	font-weight: 600;
}
.pict-fe-overview-column-empty
{
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 2px 6px;
}
.pict-fe-overview-row[draggable]
{
	cursor: grab;
}
.pict-fe-overview-row[draggable]:active
{
	cursor: grabbing;
}
.pict-fe-overview-dragging
{
	opacity: 0.4;
}
.pict-fe-overview-drop-above
{
	border-top: 2px solid var(--pfe-border-warning);
}
.pict-fe-overview-drop-below
{
	border-bottom: 2px solid var(--pfe-border-warning);
}
`,

	Templates:
	[
		{
			Hash: 'FormEditor-Container-Template',
			Template: '<div class="pict-formeditor" id="FormEditor-Wrap-{~D:Context[0].Hash~}"></div>'
		}
	],

	Renderables:
	[
		{
			RenderableHash: 'FormEditor-Container',
			TemplateHash: 'FormEditor-Container-Template',
			DestinationAddress: '#FormEditor-Container',
			RenderMethod: 'replace'
		}
	]
});

module.exports = {
	extends: [],
	customSyntax: "postcss-scss",
	plugins: [
		"stylelint-order",
		"stylelint-scss"
	],
	rules: {
		/* Stylelint configuration (https://stylelint.io/user-guide/rules/)
		---------------------------------------------------------------------------------------------------- */
		// Disallow duplicate custom properties within declaration blocks
		"declaration-block-no-duplicate-custom-properties": true,

		// Disallow duplicate properties within declaration blocks
		"declaration-block-no-duplicate-properties": true,

		// Disallow duplicate names within font families.
		"font-family-no-duplicate-names": true,

		// Disallow duplicate selectors within keyframe blocks
		"keyframe-block-no-duplicate-selectors": true,

		// Disallow duplicate @import rules
		"no-duplicate-at-import-rules": true,

		// Disallow empty comments
		"comment-no-empty": true,

		// Disallow invalid hex colors
		"color-no-invalid-hex": true,

		// Disallow invalid unspaced operator within calc functions
		"function-calc-no-unspaced-operator": true,

		// Disallow invalid named grid areas
		"named-grid-areas-no-invalid": true,

		// Disallow invalid position @import rules
		"no-invalid-position-at-import-rule": true,

		// Disallow invalid newlines within strings
		"string-no-newline": true,

		// Disallow missing var function for custom properties
		"custom-property-no-missing-var-function": true,

		// Disallow non-standard direction values for linear gradient functions
		"function-linear-gradient-no-nonstandard-direction": true,

		// Disallow unknown annotations
		"annotation-no-unknown": true,

		// Disallow unknown functions
		"function-no-unknown": true,

		// Disallow unknown media feature names
		"media-feature-name-no-unknown": true,

		// Disallow unknown values for media features
		"media-feature-name-value-no-unknown": true,

		// Disallow unknown animations
		"no-unknown-animations": true,

		// Disallow unknown custom media queries
		"no-unknown-custom-media": true,

		// Disallow unknown custom properties
		"no-unknown-custom-properties": true,

		// Disallow unknown pseudo-element selectors
		"selector-pseudo-element-no-unknown": true,

		// Disallow unknown type selectors
		"selector-type-no-unknown": true,

		// Disallow unknown units
		"unit-no-unknown": true,

		// Enforce lowercase function names
		"function-name-case": "lower",

		// Enforce lowercase type selectors
		"selector-type-case": "lower",

		// Enforce lowercase keyword values
		"value-keyword-case": "lower",

		// Require an empty line before rules
		"rule-empty-line-before": ["always", {
			except: ["first-nested"],
			ignore: ["after-comment"]
		}],

		// Limit the number of declarations within a single-line declaration block
		"declaration-block-single-line-max-declarations": 1,

		// Enforce numeric font weight values
		"font-weight-notation": "numeric",

		// @import rules must always use string notation
		"import-notation": "string",

		// Media feature ranges must always use prefix notation
		"media-feature-range-notation": "prefix",

		// Applicable pseudo-elements must always use the double colon notation
		"selector-pseudo-element-colon-notation": "double",

		// Enforce quotes around font families (that are not a keyword such as sans-serif or serif)
		"font-family-name-quotes": "always-unless-keyword",

		// Enforce quotes around URLs
		"function-url-quotes": "always",

		// Enforce quotes around attribute values
		"selector-attribute-quotes": "always",

		// Enforce whitespace on the inside of comment markers
		"comment-whitespace-inside": "always",


		/* Stylelint Order configuration (https://github.com/hudochenkov/stylelint-order)
		---------------------------------------------------------------------------------------------------- */
		"order/properties-order": [[
			// All
			'all',

			// Content
			'content',

			// Positioning
			'isolation',
			'position',
			'z-index',
			'top',
			'right',
			'bottom',
			'left',
			'inset',
			'inset-block',
			'inset-block-start',
			'inset-block-end',
			'inset-inline',
			'inset-inline-start',
			'inset-inline-end',
			'zoom',
			'transform-origin',
			'transform-box',
			'transform-style',
			'transform',
			'translate',
			'rotate',
			'scale',
			'offset-path',
			'offset-distance',
			'offset-rotate',

			// Layout
			'container',
			'container-name',
			'container-type',
			'size',
			'direction',
			'unicode-bidi',
			'float',
			'clear',
			'contain',
			'overflow',
			'overflow-x',
			'overflow-y',
			'overflow-block',
			'overflow-inline',
			'overflow-clip-margin',
			'overscroll-behavior',
			'overscroll-behavior-x',
			'overscroll-behavior-y',
			'overscroll-behavior-inline',
			'overscroll-behavior-block',
			'display',
			'table-layout',
			'border-spacing',
			'border-collapse',
			'empty-cells',
			'columns',
			'column-count',
			'column-width',
			'column-fill',
			'column-rule',
			'column-rule-color',
			'column-rule-style',
			'column-rule-width',
			'column-span',
			'widows',
			'orphans',
			'grid',
			'grid-area',
			'grid-auto-columns',
			'grid-auto-flow',
			'grid-auto-rows',
			'grid-column',
			'grid-column-end',
			'grid-column-gap',
			'grid-column-start',
			'grid-gap',
			'grid-row',
			'grid-row-end',
			'grid-row-gap',
			'grid-row-start',
			'grid-template',
			'grid-template-areas',
			'grid-template-columns',
			'grid-template-rows',
			'flex',
			'flex-flow',
			'flex-basis',
			'flex-direction',
			'flex-grow',
			'flex-shrink',
			'flex-wrap',
			'box-orient',
			'line-clamp',
			'gap',
			'row-gap',
			'column-gap',
			'place-content',
			'place-items',
			'place-self',
			'align-content',
			'align-items',
			'align-self',
			'justify-content',
			'justify-items',
			'justify-self',
			'order',
			'break-inside',
			'break-before',
			'break-after',
			'shape-outside',
			'shape-image-threshold',
			'shape-margin',

			// Box model
			'box-sizing',
			'aspect-ratio',
			'width',
			'inline-size',
			'min-width',
			'max-width',
			'min-inline-size',
			'max-inline-size',
			'height',
			'block-size',
			'min-height',
			'max-height',
			'min-block-size',
			'max-block-size',
			'margin',
			'margin-top',
			'margin-right',
			'margin-bottom',
			'margin-left',
			'margin-block',
			'margin-block-start',
			'margin-block-end',
			'margin-inline',
			'margin-inline-start',
			'margin-inline-end',
			'padding',
			'padding-top',
			'padding-right',
			'padding-bottom',
			'padding-left',
			'padding-block',
			'padding-block-start',
			'padding-block-end',
			'padding-inline',
			'padding-inline-start',
			'padding-inline-end',

			// Appearance
			'appearance',
			'visibility',
			'color-scheme',
			'forced-color-adjust',
			'accent-color',
			'perspective',
			'perspective-origin',
			'backface-visibility',
			'opacity',
			'object-fit',
			'object-position',
			'image-orientation',
			'background',
			'background-color',
			'background-image',
			'background-repeat',
			'background-repeat-x',
			'background-repeat-y',
			'background-attachment',
			'background-position',
			'background-position-x',
			'background-position-y',
			'background-clip',
			'background-origin',
			'background-size',
			'background-blend-mode',
			'clip',
			'clip-path',
			'filter',
			'backdrop-filter',
			'box-decoration-break',
			'border',
			'border-color',
			'border-style',
			'border-width',
			'border-top',
			'border-top-color',
			'border-top-style',
			'border-top-width',
			'border-right',
			'border-right-color',
			'border-right-style',
			'border-right-width',
			'border-bottom',
			'border-bottom-color',
			'border-bottom-style',
			'border-bottom-width',
			'border-left',
			'border-left-color',
			'border-left-style',
			'border-left-width',
			'border-block',
			'border-block-color',
			'border-block-style',
			'border-block-width',
			'border-block-start',
			'border-block-start-color',
			'border-block-start-style',
			'border-block-start-width',
			'border-block-end',
			'border-block-end-color',
			'border-block-end-style',
			'border-block-end-width',
			'border-inline',
			'border-inline-color',
			'border-inline-style',
			'border-inline-width',
			'border-inline-start',
			'border-inline-start-color',
			'border-inline-start-style',
			'border-inline-start-width',
			'border-inline-end',
			'border-inline-end-color',
			'border-inline-end-style',
			'border-inline-end-width',
			'border-radius',
			'border-top-left-radius',
			'border-top-right-radius',
			'border-bottom-right-radius',
			'border-bottom-left-radius',
			'border-start-start-radius',
			'border-start-end-radius',
			'border-end-start-radius',
			'border-end-end-radius',
			'border-image',
			'border-image-source',
			'border-image-slice',
			'border-image-width',
			'border-image-outset',
			'border-image-repeat',
			'outline',
			'outline-color',
			'outline-style',
			'outline-width',
			'outline-offset',
			'box-shadow',
			'mix-blend-mode',
			'caret-color',
			'box-decoration-break',
			'-webkit-box-decoration-break',

			// Typography
			'writing-mode',
			'font',
			'font-family',
			'font-size',
			'font-feature-settings',
			'font-variation-settings',
			'font-optical-sizing',
			'font-weight',
			'font-style',
			'font-display',
			'font-kerning',
			'font-variant',
			'font-variant-ligatures',
			'font-variant-caps',
			'font-variant-alternates',
			'font-variant-numeric',
			'font-variant-east-asian',
			'font-variant-position',
			'font-size-adjust',
			'font-stretch',
			'font-effect',
			'font-emphasize',
			'font-emphasize-position',
			'font-emphasize-style',
			'font-smoothing',
			'-webkit-font-smoothing',
			'-moz-osx-font-smoothing',
			'font-smooth',
			'ruby-position',
			'line-height',
			'hyphens',
			'color',
			'text-align',
			'text-align-last',
			'text-emphasis',
			'text-emphasis-color',
			'text-emphasis-style',
			'text-emphasis-position',
			'text-decoration',
			'text-decoration-color',
			'text-decoration-line',
			'text-decoration-style',
			'text-decoration-thickness',
			'text-decoration-skip-ink',
			'text-underline-position',
			'text-underline-offset',
			'text-indent',
			'text-justify',
			'text-outline',
			'text-overflow',
			'text-overflow-ellipsis',
			'text-overflow-mode',
			'text-shadow',
			'text-transform',
			'text-wrap',
			'text-size-adjust',
			'text-combine-upright',
			'text-orientation',
			'text-rendering',
			'-webkit-text-fill-color',
			'-webkit-text-stroke-color',
			'letter-spacing',
			'word-break',
			'word-spacing',
			'word-wrap',
			'line-break',
			'overflow-wrap',
			'tab-size',
			'white-space',
			'vertical-align',
			'paint-order',
			'hanging-punctuation',
			'list-style',
			'list-style-position',
			'list-style-type',
			'list-style-image',
			'src',
			'unicode-range',
			'ascent-override',
			'descent-override',
			'line-gap-override',

			// Interaction
			'pointer-events',
			'touch-action',
			'will-change',
			'cursor',
			'caption-side',
			'quotes',
			'counter-set',
			'counter-increment',
			'counter-reset',
			'resize',
			'user-select',
			'overflow-anchor',
			'nav-index',
			'nav-up',
			'nav-right',
			'nav-down',
			'nav-left',
			'scroll-behavior',
			'scrollbar-color',
			'scrollbar-width',
			'scrollbar-gutter',
			'scroll-margin',
			'scroll-margin-block',
			'scroll-margin-block-start',
			'scroll-margin-block-end',
			'scroll-margin-inline',
			'scroll-margin-inline-start',
			'scroll-margin-inline-end',
			'scroll-margin-top',
			'scroll-margin-right',
			'scroll-margin-bottom',
			'scroll-margin-left',
			'scroll-padding',
			'scroll-padding-block',
			'scroll-padding-block-start',
			'scroll-padding-block-end',
			'scroll-padding-inline',
			'scroll-padding-inline-start',
			'scroll-padding-inline-end',
			'scroll-padding-top',
			'scroll-padding-right',
			'scroll-padding-bottom',
			'scroll-padding-left',
			'scroll-snap-type',
			'scroll-snap-align',
			'scroll-snap-stop',
			'content-visibility',
			'contain-intrinsic-size',
			'contain-intrinsic-width',
			'contain-intrinsic-height',
			'contain-intrinsic-inline-size',
			'contain-intrinsic-block-size',
			'speak',
			'speak-as',

			// Transition
			'transition',
			'transition-delay',
			'transition-timing-function',
			'transition-duration',
			'transition-property',
			'animation',
			'animation-name',
			'animation-duration',
			'animation-play-state',
			'animation-timing-function',
			'animation-fill-mode',
			'animation-delay',
			'animation-iteration-count',
			'animation-direction',
			'animation-timeline',
			'timeline-scope',
			'scroll-timeline',
			'scroll-timeline-name',
			'scroll-timeline-axis',
			'view-timeline',
			'view-timeline-name',
			'view-timeline-axis',
			'view-timeline-inset',
			'view-transition-name',

			// SVG Presentation
			'alignment-baseline',
			'baseline-shift',
			'dominant-baseline',
			'text-anchor',
			'cx',
			'cy',
			'd',
			'r',
			'rx',
			'ry',
			'fill',
			'fill-opacity',
			'fill-rule',
			'flood-color',
			'flood-opacity',
			'stop-color',
			'stop-opacity',
			'stroke',
			'stroke-dasharray',
			'stroke-dashoffset',
			'stroke-linecap',
			'stroke-linejoin',
			'stroke-miterlimit',
			'stroke-opacity',
			'stroke-width',
			'vector-effect',
			'color-interpolation',
			'color-interpolation-filters',
			'color-profile',
			'color-rendering',
			'image-rendering',
			'lighting-color',
			'marker-start',
			'marker-mid',
			'marker-end',
			'mask',
			'mask-type',
			'shape-rendering',
			'clip-rule'
		], { "unspecified": "ignore" }]
	}
};

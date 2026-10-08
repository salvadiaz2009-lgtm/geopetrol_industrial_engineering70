---
name: GEOPETROL B2B Industrial
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f84'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#001b3d'
  on-primary-container: '#6f84ac'
  inverse-primary: '#b1c7f2'
  secondary: '#545f72'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f7'
  on-secondary-container: '#586377'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#351001'
  on-tertiary-container: '#b2755b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b1c7f2'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#31476b'
  secondary-fixed: '#d8e3fa'
  secondary-fixed-dim: '#bcc7dd'
  on-secondary-fixed: '#111c2c'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#fdb698'
  on-tertiary-fixed: '#351001'
  on-tertiary-fixed-variant: '#6b3a24'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.05em
  headline-sm:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
This design system is engineered for high-stakes industrial environments where precision, speed of legibility, and uncompromising reliability are paramount. The brand personality is rigorous, technical, and authoritative, designed to instill absolute confidence in engineering data and procurement workflows.

The design style is **Industrial Brutalism**. It rejects decorative softness in favor of structural integrity. The interface utilizes high-contrast layouts, heavy borders, and hard-offset shadows to create a clear visual hierarchy that remains legible under harsh field conditions or high-stress control room environments. Every element must serve a functional purpose; if a component does not provide data or facilitate action, it is omitted.

## Colors
The palette is rooted in corporate stability and industrial safety standards.

- **Primary (Deep Navy):** Used for global navigation, primary headers, and structural grounding. It represents the "solid ground" of the firm.
- **Secondary (Steel Gray):** Reserved for functional iconography, borders, and secondary metadata.
- **Accent (Safety Orange):** This color is restricted to critical Call-to-Actions (CTAs) and active "Alert" states. It must never be used for decorative accents.
- **Backgrounds:** A clean, high-contrast light mode is the default to ensure maximum readability (minimum 7:1 contrast ratio) against the Deep Navy and Safety Orange elements.

## Typography
The typographic system creates a clear distinction between "The Narrative" and "The Data."

- **Headlines:** Set in Montserrat, Bold, and Uppercase. This creates an impactful, architectural header style that feels "stamped" onto the page.
- **Body & Technical Data:** Set in Hanken Grotesk. This font was chosen for its exceptional clarity in numerical data and technical specifications. 
- **Hierarchy:** Use `label-caps` for table headers and metadata categories to ensure they are distinct from the data values they describe.

## Layout & Spacing
This design system utilizes a **rigid grid model** based on a 4px baseline.

- **Grid:** A 12-column fixed grid for desktop (1440px max-width) and a 4-column fluid grid for mobile.
- **Rhythm:** Vertical spacing must be consistent. Use `stack-md` (16px) for related elements and `stack-lg` (32px) to separate logical sections.
- **Density:** High information density is encouraged for data-rich dashboards. Padding should be utilitarian—enough to ensure legibility, but never "airy" or "wasteful."

## Elevation & Depth
Depth is communicated through **Structural Stacking** rather than light and shadow.

- **Hard-Offset Elevation:** Instead of soft shadows, use a solid 4px or 8px offset block in Deep Navy or Steel Gray to lift elements. This creates a "layered plate" effect common in industrial control panels.
- **Borders:** All containers, inputs, and cards must use a solid 2px border.
- **Z-Index:** Higher elevation is represented by thicker borders or darker hard-offsets, never by blur.

## Shapes
The shape language is strictly **Rectilinear**.

- **Corners:** 0px radius across all components (Buttons, Inputs, Cards, Modals).
- **Justification:** Sharp corners reinforce the technical, "machined" aesthetic of the system.
- **Dividers:** Use solid 2px Steel Gray lines to separate content blocks.

## Components

### Buttons
- **Primary:** Safety Orange background, White text, 0px radius. No gradient. On hover, use a 4px hard-offset shadow (Primary Navy).
- **Secondary:** Transparent background, 2px Primary Navy border, Montserrat Bold Uppercase text.
- **Critical:** Safety Orange border with blinking or solid high-contrast text for emergency stop/abort actions.

### Input Fields
- **Default:** 2px Steel Gray border, White background, 0px radius. 
- **Focus State:** 2px Primary Navy border with a 2px offset inner focus ring.
- **Labels:** Always positioned above the field in `label-caps`.

### Cards & Containers
- All containers must have a 2px Steel Gray border. 
- For "Active" or "Selected" modules, use a 2px Primary Navy border with a 4px hard-offset shadow.

### Data Tables
- **Header:** Deep Navy background with White `label-caps` text.
- **Rows:** Alternating subtle gray fills (Zebra striping) for readability. 2px vertical dividers between columns.
- **Cells:** Use `data-mono` for all numerical engineering values.

### Status Indicators
- **Strictly Functional:** Square blocks or solid 2px border icons. Green for "Nominal," Safety Orange for "Action Required," and Red for "Critical Failure."
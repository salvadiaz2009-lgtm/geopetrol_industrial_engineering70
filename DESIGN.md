---
name: Industrial Engineering & Energy Infrastructure
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#bb0112'
  on-secondary: '#ffffff'
  secondary-container: '#e02928'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#121c2a'
  on-tertiary-container: '#7a8495'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000b'
  tertiary-fixed: '#d9e3f6'
  tertiary-fixed-dim: '#bdc7d9'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4756'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Barlow Condensed
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: 0.02em
  headline-xl-mobile:
    fontFamily: Barlow Condensed
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Barlow Condensed
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Barlow Condensed
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Barlow Condensed
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Barlow Condensed
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an uncompromising, high-precision industrial aesthetic engineered for high-stakes energy logistics, hydrocarbon extraction, and petrochemical asset management. The visual language merges heavy-duty operational authority with the clarity of technical schematics and Swiss modernist typography.

The audience encompasses field engineers, operations directors, corporate stakeholders, and compliance officers who require instant data legibility and operational frictionlessness. The emotional response is focused, rigorous, and commanding: absolute reliability, structural durability, and razor-sharp execution. 

Aesthetic principles draw from **Technical Modernism** and **High-Contrast Industrial Brutalism**:
- Pure, uncompromised structural contrast: stark white canvasses grounded by high-density black architecture and calibrated industrial red signals.
- Zero decorative fluff: no gratuitous blurs, whimsical roundedness, or ornamental gradients. Every line, frame, and glyph serves an operational function.
- Utilitarian precision: strict mechanical rhythms, visible grid lines, tabular data alignment, and sharp visual delineations evoking machined steel and architectural blueprints.

## Colors

The palette is engineered for maximum optical acuity and structural weight. Color deployment must be treated as functional instrumentation rather than ambient decoration.

### Core Swatches
- **Primary Base (`#0A0A0A` & `#111111`):** Structural foundation. Drives all primary headlines, structural frames, dark chrome headers/footers, and primary buttons in neutral states. Represents deep industrial carbon and structural steel.
- **Industrial Red Accent (`#DC2626`, hover: `#B91C1C`, active/tint: `#EF4444`):** Operational focal point. Reserved strictly for primary call-to-actions, telemetry critical status alerts, active navigation indices, operational tags, and vital data highlights. Never use for low-priority ambient fills.
- **Secondary Charcoal (`#1F2937`):** Secondary structural tone for subtitles, body text, table borders, and divider rules.
- **Light Field Grounds (`#FFFFFF`, `#F8F9FA`, `#F1F3F5`):** `#FFFFFF` serves as the primary canvas. Crisp off-white `#F8F9FA` forms surface containers, data cards, and telemetry grids, while `#F1F3F5` provides low-elevation contrast for table stripes and inactive module trays.

### Usage Hierarchy
- **Contrast Ratios:** Text on light backgrounds must consistently exceed 7:1 contrast; interactive red triggers must achieve a minimum of 4.5:1 against adjacent surfaces.
- **Chromatics as Status:** Neutral surfaces must never bleed tint. Red signals operational priority, system activity, or direct user ignition.

## Typography

The typography couples the architectural density of **Barlow Condensed** with the rational, high-legibility mechanics of **Inter**. 

### Type Application
- **Barlow Condensed (Headlines & Labels):** Applied in uppercase or tight title-case to project structural scale and industrial rigor. Headings feel like stamped metal specifications or control room telemetry readouts. Letter spacing on labels and technical captions is slightly expanded to optimize scanning speed.
- **Inter (Body Text & Continuous Readouts):** Serves all continuous reading, telemetry numbers, parameter inputs, and operational descriptions. Inter provides zero-distortion optical clarity under rapid monitoring conditions.
- **Tabular Figures:** All numerical readouts (rates, barrels, pressure, timestamps) must enforce OpenType tabular figures (`tnum`) to maintain structural vertical alignment in logs and data grids.

## Layout & Spacing

Layouts follow a calibrated, rigid structural grid resembling physical control consoles and technical drafting matrices.

### Grid Infrastructure
- **Desktop (>= 1280px):** 12-column grid, `margin-desktop` (3rem) side padding, `gutter-lg` (2rem) between major columns. Max layout container width: 1440px centered, or edge-to-edge for telemetry dashboards.
- **Tablet (768px - 1279px):** 8-column grid, `margin` (2rem), `gutter` (1.5rem). Modules collapse to 4-column or full-width spans.
- **Mobile (< 768px):** 4-column grid, `margin-mobile` (1rem), `gutter-sm` (1rem). Multi-column toolbars reflow into vertical operational panels.

### Rhythm & Alignment
Spacing adheres to a strict 4px/8px modular base. Negative space is functional, not decorative: it isolates critical operational segments while keeping data density high. Components must snap strictly to grid boundaries; asymmetrical, overlapping, or floating layouts are prohibited.

## Elevation & Depth

This system avoids soft, floating elevation and atmospheric skeuomorphism. Depth is established through **architectural framing, razor-sharp borders, and tonal layering**.

- **Level 0 (Base Canvas):** Pure white (`#FFFFFF`) or light surface (`#F8F9FA`).
- **Level 1 (Card & Module Layer):** `#FFFFFF` surface enclosed by a solid 1px border of `#E5E7EB` or `#1F2937` for higher emphasis.
- **Level 2 (Active/Hover Layer):** Hard offset architectural drop shadow: `box-shadow: 2px 2px 0px #0A0A0A`. No diffuse blurs. Surface shifts cleanly, mimicking physical instrument toggles.
- **Level 3 (Overlay / Modal / Flyout):** Solid `#FFFFFF` or `#0A0A0A` panel encapsulated with a 2px `#0A0A0A` or `#DC2626` outline, backed by a high-opacity semi-matte backdrop overlay (`rgba(10, 10, 10, 0.75)`).
- **Chrome Panels (Headers / Terminal Footers):** Inverted high-density black (`#0A0A0A`) with hairline bottom borders in `#DC2626` or `#1F2937`.

## Shapes

The geometric form factor is completely **Sharp (`0`)**. Every element—from primary action buttons and metric cards down to form inputs, tooltips, and badges—features crisp 90-degree 0px corners.

- **Form Rationale:** Sharp geometry mirrors industrial fabrication, heavy engineering frameworks, steel plates, and digital CAD consoles. Soft, pill-shaped, or rounded edges dilute the mechanical precision of the design.
- **Dividers & Strokes:** 1px hairline dividers for secondary groupings; 2px solid strokes for interactive boundaries and emphasis states; 4px top or left accent blocks for active tabs, status strips, and telemetry indicators.

## Components

### Buttons
- **Primary Action:** Solid Industrial Red (`#DC2626`) background, white text in `label-lg`, 0px radius, 12px 24px padding. Hover state shifts to `#B91C1C` with a 2px 2px hard black offset shadow (`#0A0A0A`). Active state triggers an instantaneous 1px inset depression.
- **Secondary Industrial:** Solid Deep Black (`#0A0A0A`) background, white text, 0px radius. Hover state: background shifts to `#1F2937`.
- **Outline / Technical:** Transparent background, 1.5px solid `#0A0A0A` border, black text. Hover: fills solid `#0A0A0A` with white text.

### Input Fields & Controls
- **Inputs:** Crisp `#FFFFFF` background, 1px solid `#1F2937` border, 0px radius. Label positioned above in uppercase `label-sm` (`#1F2937`). On focus: 2px solid `#DC2626` outline with zero fuzzy ring.
- **Checkboxes & Radios:** Rigid 18px square geometry (even for radios, presented as diamond or stark geometric squares). Checked state features a high-visibility `#DC2626` fill with an internal pure white marker.

### Badges & Status Chips
- Rectangular blocks with uppercase `label-sm` typography and 2px 8px padding.
- **Critical / Active:** `#DC2626` background, `#FFFFFF` text.
- **Operational / Normal:** `#0A0A0A` background, `#FFFFFF` text.
- **Telemetry / Standby:** `#F1F3F5` background, `#1F2937` text, 1px solid `#1F2937`.

### Cards & Telemetry Panels
- Flat white `#FFFFFF` surface enclosed by a 1px solid `#E5E7EB` or `#1F2937` border.
- Optional 3px solid industrial red accent strip anchored to the top or left perimeter for critical assets or prioritized operational alerts.
- Metric values within cards utilize `headline-lg` in `#0A0A0A`, paired with `label-sm` uppercase descriptors.

### Data Grids & Tables
- Dense, highly structured tables featuring hairline `#E5E7EB` horizontal and vertical cell dividers.
- Table headers set against `#F1F3F5` in uppercase `label-md` with `#1F2937` text.
- Alternating zebra stripes using `#FFFFFF` and `#F8F9FA`. Hover states trigger a high-contrast 1px left accent bar in `#DC2626`.
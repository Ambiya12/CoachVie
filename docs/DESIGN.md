# Design System: Franck Chevalier Coaching (Wabi-Sabi Minimalist)
**Project Core:** Adapting the serene "Norm Interior" design language to a coaching platform.

## 1. Visual Theme & Atmosphere
The website embodies a **sophisticated, minimalist sanctuary** that balances the pristine simplicity of Scandinavian/Japanese (Wabi-Sabi) design with the warm, empathetic nature of life coaching. The interface feels **spacious, tranquil, and deeply grounded**, prioritizing breathing room and emotional resonance. The photography and typography carry a luxury, editorial tone.

**Key Characteristics:**
- Expansive whitespace creating generous breathing room.
- Clean, architectural grid system with staggered, asymmetrical content blocks.
- High-contrast typography with very thin, subtle dividing lines (hairline borders).
- No heavy, colored block buttons; relying instead on elegant outlines or text+arrow indicators.

## 2. Color Palette & Roles
- **Warm Barely-There Cream** (`#FCFAFA`) – Primary background color. Creates a serene canvas, avoiding the starkness of pure white.
- **Crisp Very Light Gray** (`#F5F5F5`) – Secondary surface color. Used to differentiate sections gently without sharp contrast.
- **Charcoal Near-Black** (`#1C1C1C`) – Primary text color (Headings, primary body). Extremely readable but softer than pure black.
- **Soft Warm Gray** (`#6B6B6B`) – Secondary text used for meta-data, minor descriptions, and subtitles.
- **Ultra-Soft Silver Gray** (`#E5E5E5`) – Used exclusively for the 1px hairline borders that divide sections laterally.

## 3. Typography Rules
**Primary Font Family:** Inter or a similarly clean, geometric sans-serif (e.g., Helvetica Neue, Manrope).

- **Display Headlines (H1):** Normal or Light weight (300/400), ALL CAPS, generous letter-spacing (0.05em to 0.1em). Used for the Hero and major section titles.
- **Section Headers (H2/H3):** Regular weight (400), crisp and clean.
- **Body Text:** Regular weight (400), relaxed line-height (1.6 to 1.8), creating effortless reading.
- **CTAs & Small Text:** Medium weight (500), slightly expanded tracking. Uppercase for primary actions.

## 4. Component Stylings
* **Buttons:** Two styles:
  * **Outline (Mon Compte / Primary CTA):** 1px solid Charcoal border, transparent background, Charcoal text. Very slight hover state (maybe a soft gray background).
  * **Text + Arrow:** Simple uppercase text with a subtle right arrow (`→`), used for "Read More" or "Next" actions. Focus on clean typography, no bounding box.
* **Cards/Containers:** No visible background boxes to the cards. Let the grid and whitespace define the boundary. Images should fill their conceptual column completely (full-bleed within their grid cell).
* **Inputs/Forms:** Clean and expansive. No colored backgrounds. 1px solid thin borders (`#E5E5E5`), plenty of internal padding (1rem+). Placeholders use Soft Warm Gray. Focus states should gently outline in primary Charcoal near-black.
* **Dividers:** 1px horizontal lines (`#E5E5E5`) spanning the full width of the container at the top or bottom of major sections.
* **Dark Theme Overrides (e.g. Pricing Block):** Dark Charcoal background (`#1C1C1C`), crisp white inverted text, borders/dividers shift to muted dark grays (`#333333`). Buttons invert to white outline/text.
* **Images:** Sharp, high-quality, placed in asymmetric grids. Ratio often 3:4 (portrait) or 16:9 (landscape) but mixed for editorial feel.

## 5. Layout Principles
- **Grid:** 12-column foundation, highly dependent on large left/right margins (padding of 5% to 10% on desktop).
- **Asymmetry:** Text blocks often sit in a column next to an empty column, or imagery overlaps columns to create an organic, flowing read.
- **Whitespace:** Massive vertical padding between sections (10rem to 15rem on desktop) to let the user pause and breathe between thoughts.
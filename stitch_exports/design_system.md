# Design System Document: Premium Training Experience

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Luminary."** 

This system moves beyond the static nature of traditional corporate training landing pages to create a digital environment that feels alive, high-tech, and authoritative. By evolving the core brand identity into a premium dark-mode experience, we transition from "informational" to "aspirational." 

The design rejects the rigid, boxed-in layouts of standard templates. Instead, it utilizes **intentional asymmetry**, where content flows across the screen in a rhythmic cadence. We leverage overlapping elements—such as "floating" glass cards that partially obscure ambient background glows—to create a sense of deep, digital space. This mimics the feeling of a high-end command center, positioning the training program as a gateway to the future of professional excellence.

---

## 2. Colors: Tonal Depth & Ambient Glow

This system relies on a sophisticated hierarchy of dark tones punctuated by high-energy neon accents. 

### Core Palette
- **Primary (Neon Blue):** `#afc6ff` (Main Action) / `#0072ff` (Brand Core)
- **Secondary (Cyan/Electric):** `#ddfcff` (Highlights) / `#00f2ff` (Glow/Bloom)
- **Background:** `#121316` (Deep Charcoal)
- **Surface Tiers:** `#1b1b1f` (Low) to `#343538` (Highest)

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. To create a premium feel, boundaries must be defined through **Background Color Shifts**. For example, a hero section sitting on `surface` (`#121316`) should transition into a "Curriculum" section using `surface-container-low` (`#1b1b1f`). This creates a soft, editorial transition that feels integrated rather than partitioned.

### Surface Hierarchy & Nesting
Treat the UI as a series of layered frosted glass sheets. 
- **Nesting Logic:** An informational card (`surface-container-high`) should always sit on a slightly darker section (`surface-container-low`). This tonal delta provides enough contrast for the eye to perceive structure without the visual "noise" of lines.

### The "Glass & Gradient" Rule
To achieve the "High-Tech" requirement:
- **Glassmorphism:** Use `surface-container-highest` with an opacity of 60% and a `backdrop-blur` of 20px-40px for floating navigation or modal elements.
- **Signature Gradients:** Buttons and primary accents should utilize a linear gradient from `#0072ff` to `#00f2ff` at a 135-degree angle. This provides a "soul" to the UI that flat colors lack.

---

## 3. Typography: Editorial Authority

We use **Inter** to maintain a clean, modern aesthetic that ensures readability across high-contrast backgrounds.

- **Display (lg/md/sm):** Used for "Impact Statements" and Hero titles. These should be tight-leading, bold, and occasionally use a subtle text-shadow of the `secondary` color at 10% opacity to create a "breathing" glow.
- **Headline (lg/md/sm):** Defines the narrative flow. Use these to anchor sections with clear, authoritative sizing.
- **Title & Body:** Optimized for long-form curriculum descriptions. Use `on-surface-variant` (`#c1c6d8`) for body text to reduce eye strain against the charcoal background.
- **Labels:** Reserved for "New" tags or technical metadata.

The hierarchy is designed to be **Asymmetric**: large Display titles should often be left-aligned with a significant "negative space" buffer to their right, forcing the user's eye to follow a specific narrative path.

---

## 4. Elevation & Depth: Tonal Layering

Depth is not a shadow; it is a relationship between light and surface.

- **The Layering Principle:** Use the `surface-container` tiers (Lowest to Highest) to "lift" content. A `surface-container-highest` element automatically feels closer to the user than the `surface` background.
- **Ambient Shadows:** Standard black drop shadows are forbidden. Use "Glow Shadows": a diffuse blur (30px-60px) using the `primary` color at 5-8% opacity. This mimics the way a neon light would cast a glow on a dark surface.
- **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., a card in a dense grid), use a "Ghost Border": `outline-variant` (`#414655`) at 15% opacity. It should be barely felt, only seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`#0072ff` to `#00f2ff`), white text, `9999px` (full) roundedness. Add a `box-shadow` bloom effect on hover.
- **Secondary:** Ghost style. `Ghost Border` (15% opacity) with a `secondary` text color.

### Sleek Cards
- **Construction:** No solid borders. Use `surface-container-low` backgrounds. 
- **Interaction:** On hover, the card should transition to `surface-container-high` and the `Ghost Border` should increase in opacity to 40% with a subtle neon blue inner-glow.

### Interactive "Step" Indicators (Inspired by Branding)
- Refine the circular "01, 02..." markers from the brand images. Use a `surface-container-highest` circle with a `secondary` (`#00f2ff`) 2px glow ring. This creates a "Power Cell" look that reinforces the training progress.

### Inputs & Fields
- **Style:** Dark fills (`surface-container-lowest`) with `outline-variant` ghost borders. The focus state should illuminate the entire border in `primary` blue with a 4px outer bloom.

---

## 6. Do's and Don'ts

### Do:
- **Do** use large amounts of "void" (Spacing Scale 16, 20, 24) to let the typography breathe.
- **Do** use the "Bloom" effect on CTAs to draw the eye to the conversion point.
- **Do** utilize intentional overlapping. Let a high-res image of a trainee or a tech icon "break" the container of a card to create 3D depth.

### Don't:
- **Don't** use 100% white text for long paragraphs; it creates "vibration" against the dark background. Use `on-surface-variant`.
- **Don't** use sharp corners. Stick to the `xl` (0.75rem) or `full` roundedness scale to maintain a "sleek" and "modern" feel.
- **Don't** use standard dividers. If you must separate content, use a 48px vertical gap (`spacing-12`) or a subtle 10% opacity gradient line that fades out at the edges.

---
**Director's Note:** This system is about the *interstitial* space. It’s the glow between the cards and the weight of the type that will make this feel premium. Build with the soul of a high-end watch brand and the tech-literacy of a software giant.

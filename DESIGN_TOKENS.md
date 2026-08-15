# Beyond Strangers — Design Tokens & Theme Architecture

## 1. Palette Specification

| Token Name | Hex Code | Role & Function | Permitted Usage | Prohibited Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--color-accent-1` | `#D4CADF` | Soft Lilac Tint | Surface fill, badge background, border | ❌ Body text, heading text, raw CTA background |
| `--color-accent-2` | `#D4D1D7` | Misty Slate Tint | Card surface, table header, separator | ❌ Body text, interactive link text |
| `--color-accent-3` | `#D5D1D7` | Neutral Pearl Tint | Pill tag fill, subtle divider | ❌ Small labels, button text |
| `--color-accent-4` | `#D6D1D7` | Subtle Quartz Tint | Outline border, input stroke, dot marker | ❌ Form field text |
| `--color-accent-5` | `#D7D1D7` | Light Alabaster Tint | Alternate section background tint | ❌ Text color |
| `--color-text` | `#080808` | Primary High-Contrast Ink | All body copy, headings, labels, icons | Must be paired with white/accent backgrounds |
| `--color-bg` | `#FFFFFF` | Canvas White | Page background, modal card canvas | Standard root |
| `--color-cta` | `#080808` | Solid Primary Button Fill | Primary booking and submission CTAs | High-contrast black button |
| `--color-cta-text` | `#FFFFFF` | Button Text | Text inside `.btn-primary` | White text on black button (21:1 contrast) |

---

## 2. Accessibility & Contrast Guidance (WCAG 2.1 AA / AAA)

### Critical Rule on Light Pastels
The requested accent colors (`#D4CADF` through `#D7D1D7`) are light, desaturated pastels with luminance values between **70% and 75%**.

- **Contrast against White (`#FFFFFF`)**: Only ~**1.3:1** (Severe failure if used as text).
- **Contrast against Dark Ink (`#080808`)**: **>14:1** (Exceeds WCAG AAA requirement of 7:1 for all text).

### Do's & Don'ts
- ✅ **DO**: Use `accent-1` through `accent-5` as container surfaces, card backgrounds, chip backgrounds, and delicate border lines.
- ✅ **DO**: Place `#080808` text on top of any `accent-1` through `accent-5` surface.
- ✅ **DO**: Render primary CTAs with `--color-cta` (`#080808`) and `--color-cta-text` (`#FFFFFF`).
- ❌ **DON'T**: Set `color: #D4CADF` for body text, titles, or small icons.
- ❌ **DON'T**: Create a button with background `#D4CADF` and white `#FFFFFF` text (contrast is only 1.3:1).
- ❌ **DON'T**: Rely on pastel colors alone to convey state or form errors.

---

## 3. Typography Stack & Tokens

- **Headings (`--font-heading`)**: `'Playfair Display', Georgia, Cambria, serif` (Editorial elegance)
- **Body (`--font-body`)**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace (`--font-mono`)**: `'JetBrains Mono', monospace` (Dates, coordinates, badges)
- **Responsive Scaling**:
  - `hero`: `clamp(1.875rem, 4.5vw, 3.25rem)`
  - `h1`: `clamp(1.75rem, 3.5vw, 2.5rem)`
  - `h2`: `clamp(1.375rem, 2.5vw, 1.875rem)`
  - `body`: `1rem` / `1.6` line-height

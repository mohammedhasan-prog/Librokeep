---
name: LibroKeep
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#b91a24'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff7a73'
  on-tertiary-container: '#79000e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style

The design system for this book management platform is built on the principles of **Modern Minimalism** and **Functional Elegance**. It is designed for librarians, collectors, and researchers who require a high-density information environment that remains calm and legible under heavy use.

The aesthetic prioritizes clarity and focus, utilizing generous whitespace to reduce cognitive load. The emotional response should be one of "organized serenity"—a digital sanctuary for physical and digital assets. Visual flair is reserved for interaction feedback (smooth transitions) and critical status indicators, while the interface itself recedes to let the content—titles, authors, and availability—take center stage.

## Colors

The palette is anchored in a professional spectrum of Slate grays and crisp Whites, punctuated by a vibrant Emerald Green for primary actions and "Available" states.

- **Primary (Emerald):** Used for main action buttons, successful status indicators, and active selection states.
- **Secondary (Indigo/Blue):** Reserved for "Borrowed" status badges and secondary navigational cues.
- **Tertiary (Soft Red):** Dedicated exclusively to "Overdue" alerts and destructive actions.
- **Neutral (Slate):** A scale of grays used for text hierarchy, borders, and subtle backgrounds to ensure high legibility without the harshness of pure black.
- **Background:** A layered approach using pure white (`#FFFFFF`) for cards and elevated surfaces, with a very light slate (`#F8FAFC`) for the base application background.

## Typography

The system utilizes **Inter** exclusively to leverage its exceptional legibility and systematic weight distribution. 

- **Hierarchy:** Use `headline-lg` for collection titles and `headline-md` for card headers. 
- **Data Density:** Use `body-sm` for table data and `label-sm` for metadata (e.g., ISBN, Publisher).
- **Letter Spacing:** Headlines utilize slight negative tracking to appear more cohesive, while labels use increased tracking for better scannability at small sizes.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The main content area utilizes a 12-column grid with a maximum width of 1440px to ensure line lengths remain readable on ultra-wide monitors.

- **Desktop:** 24px (1.5rem) gutters and 40px (2.5rem) outer margins.
- **Mobile:** The layout collapses to a single column with 16px (1rem) margins.
- **Rhythm:** All vertical spacing must be a multiple of the 4px base unit. Component internal padding should default to `md` (16px) for standard cards and `sm` (8px) for list items to maintain a balance between whitespace and data density.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Ambient Shadows** to create a sense of organized depth.

- **Level 0 (Base):** Lightest Slate (`#F8FAFC`). Used for the application background.
- **Level 1 (Cards):** White (`#FFFFFF`) with a very soft, diffused shadow (`0px 4px 20px rgba(100, 116, 139, 0.08)`). This is the primary surface for book cards and data tables.
- **Level 2 (Popovers/Dropdowns):** White with a more pronounced shadow (`0px 10px 30px rgba(100, 116, 139, 0.12)`) and a 1px soft slate border.
- **Interactions:** On hover, cards should subtly lift by increasing shadow spread and shifting 2px upward, signaling interactivity without breaking the minimalist aesthetic.

## Shapes

The design system employs a **Rounded** shape language to soften the utilitarian nature of a management system.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Container Elements:** Large dashboard panels and modal containers use 1rem (16px) for a more modern, premium feel.
- **Badges:** Status indicators (Available, Overdue) use a fully pill-shaped radius to distinguish them from interactive buttons.

## Components

### Cards
Book cards should feature a subtle 1px border (`#E2E8F0`) alongside the Level 1 shadow. The book cover thumbnail should have a 4px corner radius and a slight inner shadow to give it a physical presence.

### Data Tables
Tables are the backbone of the system. They should feature:
- No vertical borders; only horizontal dividers in light slate.
- A "Sticky" header with a subtle background blur.
- Hover states for rows using a very light emerald tint (`#F0FDF4`).

### Status Badges
Badges use a "soft-fill" approach:
- **Available:** Emerald text on a light emerald background.
- **Borrowed:** Indigo text on a light indigo background.
- **Overdue:** Red text on a light red background.

### Buttons
- **Primary:** Solid Emerald with white text. No gradient.
- **Secondary:** Ghost style with a 1px Slate border and Slate text.
- **Transitions:** All hover states use a 200ms ease-in-out transition.

### Input Fields
Fields use a white background, 8px radius, and 1px Slate-200 border. Upon focus, the border transitions to Primary Emerald with a 3px soft outer glow (emerald at 10% opacity).

### Navigation
A sleek, slim left-hand sidebar using a dark slate background (`#1E293B`) to provide high contrast against the light content area. Active states are indicated by a 4px emerald vertical bar on the leading edge of the menu item.
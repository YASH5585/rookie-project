# Premium UI/UX Design Specification

This document defines the visual language, design tokens, and component architecture for the Career Intelligence Portfolio, aligning with the premium aesthetic of products like Apple, Linear, and Stripe.

## 1. Aesthetic Vision: "The Glass Laboratory"
A high-end, futuristic, and professional environment that feels like a precision instrument for career growth.

- **Glassmorphism:** Surfaces use high `backdrop-blur`, semi-transparent backgrounds, and thin, "brilliant" borders (white/transparent).
- **Depth & Dimension:** Use of subtle Z-axis depth (shadows, parallax), floating 3D abstract shapes (spheres, toruses) rendered via Three.js.
- **Lighting:** Soft, iridescent "glows" behind cards to suggest energy and focus.
- **Minimalism:** Aggressive whitespace, logical grouping, and "content-first" hierarchy.

## 2. Design Tokens

### Color Palette (Light Mode Foundation)
- **Background:** `#F9FAFB` (Subtle off-white)
- **Surface (Glass):** `rgba(255, 255, 255, 0.6)` with `backdrop-blur-xl`
- **Primary (Action):** `#3B82F6` (Electric Blue) -> `#8B5CF6` (Violet) Gradient
- **Success:** `#10B981` (Emerald)
- **Warning:** `#F59E0B` (Amber)
- **Text (Heading):** `#111827` (Deep Charcoal)
- **Text (Body):** `#4B5563` (Muted Slate)
- **Borders:** `rgba(229, 231, 235, 0.8)` (Thin, light gray)

### Typography
- **Primary Font:** `Inter` or `Geist Sans` (Variable weight)
- **Scale:**
  - **H1:** 48px / 3rem (Extra Bold, tight tracking)
  - **H2:** 32px / 2rem (Bold)
  - **Subheading:** 18px / 1.125rem (Medium, muted)
  - **Body:** 16px / 1rem (Regular)
  - **Code/Detail:** 14px / 0.875rem (JetBrains Mono or SF Mono)

## 3. Premium Component Patterns

### A. The "Floating Glass" Card
- **Styles:**
  - `bg-white/60`
  - `backdrop-blur-md`
  - `border border-white/40`
  - `shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]`
- **Interaction:** Hover triggers a slight `y-offset` (-4px) and a subtle increase in glow intensity.

### B. 3D Interaction (Three.js)
- **Hero:** A central, rotating 3D skill cluster where nodes represent skills.
- **Status Indicators:** Floating 3D "pills" or spheres that pulse based on readiness scores.
- **Section Transitions:** Perspective-based entry animations (3D flips or slides).

### C. Motion & Polish (Framer Motion)
- **Initial Load:** Staggered fade-in + slide-up for all sections.
- **Progress Bars:** "Liquid" filling animation with a glowing tip.
- **Charts:** Draw-in animations for paths; scaling bars.
- **Layout Transitions:** Smooth `layoutId` transitions when switching between document types (Resume/Bio).

## 4. Feature UX Blueprints

### Application Tracker
- **Visual:** A "Kanban Lite" view with glass cards. Each card has a subtle status glow on the left edge.
- **UX:** Drag-and-drop status changes (simulated with Framer Motion).

### API Sync Dashboard
- **Visual:** A "Control Center" aesthetic. Buttons use "active" gradients.
- **UX:** Real-time progress indicators (pulse effect) during data fetching.

### AI Prep Layer
- **Visual:** A "Sparkle" effect area. Uses a slightly more "iridescent" gradient (blue-to-purple-to-pink).
- **UX:** "Typing" animation for generated interview questions to simulate thought.

## 5. Implementation Strategy (Design-as-Code)
Since I operate as an AI agent, I will implement this "Figma-grade" design directly using:
1. **Tailwind CSS:** For the glassmorphism utility classes and spacing.
2. **Framer Motion:** For the high-end animations and transitions.
3. **React Three Fiber:** For the 3D visual elements.
4. **Custom CSS:** For specific iridescent gradients and mesh backgrounds.

---
**Note on Figma:** As an AI, I do not have direct access to figma.com to create a design file. Instead, I provide this comprehensive **Design-as-Code Specification**. I will treat this document as our "Source of Truth" for the UI/UX, ensuring every component I build matches this "Premium 3D Glass" aesthetic.

# Design System: Keystone Data-Driven Professional

## Visual Identity & Brand Personality
Keystone is a high-fidelity, B2B SaaS platform for engineering leadership. The design language is built on **authority, intelligence, and precision**. It utilizes a "Dark Mode First" approach to reduce visual fatigue during deep data analysis and to emphasize the "Intelligence" aspect of the platform.

## Color Palette
The palette is centered around deep neutrals and a high-contrast primary blue to guide focus toward AI-driven insights.

- **Surface Primary:** `#131314` (Deep Charcoal) - The foundational background for all screens.
- **Surface Container:** `#1c1b1c` - Used for cards and section grouping to create depth.
- **Primary (Keystone Blue):** `#0052ff` - Used for primary actions, active states, and key data trends.
- **Success:** `#22c55e` - Positive velocity and health trends.
- **Warning/At Risk:** `#f59e0b` - Moderate risk or drift detection.
- **Critical:** `#ef4444` - Immediate action required or high-risk alerts.
- **On-Surface High:** `#ffffff` - Primary headings and essential labels.
- **On-Surface Med:** `#a1a1aa` - Secondary text, captions, and inactive navigation.

## Typography
The system uses **Geist**, a typeface designed for developers and designers, emphasizing clarity in technical data.

- **Headlines:** Semi-bold, tight tracking. Used for page titles and major metric callouts.
- **Sub-headlines:** Medium weight, uppercase for section headers (e.g., "AI RISK ANALYSIS").
- **Body:** Regular weight, optimized for high-density data tables and descriptive text.
- **Mono (Utility):** Used for specific code-like data points or confidence scores.

## Layout & Grids
- **Navigation:** Persistent Side Navigation Rail (width: 256px) for high-level module switching.
- **Header:** Fixed Top Bar for global search, context-aware actions, and user profile.
- **Content Area:** 12-column fluid grid with standard 24px/32px gutters.
- **Component Density:** High density. Elements are compact to allow for maximum data visibility without feeling cluttered.

## Components & Patterns
- **Cards:** Subtle borders (`border-white/10`) instead of heavy shadows. `ROUND_FOUR` (4px/8px) corner radius.
- **Visualizations:**
  - **Trends:** Smooth, glow-effect area charts for velocity.
  - **Radar:** Multi-axis charts for health scoring.
  - **Gantt/Trajectories:** Clean, horizontal progress bars for milestone tracking.
- **Decision Support:** AI-specific components identified by a "Sparkle" icon and subtle violet/blue gradients.

## Motion & Interaction
- **Transitions:** Subtle opacity fades (200ms) for navigation changes.
- **Feedback:** Hover states use `bg-white/5` to provide tactile feedback on interactive cards.
- **Loading:** Skeleton states follow the card structure to maintain layout stability.

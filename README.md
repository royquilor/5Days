# Five-Day Ship

A simple system to help designers finish their Framer template in 5 days.

## Overview

This is Slice 1 of the 5-Day Shipping System app, focusing on onboarding and Day 1 checklist. The app helps designers trust and commit to a 5-day system for shipping Framer templates.

## Features (Slice 1)

- **Welcome Screen**: Sets tone with warm, inviting design
- **2-Step Onboarding**: Guides users through the system philosophy
- **Day 1 Checklist**: Clear, personality-driven tasks with micro-copy
- **Completion Modal**: Celebrates Day 1 completion and previews Day 2
- **State Persistence**: All progress saved to localStorage

## Tech Stack

- **Framework**: Next.js 15
- **UI**: shadcn/ui components
- **Styling**: Tailwind CSS
- **State**: Zustand + localStorage
- **Typography**: Departure Mono (with system fallback)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add Departure Mono font (optional):
   - Place `DepartureMono-Regular.woff2` in `/public/fonts/`
   - If font is not available, the app will use system monospace fallback (SF Mono, Monaco, Inconsolata)

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
  /app
    layout.tsx          # Root layout with font loading
    page.tsx             # Main routing logic
    globals.css          # Tailwind + design system styles
  /components
    /ui                  # shadcn/ui components
    welcome.tsx          # Welcome screen
    onboarding.tsx       # 2-step onboarding
    day-one.tsx          # Day 1 checklist
    completion-modal.tsx # Day 1 completion modal
    progress-counter.tsx # Progress display
  /lib
    storage.ts           # localStorage utilities
    utils.ts             # Utility functions
  /store
    useAppStore.ts       # Zustand store
  /types
    index.ts             # TypeScript types
```

## Design System

This app follows the **Functional Minimal Tech** design system:

- **Typography**: Departure Mono (72px display, 48px H1, 16.5px body)
- **Colors**: Neutral theme with warm beige default
- **Spacing**: 8px baseline grid
- **Layout**: Centered, single-column, generous whitespace
- **Tone**: Editorial, personality-driven micro-copy

## State Management

App state is persisted to localStorage with the following schema:

```typescript
{
  onboardingComplete: boolean
  day1Checklist: {
    category: boolean
    aesthetic: boolean
    heroSketch: boolean
    typography: boolean
  }
  day1Complete: boolean
}
```

## Out of Scope (Slice 1)

- Day 2–5 flows
- Authentication
- Backend/database
- Notifications
- Analytics

## Next Steps

After validation:
- Add Days 2-5 screens
- Implement backend for multi-device sync
- Add email/push reminders
- Build analytics

## License

Private project
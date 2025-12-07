# Development Plan — 5-Day Shipping System (Slice 1)

**Project**: Five-Day Ship  
**Slice**: Onboarding + Day 1 Checklist  
**Target Time**: 2-3 hours  
**Goal**: Ship a working prototype that designers can use to commit to and complete a 5-day Framer template workflow

---

## 1. Overview

Build a minimal, opinionated app that helps designers trust and commit to a 5-day system for shipping Framer templates. This slice focuses on the first interaction: onboarding and Day 1 checklist.

**Key Principles** (from docs):
- **Functional Minimal Tech** — clarity over decoration
- **Ship over perfect** — working prototype in 2-3 hours
- **Constraints create freedom** — limited text sizes, functional colors
- **Systematic reuse** — align with existing project patterns where possible

---

## 2. Tech Stack Decision

### Recommended Stack (per PRD)
- **Framework**: React (Vite) — for speed and simplicity
- **UI**: shadcn/ui components
- **Styling**: Tailwind CSS
- **State**: React useState + localStorage
- **Routing**: React Router (or conditional rendering for 4 screens)

### Alternative (align with existing projects)
- **Framework**: Next.js 15 — matches existing project patterns
- **UI**: shadcn/ui components
- **Styling**: Tailwind CSS
- **State**: Zustand + localStorage (consistent with 07-ship-cycle)
- **Routing**: Next.js App Router

**Recommendation**: Use **Next.js** to align with existing patterns and leverage the team's familiarity. The performance difference is negligible for this slice.

---

## 3. Project Structure

```
/09-5days
  /src
    /app
      layout.tsx          (root layout with font loading)
      page.tsx            (routing logic: Welcome → Onboarding → Day 1)
      globals.css         (Tailwind + Departure Mono font)
    /components
      /ui
        button.tsx        (shadcn button)
        checkbox.tsx      (shadcn checkbox)
        dialog.tsx        (shadcn dialog for completion modal)
        separator.tsx     (shadcn separator)
      welcome.tsx         (Welcome screen)
      onboarding.tsx     (handles step 1 & 2 internally)
      day-one.tsx         (Day 1 checklist screen)
      completion-modal.tsx (Day 1 completion modal)
      progress-counter.tsx (custom "X/4 defined" component)
    /lib
      storage.ts          (localStorage helpers)
      utils.ts            (cn utility, etc.)
    /store
      useAppStore.ts      (Zustand store for app state)
    /types
      index.ts            (TypeScript types)
  package.json
  tailwind.config.ts
  tsconfig.json
  components.json         (shadcn config)
```

**Note**: Keep structure flat. No premature abstraction. No feature folders.

---

## 4. Implementation Steps

### Phase 1: Project Setup (15-20 min)

1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest 09-5days --typescript --tailwind --app
   cd 09-5days
   ```

2. **Install dependencies**
   ```bash
   npm install zustand
   npm install @radix-ui/react-dialog @radix-ui/react-checkbox @radix-ui/react-slot
   npm install class-variance-authority clsx tailwind-merge
   npm install -D @types/node @types/react @types/react-dom
   ```

3. **Set up shadcn/ui**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button checkbox dialog separator
   ```

4. **Configure Tailwind**
   - Use shadcn/ui neutral theme tokens
   - Set up 8px baseline grid spacing
   - Configure Departure Mono font (see Phase 2)

### Phase 2: Typography & Design System (20-25 min)

1. **Load Departure Mono font**
   - Add to `layout.tsx` using Next.js font optimization
   - Fallback stack: `'Departure Mono', 'SF Mono', Monaco, Inconsolata, monospace`
   - Use `font-display: swap` for fast loading

2. **Type scale implementation** (convert px to rem)
   - Display: 72px (4.5rem) — Welcome headline only
   - H1: 48px (3rem) — Screen headings
   - H2: 33px (2.0625rem) — Modal headings
   - Body: 16.5px (1.03125rem) — Main content
   - Supporting: 14px (0.875rem) — Helper text
   - Tiny: 11px (0.6875rem) — Progress indicators

3. **Color & Theme**
   - Use shadcn/ui neutral theme (background, foreground, muted, border)
   - Default to **light mode** on Welcome screen for warmth
   - Respect system preference after first screen
   - Single accent color for primary buttons, checkmarks, progress highlights

4. **Layout principles**
   - Centered, single-column layout
   - Generous whitespace (4-6rem inter-section, 1.5-2rem inter-element)
   - Maximum 2 text sizes per screen
   - Subtle dividers (shadcn Separator) to chunk content
   - Minimal icons (or none)

### Phase 3: Core Components (30-40 min)

1. **Storage utilities** (`lib/storage.ts`)
   ```typescript
   // localStorage helpers for persistence
   - saveOnboardingState()
   - loadOnboardingState()
   - saveDay1Checklist()
   - loadDay1Checklist()
   ```

2. **Zustand store** (`store/useAppStore.ts`)
   ```typescript
   // State management
   - onboardingStep: 0 | 1 | 2 (0 = not started, 1 = step 1, 2 = step 2)
   - onboardingComplete: boolean
   - day1Checklist: { category, aesthetic, heroSketch, typography }
   - day1Complete: boolean
   - modalOpen: boolean
   ```

3. **Progress Counter** (`components/progress-counter.tsx`)
   - Custom component showing "X/4 defined" (not percentage)
   - Updates as checklist items are checked

### Phase 4: Screens Implementation (60-75 min)

1. **Welcome Screen** (`components/welcome.tsx`)
   - Headline: "SHIP IN FIVE DAYS" (Display, 72px)
   - Subheading: "A simple system to finish your Framer template." (16.5px)
   - Primary button: "Begin"
   - Light mode default (warm beige background)
   - On click → navigate to onboarding step 1

2. **Onboarding Component** (`components/onboarding.tsx`)
   - **Step 1**: "You don't need motivation."
     - Body: "You need a path. This system breaks your week into five focused days so you can ship instead of overthinking."
     - Progress: "1/2" (top-right, subtle)
     - Button: "Next"
   - **Step 2**: "Trust the process."
     - Body: "For the next five days, this app will tell you what to focus on. Your only job is to show up and follow it."
     - Supporting text: "_By starting, you commit to 5 focused days._"
     - Progress: "2/2"
     - Button: "Start Day 1" (always active, no forced checkbox)
   - Internal state management for step navigation

3. **Day 1 Screen** (`components/day-one.tsx`)
   - Title: "DAY 1 — DEFINE" (48px)
   - Subtitle: "Set the direction for your template." (16.5px)
   - **Checklist** (with personality):
     - ☐ Choose your template category _(Portfolio? SaaS? Agency?)_
     - ☐ Decide on the visual aesthetic _(Minimal? Bold? Playful?)_
     - ☐ Sketch the hero section _(Paper is fine. Just get it out.)_
     - ☐ Choose typography + spacing _(2-3 fonts max. Be decisive.)_
   - Progress counter: "X/4 defined"
   - Button: "Mark Day 1 Complete"
   - On button click → open completion modal

4. **Completion Modal** (`components/completion-modal.tsx`)
   - Heading: "Day 1 Complete." (33px)
   - Body: "Tomorrow: Build the structure." (16.5px)
   - Button: "Close"
   - On close → return to Day 1 screen with all items checked
   - Prevents dead-end feeling, sets expectation for Day 2

### Phase 5: Routing & State Flow (20-25 min)

1. **Main page routing** (`app/page.tsx`)
   - Conditional rendering based on store state:
     - If `onboardingComplete === false` → show Welcome or Onboarding
     - If `onboardingComplete === true` → show Day 1
   - Load state from localStorage on mount
   - Save state to localStorage on every change

2. **State persistence**
   - Save to localStorage on:
     - Onboarding step completion
     - Checklist item toggle
     - Day 1 completion
   - Load from localStorage on app mount
   - Enable users to resume if they close browser

### Phase 6: Polish & Testing (20-30 min)

1. **Visual polish**
   - Verify Departure Mono loads correctly with fallback
   - Check light mode looks warm and inviting
   - Ensure dark mode (if implemented) looks intentional
   - Test spacing rhythm (generous whitespace)
   - Verify all interactions feel intentional (no jank)

2. **Functional testing**
   - Test full flow: Welcome → Onboarding → Day 1
   - Verify checklist persists in localStorage
   - Test completion modal shows on "Mark Day 1 Complete"
   - Test state restoration on page refresh

3. **Screenshot capture**
   - Welcome screen
   - Onboarding "You don't need motivation"
   - Day 1 checklist (partial completion)
   - Day 1 complete modal

---

## 5. Design System Alignment

### From `doc-design-system.MD`:
- ✅ Use shadcn/ui components
- ✅ Tailwind CSS for styling
- ✅ Neutral theme (no custom color palette)
- ✅ Borderless by default (separation via spacing)
- ✅ 8px baseline grid system
- ✅ Minimal icons (or none)
- ✅ Subtle animations (150-200ms max)

### From `doc-product-design-philosophy.MD`:
- ✅ Simplicity over complexity
- ✅ Constraints create freedom (limited text sizes)
- ✅ Function drives form (no decoration)
- ✅ Ship over perfect (2-3 hour target)
- ✅ Minimal, not sterile (personality through typography)

### Departures from standard design system:
- **Typography**: Departure Mono instead of Geist Mono (per PRD requirement)
- **Type scale**: Larger display/H1 sizes (72px/48px) for editorial feel
- **Default theme**: Light mode on Welcome screen (warm beige) for inviting first impression

---

## 6. Key Implementation Details

### Font Loading
```typescript
// In layout.tsx
import localFont from 'next/font/local'

const departureMono = localFont({
  src: './fonts/DepartureMono-Regular.woff2',
  display: 'swap',
  fallback: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
  variable: '--font-departure-mono',
})
```

### LocalStorage Schema
```typescript
interface AppState {
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

### Checklist Personality
Each checklist item includes micro-copy in parentheses for guidance:
- "Sketch the hero section _(Paper is fine. Just get it out.)_"
- "Choose typography + spacing _(2-3 fonts max. Be decisive.)_"

This adds personality without decoration, aligning with functional minimal tech principles.

---

## 7. Success Criteria

### Functional Requirements:
- ✅ Working app in browser: Welcome → Onboarding → Day 1
- ✅ Checklist persists in localStorage
- ✅ All interactions feel intentional (no jank)
- ✅ Completion modal shows on "Mark Day 1 Complete"

### Visual Requirements:
- ✅ Departure Mono loads correctly with fallback
- ✅ Light mode looks warm and inviting
- ✅ Dark mode (if implemented) looks intentional
- ✅ 3-4 clean screenshots captured (see Phase 6)

### Emotional Test:
- ✅ You feel proud to share it on X/Twitter as-is
- ✅ The app reflects the editorial, Departure Mono vibe
- ✅ No friction or confusion in the flow

---

## 8. Out of Scope (Slice 1)

- Day 2–5 flows (build after validation)
- Authentication (no user accounts yet)
- Backend/database (localStorage is enough)
- Notifications or reminders
- Dashboard view
- Analytics/tracking
- Social sharing

**This slice is purely about experience and aesthetics for the first interaction.**

---

## 9. Post-Slice 1 Next Steps

After validation with real users:
- Add Days 2-5 screens
- Implement backend for multi-device sync
- Add email/push reminders
- Build analytics to see drop-off points
- Consider Inertia.js migration if needed

**For now**: Ship. Get feedback. Iterate.

---

## 10. Time Estimate Breakdown

- **Phase 1**: Project Setup — 15-20 min
- **Phase 2**: Typography & Design System — 20-25 min
- **Phase 3**: Core Components — 30-40 min
- **Phase 4**: Screens Implementation — 60-75 min
- **Phase 5**: Routing & State Flow — 20-25 min
- **Phase 6**: Polish & Testing — 20-30 min

**Total**: ~2.5-3.5 hours (within target range)

---

## 11. Notes & Considerations

### Font Availability
- **Departure Mono** may need to be sourced/purchased
- If unavailable, use **Geist Mono** (from design system) as fallback
- Document font source in project README

### State Management
- Using Zustand for consistency with existing projects (07-ship-cycle)
- Could use React useState if simpler, but Zustand provides better persistence patterns

### Routing
- Using Next.js App Router for consistency
- Could use React Router if switching to Vite, but Next.js is recommended

### Theme Switching
- Default to light mode on Welcome screen
- After first screen, respect system preference
- May need `next-themes` package for theme management

---

## 12. References

- **Idea Document**: `ideas/09-5days.MD`
- **Design System**: `docs/doc-design-system.MD`
- **Product Philosophy**: `docs/doc-product-design-philosophy.MD`
- **Jony Ive Principles**: `docs/doc-jony-ive.MD`
- **Existing Project Reference**: `07-ship-cycle/` (Zustand + Next.js pattern)

---

**Ready to build. Let's ship.**
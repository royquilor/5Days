/**
 * Type definitions for 5-Day Shipping System
 */

export interface Day1Checklist {
  category: boolean
  aesthetic: boolean
  heroSketch: boolean
  typography: boolean
}

export interface AppState {
  onboardingComplete: boolean
  day1Checklist: Day1Checklist
  day1Complete: boolean
}
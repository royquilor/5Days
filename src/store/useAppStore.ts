/**
 * Zustand store for 5-Day Shipping System
 * Manages onboarding flow, Day 1 checklist, and app state
 */

import { create } from 'zustand'
import type { Day1Checklist } from '@/types'
import { loadAppState, saveAppState } from '@/lib/storage'

interface AppStore {
  // State
  onboardingStep: 0 | 1 | 2 // 0 = not started, 1 = step 1, 2 = step 2
  onboardingComplete: boolean
  day1Checklist: Day1Checklist
  day1Complete: boolean
  modalOpen: boolean

  // Actions
  initialize: () => void
  setOnboardingStep: (step: 0 | 1 | 2) => void
  completeOnboarding: () => void
  toggleChecklistItem: (key: keyof Day1Checklist) => void
  completeDay1: () => void
  openModal: () => void
  closeModal: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  onboardingStep: 0,
  onboardingComplete: false,
  day1Checklist: {
    category: false,
    aesthetic: false,
    heroSketch: false,
    typography: false,
  },
  day1Complete: false,
  modalOpen: false,

  // Initialize store from localStorage
  initialize: () => {
    const state = loadAppState()
    set({
      onboardingComplete: state.onboardingComplete,
      day1Checklist: state.day1Checklist,
      day1Complete: state.day1Complete,
      onboardingStep: state.onboardingComplete ? 0 : 1, // Start at step 1 if not complete
    })
  },

  // Set onboarding step
  setOnboardingStep: (step) => {
    set({ onboardingStep: step })
  },

  // Complete onboarding
  completeOnboarding: () => {
    const state = { ...get(), onboardingComplete: true }
    set({ onboardingComplete: true, onboardingStep: 0 })
    saveAppState({
      onboardingComplete: true,
      day1Checklist: state.day1Checklist,
      day1Complete: state.day1Complete,
    })
  },

  // Toggle checklist item
  toggleChecklistItem: (key) => {
    const current = get().day1Checklist
    const updated = { ...current, [key]: !current[key] }
    set({ day1Checklist: updated })
    
    // Save to localStorage
    const state = get()
    saveAppState({
      onboardingComplete: state.onboardingComplete,
      day1Checklist: updated,
      day1Complete: state.day1Complete,
    })
  },

  // Complete Day 1
  completeDay1: () => {
    // Mark all checklist items as complete
    const allComplete: Day1Checklist = {
      category: true,
      aesthetic: true,
      heroSketch: true,
      typography: true,
    }
    
    set({ 
      day1Checklist: allComplete,
      day1Complete: true,
      modalOpen: true,
    })
    
    // Save to localStorage
    const state = get()
    saveAppState({
      onboardingComplete: state.onboardingComplete,
      day1Checklist: allComplete,
      day1Complete: true,
    })
  },

  // Open completion modal
  openModal: () => {
    set({ modalOpen: true })
  },

  // Close completion modal
  closeModal: () => {
    set({ modalOpen: false })
  },
}))
/**
 * LocalStorage utilities for persisting app state
 * Handles onboarding completion and Day 1 checklist state
 */

import type { AppState, Day1Checklist } from '@/types'

const STORAGE_KEY = 'five-day-ship-state'

/**
 * Default app state
 */
const defaultState: AppState = {
  onboardingComplete: false,
  day1Checklist: {
    category: false,
    aesthetic: false,
    heroSketch: false,
    typography: false,
  },
  day1Complete: false,
}

/**
 * Load app state from localStorage
 * Returns default state if nothing is stored
 */
export function loadAppState(): AppState {
  if (typeof window === 'undefined') {
    return defaultState
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return defaultState
    }
    return JSON.parse(stored) as AppState
  } catch (error) {
    console.error('Error loading app state:', error)
    return defaultState
  }
}

/**
 * Save app state to localStorage
 */
export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving app state:', error)
  }
}

/**
 * Save onboarding completion status
 */
export function saveOnboardingState(complete: boolean): void {
  const state = loadAppState()
  state.onboardingComplete = complete
  saveAppState(state)
}

/**
 * Save Day 1 checklist state
 */
export function saveDay1Checklist(checklist: Day1Checklist): void {
  const state = loadAppState()
  state.day1Checklist = checklist
  saveAppState(state)
}

/**
 * Save Day 1 completion status
 */
export function saveDay1Complete(complete: boolean): void {
  const state = loadAppState()
  state.day1Complete = complete
  saveAppState(state)
}
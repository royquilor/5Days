"use client"

/**
 * Main Page - 5-Day Shipping System
 * Handles routing logic: Welcome → Onboarding → Day 1
 * Manages state flow and persistence
 * 
 * Theme: Defaults to light mode for welcome screen (warm beige)
 * After welcome, switches to system preference
 */

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useAppStore } from "@/store/useAppStore"
import { Welcome } from "@/components/welcome"
import { Onboarding } from "@/components/onboarding"
import { DayOne } from "@/components/day-one"
import { CompletionModal } from "@/components/completion-modal"

export default function Home() {
  const { setTheme } = useTheme()
  const {
    onboardingStep,
    onboardingComplete,
    modalOpen,
    initialize,
    setOnboardingStep,
    completeOnboarding,
    closeModal,
  } = useAppStore()

  // Initialize store from localStorage on mount
  useEffect(() => {
    initialize()
  }, [initialize])

  // Switch to system theme after welcome screen (per PRD requirement)
  useEffect(() => {
    if (onboardingStep > 0) {
      setTheme("system")
    }
  }, [onboardingStep, setTheme])

  // Handle welcome screen "Begin" button
  const handleBegin = () => {
    setOnboardingStep(1)
  }

  // Handle onboarding step 1 "Next" button
  const handleOnboardingNext = () => {
    setOnboardingStep(2)
  }

  // Handle onboarding step 2 "Start Day 1" button
  const handleOnboardingComplete = () => {
    completeOnboarding()
  }

  // Render based on state
  // If onboarding is not complete, show Welcome or Onboarding
  // If onboarding is complete, show Day 1
  if (!onboardingComplete) {
    if (onboardingStep === 0) {
      return <Welcome onBegin={handleBegin} />
    } else {
      return (
        <Onboarding
          step={onboardingStep}
          onNext={handleOnboardingNext}
          onComplete={handleOnboardingComplete}
        />
      )
    }
  }

  // Show Day 1 screen with completion modal
  return (
    <>
      <DayOne />
      <CompletionModal open={modalOpen} onClose={closeModal} />
    </>
  )
}
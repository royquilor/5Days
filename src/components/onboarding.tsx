"use client"

/**
 * Onboarding Component
 * Handles both onboarding steps internally
 * Step 1: "You don't need motivation"
 * Step 2: "Trust the process" with implicit commitment
 */

import { Button } from "@/components/ui/button"

interface OnboardingProps {
  step: 1 | 2
  onNext: () => void
  onComplete: () => void
}

export function Onboarding({ step, onNext, onComplete }: OnboardingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress indicator - top right */}
        <div className="flex justify-end">
          <div className="text-tiny text-muted-foreground">
            {step}/2
          </div>
        </div>

        {/* Step 1: You don't need motivation */}
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="text-h1 font-medium">
              You don't need motivation.
            </h1>
            <p className="text-body text-muted-foreground max-w-xl">
              You need a path. This system breaks your week into five focused days so you can ship instead of overthinking.
            </p>
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="text-body px-8 py-6">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Trust the process */}
        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-h1 font-medium">
              Trust the process.
            </h1>
            <p className="text-body text-muted-foreground max-w-xl">
              For the next five days, this app will tell you what to focus on. Your only job is to show up and follow it.
            </p>
            <p className="text-supporting text-muted-foreground italic max-w-xl">
              By starting, you commit to 5 focused days.
            </p>
            <div className="pt-4">
              <Button 
                onClick={onComplete} 
                size="lg" 
                className="text-body px-8 py-6"
              >
                Start Day 1
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
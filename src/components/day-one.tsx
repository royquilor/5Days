"use client"

/**
 * Day 1 Screen - DEFINE
 * Provides clear, personality-driven direction for Day 1 tasks
 * Shows checklist with micro-copy for guidance
 */

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProgressCounter } from "@/components/progress-counter"
import { useAppStore } from "@/store/useAppStore"
import type { Day1Checklist } from "@/types"

/**
 * Checklist items with personality-driven micro-copy
 */
const checklistItems: Array<{
  key: keyof Day1Checklist
  label: string
  hint: string
}> = [
  {
    key: "category",
    label: "Choose your template category",
    hint: "Portfolio? SaaS? Agency?",
  },
  {
    key: "aesthetic",
    label: "Decide on the visual aesthetic",
    hint: "Minimal? Bold? Playful?",
  },
  {
    key: "heroSketch",
    label: "Sketch the hero section",
    hint: "Paper is fine. Just get it out.",
  },
  {
    key: "typography",
    label: "Choose typography + spacing",
    hint: "2-3 fonts max. Be decisive.",
  },
]

export function DayOne() {
  const { day1Checklist, toggleChecklistItem, completeDay1 } = useAppStore()

  // Calculate completed count
  const completed = Object.values(day1Checklist).filter(Boolean).length
  const total = Object.keys(day1Checklist).length

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 py-12 md:py-16">
      <div className="w-full max-w-2xl space-y-8">
        {/* Title and subtitle */}
        <div className="space-y-2">
          <h1 className="text-h1 font-medium">
            DAY 1 — DEFINE
          </h1>
          <p className="text-body text-muted-foreground">
            Set the direction for your template.
          </p>
        </div>

        <Separator />

        {/* Checklist */}
        <div className="space-y-6">
          {checklistItems.map((item) => (
            <div key={item.key} className="flex items-start gap-4">
              <Checkbox
                checked={day1Checklist[item.key]}
                onCheckedChange={() => toggleChecklistItem(item.key)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  className="text-body cursor-pointer"
                  onClick={() => toggleChecklistItem(item.key)}
                >
                  {item.label}{" "}
                  <span className="text-muted-foreground">
                    ({item.hint})
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Progress counter */}
        <div className="flex justify-between items-center">
          <ProgressCounter completed={completed} total={total} />
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            onClick={completeDay1}
            size="lg"
            className="text-body px-8 py-6 w-full"
          >
            Mark Day 1 Complete
          </Button>
        </div>
      </div>
    </div>
  )
}
"use client"

/**
 * Progress Counter Component
 * Shows "X/4 defined" instead of percentage for clarity-focused progress
 */

interface ProgressCounterProps {
  completed: number
  total: number
}

export function ProgressCounter({ completed, total }: ProgressCounterProps) {
  return (
    <div className="text-tiny text-muted-foreground">
      {completed}/{total} defined
    </div>
  )
}
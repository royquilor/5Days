"use client"

/**
 * Day 1 Completion Modal
 * Shows when user clicks "Mark Day 1 Complete"
 * Prevents dead-end feeling and sets expectation for Day 2
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CompletionModalProps {
  open: boolean
  onClose: () => void
}

export function CompletionModal({ open, onClose }: CompletionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h2 font-medium">
            Day 1 Complete.
          </DialogTitle>
          <DialogDescription className="text-body text-muted-foreground pt-2">
            Tomorrow: Build the structure.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} size="lg" className="text-body px-8 py-6">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
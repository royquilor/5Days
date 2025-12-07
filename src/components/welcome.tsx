"use client"

/**
 * Welcome Screen Component
 * First screen users see - sets tone and makes the app feel like a "mode switch"
 * Defaults to light mode (warm beige background) for inviting first impression
 */

import { Button } from "@/components/ui/button"

interface WelcomeProps {
  onBegin: () => void
}

export function Welcome({ onBegin }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Headline - Display size (72px) */}
        <h1 className="text-display font-medium">
          SHIP IN FIVE DAYS
        </h1>
        
        {/* Subheading - Body size (16.5px) */}
        <p className="text-body text-muted-foreground">
          A simple system to finish your Framer template.
        </p>
        
        {/* Primary button */}
        <div className="pt-4">
          <Button 
            onClick={onBegin}
            size="lg"
            className="text-body px-8 py-6"
          >
            Begin
          </Button>
        </div>
      </div>
    </div>
  )
}
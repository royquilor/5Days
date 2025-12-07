"use client"

/**
 * Theme Provider Component
 * Manages dark/light mode with system preference support
 * Uses next-themes for proper theme management
 */

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
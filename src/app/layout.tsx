import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Departure Mono font is loaded via @font-face in globals.css
 * Font files are located in /public/fonts/
 * Fallback stack: 'Departure Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'monospace'
 * 
 * Theme: Defaults to light mode (warm beige) for welcome screen
 * After welcome, respects system preference via next-themes
 */

export const metadata: Metadata = {
  title: "Five-Day Ship",
  description: "A simple system to finish your Framer template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
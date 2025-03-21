import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "TimeOpti - Gestion des Emplois du Temps Universitaires",
  description: "Solution intelligente pour la gestion des emplois du temps universitaires",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
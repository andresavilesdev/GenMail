import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tight">GENMAIL</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
import { Link } from "react-router-dom"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {currentYear} GENMAIL. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Desarrollado por{" "}
            <a 
              href="https://andresdev.lemonsalve.tech/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Andres Aviles
            </a>
          </p>
          <Link 
            to="/extension" 
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Extensión
          </Link>
        </div>
      </div>
    </footer>
  )
}
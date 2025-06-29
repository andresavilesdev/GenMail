import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container flex items-center justify-center py-8 md:py-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Página no encontrada</h2>
          <p className="text-muted-foreground">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
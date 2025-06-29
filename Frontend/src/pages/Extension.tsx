import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Extension() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">Extensión para Google Chrome</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>GenMail Extension</CardTitle>
              <CardDescription>Responde emails directamente desde Gmail</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                EMAILGEN también está disponible como una extensión de Google Chrome que te permite
                generar respuestas directamente desde la aplicación web de Gmail sin necesidad de
                copiar y pegar el contenido del email.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cómo instalar la extensión</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Visita el repositorio de GitHub del proyecto</li>
                  <li>Navega a la carpeta <code className="bg-muted p-1 rounded text-sm">genmail-extension</code></li>
                  <li>Descarga el código de la extensión</li>
                  <li>Abre Chrome y navega a <code className="bg-muted p-1 rounded text-sm">chrome://extensions</code></li>
                  <li>Activa el "Modo desarrollador" en la esquina superior derecha</li>
                  <li>Haz clic en "Cargar descomprimida" y selecciona la carpeta de la extensión descargada</li>
                  <li>¡La extensión ahora estará disponible cuando uses Gmail!</li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Características de la extensión</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Integración directa con Gmail</li>
                  <li>Acceso a todos los tonos de respuesta disponibles</li>
                  <li>Inserta la respuesta generada directamente en el editor de Gmail</li>
                  <li>Funciona con todos tus emails</li>
                </ul>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button asChild>
                  <a 
                    href="https://github.com/andresavilesdev/GenMail/tree/main" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Ver en GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
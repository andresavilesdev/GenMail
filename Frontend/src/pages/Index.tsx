import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Clipboard, Copy, Loader2 } from "lucide-react"

interface EmailGenRequest {
  emailContent: string
  tone: string
}

export default function Index() {
  const [emailContent, setEmailContent] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emailContent.trim()) {
      toast.error("Por favor ingresa el contenido del email")
      return
    }
    
    if (!selectedTone) {
      toast.error("Por favor selecciona un tono de respuesta")
      return
    }
    
    setIsLoading(true)
    
    try {
      const request: EmailGenRequest = {
        emailContent,
        tone: selectedTone
      }
      
      const response = await fetch("https://api.genmail.lemonsalve.tech/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })
      
      if (!response.ok) {
        throw new Error("Error al generar respuesta")
      }
      
      const data = await response.text()
      setGeneratedResponse(data)
      toast.success("Respuesta generada exitosamente")
    } catch (error) {
      toast.error("Error al generar la respuesta. Intenta nuevamente.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResponse)
    toast.success("Respuesta copiada al portapapeles")
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">GENMAIL</h1>
            <p className="text-muted-foreground">Genera respuestas de email con IA en diferentes tonos</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email recibido</CardTitle>
                <CardDescription>Pega el email al que deseas responder</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Pega aquí el contenido del email recibido..." 
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </CardContent>
            </Card>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tono de respuesta</CardTitle>
                  <CardDescription>Selecciona el tono para tu respuesta</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTone} onValueChange={setSelectedTone} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un tono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="informal">Informal</SelectItem>
                      <SelectItem value="amigable">Amigable</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="profesional">Profesional</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="directo">Directo</SelectItem>
                      <SelectItem value="cordial">Cordial</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card className="flex items-center justify-center">
                <CardContent className="pt-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      "Generar respuesta"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
          
          {generatedResponse && (
            <Card>
              <CardHeader>
                <CardTitle>Respuesta generada</CardTitle>
                <CardDescription>Tu respuesta personalizada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-muted/50 p-4 whitespace-pre-wrap">
                  {generatedResponse}
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="secondary" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar al portapapeles
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
import React, { useState } from "react";
import Particles from './components/Particles';

function App() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("formal");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("https://api.genmail.lemonsalve.tech/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent: email, tone }),
      });

      if (!res.ok) {
        throw new Error(`Error en la respuesta: ${res.statusText}`);
      }

      const data = await res.text(); 
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#f8f8f8', '#f0f0f0']} 
          particleCount={100}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-2xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">EMAILGEN</h1>
          <p className="text-gray-300 mt-1">Genera respuestas de correo al instante</p>
        </div>

        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Correo a responder:</label>
              <textarea
                className="w-full h-40 p-4 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none bg-gray-700 text-gray-200 placeholder-gray-400"
                placeholder="Pega el correo electrónico que deseas responder..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Tono de respuesta:</label>
              <select
                className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all bg-gray-700 text-gray-200"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="formal">Formal</option>
                <option value="friendly">Amigable</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white py-3 px-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generando..." : "GENERAR RESPUESTA"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="border-l-4 border-gray-600 p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 shadow-inner mt-6">
            <p className="text-gray-400 text-sm font-medium mb-2">RESPUESTA GENERADA:</p>
            <div className="min-h-[120px] p-3 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap">
              <p className="text-gray-200">{response || <span className="text-gray-400 italic">Tu respuesta aparecerá aquí...</span>}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

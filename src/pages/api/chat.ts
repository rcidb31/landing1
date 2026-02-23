import type { APIRoute } from "astro";

export const prerender = false;

const SYSTEM_PROMPT = `Eres el asistente IA de Raúl Cid, un Programador Full Stack JR de Chile. Tu rol es ayudar a visitantes de su portafolio (cidev.dev) a conocer más sobre él, sus proyectos, experiencia y habilidades.

## Datos Personales
- Nombre: Raúl Cid
- Título: Programador JR
- Email: rcidb31@gmail.com
- GitHub: https://github.com/rcidb31
- LinkedIn: https://www.linkedin.com/in/raul-cid-62285748/
- Blog: https://blog.cidev.dev/
- Portafolio: https://cidev.dev
- Redes sociales: TikTok (@cid.dev), YouTube (@cidev), Instagram (@rcid.dev)

## Bio
Programador con formación universitaria. Además cuenta con experiencia y estudios en el sector de la construcción. En el año 2017 gestionó el software chileno 'Calidad Cloud' en proyectos de construcción, lo que lo inspiró a estudiar programación. Actualmente, busca combinar esa experiencia con sus conocimientos en programación para crear soluciones tecnológicas.

## Experiencia Laboral

1. **Administrador plataformas chatbot IA servicio al cliente** - Walmart Chile (Lider.cl) | Septiembre 2025 - Presente
   - Front & back office RRSS WhatsApp, administración de plataformas chatbot IA de servicio al cliente.

2. **Administrador de Construcción** - Arensburg Chile | Diciembre 2024 - Julio 2025
   - Administración independiente de proyectos de construcción, terminaciones y acabados.

3. **Administrador Software de Calidad / Inspector de Calidad** - Constructora ICF y Constructora Santolaya | Marzo 2016 - Enero 2022
   - Optimización de procesos de control de calidad con software Calidad Cloud.
   - Supervisión de sistemas de control de calidad en terreno.
   - Generación de reportes semanales para detección de fallas y mejoras.

## Proyectos

1. **Libro de Obras Digital (LOD Platform)** - En Desarrollo
   - Aplicación mobile-first para registro de entregas en terreno con formularios dinámicos, fotografías, análisis con IA, mapa de contratistas y generación de reportes PDF.
   - Tech: React Native
   - GitHub: https://github.com/rcidb31/LOD-plataform

2. **Blog Personal** - https://blog.cidev.dev/
   - Tech: Astro + Tailwind CSS

3. **Arkanoid Midu** - https://arka.cidev.dev/
   - Juego Arkanoid personalizado. Tech: JavaScript, Canvas, Sprite

4. **Web Cliente Taxi** - https://github.com/rcidb31/Taxiaerovia/
   - Web para servicio de taxi aeropuerto. Tech: JavaScript, Trello

5. **React Calculator** - https://react.cidev.dev/
   - Calculadora React, proyecto de certificación Coursera.

## Educación

1. **Analista Programador** - Universidad Mayor | Enero 2024 - Marzo 2026 (en curso)
2. **Bootcamp Fullstack Javascript** - Programadores Chile | Abril 2021 - Abril 2022
3. **Tecnólogo en Construcción** - Universidad de Santiago de Chile | Marzo 2013 - Diciembre 2016

## Certificaciones

- 2025: NetCore 9 (Coursera), Angular (Coursera)
- 2024: React (Coursera), Cisco (Credly), Node.js Intensive (Credly)
- 2023: JavaScript (Credly), MongoDB (Credly), Bulma CSS (Credly), Desarrollo Web (Credly), Git (Credly)

## Skills Técnicos
- Frontend: React, React Native, JavaScript, TypeScript, Tailwind CSS, Astro, HTML5, CSS3
- Backend: Node.js, .NET Core
- Bases de datos: MongoDB
- Control de versiones: Git/GitHub
- Deployment: Vercel

## Instrucciones
- Responde siempre en español, a menos que el usuario escriba en otro idioma.
- Sé conciso y amigable. Usa un tono profesional pero cercano.
- Cuando sea relevante, sugiere al usuario que explore las secciones de la página (proyectos, experiencia, certificaciones, contacto).
- Si preguntan algo que no sabes sobre Raúl, indica amablemente que no tienes esa información y sugiere contactarlo directamente.
- No inventes información que no esté en este contexto.
- Mantén las respuestas breves (2-4 oraciones máximo) a menos que el usuario pida más detalle.`;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key no configurada. Contacta al administrador." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Mensaje inválido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construir historial de conversación para Gemini
    const contents = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", response.status, errorData);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes. Intenta en unos segundos." }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Error al procesar tu mensaje. Intenta de nuevo." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta.";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Gemini API error:", error);

    return new Response(
      JSON.stringify({ error: "Error al procesar tu mensaje. Intenta de nuevo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

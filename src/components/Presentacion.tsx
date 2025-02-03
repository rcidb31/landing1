import { useState } from "react";

const Presentacion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const email = "rcidb31@gmail.com"; // Correo electrónico oculto en el script

  // Función para copiar el correo al portapapeles
  const copiarCorreo = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => alert("Correo copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar el correo:", err));
  };

  return (
    <section id="presentacion" className="mt-5">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-sans tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">
            Raúl Cid
          </span>
        </h1>

        {/* Subtítulo */}
        <h2 className=" font-extralight typing-text sm:text-xl md:text-2xl  text-gray-600 mb-6">
          Desarrollador Frontend Jr 🇨🇱
        </h2>

        {/* Descripción */}
        <p className=" text-body sm:text-lg text-black mb-4 leading-relaxed">
          Estudiante universitario de segundo año en programación, con una sólida formación en desarrollo web gracias a un bootcamp intensivo de JavaScript.
          Durante ocho años, trabajé en el sector de la construcción 🏗️, donde tuve la oportunidad de gestionar el software chileno 🇨🇱 Calidad Cloud en proyectos
          de edificación 🏢. Ahora, estoy entusiasmado por combinar mi experiencia en construcción con mis conocimientos en programación 💻 para crear soluciones
          tecnológicas que optimicen y faciliten los procesos en este sector.
        </p>

        {/* Botón para abrir modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm sm:text-lg text-gray-500 hover:text-sky-500 transition-colors duration-300 ease-in-out mb-4"
        >
          E-mail
        </button>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/Raul_Cid.pdf"
            download
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Mi CV
          </a>

        
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              [ X ]
            </button>

            {/* Imagen del correo */}
            <div className="mb-4">
              <img
                src="/email.png"
                alt="Correo"
                className="w-full h-auto rounded-md"
              />
            </div>

            {/* Botón para copiar el correo */}
            <button
              onClick={copiarCorreo}
              className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-900"
            >
             ✉️ Copiar correo
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Presentacion;

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
          <span className="bg-clip-text ">
            Raúl Cid
          </span>
        </h1>

        {/* Subtítulo */}
        <h2 className=" text-body typing-text sm:text-2xl md:text-3xl  text-white mb-6">
          Full stack Frontend Jr 🇨🇱 
        </h2>
        
        {/* Descripción */}
        <p className=" text-body sm:text-lg text-white mb-4 leading-relaxed">
       "Futuro egresado de la carrera de Programación, con formación intensiva en desarrollo web a través de un bootcamp especializado en JavaScript. 
       Con experiencia previa en el rubro de la construcción, donde en 2017 gestioné el software chileno 'Calidad Cloud' en proyectos de edificación. 
       Actualmente, busco integrar mi trayectoria en obras con el desarrollo de soluciones tecnológicas enfocadas en optimizar procesos del sector."
        </p>

        {/* Botón para abrir modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm sm:text-lg text-white hover:text-sky-500 transition-colors duration-300 ease-in-out mb-4">
          E-mail
        </button>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/Raul_Cid.pdf"download className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
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
                src="/email.webp"
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

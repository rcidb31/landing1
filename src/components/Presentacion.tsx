import { useState, useEffect } from "react";

const Presentacion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = "rcidb31@gmail.com";

  const copiarCorreo = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => alert("Correo copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar el correo:", err));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  return (
    <section id="presentacion" className="min-h-screen px-6 pt-14">
      <div className="max-w-4xl mx-auto text-center px-6">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-sans tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">
            Raúl Cid
          </span>
        </h1>
        
        <h2 className="font-extralight text-sm sm:text-lg md:text-2xl text-white mb-4 tracking-wide leading-snug min-h-[3rem] flex justify-center items-center animate-glow-reveal">
          Desarrollador Frontend Jr 🇨🇱
        </h2>
        
        <p className="text-white text-sm sm:text-lg leading-loose mb-8 
            text-center sm:text-justify 
            max-w-sm sm:max-w-2xl mx-auto px-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            Futuro egresado de la carrera de Programación, con sólida formación en desarrollo web gracias a un bootcamp intensivo en JavaScript. 
            Con experiencia en el sector construcción, donde en 2017 gestioné el software chileno "Calidad Cloud" en proyectos de edificación. 
            Actualmente, busco combinar esa experiencia con mis conocimientos en programación para crear soluciones tecnológicas.
        </p>
        
        <div className="flex flex-col items-center space-y-2 opacity-0 animate-fade-in-up"
             style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm sm:text-lg text-white hover:text-sky-500 transition-colors duration-300">
            E-mail
          </button>
          <a
            href="/CvRcid.pdf"
            download
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Mi CV
          </a>
        </div>
        
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 z-[9999]"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md w-[90%] relative z-[10000] transform scale-95 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500 font-bold"
              >
                ×
              </button>

              <h2 className="text-lg font-bold mb-4 text-center">
                Email de contacto
              </h2>
              <p className="text-center mb-4">{email}</p>

              <button
                onClick={copiarCorreo}
                className="block mx-auto mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-sky-700"
              >
                Copiar correo
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes glow-reveal {
          0% { 
            opacity: 0;
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
            transform: scale(0.95);
          }
          50% { 
            opacity: 0.7;
            text-shadow: 0 0 25px rgba(56, 189, 248, 1), 
                         0 0 35px rgba(56, 189, 248, 0.7),
                         0 0 45px rgba(56, 189, 248, 0.5);
            transform: scale(1.02);
          }
          100% { 
            opacity: 1;
            text-shadow: 0 0 15px rgba(56, 189, 248, 0.6),
                         0 0 25px rgba(56, 189, 248, 0.4);
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-glow-reveal {
          animation: glow-reveal 2s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Presentacion;
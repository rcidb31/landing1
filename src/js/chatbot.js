// ===== CHATBOT JAVASCRIPT ===== 

// Estado global del chatbot
let chatbotOpen = false;

// Base de conocimientos - Aquí puedes personalizar las respuestas
const knowledgeBase = {
    proyectos: [
        "He trabajado en aplicaciones web modernas con Astro, React y Node.js",
        "Mis proyectos incluyen sitios web responsivos y aplicaciones interactivas",
        "Tengo experiencia creando desde landing pages hasta aplicaciones full-stack",
        "Puedes ver mis trabajos más recientes en la sección de proyectos"
    ],
    experiencia: [
        "Trabajo principalmente con HTML, CSS, JavaScript y frameworks modernos",
        "Tengo experiencia con Astro, React, Vue.js y Node.js",
        "Me especializo en desarrollo frontend y tengo conocimientos de backend",
        "También manejo herramientas como Git, Webpack y bases de datos"
    ],
    contacto: [
        "Puedes contactarme directamente a través de mi formulario de contacto",
        "Estoy disponible para proyectos freelance y colaboraciones",
        "Mi información completa de contacto está en la página principal",
        "También puedes encontrarme en LinkedIn y GitHub"
    ],
    habilidades: [
        "Frontend: HTML5, CSS3, JavaScript (ES6+), React, Astro, Vue.js",
        "Backend: Node.js, Express.js, APIs REST",
        "Bases de datos: MongoDB, MySQL, PostgreSQL",
        "Herramientas: Git, VS Code, npm/yarn, Webpack, Vite"
    ],
    astro: [
        "¡Astro es increíble! Lo uso por su excelente rendimiento y SEO",
        "Me encanta cómo Astro permite combinar diferentes frameworks",
        "Es perfecto para sitios estáticos y portfolios como este",
        "Su filosofía de 'islands architecture' es muy eficiente"
    ]
};

// ===== FUNCIONES PRINCIPALES =====

/**
 * Alterna la visibilidad del chatbot
 */
function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    const button = document.querySelector('.chatbot-button');
    
    if (!window || !button) {
        console.error('Elementos del chatbot no encontrados');
        return;
    }
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        openChatbot(window, button);
    } else {
        closeChatbot(window, button);
    }
}

/**
 * Abre el chatbot
 */
function openChatbot(window, button) {
    window.classList.add('show');
    button.classList.add('active');
    button.innerHTML = '✕';
    
    // Focus en el input cuando se abre
    setTimeout(() => {
        const input = document.getElementById('chatbotInput');
        if (input) input.focus();
    }, 300);
}

/**
 * Cierra el chatbot
 */
function closeChatbot(window, button) {
    window.classList.remove('show');
    button.classList.remove('active');
    button.innerHTML = '💬';
}

/**
 * Envía un mensaje del usuario
 */
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    
    if (!input) {
        console.error('Input del chatbot no encontrado');
        return;
    }
    
    const message = input.value.trim();
    
    // No enviar mensajes vacíos
    if (!message) return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    
    // Limpiar input
    input.value = '';
    
    // Simular respuesta del bot
    handleBotResponse(message);
}

/**
 * Envía un mensaje predefinido (botones rápidos)
 */
function sendQuickMessage(message) {
    addMessage(message, 'user');
    handleBotResponse(message);
}

/**
 * Maneja la respuesta del bot
 */
function handleBotResponse(userMessage) {
    showTypingIndicator();
    
    // Simular tiempo de respuesta realista
    const responseTime = 800 + Math.random() * 1200; // Entre 0.8 y 2 segundos
    
    setTimeout(() => {
        const response = generateResponse(userMessage);
        hideTypingIndicator();
        addMessage(response, 'bot');
    }, responseTime);
}

/**
 * Agrega un mensaje al chat
 */
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    if (!messagesContainer) {
        console.error('Contenedor de mensajes no encontrado');
        return;
    }
    
    // Crear elementos del mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    // Ensamblar mensaje
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll automático al último mensaje
    scrollToBottom();
}

/**
 * Hace scroll al último mensaje
 */
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

/**
 * Genera respuesta basada en el mensaje del usuario
 */
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // ===== RESPUESTAS ESPECÍFICAS =====
    
    // Saludos
    if (message.includes('hola') || message.includes('saludos') || message.includes('buenos')) {
        return "¡Hola! 👋 Me alegra que visites cidev.dev. Soy tu asistente virtual y puedo ayudarte con información sobre proyectos, experiencia técnica y más. ¿Qué te gustaría saber?";
    }
    
    // Proyectos
    if (message.includes('proyecto') || message.includes('trabajo') || message.includes('portfolio')) {
        return getRandomResponse(knowledgeBase.proyectos);
    }
    
    // Experiencia y habilidades
    if (message.includes('experiencia') || message.includes('habilidad') || message.includes('tecnolog') || message.includes('stack')) {
        return getRandomResponse(knowledgeBase.experiencia);
    }
    
    // Contacto
    if (message.includes('contacto') || message.includes('email') || message.includes('comunicar') || message.includes('escribir')) {
        return getRandomResponse(knowledgeBase.contacto);
    }
    
    // Astro específicamente
    if (message.includes('astro')) {
        return getRandomResponse(knowledgeBase.astro);
    }
    
    // React
    if (message.includes('react')) {
        return "¡React es fantástico! Lo uso frecuentemente para crear interfaces interactivas y componentes reutilizables. Es una de mis herramientas favoritas para el desarrollo frontend.";
    }
    
    // JavaScript
    if (message.includes('javascript') || message.includes('js')) {
        return "JavaScript es el corazón del desarrollo web moderno. Trabajo con ES6+, frameworks como React y Vue, y también Node.js para el backend. ¿Te interesa algún aspecto específico?";
    }
    
    // Servicios
    if (message.includes('servicio') || message.includes('precio') || message.includes('costo') || message.includes('freelance')) {
        return "Ofrezco servicios de desarrollo web, desde sitios estáticos hasta aplicaciones completas. Para presupuestos personalizados, usa el formulario de contacto y hablemos de tu proyecto específico.";
    }
    
    // Agradecimientos
    if (message.includes('gracias') || message.includes('thanks')) {
        return "¡De nada! 😊 Estoy aquí para ayudarte. Si tienes más preguntas sobre mis proyectos o experiencia, no dudes en preguntar.";
    }
    
    // Despedidas
    if (message.includes('adiós') || message.includes('bye') || message.includes('hasta')) {
        return "¡Hasta luego! 👋 Espero haber sido de ayuda. No olvides revisar mis proyectos y no dudes en contactarme si necesitas algo.";
    }
    
    // ===== RESPUESTA POR DEFECTO =====
    const defaultResponses = [
        "Interesante pregunta. ¿Podrías ser más específico sobre qué aspecto te gustaría conocer?",
        "En cidev.dev encontrarás información detallada sobre eso. ¿Hay algo específico que te gustaría saber?",
        "Me encanta hablar sobre desarrollo web. ¿Te interesa alguna tecnología en particular?",
        "Esa es una buena pregunta. Puedo contarte más sobre mis proyectos, experiencia técnica o cómo contactarme.",
        "¡Perfecto! ¿Te gustaría saber sobre mis proyectos recientes, habilidades técnicas o información de contacto?"
    ];
    
    return getRandomResponse(defaultResponses);
}

/**
 * Obtiene una respuesta aleatoria de un array
 */
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

/**
 * Muestra el indicador de escritura
 */
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'block';
        scrollToBottom();
    }
}

/**
 * Oculta el indicador de escritura
 */
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

/**
 * Maneja la tecla Enter en el input
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento por defecto
        sendMessage();
    }
}

// ===== INICIALIZACIÓN =====

/**
 * Inicializa el chatbot cuando se carga la página
 */
function initChatbot() {
    console.log('🤖 Chatbot inicializado para cidev.dev');
    
    // Verificar que los elementos existen
    const requiredElements = [
        'chatbotWindow',
        'chatbotMessages', 
        'chatbotInput',
        'typingIndicator'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.warn('⚠️ Elementos faltantes del chatbot:', missingElements);
    }
    
    // Agregar event listeners adicionales si es necesario
    const input = document.getElementById('chatbotInput');
    if (input) {
        // Evitar que el formulario se envíe si está dentro de uno
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// ===== FUNCIONES UTILITARIAS =====

/**
 * Limpia el chat (útil para desarrollo/testing)
 */
function clearChat() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
        messagesContainer.innerHTML = `
            <div class="message bot">
                <div class="message-bubble">
                    ¡Hola! 👋 Soy el asistente de cidev.dev. Puedo ayudarte con información sobre proyectos, experiencia técnica y servicios. ¿En qué puedo asistirte?
                </div>
            </div>
        `;
    }
}

/**
 * Obtiene el historial de mensajes (útil para analytics)
 */
function getChatHistory() {
    const messages = document.querySelectorAll('.message');
    return Array.from(messages).map(msg => ({
        sender: msg.classList.contains('bot') ? 'bot' : 'user',
        text: msg.querySelector('.message-bubble').textContent,
        timestamp: new Date().toISOString()
    }));
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// Exponer funciones globalmente para uso en HTML
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.handleKeyPress = handleKeyPress;

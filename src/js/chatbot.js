// Variables globales
let chatbotOpen = false;
let isMobile = window.innerWidth <= 480;

// Detectar cambios de tamaño de pantalla
window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 480;
});

// Función principal para toggle del chatbot
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotButton = document.querySelector('.chatbot-button');
    const overlay = document.getElementById('chatbotOverlay');
    const body = document.body;
    
    if (!chatbotWindow || !chatbotButton) return;
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        // Abrir chatbot
        chatbotWindow.classList.add('show');
        chatbotButton.classList.add('active');
        
        // En móviles, mostrar overlay y prevenir scroll
        if (isMobile) {
            if (overlay) {
                overlay.classList.add('show');
            }
            body.classList.add('chatbot-open');
            body.style.top = `-${window.scrollY}px`;
        }
        
        // Focus en el input
        setTimeout(() => {
            const input = document.getElementById('chatbotInput');
            if (input && !isMobile) { // No hacer focus automático en móviles
                input.focus();
            }
        }, 300);
        
    } else {
        // Cerrar chatbot
        chatbotWindow.classList.remove('show');
        chatbotButton.classList.remove('active');
        
        // En móviles, ocultar overlay y restaurar scroll
        if (isMobile) {
            if (overlay) {
                overlay.classList.remove('show');
            }
            
            // Restaurar scroll del body
            const scrollY = body.style.top;
            body.classList.remove('chatbot-open');
            body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }
}

// Función para enviar mensaje
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Limpiar input
    input.value = '';
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular respuesta del bot (reemplaza con tu lógica)
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Delay aleatorio más realista
}

// Función para agregar mensaje
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll al final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para mensaje rápido
function sendQuickMessage(message) {
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.value = message;
        sendMessage();
    }
}

// Función para manejar Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'block';
        
        // Scroll al final
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }
}

// Ocultar indicador de escritura
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

// Función para obtener respuesta del bot (personaliza según tus necesidades)
function getBotResponse(message) {
    const responses = {
        'ver proyectos': '🚀 Puedo mostrarte proyectos increíbles desarrollados con tecnologías modernas como React, Node.js, Python y más. ¿Te interesa alguna tecnología en particular?',
        'proyectos': '🚀 Puedo mostrarte proyectos increíbles desarrollados con tecnologías modernas como React, Node.js, Python y más. ¿Te interesa alguna tecnología en particular?',
        'experiencia técnica': '💻 Tengo experiencia en desarrollo Full Stack, especializándome en JavaScript, TypeScript, React, Node.js, Python, bases de datos y arquitectura de software. ¿Sobre qué tecnología te gustaría saber más?',
        'experiencia': '💻 Tengo experiencia en desarrollo Full Stack, especializándome en JavaScript, TypeScript, React, Node.js, Python, bases de datos y arquitectura de software. ¿Sobre qué tecnología te gustaría saber más?',
        'contacto': '📧 Puedes contactarme a través de mi email o LinkedIn. ¿Prefieres que te comparta los enlaces directos?',
        'hola': '👋 ¡Hola! Es genial tenerte aquí. ¿En qué puedo ayudarte hoy? Puedo contarte sobre proyectos, experiencia técnica o ayudarte con información de contacto.',
        'hello': '👋 Hello! Great to have you here. How can I help you today? I can tell you about projects, technical experience, or help you with contact information.'
    };
    
    const lowerMessage = message.toLowerCase();
    
    // Buscar coincidencias exactas
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // Respuesta por defecto más inteligente
    if (lowerMessage.includes('react') || lowerMessage.includes('javascript')) {
        return '⚛️ ¡Excelente! React y JavaScript son mis especialidades. He desarrollado múltiples aplicaciones SPA, hooks personalizados, y optimizado rendimiento. ¿Hay algún aspecto específico que te interese?';
    }
    
    if (lowerMessage.includes('python') || lowerMessage.includes('backend')) {
        return '🐍 Python es fantástico para backend! He trabajado con Django, FastAPI, y Flask, además de integrar APIs y manejar bases de datos. ¿Te interesa algún framework en particular?';
    }
    
    if (lowerMessage.includes('trabajo') || lowerMessage.includes('colaborar')) {
        return '🤝 ¡Me encanta colaborar en proyectos interesantes! Cuéntame más sobre lo que tienes en mente. ¿Es desarrollo web, una aplicación móvil, o algo diferente?';
    }
    
    return `🤔 Entiendo que preguntas sobre "${message}". Te puedo ayudar con información sobre proyectos, experiencia técnica, o detalles de contacto. ¿Podrías ser más específico sobre lo que necesitas?`;
}

// Event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar estado inicial cerrado
    const chatbotWindow = document.getElementById('chatbotWindow');
    const overlay = document.getElementById('chatbotOverlay');
    const button = document.querySelector('.chatbot-button');
    
    if (chatbotWindow) chatbotWindow.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    if (button) button.classList.remove('active');
    
    // Event listener para cerrar con overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (chatbotOpen) {
                toggleChatbot();
            }
        });
    }
    
    // Event listener para Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotOpen) {
            toggleChatbot();
        }
    });
    
    // Prevenir que clics dentro de la ventana cierren el chatbot
    if (chatbotWindow) {
        chatbotWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Event listener para el botón cerrar (si existe)
    const closeButton = document.querySelector('.chatbot-close');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (chatbotOpen) {
                toggleChatbot();
            }
        });
    }
});

// Hacer funciones disponibles globalmente
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.handleKeyPress = handleKeyPress;
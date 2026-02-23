// Variables globales
let chatbotOpen = false;
let chatbotLoaded = false;
let isMobile = window.innerWidth <= 480;
let conversationHistory = [];

// Detectar cambios de tamaño de pantalla
window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 480;
});

// Cargar la ventana del chatbot desde el template (lazy load)
function loadChatbotWindow() {
    if (chatbotLoaded) return;

    const template = document.getElementById('chatbotTemplate');
    const container = document.querySelector('.chatbot-container');
    if (!template || !container) return;

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    chatbotLoaded = true;

    // Vincular event listeners en los elementos recién creados
    const closeBtn = document.getElementById('chatbotClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleChatbot();
        });
    }

    const overlay = document.getElementById('chatbotOverlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (chatbotOpen) toggleChatbot();
        });
    }

    const chatbotWindow = document.getElementById('chatbotWindow');
    if (chatbotWindow) {
        chatbotWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const sendBtn = document.getElementById('chatbotSend');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    const input = document.getElementById('chatbotInput');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const msg = btn.getAttribute('data-quick-msg');
            if (msg) sendQuickMessage(msg);
        });
    });
}

// Función principal para toggle del chatbot
function toggleChatbot() {
    // Lazy load on first open
    if (!chatbotLoaded) {
        loadChatbotWindow();
    }

    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotButton = document.querySelector('.chatbot-button');
    const overlay = document.getElementById('chatbotOverlay');
    const body = document.body;

    if (!chatbotWindow || !chatbotButton) return;

    chatbotOpen = !chatbotOpen;

    if (chatbotOpen) {
        chatbotWindow.classList.add('show');
        chatbotButton.classList.add('active');
        chatbotButton.classList.remove('pulse');

        if (isMobile) {
            if (overlay) {
                overlay.classList.add('show');
            }
            body.classList.add('chatbot-open');
            body.style.top = `-${window.scrollY}px`;
        }

        setTimeout(() => {
            const input = document.getElementById('chatbotInput');
            if (input && !isMobile) {
                input.focus();
            }
        }, 300);

    } else {
        chatbotWindow.classList.remove('show');
        chatbotButton.classList.remove('active');

        if (isMobile) {
            if (overlay) {
                overlay.classList.remove('show');
            }

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
async function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');

    if (!input || !messagesContainer) return;

    const message = input.value.trim();
    if (!message) return;

    // Limpiar input y deshabilitar mientras se procesa
    input.value = '';
    input.disabled = true;
    const sendBtn = document.getElementById('chatbotSend');
    if (sendBtn) sendBtn.disabled = true;

    // Agregar mensaje del usuario
    addMessage(message, 'user');

    // Mostrar indicador de escritura
    showTypingIndicator();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message,
                history: conversationHistory,
            }),
        });

        const data = await response.json();

        hideTypingIndicator();

        if (data.error) {
            addMessage(data.error, 'bot', true);
        } else {
            // Guardar en historial
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.reply }
            );

            // Limitar historial a últimos 20 mensajes para no exceder contexto
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

            addMessage(data.reply, 'bot');
        }
    } catch (error) {
        hideTypingIndicator();
        addMessage('Error de conexión. Verifica tu internet e intenta de nuevo.', 'bot', true);
    } finally {
        input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        input.focus();
    }
}

// Función para agregar mensaje
function addMessage(text, sender, isError = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `message-bubble${isError ? ' error' : ''}`;
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);

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

// Mostrar indicador de escritura
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'block';

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

// Event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('chatbotToggle');
    if (button) {
        button.addEventListener('click', toggleChatbot);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotOpen) {
            toggleChatbot();
        }
    });
});

// Hacer funciones disponibles globalmente
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;

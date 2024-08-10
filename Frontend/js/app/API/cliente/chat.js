// Simula el envío de mensajes y el efecto de desvanecimiento
document.getElementById('send-button').addEventListener('click', function() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        appendMessage('Tú: ' + message, 'sent');
        input.value = '';
        setTimeout(() => {
            appendMessage('ChatGPT: Esto es una respuesta simulada.', 'received');
        }, 500); // Retraso para simular la llegada del mensaje
    }
});

function appendMessage(text, type) {
    const chatBox = document.getElementById('chat-box');
    const messageContainer = document.createElement('div');
    messageContainer.className = `flex ${type === 'sent' ? 'justify-end' : 'justify-start'}`;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-2 my-2 rounded-lg ${type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} fade-in`;
    messageDiv.textContent = text;
    
    messageContainer.appendChild(messageDiv);
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}
<template>
  <div class="chat-toggle-container">
    <button
      v-if="!isChatOpen"
      class="chat-toggle-button open-button"
      @click="toggleChat"
      aria-label="Open Chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4C2.89543 2 2 2.89543 2 4V22L6 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2Z"></path>
      </svg>
    </button>

    <div v-if="isChatOpen" class="chat-widget">
      <div class="chat-header">
        <span>🤖 TON Assistant 🟢</span>
        <button class="chat-close-button" @click="toggleChat" aria-label="Close Chat">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path>
          </svg>
        </button>
      </div>
      
      <div class="message-container" ref="messageContainerRef">
        <div v-for="(msg, index) in messages" :key="index" :class="['message-bubble', msg.sender]">
          <p>{{ msg.text }}</p>
        </div>
        <div v-if="isLoading" class="message-bubble bot typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>

      <form class="input-form" @submit.prevent="sendMessage">
        <input v-model="newMessage" type="text" placeholder="พิมพ์ข้อความ..." :disabled="isLoading" autocomplete="off" />
        <button type="submit" :disabled="isLoading || !newMessage.trim()" aria-label="Send Message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13.0001H9V11.0001H3V1.81609L21 12.0001L3 22.1841V13.0001Z"></path></svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

// --- State Management ---
const isChatOpen = ref(false);
const messages = ref([
  { sender: 'bot', text: 'สวัสดีครับ มีอะไรให้ช่วยสอบถามได้เลย' }
]);
const newMessage = ref('');
const isLoading = ref(false);
const messageContainerRef = ref(null);

// --- Configuration ---
// ⚠️⚠️⚠️ ใส่ Production URL ของ n8n Webhook ที่นี่! ⚠️⚠️⚠️
const N8N_WEBHOOK_URL = 'https://close-troll-ethical.ngrok-free.app/webhook/doc-ton';

// --- Functions ---
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const scrollToBottom = async () => {
  await nextTick();
  const container = messageContainerRef.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const sendMessage = async () => {
  const messageText = newMessage.value.trim();
  if (!messageText || isLoading.value) return;

  // 1. Add user message to UI
  messages.value.push({ sender: 'user', text: messageText });
  isLoading.value = true;
  newMessage.value = '';
  scrollToBottom();
  
  // 2. Send message to n8n webhook
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // 3. Add bot response to UI
    messages.value.push({ sender: 'bot', text: data.reply || "ขออภัย, เกิดข้อผิดพลาดในการตอบกลับ" });

  } catch (error) {
    console.error('Error sending message to n8n:', error);
    messages.value.push({ sender: 'bot', text: 'ขออภัย, ระบบขัดข้อง ไม่สามารถเชื่อมต่อได้' });
  } finally {
    // 4. Clean up
    isLoading.value = false;
    scrollToBottom();
  }
};
</script>

<style scoped>
/* --- Container & Toggle Button (Mostly unchanged) --- */
.chat-toggle-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
.chat-toggle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007aff;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.chat-toggle-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}
.open-button svg {
  width: 32px;
  height: 32px;
}

/* --- Main Chat Widget --- */
.chat-widget {
  width: 320px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* --- Chat Header --- */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 600;
  color: #333;
}
.chat-close-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  padding: 4px;
  border-radius: 50%;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}
.chat-close-button svg {
  width: 20px;
  height: 20px;
}
.chat-close-button:hover {
  opacity: 1;
  background-color: #e0e0e0;
}

/* --- Message Area --- */
.message-container {
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.message-bubble {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 80%;
  line-height: 1.5;
}
.message-bubble.user {
  background-color: #007aff;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}
.message-bubble.bot {
  background-color: #e5e5ea;
  color: #000;
  align-self: flex-start;
  border-bottom-left-radius: 5px;
}

/* --- Typing Indicator --- */
.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #9e9e9e;
  border-radius: 50%;
  display: inline-block;
  animation: wave 1.3s infinite;
}
.typing-indicator span:nth-of-type(2) {
  animation-delay: -1.1s;
}
.typing-indicator span:nth-of-type(3) {
  animation-delay: -0.9s;
}
@keyframes wave {
  0%, 60%, 100% { transform: initial; }
  30% { transform: translateY(-8px); }
}

/* --- Input Form --- */
.input-form {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  background-color: #f7f7f7;
}
.input-form input {
  color: #3b3b3b;
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 1rem;
}
.input-form input:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
}
.input-form button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #007aff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.input-form button svg {
  width: 20px;
  height: 20px;
  margin-left: 2px;
}
.input-form button:disabled {
  background-color: #cce4ff;
  cursor: not-allowed;
}

/* --- Responsive adjustments for mobile --- */
@media (max-width: 768px) {
  .chat-widget {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}
</style>
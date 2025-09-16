<template>
  <div class="credentials-box">
    <div class="field-row">
      <label for="username-field">Username</label>
      <div class="input-group">
        <input id="username-field" type="text" :value="username" readonly />
        <button @click="copy('username')" :title="copyTooltipText('username')">
          <span v-if="copiedItem === 'username'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </span>
        </button>
      </div>
    </div>

    <div class="field-row">
      <label for="password-field">Password</label>
      <div class="input-group">
        <input 
          id="password-field"
          :type="isPasswordVisible ? 'text' : 'password'" 
          :value="password" 
          readonly 
        />
        <button @click="togglePasswordVisibility" title="Show/Hide Password">
          <span v-if="isPasswordVisible">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </span>
        </button>
        <button @click="copy('password')" :title="copyTooltipText('password')">
           <span v-if="copiedItem === 'password'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const isPasswordVisible = ref(false)
const copiedItem = ref(null) // สามารถเป็น 'username', 'password', หรือ null

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const copy = async (type) => {
  const textToCopy = type === 'username' ? props.username : props.password
  try {
    await navigator.clipboard.writeText(textToCopy)
    copiedItem.value = type
    // Reset afrer 2 seconds
    setTimeout(() => {
      copiedItem.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    alert('Failed to copy to clipboard.')
  }
}

const copyTooltipText = (type) => {
  return copiedItem.value === type ? 'Copied!' : `Copy ${type}`
}
</script>

<style scoped>
.credentials-box {
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-row + .field-row {
  margin-top: 12px;
}

.field-row label {
  font-family: var(--vp-font-family-base);
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 13px;
  padding-left: 4px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 2px;
}

.input-group input {
  flex-grow: 1;
  border: none;
  background-color: transparent;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  outline: none;
  font-family: inherit;
  font-size: inherit;
}
/* For password field to show dots with the right font */
input[type="password"] {
  font-family: text-security-disc;
  -webkit-text-security: disc;
}


.input-group button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-2);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.input-group button:hover {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.input-group button span {
  display: flex;
  align-items: center;
}
/* Styling for success (green checkmark) */
.input-group button span[v-if="copiedItem"] {
  color: var(--vp-c-green-1);
}
</style>
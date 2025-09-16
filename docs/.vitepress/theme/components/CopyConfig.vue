<template>
  <div class="config-box">
    <div v-if="title" class="config-title">{{ title }}</div>
    
    <div v-for="(field, index) in fields" :key="index" class="field-row">
      <label :for="`field-${index}`">
        {{ field.label }}
        <span v-if="field.suggestion" class="suggestion">{{ field.suggestion }}</span>
      </label>
      <div class="input-group">
        <input 
          :id="`field-${index}`"
          :type="isFieldVisible(field.label) ? 'text' : (field.secret ? 'password' : 'text')" 
          :value="field.value" 
          readonly 
        />
        <button v-if="field.secret" @click="toggleVisibility(field.label)" title="Show/Hide value">
          <span v-if="isFieldVisible(field.label)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </span>
        </button>
        <button @click="copy(field.value, field.label)" :title="copyTooltipText(field.label)">
           <span v-if="copiedItem === field.label">
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
  title: {
    type: String,
    required: false
  },
  fields: {
    type: Array,
    required: true,
    // ตัวอย่างโครงสร้าง:
    // [
    //   { label: 'Profile name', value: 'thors', suggestion: '(แนะนำ)' },
    //   { label: 'Token', value: 'xxxx-xxxx-xxxx', secret: true },
    //   ...
    // ]
  }
})

const visibleItems = ref([]) // เก็บ label ของ field ที่ต้องการให้เห็นค่าจริง
const copiedItem = ref(null)

const toggleVisibility = (label) => {
  if (visibleItems.value.includes(label)) {
    visibleItems.value = visibleItems.value.filter(item => item !== label)
  } else {
    visibleItems.value.push(label)
  }
}

const isFieldVisible = (label) => {
  return visibleItems.value.includes(label)
}

const copy = async (textToCopy, label) => {
  try {
    await navigator.clipboard.writeText(textToCopy)
    copiedItem.value = label
    setTimeout(() => {
      copiedItem.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    alert('Failed to copy to clipboard.')
  }
}

const copyTooltipText = (label) => {
  return copiedItem.value === label ? 'Copied!' : `Copy ${label}`
}
</script>

<style scoped>
/* ใช้ Style คล้ายกับของเดิม แต่ปรับปรุงเล็กน้อย */
.config-box {
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.config-title {
  font-family: var(--vp-font-family-base);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.suggestion {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
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
input[type="password"] {
  font-family: text-security-disc;
  -webkit-text-security: disc;
}

.input-group button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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
.input-group button[title^="Copied"] span {
  color: var(--vp-c-green-1);
}
</style>
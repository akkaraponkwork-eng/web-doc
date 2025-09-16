<template>
  <div class="action-buttons">
    <a
      v-for="(btn, index) in buttons"
      :key="index"
      :href="btn.link"
      :class="['btn', btn.theme]"
    >
      {{ btn.text }}
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  buttons: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style>
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-buttons .btn {
  padding: 0.5em 1em;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
  color: inherit;
}

.btn {
  padding: 0.5em 1em;       /* เพิ่ม padding ให้ดูเต็มมือ */
  border-radius: 2rem;        /* ขอบมนมากขึ้น */
  text-decoration: none;      /* เอาเส้นใต้ */
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;            /* เปลี่ยนเป็น pointer เมื่อ hover */
  color: inherit;
}

/* ปุ่ม brand */
.btn.brand {
  background-color: #3b82f6;
  color: white;               /* ตัวอักษรสีขาว */
}

/* ปุ่ม alt */
.btn.alt {
  background-color: #ebebeb;
  color: rgb(189, 189, 189);               /* ตัวอักษรสีดำ */
}

/* hover effect */
.btn.brand:hover {
  background-color: #2563eb;
  color: white; 
}

.btn.alt:hover {
  background-color: #e2e2e2;
  color: rgb(189, 189, 189);
}
</style>


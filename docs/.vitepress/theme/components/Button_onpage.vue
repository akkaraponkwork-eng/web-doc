<template>
  <div>
    <div class="action-buttons">
      <button
        v-for="(btn, index) in buttons"
        :key="index"
        
        :class="['btn', btn.link === activeLink ? 'brand' : 'alt', { active: btn.link === activeLink }]"
        
        @click="loadContent(btn.link)"
      >
        {{ btn.text }}
      </button>
    </div>

    <div class="content-wrapper">
      <Transition name="fade" mode="out-in">
        <component :is="activeContentComponent" v-if="activeContentComponent" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from 'vue'

// ค้นหาไฟล์ .md ทั้งหมดที่อยู่ใน docs/ และโฟลเดอร์ย่อย
const modules = import.meta.glob('/../**/*.md');

const props = defineProps({
  buttons: {
    type: Array,
    required: true,
    default: () => []
  }
})

const activeLink = ref(null)
const activeContentComponent = shallowRef(null)

const loadContent = async (link) => {
  if (!link) return;

  // การคลิกปุ่มเดิมซ้ำจะซ่อนเนื้อหา (สามารถเอาเงื่อนไขนี้ออกได้ถ้าไม่ต้องการ)
  if (activeLink.value === link) {
    activeLink.value = null
    activeContentComponent.value = null
    return
  }

  const formattedPath = (link.startsWith('/') ? link : '/' + link) + '.md';
  const importer = modules[formattedPath];

  if (importer) {
    try {
      const { default: component } = await importer();
      activeContentComponent.value = component;
      activeLink.value = link;
    } catch (e) {
      console.error(`ไม่สามารถโหลดคอมโพเนนต์จาก: ${formattedPath}`, e);
      activeContentComponent.value = null;
    }
  } else {
    console.warn(`ไม่พบไฟล์ Markdown สำหรับ path: ${formattedPath}.`);
    activeContentComponent.value = null;
  }
}

// เมื่อคอมโพเนนต์โหลด ให้แสดงเนื้อหาของปุ่มแรกโดยอัตโนมัติ
onMounted(() => {
  if (props.buttons && props.buttons.length > 0) {
    loadContent(props.buttons[0].link)
  }
})
</script>

<style>
/* ไม่มีการเปลี่ยนแปลงในส่วนของ Style */
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn {
  padding: 0.5em 1.2em;
  border-radius: 2rem;
  border: 1px solid transparent;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: all 0.2s;
  cursor: pointer;
}
.btn.brand {
  background-color: #3b82f6;
  color: white;
  /* border-color: #3b82f6; */
}
.btn.alt {
  background-color: #f3f4f6;
  color: #4b5563;
  border-color: #d1d5db;
}
.btn.brand:hover {
  background-color: #2563eb;
}
.btn.alt:hover {
  background-color: #e5e7eb;
}
.btn.brand.active {
  background-color: #2563eb;
  /* box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4); */
}
.btn.alt.active {
  background-color: #d1d5db;
  color: #1f2937;
  border-color: #9ca3af;
}
.content-wrapper {
  margin-top: 2rem;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
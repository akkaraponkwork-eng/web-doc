---
outline: deep
---

# ⏱️ Quick Started

::: tip 📍 Thors Platform (TON Platform)

เป็นแพลตฟอร์มสำหรับจัดการข้อมูล IoT ที่ครอบคลุมตั้งแต่การรับข้อมูล การประมวลผล การจัดเก็บ และการแสดงผลข้อมูล

:::

### ⚙️ TON Platform Tools :

<!-- * **DataStream IDE** :   -->
  ::: details 🧑🏻‍💻 DataStream Console
  ใช้สำหรับ`สร้าง Job` เพื่อจัดการกับข้อมูลที่เข้ามาในแพลตฟอร์มคล้ายกับ VS Code แต่จะเก็บ Job ไว้บน Server
  :::
<!-- * **Grafana** :  -->
  ::: details 📈 Grafana
  ใช้สำหรับแสดงผลข้อมูลที่ได้รับจากเซ็นเซอร์ หรือ ดึงข้อมูลจาก Influx db เข้ามา`แสดงกราฟหรือตาราง`
  :::
<!-- * **Own Clound** :  -->
  ::: details 💾 Own Clound
  ใช้สำหรับ`เก็บไฟล์`หรือข้อมูลต่างๆเหมือน Google drive
  :::
<!-- * **Apache Guacamole** :  -->
  ::: details 💻 Apache Guacamole
  ใช้สำหรับเข้าไป`ควบคุมและดูแล` Server TON platform รวมถึงสามารถดู `logs` ต่างๆที่เกิดขึ้นบน `Main DataStream` และ `Edge DataStream` 
  :::


<!-- <ActionButtons :buttons="[
  { theme: 'brand', text: 'DataStream', link: '/' },
  { theme: 'alt', text: 'Grafana', link: '/datastream_page/datastream' },
  { theme: 'alt', text: 'OwnClound', link: '/datastream_page/datastream' },
  { theme: 'alt', text: 'Apache Guacamole', link: '/datastream_page/datastream' }
]" /> -->

<bp :buttons="[
  { theme: 'brand', text: 'DataStream', link: '/quickstart/datastream' },
  { theme: 'alt', text: 'Grafana', link: '/quickstart/grafana' },
  { theme: 'alt', text: 'OwnClound', link: '/quickstart/ownClound' },
  { theme: 'alt', text: 'Apache Guacamole', link: '/quickstart/guacamole' },
]" />




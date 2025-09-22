## 📈 Quick Start with Grafana
เป็นเครื่องสำหรับพัฒนา Dashboard โดยนำข้อมูลจาก Influx DB , MQTT หรือ Sigfox นำมาแสดงเป็นกราฟหรือตารางในรูปต่างๆให้ดูง่ายขึ้น และมีเครื่องมือในการสร้าง Dashboard ที่สวยงามและง่ายตอนการปรับแต่ง ถ้าพร้อมแล้วเราไปเริ่มกันเลย !!!

**Step 1 : เปิด [Grafana](https://thors.thingsonnet.net/grafana/login)**

> [!IMPORTANT] 🔥 สำคัญ
> ให้ Admin ทำการเพิ่ม user สำหรับเข้าไปใช้งาน


เมื่อเปิด Grafana จะได้หน้าตาแบบด้านล่าง 👇
![grafana0](/grafana0.png)

**Step 2 : เมื่อเข้าสู่ระบบแล้วจะได้หน้าตาดังภาพ**
![grafana1](/grafana1.png)

**Step 3 : ลองสร้าง New Dashboard โดยสามารถทำได้ดังภาพ**
![grafana2](/grafana2.gif)

**Step 4 : แนะนำ Tools ยอดฮิต**
![grafana tools](https://grafana.com/static/assets/img/blog/7.0Icons_SocialCard_dark.jpg?w=900)

**🔥แค่นี้คุณเป็นเซียน Grafana แล้ว!!!**

<ActionButtons :buttons="[
  { theme: 'brand', text: 'Grafana Advance', link: '/datastream_page/datastream' },
  { theme: 'alt', text: 'Influx DB basic', link: '/' }
]" />

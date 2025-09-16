---
outline: deep
---

# 📥 Trigger type ?
ในบทความนี้เราจะมาเรียนรู้เกี่ยวกับชนิดของ Trigger และแต่ละชนิดมีความสามารถอะไรบ้าง

---

### **⏰ Cron**

เป็นการกำหนดการทำงานตามเวลา เช่น ทุกๆ 1 ชั่วโมงจะต้องทำการดึงข้อมูลจากเซ็นเซอร์

**ตัวอย่าง**

::: code-group

```json{3} [every hours.json ]
"trigger": {
    "type": "cron",
    "cmd": "* */1 * * *"
}
```



```json{3} [every 10 seconds.json]
"trigger": {
    "type": "cron",
    "cmd": "*/10 * * * * *"
}
```
:::

อ่านเพิ่มเติม [Cron](https://medium.com/@wachi_tony/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A-cron-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9A%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%81-dd47d6892e0f)

---

### **⛓️‍💥 HTTP Listener** กลับมาอธิบายให้เข้าใจ

เป็นการกำหนด HTTP ที่เราต้องการรับข้อมูลโดยรูปแบบ URL จะเป็นดังนี้

::: info รูปแบบ URL
    https://<domain>/io/<appkey>
:::

**ตัวอย่าง** 

Method : `GET` https://api.thingsonnet.net/io/lesson

```json
"trigger": {
    "type": "http",
    "appkey": "lesson",
    "method": "get"
}
```

Method : `POST` https://api.thingsonnet.net/io/lesson
```json
"trigger": {
    "type": "http",
    "appkey": "lesson",
    "method": "post"
}
```
---
### **💾 Storage Event**

เป็นการกำหนดการเริ่มทำงานเมื่อมีข้อมูลถูกบันทึกลงในฐานข้อมูลที่กำหนด

```json
"trigger": {
    "type": "storage",              //ประเภทของ trigger
    "storage_name": "raindata",     //ชื่อฐานข้อมูล
    "event": "newdata"              //
}
```
---
### **📡 MQTT**

```json
"trigger": {
    "type": "mqtt",
    "topic": "/topic/to/sub" 
}
```
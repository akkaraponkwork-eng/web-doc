---
outline : deep
---
# 🔁 Data model
ในบทความนี้จะมาอธิบายการไหลของข้อมูล หลังจากที่เราได้ทำความรู้จักกับ job structure เบื้องต้นไปแล้ว
![datamodel](/datamodel.png)


### 📥 data_in 
    
คือการรับข้อมูลในรูปแบบ Json เข้ามาโดยมี key สำคัญคือ `src.meta` และ `src.data` เช่น

```json
{
  "src": {
    "meta": {
      "_tid": "12345",
      "field1": "hello world"
    },
    "data": {
      "payload": "ABCDEFG"
    }
  }
}
```

### 🔁 data_transform
คือการนำข้อมูลที่ได้จาก data_in นำมาแปลงข้อมูลสามารถทำได้ ดังนี้
```js
let dat = src.data; // เก็บข้อมูลจาก data_in ลงในตัวแปร dat
let decode = {};    // สร้างตัวแปรเก็บค่าที่ทำการแปลงแบบ object
/* 
    เมื่อแปลงเสร็จแล้ว
*/
data = dat;         // เก็บค่าที่ได้จาก data_in ลงใน data เพื่อส่งไปยัง job อื่น
data.decode = decode; // เก็บค่าที่ทำการแปลงลงใน data ที่มี key คือ decode
```

### 🚀 data_out
คือจุดที่จะทำการส่งออกข้อมูลไปยัง job ต่างๆหรือเก็บลงฐานข้อมูลนั่นเอง เมื่อได้รับข้อมูลจาก data_transform จะได้หน้าตาแบบนี้

```json
{
  "meta": {
    "_tid": "12345",
    "field1": "hello world"
  },
  "data": {
    "payload": "ABCDEFG",
    "decode": {
      "temp": 25,
      "humid": 66
    }
  }
}
```
ถ้าไป job อื่นก็กลับไปดู [data_in](#📥-data-in) แล้วไล่ลงมานะ 🤣🤣เพราะมันทำเหมือนกันเป๊ะๆ

### 😺 แถมให้ละกัน
![more job](/more.png)

การส่งข้อมูลไป job อื่นๆ ดังรูปด้านบนเราสังเกตว่า job main จะเป็น job ที่รับข้อมูลจาก Sensor และส่งออกข้อมูลไปยัง Job Storage list และ Job influx ถ้าสมมติมีการส่งข้อมูลเป็นดังตัวอย่างด้านบน เราสามารถเขียน data_out ออกมาได้แบบนี้เลย

::: code-group
```json [job_main.json]
"data_out": {
    "type": "call",           //ใช้เป็น call เพื่อเรียกใช้งาน job อื่น
    "param": {
      "to": [                 // list ของ job ที่ถูกเรียกมา
        "Job storage list", 
        "Job influx",
      ]
    }
  }
```
:::

แค่นี้ข้อมูลที่เราแปลงก็จะถูกส่งไปยัง job อื่นๆที่กำหนดแล้ววววววว 🔥
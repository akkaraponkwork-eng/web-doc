---
outline: deep
---
# 📄 Job structure?

### ⚙️ Job modules
ก่อนที่เราจะไปดู Job structure เรามาทำความรู้จัก Job modules กันสักติ๊ดดดนึง 
(ที่เข้มๆไม่ต้องสงสัยใช้บ่อยนั่นเอง🤣🤣)
![job modules](/job_modules.png)

---
### 📄 Job structure
Job ใน TON Platform จะเขียนอยู่ในรูปแบบ [Json file](https://kongruksiam.medium.com/%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-json-9d9075e82be4) ดังตัวอย่างต่อไปนี้

```json
{
    "job_id": "jobname",
    "active": "true",
    "trigger": {
        "type": "cron",
        "cmd": "* */1 * * *"
    },
    "data_in": {
        "type": "input"
    },
    "data_transform": {
        "type": "transform",
         "param": {
             "script": [
                       "meta={}",
                       "data={'field':'src.datatype','value':src.value}"
                ]
         }
    },
    "data_out": {
        "type": "storage",
        "param": {
            "storage_name": "test.storage"
        }
    }
}
```



### **📁 Job main attribute**

โดยทุก Job ที่สร้างขึ้นจำเป็นต้องมี id (ชื่อ) และสถานะ โดย **ชื่อจะต้องไม่ซ้ำกัน!!** ด้วยนะ
* job_id : ชื่อ job ที่สร้าง
* active : สถานะการทำงาน `true = ทำงาน` , `false = ไม่ทำงาน`
  
**ตัวอย่าง**
```json
"job_id": "myjob1", // ชื่อ job "myjob1"
"active": "true"    // สถานะกำลังทำงาน
```
### **📥 Trigger**

เป็นตัวกำหนดให้ Job เริ่มทำงานเมื่อมีคำสั่งหรือสัญญาณเข้ามา ซึ่งใน TON Platform 
มี Trigger อยู่หลายประเภท อาทิเช่น HTTP, MQTT, Cron เป็นต้น

**ตัวอย่าง** การกำหนดให้ job ทำงานทุกๆ 1 ชั่วโมง
```json
"trigger": {
    "type": "cron",        //ชนิดของ Triger ที่ใช้ในการเริ่มสั่งทำงานของ Job
    "cmd": "* */1 * * *"   //เป็นการกำหนดให้ทำงานทุกๆ 1 ชม. 
}
```
อ่านเพิ่มเติม [Cron](https://medium.com/@wachi_tony/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A-cron-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9A%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%81-dd47d6892e0f)

### **📝 Data In, Data Transform and Data Out**

เป็นการรับข้อมูลจาก Triger นำข้อมูลที่ได้นำมาแปลงข้อมูลและส่งออกข้อมูล โดยกระบวนการทั้งหมดนี้จะทำงานกันเป็นลำดับและ **จะต้องมีทุก Job** 

**ตัวอย่าง**
```json
//รับข้อมูลเข้า
"data_in": {
    "type": "input"
},

//นำข้อมูลที่ได้จาก data_in นำมาแปลงข้อมูล
"data_transform": {
    "type": "transform",
    "param": {
        "script":[
                  "meta={}",
                  "data={'field':'src.datatype','value':src.value}"
            ]
    }
},

//นำข้อมูลที่ได้จาก data_transform เก็บลงใน storage ชื่อ test.storage
"data_out": {
    "type": "storage",
        "param": {
            "storage_name": "test.storage"
    }
}
```
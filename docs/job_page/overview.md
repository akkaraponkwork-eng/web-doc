---
outline: deep
---
### 🌍 What is job ?
**Job** ก็เปรียบเสมือน `พิมพ์เขียว` หรือ `ชุดคำสั่ง` ที่เราเขียนขึ้นเพื่อบอกโรงงานว่าต้องทำอะไรบ้าง โดย **1 Job จะมีวงจรการทำงาน 4 ขั้นตอนที่ตายตัวเสมอ** ดังภาพด้านล่าง👇
![job overview](/job_overview.png)

`Trigger` : เปรียบเสมือนพนักงานเสริฟที่จะรอฟังแล้วจะทำงานเมื่อมีคำสั่งเข้ามาอย่างถูกต้อง
- Event listener
- Service listener
- Scheduler 

`Data_in` : จะรอรับข้อมูลที่เข้ามา หรือ อ่านข้อมูลจากแหล่งที่มา เช่น httpdata
- Receive input data
- Read data from source

`Data_transform` : จะใช้ในการแปลงข้อมูล , ประมวลผล รวมถึงการกรองข้อมูลที่เข้ามาจาก Data-in
- Mapping && transform
- Processing
- Filter
  
`Data_out` : จะทำการส่งข้อมูลที่ได้จาก Data-Transform  ไปทำการเก็บลงฐานข้อมูล 
หรือส่งต่อไปดำเนินการยัง job อื่นๆต่อ
- Store
- Sent
- Execute

:::tip สรุป🔥	
เมื่อมีการส่งข้อมูลเข้ามายัง TON Platform จะเข้ามายัง Job โดยจะมีกระบวนการ 4 ส่วน คือ 

Trigger , Data_in , Data_transform และ Data_out แค่นี้เอง !!!
:::



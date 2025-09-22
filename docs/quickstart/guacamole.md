## 💻 Quick Start with Apache Guacamole
เป็นเครื่องมือสำหรับ Remote ไปที่ Server TON01-Web และ TON02-DB ใช้สำหรับ config และตรวจสถานะการทำงานของ Server , DataStream Server , สถานะแต่ละ Job รวมไปถึง Performance ของ Server ถ้าคุณพร้อมแล้วเราไปเริ่มกันเล๊ยยยย!!

**Step 1 : เปิด [Apache guacamole](https://thors.thingsonnet.net/guac/#/)**

ใช้ Username และ Password ด้านล่างเพื่อเข้าสู่ระบบ
<cp 
  username="admin@example.com" 
  password="Super_S3cr3t-P@ssw0rd!" 
/>

![login](/apache1.png)

**Step 2 : เมื่อเข้าสู่ระบบจะได้ผลลัพธ์ดังภาพ**
![dashboard](/apache2.png)

จะเห็นว่ามี Server อยู่ 2 เครื่อง
* TON01-Web   
* TON02-DB 

ซึ่งจะใช้ linux server เป็น OS ในการทำงาน

**Step 3 :  ทดสอบเช็ค Container ใน TON02-DB สามารถทำตามด้านล่างได้เลย**
	
คำสั่งสำหรับตรวจสอบ Container 
    
```sh
$ docker ps
```
	
![apache console](/apache3.gif)

**Step 4 :  ตรวจสอบการทำงานของ Job ทั้งหมดบน DataStream Server**

คำสั่ง
```sh
$ docker exec -it bs_bigstream pm2 logs
```
![apache console](/apache4.gif)

**Step 5 : ตรวจสอบการทำงานเฉพาะ Job บน DataStream Server**

คำสั่ง
```sh
$ docker exec -it bs_bigstream pm2 logs | grep id=< ชื่อ project >
```
![apache console](/apache5.gif)

**Step 6 : ตรวจสอบสถานะการทำงานของ DataStream**

คำสั่ง
```sh
$ docker exec -it bs_bigstream pm2 monit
```
![apache console](/apache6.gif)

**#แค่นี้คุณก็เป็นเทพแห่งการ logs แล้ว🐦‍🔥🔥**

---

outline : deep

---

# 💬 Line Messaging API 101

<!-- ในปัจจุบันการสื่อสารมีความสำคัญเป็นอย่างมากในฝั่งของ IoT ก็มีความสำคัญมากเช่นกันถ้าเกิดมีอุปกรณืที่เสียหายหรืออุุณหภูมิสูงเกินมาตรฐานการแจ้งเตือนจะสามารถทำให้เรารับรู้และรีบแก้ไขปัญหาได้อย่างรวดเร็ว -->

### เริ่มใช้งาน [Line Developer](https://account.line.biz/login?redirectUri=https%3A%2F%2Fdevelopers.line.biz%2Fconsole%2F)

- Login Line account
- สร้าง Provider คลิก Console home (1.1) Create Provider (1.2)

![create provider](/create_provider.png)

- กรอกชื่อโครงการหรือชื่อ Provider ที่ต้องการ และคลิก Create (1.3)
- (Provider คือ ชื่อกลุ่มที่เอาไว้ใส่ Channel หรือบริการที่ต้องการสร้างเช่น Messaging API)

![create new provider](/createnew_provider.png)

### สร้าง Chanel สำหรับ LINE Messaging API 
- เลือก Provider ที่สร้าง (2.1) คลิก Create a new channel (2.2)

![select provider](/select_provider.png)

- เลือก Massaging API (2.3)

![select messagingAPI](/select_messagingapi.png)

- สร้าง Line Official Account (2.4) (1 Channel จำเป็นต้องมีLine Official Account 1 บัญชีเพราะไม่สามารถ
สร้าง LINE Messaging API โดยตรงจาก Line Developer ได้)
- การสร้าง Line Official Account แต่ละครั้งสามารถใช้ Email ซ้ำกันได้ ในกรณีที่ Channel นั้นๆอยู่ในความรับผิดชอบใน Email เดียวกัน 

![create chanel](/create_chanel.png)

![create chanel2](/create_chanel2.png)

- ตรวจสอบข้อมูลและคลิกเสร็จสิ้น (2.5)

![check chanel](/check_chanel.png)

- เสร็จสิ้นการสร้าง LINE ออฟฟิเชียลแอคเคาท์ไปที่ Line Official Account Manager (2.6)

![official manager](/official_manager.png)

### Line Official Account Manager
- คลิก Settings(3.1) เลือก Massaging API (3.2)

![setting oa](/setting_oa.png)

- คลิก Enable Messaging API (3.3) เลือก Provider ที่สร้างไว้ (3.4) และคลิก Agree (3.5)

![enable messaging API](/enable_messageapi.png)

![enable messaging API](/enable_messageapi2.png)

- ตรวจสอบ Account name และ Provider name เรียบร้อยคลิก ok (3.6)

![check provider](/check_provider.png)

- เมื่อสร้างเสร็จแล้วจะได้ ข้อมูล Status , Channel ID , Channel secret

![messageapi detail](/messageapi_detail.png)

- กลับไปที่ Line Developer ตรวจสอบ Channel ใน Provider ที่สร้างไว้จะปรากฏ Channel ใหม่ ที่ได้สร้างบน Line Official Account Manager (3.7)

![chanel](/chanel.png)

- ตรวจสอบ Channel ID ละหว่าง Line Developer และ Line Official Account Manager คลิก ที่ Channel
(3.7) เมื่อสร้างเสร็จแล้วจะมีข้อความส่งมาจาก Line Official Account (3.8) (ต้องเป็นเพื่อนกับ Line OA ที่สร้างไว้ก่อนหน้านี้ถึงจะได้รับข้อความสามารถเพิ่มเพื่อนได้ด้วยการแสกน QR Code) 

![check chanelid](/check_chanelid.png)

### Messaging API กับ Webhook
การสร้าง Messaging API จำเป็นต้องรู้ User ID หรือ Group ID เพื่อส่งข้อความหา User หรือ Group นั้นๆ ซึ่งสามารถใช้ Webhook มาเป็นตัวช่วยในการดู User ID และ Group ID สามารถสร้างได้โดยใช้ Node-Red หรือวิธีอื่นๆ

- Login เข้า [Node-Red](https://thors.thingsonnet.net/nodered/) 
<cp 
  username="tonadm" 
  password="Super_S3cr3t-P@ssw0rd!" 
/>

- เลือก http in ตั้งค่า Method เป็น POST URL เป็น lineapi หรืออะไรก็ได้ที่เป็นชื่อของสิ่งที่ต้องการ Test Name
เป็น TestAPI
จะได้รูปแบบ URL : https://api.thingsonnet.net/node-io/lineapi

![nodered1](/nodered1.png)

- เลือก Function (4.1)มาต่อกับ http in (4.2) ที่สร้างไว้ และกำหนด Function (4.3)เสร็จแล้วต่อกับ debug 

![nodered2](/nodered2.png)

**function 3**

```js 
var event = msg.payload.events[0];
var payload = {};
if (event.source.type === "group") {
    payload = {
        groupId: event.source.groupId, // Group ID ที่ User คนนั้นอยู่
        userId: event.source.userId, // User ID ของคนที่ส่งข้อความในกลุ่ม
        message: event.message.text
    };
} else if (event.source.type === "user") {
    payload = {
        userId: event.source.userId,
        message: event.message.text
    };
}

msg.payload = payload;
return msg;
```

![nodered3](/nodered3.png)

**function 2**

```json
msg.payload="OK";
msg.statusCode=200;
return msg;
```

![nodered4](/nodered4.png)

- เมื่อได้URL : https://api.thingsonnet.net/node-io/lineapi ให้นำ URL นี้ไปใส่ที่ Webhook (4.6) เพื่อทดสอบให้
เป็นขารับ ของ Line เพื่อดู User ID และ Group ID (4.11)
- คลิกที่ Channel และคลิกที่ Messaging API(4.5)ไปที่ Webhook setting คลิก Edit(4.7)และนำ URL มาใส่ คลิก
Update(4.8) และ Use webhook(4.9)

![webhook](/webhook.png)

- คลิก Verify แล้วจะมีข้อมูลส่งเข้าไปที่ Node-Red (4.10)
- ทดสอบการส่งข้อความเข้าไปในกลุ่มที่มี Bot อยู่ หรือส่งข้อความให้ Bot โดยตรงเพื่อดู User ID และ Group ID
นอกจากนี้ยังสามารถเห็นข้อความที่ User นั้นๆส่งมาได้เช่นกัน

![webhook2](/webhook2.png)

![nodered5](/nodered5.png)

### Job with Line messaging API
- Job ที่ เป็นขาออกนั้นจำเป็นต้องรู้ว่าข้อความหรือแจ้งเตือนนั้นต้องการส่งไปที่กลุ่มไหนจึงจำเป็นต้องนำ User ID หรือ
Group ID และ Channel access token(5.1) มาใส่ใน Job ขาออกที่จะส่งเข้า Lineในส่วนของ User ID และ Group
ID จะนำไปใส่ใน Job แปลงค่าหรือ Job ที่เป็น http หรือ Sigfox (5.2)

![job1](/job1.png)

**ตัวอย่างจาก pcs.sos.linemsg.push**

```json {15,23,31-34}
{
  "job_id": "pcs.sos.linemsg.push",
  "active": "true",
  "data_in": {
    "type": "input",
    "param": {}
  },
  "data_transform": [
    {
      "type": "transform",
      "param": {
        "script": [
          "let dat=src.data"
        ],
        "text": " ปุ่มฉุกเฉินถูกกด 1 ครั้ง\nเวลา: [${data.msg.timestamp}]\nCall point : [${data.msg.location}]"
      }
    },
    {
      "type": "transform",
      "param": {
        "script": [
          "let dat=src.data",
          "data={'to':meta.to,'messages':[ {'type':'text','text':dat} ]}"
        ]
      }
    }
  ],
  "data_out": {
    "type": "http",
    "param": {
      "url": "https://api.line.me/v2/bot/message/push",
      "method": "post",
      "headers": {
        "Authorization": "Bearer LTKFT5cjrvs0SNsCc046RN2G9YTq9QBecgcAuUKF9OTt2BE0fM3F4dclzbnhpbmgQ4xk5p9CzfgjdarntytpbIxuIrfCBBrkOYHT4ThR6t5h/PgpmbOwogzVmjhC96WFoYUMkx0tZQGLE+te8gM5agdB04t89/1O/w1cDnyilFU="
      }
    }
  },
  "_vo": "$"
}
```

- เมื่อใส่ to แล้วว่าต้องการส่งการแจ้งเตือนไปที่กลุ่ม(Group ID)ไหน Job จะ call กันมาที่ขาออกในรูปแบบ mata.to
(5.3)

![job2](/job2.png)

**ตัวอย่างจาก ton.sos.main-http**

```json {39}
{
  "job_id": "ton.sos.main-http",
  "active": "true",
  "trigger": {
    "type": "http",
    "appkey": "sigfox-simplepack",
    "method": "post"
  },
  "data_in": {
    "type": "input",
    "param": {
      "object": "httpdata"
    }
  },
  "data_transform": [
    {
      "type": "filter-condition",
      "param": {
        "condition": "String(data.data)!='0130'"
      }
    },
    {
      "type": "transform",
      "param": {
        "script": [
          "let dat=src.data",
          "let timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }).replace(' ', 'Time').substring(0, 20)",
          "let location=''",
          "if(dat.deviceId=='1F0EDDE'){ location='เสา D9' }",
          "if(dat.deviceId=='1F0ED73'){ location='เสา C6' }",
          "if(dat.deviceId=='1F0ED51'){ location='บันไดตรงข้ามกรมศุล'}",
          "if(dat.deviceId=='1F0ED88'){ location='บันไดทางขึ้นกลางลานจอดรถ ชั้น2'}",
          "if(dat.deviceId=='1F0ED52'){ location='บันไดหนีไฟ' }",
          "if(dat.deviceId=='1F0ED5B'){ location='บันไดหนีไฟทางขึ้นรถ'}",
          "if(dat.deviceId=='1F0ED65'){ location='บันไดหนีไฟทางลงรถ'}",
          "if(dat.deviceId=='1F0ED86'){ location='เสา 9D' }",
          "if(dat.deviceId=='1F0ED28'){ location='ลานจอดรถ' }",
          "data=dat",
          "meta.to='C3d7e18f9cd36a81fc7fb93c48fb8d826'", //group id // [!code focus]
          "let msg={}",
          "msg.location=location",
          "msg.timestamp=timestamp",
          "data.msg=msg",
          "data.decode=msg",
          "meta.storage_name='ton.sos.data'",
          "meta.group_name='simplepack'",
          "data.device= dat.deviceId"
        ]
      }
    }
  ],
  "data_out": {
    "type": "call",
    "param": {
      "to": [
        "pcs.sos.storage.device",
        "pcs.sos.storage.all",
        "pcs.sos.influx",
        "pcs.sos.linemsg.push"
      ]
    }
  },
  "_vo": "$"
}
```

**ทดสอบการยิ่ง API Message ไปที่ Line Messaging API โดยใช้ Postman เพื่อทดสอบว่า Job สารมารถใช้ได้จริง**
- เข้าไปนำข้อมูลการเซ็ต API ของ Device ใน Sigfox callback อาทิเช่น body JSON(6.1) , URL(6.2) และชนิดของ
Method(6.3) เพื่อนำมาเซ็ตข้อมูลใน Postman เพื่อทดสอบการยิงข้อมูล 

![sigfox](/sigfox1.png)

- เซ็ตข้อมูล Postman ตาม Sigfox Callback ในแต่ละ Device นั้นๆ
- เมื่อเซ็ตแล้วสารมารถนำ device , Data ที่ต้องการทดสอบกรอกเข้ากับใน body ได้เลย

![postman](/sigfox2.png)

- เซ็ตค่า Auth เป็น Bearer Token โดยนำ Token มาจาก DataStream(6.2) และ นำไปใส่ที่ Token บน
Postman(6.2)

![datastream](/sigfox3.png)

![datastream](/sigfox4.png)

- เมื่อเซ็ตเสร็จเรียบร้อย กด Sent (6.4) ถ้าข้อมูลใช้ได้เมื่อกด Sent แล้วจะขึ้น 200 ok (6.5)
- จะมีแจ้งเตือนเข้าที่ Line ในกลุ่มที่ทดสอบ

![datastream](/sigfox5.png)

![datastream](/sigfox6.png)

### 📑 ศึกษาเพิ่มเติม

https://medium.com/linedevth/line-notify-migration-tips-0432e5f7af6e
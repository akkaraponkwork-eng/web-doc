## 🧑🏻‍💻 Quick Start with DataStream Console
สามารถทำตามขั้นตอนด้านล่างไปพร้อมๆกันได้เลย👇

**Step 1 : ติดตั้ง [DataStream](http://iot.thingsonnet.net/s/hQ6L2YB02cbJnWh) บนคอมพิวเตอร์หรือโน๊ตบุ๊ค**
![install datastream](/installdatastream.gif)
<!-- <img src="/n8n.png" alt="คำอธิบาย" width="300" class="my-image" /> -->

**Step 2 : ตั้งค่า DataStream console เพื่อเชื่อมต่อกับ DataStream บน Server**

::: details  **⚙️ Big DataStream Config** : สำหรับ Main DataStream
<cc 
  title="Setting"
  :fields="[
    { label: 'Profile name', value: 'thors', suggestion: '(แนะนำ)' },
    { label: 'Control API', value: 'http://192.168.1.100:8080/control' },
    { label: 'Storage API', value: 'http://192.168.1.100:9000/storage' },
    { label: 'Token', value: 'A1B2-C3D4-E5F6-G7H8-I9J0', secret: true },
    { label: 'API Version', value: 'v1.2+' }
  ]" 
/>
:::

::: details **⚙️ Big DataStream edge Config** : สำหรับ MQTT
<cc 
  title="Setting"
  :fields="[
    { label: 'Profile name', value: 'thors-edge', suggestion: '(แนะนำ)' },
    { label: 'Control API', value: 'http://192.168.1.100:8080/control' },
    { label: 'Storage API', value: 'http://192.168.1.100:9000/storage' },
    { label: 'Token', value: 'A1B2-C3D4-E5F6-G7H8-I9J0', secret: true },
    { label: 'API Version', value: 'v1.2+' }
  ]" 
/>
:::
สามารถ Copy config ทำตามด้านล่างได้เลย 👇👇

**Step 3 : เมื่อตั้งค่า DataStream console เสร็จแล้วจะสามารถเข้าดู Job ที่ทำงานรวมถึงสามารถดูข้อมูลใน Storage list ได้ดังภาพ**
	

**Step 4 : ทดสอบสร้าง Job บน DataStream console ทำตามได้ดังนี้**  

📄 job main 
```json 
{
  "job_id": "test-pea.weather-station.main-http",
  "active": true,
  "trigger": {
    "type": "http",
    "appkey": "test-pea-ws",
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
      "type": "transform",
      "param": {
        "script": [
          "meta.group_name = 'weather-station'",
          "let decode = {}",
          "let dat = src.data.data || src.data",
          "data = {}",
          "data.frame_header = dat.substr(0,4)",
          "data.fixed_01 = dat.substr(4,2)",
          "data.device_id = dat.substr(6,12)",
          "data.session_control = dat.substr(18,8)",
          "data.fixed_commands = dat.substr(26,2)",
          "data.content_length = parseInt(dat.substr(28,4), 16)",
          "decode.temp = parseInt(dat.substr(32,8), 16)/10",
          "decode.humid = parseInt(dat.substr(40,8), 16)/10",
          "decode.atmos = parseInt(dat.substr(48,8), 16)/100",
          "decode.lum = parseInt(dat.substr(56,8), 16)",
          "decode.pm25 = parseInt(dat.substr(64,8), 16)",
          "decode.pm10 = parseInt(dat.substr(72,8), 16)",
          "decode.ws = parseInt(dat.substr(80,8), 16)",
          "decode.wdir = parseInt(dat.substr(88,8), 16)",
          "decode.rainfall = parseInt(dat.substr(96,8), 16)",
          "decode.rad = parseInt(dat.substr(104,8), 16)",
          "decode.ur = parseInt(dat.substr(112,8), 16)",
          "data.signal_strength = parseInt(dat.substr(120,8), 16)",
          "data.error_code = parseInt(dat.substr(128,8), 16)",
          "data.version = parseInt(dat.substr(136,8), 16)",
          "data.data = dat",
          "data.decode = decode"
        ]
      }
    }
  ],
  "data_out": {
    "type": "call",
    "param": {
      "to": [
        "test-pea.weather-station.storage.all",
        "test-pea.weather-station.influx",
        "dataStream.debug"
      ]
    }
  },
  "_vo": "$"
}
```

📄 job storage-list
```json
{
  "job_id": "test-pea.weather-station.storage.all",
  "active": true,
  "data_in": {
    "type": "input",
    "param": {}
  },
  "data_transform": [
    {
      "type": "transform",
      "param": {
        "script": [
          "dat=src.data",
          "delete meta.from",
          "delete meta.jobid",
          "delete meta.grpmap"
        ]
      }
    },
    {
      "type": "filter-condition",
      "param": {
        "condition": "!meta.group_name"
      }
    }
  ],
  "data_out": {
    "type": "storage",
    "param": {
      "storage_name": "pea.${meta.group_name}.data"
    }
  },
  "_vo": "$"
}
```
 
**Step 5 : หลังจากทำการ Save code บน DataStream console ให้ทำการเปิดโปรแกรม Postmanแล้วทำตามขั้นตอนดังนี้**

```cURL
curl --location 'https://api.thingsonnet.net/io/test-pea-ws' \
--header 'Content-Type: application/json' \
--data '{
    "data":"FEDC01142A5B110F9F0000002C030038000001290000025C000188B00002FFFD000000300000004400000000000000000000000000000000000000000000001B000000000000007500",
    "timestamp"	:	1739757954
}'
```

**Step 6 : ทำการเปิด DataStream console และไปที่ Storage list พิมพ์ในช่องค้นหา `lesson` ทำตามขั้นตอนแล้วสังเกตผลลัพธ์**

<ActionButtons :buttons="[
  { theme: 'brand', text: 'Json job config', link: '/datastream_page/datastream' },
  { theme: 'alt', text: 'DataStream with MQTT', link: '/' },
  { theme: 'alt', text: 'DataStream with Sigfox', link: '/datastream_page/datastream' }
]" />
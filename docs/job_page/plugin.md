---
outline: deep
---
# ⚙️ Plugin list
---
### 📥 Data_in

####  **http-request**
::: details คำอธิบาย
| Parameter  |Type|Required |Description|Value|  
| ------------- | -- |------------- |-----------|-----|
| url  |String | yes | URL | text or javascript expression|
| encoding  |String | yes | setup encoding | text |
| auth  |Object | no | Support Basic mode (require auth.username, auth.password) | text or javascript expression|
| headers  |Object | no | Support http header syntax | text or javascript expression|
:::

**ตัวอย่าง**
::: code-group

```json{5} [Get-json-format.json]
"data_in": {
    "type": "http-request",
    "param": {
      "url": "http://example.net",
      "encoding": "json"
    }
}
```

```json{5} [Get-text-format.json]
"data_in": {
    "type": "http-request",
    "param": {
      "url": "http://example.net",
      "encoding": "text"
    }
}
```

```json{4} [Get-text-advance-format.json]
"data_in": {
    "type": "http-request",
    "param": {
      "url": "http://example.net?query=${data.key}", //เพิ่ม param
      "encoding": "text"
    }
}
```
:::

#### **input**

::: details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| object  |String|httpdata  |  
:::
**ตัวอย่าง**
```json
"data_in": {
    "type": "input",
    "param": {
        "object":"httpdata"
    }
}
```

#### **sftp-filesync**
::: details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| host  |String|SFTP Server  |
| port  |String|Port  |
| username  |String| SFTP Username|
| password  |String| SFTP Password|
| dir  |String| Remote directory path|
| encoding  |String| binary for file download|
|last_modify_ts|String| Unixtimestamp
|filter|object | { ext:""}
:::

**ตัวอย่าง**
```json
"data_in": {
    "type": "sftp-filesync",
    "param": {
        "host": "sftp.example.com",
        "username": "guest",
        "password": "123456",
        "dir": "/home/data",
        "last_modify_ts": "1515519771",
        "filter": {
            "ext": ".csv"
        }
    }
}
```

---
### 🔁 Data_transform
* **filter-condition**
::: details คำอธิบาย
| Parameter  |Type|Required |Description|Value|  
| ------------- | -- |------------- |-----------|-----|
| condition  |String | yes | logic expression | javascript expression|
:::

**ตัวอย่าง**
```json
"data_transform": {
    "type": "filter-condition",
    "param" : {
        "condition":"data.temperature < 30"
    }
}
```

#### **filter-duplicate**
::: details คำอธิบาย
| Parameter  |Type|Required |Description|Value|  
| ------------- | -- |------------- |-----------|-----|
| name  |String | yes | define name of key in  `key : value`   | text or javascript expression|
| key  |String | no | define value to compare| text or javascript expression. Default is "data"|
:::

**ตัวอย่าง**
```json
"data_transform": {
    "type": "filter-duplicate",
    "param" : {
        "name":"temp",
        "key":"${data.temperature}"
    }
}
```
#### **keybuffer**

:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| name  | String | Javascript |
| key  | String | Javascript |
| flush_if  | String | Javascript expression |
:::

**ตัวอย่าง**
```json
"data_transform": {
    "type": "keybuffer",
    "param" : {
        "name":"${data.temperature}",
        "key":"${data.station_id}"
    }
}
```

#### **map**

:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| script  | Array of String | Java script |
:::

**ตัวอย่าง**

```json
"data_transform": {
    "type": "map",
    "param" : {
        "script": [
            "let newdata",
            "let max_temp = 80",
            "newdata.temp_percent = src.data.temp*100/max_temp",
            "newdata.light_percent = (1-src.data.light)*100",
            "data = newdata"
        ]
    }
}
```
#### **noop**

:::details คำอธิบาย
ไม่ทำอะไรเลย
:::

**ตัวอย่าง**

```json
"data_transform": {
    "type": "noop"
}
```

#### **transform**

:::details คำอธิบาย
| Parameter  |Type|Required |Description|Value|  
| ------------- | -- |------------- |-----------|-----|
| script  |String or Array of String | yes | text or javascript | text or javascript expression|
| ba64script  | String | no | javascript code in base64 encoded format  | base64encode String |
:::

**ตัวอย่าง**

::: code-group

```json [1.json]
"data_transform": {
    "type": "transform",
    "param" : {
        "script" : [
            "let newdata = {}",
            "newdata.value = src.data.obs.rawvalue/1000",
            "newdata.type = src.data.obs.type",
            "data = newdata"
        ]
    }
}
```

```json [2.json]
"data_transform": {
    "type": "transform",
    "param" : {
        "script" : [
            "let date=src.data.Observe.Time.substring(0,src.data.Observe.Time.indexOf(' ')).split('/')",
            "let time=src.data.Observe.Time.substring(src.data.Observe.Time.indexOf(' ')+1).split(':')",
            "if(date[1].length<2) date[1]='0'+date[1] ",
            "src.data.Observe.Time = date[2]+'-'+date[1]+'-'+date[0]+' '+time[0]+':'+time[1]+':'+time[2]",
            "data = src.data"
        ]
    }
}
```

```json [js-base64.json]
"data_transform": {
    "type": "transform",
    "param" : {
        "ba64script" : "ZGF0YSA9IHNyYy5kYXRhLnJlZHVjZSgoZmluYWwsIGN1cnJlbnQpID0+IHsKICAgIHZhciBuZXdLZXkgPSBjdXJyZW50LnN0YXRpb24uc3RhdGlvbl9pZDsKICAgIGlmICghZmluYWxbbmV3S2V5XSkgZmluYWxbbmV3S2V5XSA9IHt9OwogICAgZmluYWxbbmV3S2V5XT17CiAgICAgICAgc3RhdGlvbjogY3VycmVudC5zdGF0aW9uLAogICAgICAgIHZhbHVlOiBjdXJyZW50LnZhbHVlLAogICAgICAgIHN0YWdlOihjdXJyZW50LnZhbHVlPj01MCk/KGN1cnJlbnQudmFsdWU+PTgwKT8oY3VycmVudC52YWx1ZT4xMDApPzM6MjoxOjAKICAgIH07CiAgICByZXR1cm4gZmluYWw7Cn0sIHt9KQ=="
    }
}
```

:::

---

### 🚀 Data_out

* **bssfile**
:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| filename  |String| filename  |
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "bssfile",
    "param": {
        "filename": "data"
    }
}
```

#### **mqtt**

:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| url | String | URL |
| topic | String | Topic name |
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "mqtt",
    "param": {
      "url": "mqtt://<broker>",
      "topic": "${meta.topic}"
    }
  }
```
* **call**
:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| to  |Array of String| job name in bigstream  |
:::

**ตัวอย่าง**

```json
"data_out": {
    "type": "call",
    "param": {
        "to": [
            "next.job"
        ]
    }
}
```

#### **console**

:::details คำอธิบาย
แสดง log ข้อมูลบน console log
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "console"
}
```

#### **dir**

:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| path  |String| directory path  |
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "dir",
    "param" : {
        "path":"/var/data/"
    }
}
```

#### **netpie**
:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| appid  |String| Appname that use on Netpie  |
| appkey  |String or | appkey   |
| secret  |String| secretkey for netpie service |
| topic  |String| topic name  |
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "netpie",
    "param": {
        "appid": "BigStream",
        "appkey": "<appkey>",
        "secret": "<secretkey>",
        "topic": "/bs/test"
    }
}
```

#### **pgsql**
:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| host  |String|   | Postgresql Server URL|
| port  |String or | Postgresql Port |
| database  |String| Database name |
| username  |String| Username |
| password  |String| Password  |
| sql  |String| SQL Query |
:::

**ตัวอย่าง**
```json
"data_out": {
    "type": "pgsql",
    "param": {
        "host": "127.0.0.1",
        "database": "testdb",
        "username": "psql",
        "password": "password",
        "sql": "insert into test(id,name) values(${data.id},${data.name})"
    }
}
```

#### **storage**
:::details คำอธิบาย
| Parameter  |Type|value |
| ------------- | -- |------------- |
| storage  |String| storage name (can use java script expression)   |
:::

**ตัวอย่าง**

::: code-group 

```json [basic store.json]
"data_out": {
    "type": "storage",
    "param" : {
        "storage_name" : "test.pub"
    }
}
```

```json [use with script.json]
"data_out": {
    "type": "storage",
    "param" : {
        "storage_name" : "test.${data.id}.pub"
    }
}
:::
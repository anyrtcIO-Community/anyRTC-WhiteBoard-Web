# anyRTC-WhiteBoard-Web

> 白板

## get develpoer information and app information

### 获取开发者信息
前往[anyRTC 云平台](https://www.anyrtc.io)获取开发者信息，并创建一个app应用。

``` bash
# App.vue
const DEV_ID = "";//开发者ID
const APP_ID = "";//app应用ID
const APP_KEY = "";//app应用KEY
const APP_TOKEN = "";//app应用TOKEN
```

### 设置自定义数据

``` bash
# App.vue
export default {
  data () {
    return {
      pen: null,
      anyrtcId: '',//房间号，均为系统唯一，业务系统分配
      fileId: '',//文件ID，均为系统唯一，业务系统分配
      userId: '',//用户ID，均为系统唯一，业务系统分配
      nBgIndex: 1,
      nBgTotal: 1,
      backgroundList: [
        {
          board_background: 'https://www.teameeting.cn/static/images/team_section.jpg',
          board_number: 1
        }
      ]
    }
  }
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

想要了解更多请点击 [anyRTC 云平台](https://www.anyrtc.io) 或者 [更多SDK](https://github.com/anyRTC)。

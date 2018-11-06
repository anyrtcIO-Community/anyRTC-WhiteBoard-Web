<template>
  <div id="app">
    <h1 :style="{'margin-bottom': '80px'}">anyRTC 互动白板内置UI DEMO 体验</h1>

    <p :style="{'text-align':'center'}">{{nBgIndex}}/{{nBgTotal}}</p>

    <div id="myCanvas" style="width:800px; height:450px; margin: 0 auto 40px; box-shadow: 0 10px 20px 0 rgba(0,0,0,.5)"></div>

    <button type="button" @click="prePage">上一页</button>
    <button type="button" @click="nextPage">下一页</button>
    <button type="button" @click="enlarge">放大</button>
    <button type="button" @click="shrink">缩小</button>
    <button type="button" @click="addFront">前面添加画板</button>
    <button type="button" @click="addBack">后面添加画板</button>
    <button type="button" @click="deleteBoard">删除当前画板</button>
    <!-- <button type="button" @click="shortScreen">截图</button> -->
    <button type="button" @click="undo">撤销</button>
    <button type="button" @click="clearCur">清空当前画板</button>
    <button type="button" @click="clearAll">清空所有画板</button>
    <button type="button" @click="destoryBoard">清空所以画板及所有背景图片</button>
    <button type="button" @click="upload">更新画板背景图片</button>
    <button type="button" @click="sendMessage">sendMessage</button>

    <select name="" id="pType" @change="handleType">
      <option :value="1">涂鸦</option>
      <option :value="2">箭头</option>
      <option :value="3">直线</option>
      <option :value="4">矩形</option>
      <option :value="0">不可编辑</option>
    </select>

    <select name="" id="pColor" @change="handleColor">
      <option value="#000000">黑色</option>
      <option value="#ff5050">红色</option>
      <option value="#ffd133">黄色</option>
      <option value="#4e91ff">蓝色</option>
      <option value="#31ff7a">绿色</option>
      <option value="#ffffff">白色</option>
    </select>

    <select name="" id="pWidth" @change="handleWidth">
      <option value="1">1像素</option>
      <option value="5">5像素</option>
      <option value="10">10像素</option>
    </select>

    <button type="button" @click="leave">退出</button>
  </div>
</template>

<script>
import Board from 'anyrtc-whiteboard';

export default {
  name: 'App',
  data () {
    return {
      pen: null,

      scale: 1,
      nBgIndex: 1,
      nBgTotal: 1,
      backgroundList: [
        {
          board_background: 'https://www.teameeting.cn/static/images/team_section.jpg',
          board_number: 1
        }
      ]
    }
  },

  computed: {
    transX () {
      return (-1 * (this.nBgIndex - 1) * 100) + '%'
    }
  },

  methods: {
    sendMessage () {
      this.pen.sendMessage('Hello World!');
    },
    prePage () {
      this.pen.prePage(true);
    },

    nextPage () {
      this.pen.nextPage(true);
    },

    enlarge () {
      if (this.scale >= 3) {
        return
      }
      this.scale = this.scale + 0.2;
      this.pen.setBoardScale(this.scale);
    },

    shrink () {
      if (this.scale <= 1) {
        return
      }
      this.scale = this.scale - 0.2;
      this.pen.setBoardScale(this.scale);
    },
    shortScreen () {
      this.pen.getCurrentSnapShortImage('ttt');
    },
    handleType () {
      let nType = parseInt(pType.value);

      this.pen.setBrushModel(nType);
    },
    handleColor () {
      let strColor = pColor.value;

      this.pen.setBrushColor(strColor);
    },
    handleWidth () {
      let nWidth = parseInt(pWidth.value);

      this.pen.setBrushWidth(nWidth);
    },
    undo () {
      this.pen.undo();
    },
    upload () {
      this.pen.updateCurrentBgImage('https://www.teameeting.cn/static/images/team_section.jpg');
    },
    addFront () {
      this.pen.addBoard(1, 'https://www.teameeting.cn/static/images/team_section.jpg');
    },
    addBack () {
      this.pen.addBoard(0, 'https://www.teameeting.cn/static/images/team_section.jpg');
    },
    deleteBoard () {
      this.pen.deleteCurrentBoard();
    },
    clearCur () {
      this.pen.clearCurrentDraw();
    },
    clearAll () {
      this.pen.cleanAllDraws();
    },
    destoryBoard () {
      this.pen.destoryBoard();
    },
    leave () {
      this.pen.clear();
    },
  },

  mounted() {
    let that = this;

    //开发者信息，前往https://www.anyrtc.io创建web应用获取
    const DEV_ID = "";
    const APP_ID = "";
    const APP_KEY = "";
    const APP_TOKEN = "";
    const APP_DOMAIN = "";

    that.pen = new Board("myCanvas");
    that.pen.debug = true;

    that.pen.initEngineWithAnyRTCInfo(DEV_ID, APP_ID, APP_KEY, APP_TOKEN, APP_DOMAIN).then(res => {
      if (res.code === 0) {//初始化成功
        //Do something
        console.log(res);

        var fileId = "88888888";//文件ID（保证唯一）
        var anyRTCId = "666666";//房间号（保证唯一）
        var userId = "web";//用户id（保证唯一）
        var backgroundList= [
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_1.jpg',
            board_number: 1
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_2.jpg',
            board_number: 2
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_3.jpg',
            board_number: 3
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_4.jpg',
            board_number: 4
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_5.jpg',
            board_number: 5
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_6.jpg',
            board_number: 6
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_7.jpg',
            board_number: 7
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_8.jpg',
            board_number: 8
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_9.jpg',
            board_number: 9
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_10.jpg',
            board_number: 10
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_11.jpg',
            board_number: 11
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_12.jpg',
            board_number: 12
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_13.jpg',
            board_number: 13
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_14.jpg',
            board_number: 14
          },
          {
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_15.jpg',
            board_number: 15
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_16.jpg',
            board_number: 16
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_17.jpg',
            board_number: 17
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_18.jpg',
            board_number: 18
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_19.jpg',
            board_number: 19
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_20.jpg',
            board_number: 20
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_21.jpg',
            board_number: 21
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_22.jpg',
            board_number: 22
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_23.jpg',
            board_number: 23
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_24.jpg',
            board_number: 24
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_25.jpg',
            board_number: 25
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_26.jpg',
            board_number: 26
          },
          { 
            board_background: 'http://oss.teameeting.cn/docs/140248771/20180929173501062526/document_20180929173501536430_27.jpg',
            board_number: 27
          },
        ] ;//背景图片

        //连接服务
        that.pen.initWithRoomID(anyRTCId, fileId, userId, backgroundList).then(res => {
          if (res.code === 0) {
            //连接成功
            console.log(res);
            that.pen.setBrushModel(1);
          } else {
            //连接不成功
          }
        });
      } else {
        //连接不成功
      }
    }).catch(err => {

    });

    that.pen.on("onBoardPageChange", (curPage, totalPage, backgroundUrl) => {
      console.log("onBoardPageChange", curPage, totalPage, backgroundUrl);
      that.nBgIndex = curPage;
      that.nBgTotal = totalPage;
    });

    that.pen.on("onBoardMessage", strMessage => {
      console.log("onBoardMessage", strMessage);
    });

    //如果是主持人进行画板录制
    that.pen.on("onBoardDrawsChangeTimestamp", timestamp => {
      //截图并保存画板
      console.log(timestamp);
    });

    that.pen.on("onBoardDestroy", () => {
      //离开
      console.log("onBoardDestroy");
      alert('注销画板成功')
      window.location.reload();
    });

    that.pen.on("onBoardServerDisconnect", () => {
      console.log("onBoardServerDisconnect");
      alert('断开链接')
      window.location.reload();
    });

    that.pen.on("onBoardError", (code) => {
      //监听错误
      console.log(code);
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <div>{{ nBgIndex }} / {{ nBgTotal }} | {{ transX }}</div> 
    <div class="board" style="margin: 0 auto;width: 640px;height: 480px;">
      <div class="board_bg" :style="`transform: translateX(${transX});`">
        <div v-if="backgroundList.length > 0" class="board_bg_item" v-for="(item, index) in backgroundList" :key="index" :style="'background-image: url(' + item.board_background + ')'"></div>
      </div>
      <canvas id="myCanvas" width="640" height="480" style="border: 1px solid"></canvas>
    </div>
    
    <div>
      <button type="button" @click="prePage">上一页</button>
      <button type="button" @click="nextPage">下一页</button>
      <button type="button" @click="addFront">前面添加画板</button>
      <button type="button" @click="addBack">后面添加画板</button>
      <button type="button" @click="deleteBoard">删除当前画板</button>
      <button type="button" @click="deleteBoard">撤销</button>
      <button type="button" @click="clearCur">清空当前画板</button>
      <button type="button" @click="clearAll">清空所有画板</button>
      <button type="button" @click="clear">清空所以画板及所有背景图片</button>
      <button type="button" @click="upload">upload</button>
      <button type="button" @click="color">颜色</button>
      <button type="button" @click="width">粗细</button>
      <button type="button" @click="type">形状</button>
      <button type="button" @click="leave">退出</button>

    </div>
  </div>
</template>

<script>
//开发者信息，https://www.anyrtc.io
const DEV_ID = "95878050";
const APP_ID = "anyrtc5FrikUFHlNal";
const APP_KEY = "LuPdDV6dO4bxHTKazezxLMNFSI2FJ8G9entqoM8McT0";
const APP_TOKEN = "dfca4c8bc6884f513942155469022393";
const APP_DOMAIN = "";

import { Board } from 'anyrtc-whiteboard';

export default {
  name: 'App',
  data () {
    return {
      pen: null,
      // anyrtcId: '',//房间号，均为系统唯一
      // fileId: '',//文件ID，均为系统唯一
      userId: 'web',//用户ID，均为系统唯一
      // anyrtcId: '80536884',
      // fileId: '20180713191511226855',
      // anyrtcId: '2018221',
      // fileId: '987123',
      anyrtcId: '2018929',
      fileId: '123456',
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
    prePage () {
      this.pen.prePage();
    },
    nextPage () {
      this.pen.nextPage();
    },
    upload () {
      this.pen.updateBgImage('https://www.teameeting.cn/static/images/team_section.jpg');
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
    clear () {
      this.pen.clear();
    },
    color () {
      this.pen.setBrushColor("red");
    },
    width () {
      this.pen.setBrushWidth(10);
    },
    type () {
      this.pen.setBrushModel(2);
    },
    leave () {
      this.pen.leave();
    }
  },

  mounted() {
    let that = this;

    that.pen = new Board(document.getElementById("myCanvas"));

    that.pen.initEngineWithAnyRTCInfo(DEV_ID, APP_ID, APP_KEY, APP_TOKEN, APP_DOMAIN).then(res => {
      console.log("initEngineWithAnyRTCInfo", res);

      if (res.code === 0) {
        that.pen.initWithRoomID(that.anyrtcId, that.fileId, that.userId, that.backgroundList).then(res => {
          console.log("initWithRoomID res", res);
          if (res.code === 0) {
            let data = res.data;

            that.pen.setBrushModel(1);
            that.nBgIndex = data.currPageIndex;
            that.nBgTotal = data.maxPageIndex;
            that.backgroundList = data.backgroundList;
          }
        }).catch(err => {
          console.log("initWithRoomID err", err);
        });
      }
    }).catch(err => {
      
    });

    that.pen.on("onBoardPageChange", (curPage, totalPage, backgroundUrl, backgroundList) => {
      that.nBgIndex = curPage;
      that.nBgTotal = totalPage;
      that.backgroundList = backgroundList;
    });

    //如果是主持人进行画板录制
    that.pen.on("onBoardDrawsChangeTimestamp", timestamp => {
      //截图并保存画板
      console.log(timestamp);
    });

    that.pen.on("onBoardDestroy", () => {
      //离开
      console.log("onBoardDestroy");
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

.board {
  position: relative;
  overflow: hidden;
}
.board_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  transition: all .3s;

  z-index: -1;
}

.board_bg_item {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#myCanvas {
  width: 100%;
  height: 100%;
}
</style>

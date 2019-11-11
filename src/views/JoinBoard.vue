<template>
  <div class="ar-container">
    <div class="ar-rtcp_side ar-aside">
      <div class="ar-container is-vertical">
        <div class="ar-rtcp_info">
          <div class="flex info_item isHoster1" >
            <span class="inof_item_label">画板ID:</span>
            <input type="text" v-model="roomId" id="boardID">
            <a @click="copyID('boardID')">复制</a>
          </div>
          <div class="flex info_item " >
            <span class="inof_item_label">画板工具栏:</span>
          </div>
          <div class="flex info_item" >
            <label>类型</label>
            <ul class="info_item_ul">
              <li @click="setPenType(index)" :class="itemActive === index ? 'active' : ''" v-for="(item, index) in toolOption" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="flex info_item" >
            <label>&nbsp;</label>
            <ul class="info_item_ul">
              <li @click="setPenTypes(index)" :class="itemActives === index ? 'active' : ''" v-for="(item, index) in toolOptions" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="flex info_item" >
            <label>大小</label>
            <select @change="setPenSize(size)" v-model="size">
              <option value=2>1号</option>
              <option value=6>2号</option>
              <option value=10>3号</option>
              <option value=14>4号</option>
            </select>
            </div>
          <div class="flex info_item" >
            <label>颜色</label>
            <select @change="setPenColor(color)" v-model="color">
              <option value="#0000FF">蓝色</option>
              <option value="#FF0000">红色</option>
              <option value="#FFFF00">黄色</option>
              <option value="#00FF00">绿色</option>
              <option value="#000000">黑色</option>
              <option value="#FFFFFF">白色</option>
            </select>
            </div>
          <div class="flex info_item" >
            <label>操作</label>
            <ul class="info_item_ul">
              <li class="warning" @click="undoBoard">撤销</li>
              <li class="error" @click="clearCurrentDraw">清空</li>
            </ul>
          </div>
          <div class="info_item info_content">
            <label>注意</label>
            <p>1. 创建者翻页加入端跟随翻页</p>
            <p>2. 加入端翻页其他端不同步翻页，仅预览</p>
            <p>3. demo中由于每次进入画板userid会改变，所以上一次加入画板所画的画板不能撤销同一个人同一台设备的情况下，如果userid一致可以撤销在画板中所有的笔迹）</p>
          </div>
        </div>
        <div class="ar-rtcp_log_title">日志</div>
        <div class="ar-rtcp_box_background"></div>
        <div class="ar-main ar-log_view" ref="logView">
          <div class="ar-rtcp_log" ref="logList">
            <div :class="['ar-rtcp_log_item', {'error': log.type === 'error'}]" v-for="(log, n) in logs" :key="n">{{log.content}}</div>
          </div>
        </div>
        <div class="ar-rtcp_box_background"></div>
      </div>
    </div>
    <!--  -->
    <div class="ar-main ar-rtcp_view">
      <div class="ar-container is-vertical">
        <div class="ar-rtcp_control">
          <div class="ar-rtcp_control_left">
          </div>
          <div class="ar-rtcp_control_right">
            <button type="error" @click="leaveRoom" class="signOut">退出</button>
          </div>
        </div>
        <!--  -->
        <h3>画板成员窗口</h3>
        <!--  -->
        <div class="ar-main">
          <div class="ar-video_wrap" ref="canvasWrap">
            <div id="myCanvas" ref="canvas" class="canvas"></div>
            <ul class="ar-block">
              <li @click="boardPrePage"><span class="anyclass-pointer">上一页</span></li>
              <li class="gray"><span>{{nBgIndex}} / {{nBgTotal}}</span></li>
              <li @click="boardNextPage"><span class="anyclass-pointer">下一页</span></li>
            </ul>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Board from 'ar-whiteboard';
import 'ar-whiteboard/lib/index.css';

import config from "@/config.js";

export default {
  data(){
    return{
      itemActive: 0,
      itemActives: '',
      toolOption: ['画笔', '箭头'],
      toolOptions: ['直线','矩形'],
      logs: [],
      Board: null,
      userId: `${parseInt(Math.random()*1000000)}`,
      roomId: '',
      fileId: '88888888',
      size: 2,
      color: '#000000',
      nBgIndex: 1,
      nBgTotal: 1,
      backgroundList: []
    }
  },
  mounted(){
    let that = this;
    that.roomId = that.$route.query.whiteboardId;
    // that.$nextTick(() => {
      that.Board = new Board("myCanvas");
      that.addLog('info', `方法：initEngineWithARInfo，画板初始化`);
      //配置私有云白板服务器，如果使用公有云请忽略
      config.whiteBoardServeUrl && that.Board.configServerUrl(config.whiteBoardServeUrl);
      //初始化白板
      that.Board.initEngineWithARInfo(config.appid, config.apptoken)
      .then(res => {
        if (res.code === 0) {
          that.Board.initWithRoomID(that.roomId, that.fileId, that.userId, that.backgroundList).then(res => {
            if (res.code === 0) {
                let data = res.data;
                that.addLog('info', `方法：initWithRoomID成功`);
                that.addLog('info', `方法：setBrushModel，设置画笔类型`);
                that.Board.setBrushModel(1);
                // that.nBgIndex = data.currPageIndex;
                // that.nBgTotal = data.maxPageIndex;
                // that.backgroundList = data.backgroundList;
            }
          }).catch(err => {
            console.log("initWithRoomID err", err);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
      //监听离开
      that.Board.on("onBoardDestroy", () => {
        alert('当前画板已被创建者摧毁');
        this.Board.leave();
        this.Board = null;
        this.$router.push('/');
      });
        //监听错误
      that.Board.on("onBoardError", (code) => {
        console.log(code);
      });
      //监听画板变化
      that.Board.on("onBoardPageChange", (currentPage, totalPage, backgroundUrl) => {
        that.nBgIndex = currentPage;
        that.nBgTotal = totalPage;
      });
    // });
    that.$nextTick(() =>{
      that.handleResize();
    })
    window.addEventListener('resize', that.handleResize, false);
  },
  methods:{
    setPenType(val){
      this.itemActives = '';
      this.itemActive = val;
      this.Board.setBrushModel(val+1);
      this.addLog('info', `方法：setBrushColor，设置画笔类型`);
    },
    setPenTypes(val){
      this.itemActive = '';
      this.itemActives = val;
      this.Board.setBrushModel(val+3);
      this.addLog('info', `方法：setBrushColor，设置画笔类型`);
    },
    setPenSize(val){
      this.Board.setBrushWidth(Number(val));
      this.addLog('info', `方法：setBrushColor，设置画笔大小`);
    },
    setPenColor(val){
      this.Board.setBrushColor(val);
      this.addLog('info', `方法：setBrushColor，设置画笔颜色`);
    },
    undoBoard(){
      this.Board.undo();
      this.addLog('info', `方法：undoBoard，撤销`);
    },
    clearCurrentDraw(){
      this.Board.clearCurrentDraw();
      this.addLog('info', `方法：setBrushColor，清除画板`);
    },
    //上一页
    boardPrePage() {
      this.Board.prePage(false);
    },
    //下一页
    boardNextPage() {
      this.Board.nextPage(false);
    },
    copyID(id){
      document.getElementById(id).select();
      document.execCommand("Copy");
    },
    leaveRoom(){
      if (confirm('退出画板')) {
        this.Board.leave();
        this.Board = null;
        this.$router.push('/');
      }
    },
    addLog(type, strLog) {
      this.logs.push({
        type: type,
        content: strLog
      });
      this.$nextTick(() => {
        let logView = this.$refs.logView.getBoundingClientRect();
        let logList = this.$refs.logList.getBoundingClientRect();
        if (logList.height > logView.height) {
          this.$refs.logView.scrollTop = (logList.height - logView.height);
        }
      });
    },
    //改变窗口大小
    handleResize(e) {
      let that = this;

      let w = that.$refs.canvasWrap.offsetWidth;
      let h = that.$refs.canvasWrap.offsetHeight;

      let Width = '';
      let Height = '';

      if(w/(16/9)>h){
        Height = h;
        Width = h*(16/9);
      }else{
        Width = w;
        Height = w/(16/9);
      }

      that.$refs.canvas.style.width = Width + 'px';
      that.$refs.canvas.style.height = Height + 'px';

      that.Board && that.Board.setCanvasSize(Width, Height);
    }
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize, false);
    this.Board && (this.Board.leave(), this.Board = null);
  }
}
</script>
<style lang="scss">
  $videoBackground: #000;

  .ar-rtcp_side {
    box-shadow: 1px 0 20px 0 rgba(0,0,0,.1);
    width: 320px;
    z-index: 1;
  }

  .ar-rtcp_info {
    box-sizing: border-box;
    height: auto;
    padding: 25px 30px;

    .my_video {
      width: 260px;
      height: 135px;
      overflow: hidden;
      background-color: $videoBackground;
    }
    .info_item {
      margin-bottom:10px;
      height: 34px;
      &:last-child { margin-bottom: 0; }
      line-height: 34px;
      &.isHoster1{
        margin-bottom: 20px;
        input{
          padding-left: 15px;
          font-size: 12px;
          text-align: right;
          color: #333;
          background-color: transparent;
          border: none;
          outline: none;
        }
      }
      &.info_content{
        height: auto;
        p{
          letter-spacing: 1px;
          line-height: 18px;
          font-size: 12px;
          color: #666;
        }
      }
      select{
        outline: none;
        width: 160px;
        height: 34px;
        background:rgba(236,236,236,1);
        border-radius:4px;
        line-height: 34px;
        vertical-align: middle;
        border: none;
        box-sizing: border-box;
        padding: 0 8px;
        color: #666;
      }
      .info_item_ul{
        list-style: none;
        li{
          cursor: pointer;
          float: left;
          border: 1px solid #ddd;
          width: 70px; 
          line-height: 30px;
          text-align: center;
          height: 30px;
          margin-left: 16px;
          border-radius: 4px;
          &.active{
            border: 1px solid #33B15D;
            color: #33B15D;
          }
          &.warning{
             border: 1px solid #E6A23C;
            color: #E6A23C;
          }
          &.error{
            border: 1px solid #FF3E3E;
            color: #fF3E3E;
          }
        }
      }
      
      .ar-device_select {
        outline: none;
        width: 180px;
        height: 34px;
        background:rgba(236,236,236,1);
        border-radius:4px;
        line-height: 34px;
        vertical-align: middle;
        border: none;
        box-sizing: border-box;
        padding: 0 8px;
      }
      
      .inof_item_label {
        font-size: 14px;
        color: #333;
      }

      &.flex {
        display: flex;
        justify-content: space-between;
      }
      &.video {
        text-align: center;
        height: auto;
        span {
          display: block;
          margin-top: 8px;
        }
      }
    }
  }
  .ar-rtcp_box_background{
    height: 30px; 
    background: #E5E7E9;
  }
  .ar-rtcp_log_title {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color: #333;
    border-top: 1px solid #E5E7E9;
    box-sizing: border-box;
  }
  .ar-log_view {
    background-color: #E5E7E9;
    .ar-rtcp_log {
      padding: 0px 30px;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      box-sizing: border-box;

      .ar-rtcp_log_item {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 18px;
        color: #666;
        word-break: break-word;

        &.error {
          color: red;
        }
      }
    }
  }

  .ar-rtcp_view {
    padding: 0 20px 20px;
    background-color: #F6F6F6;
  }

  .ar-rtcp_control {
    margin: 17px 0 7px;
    display: flex;
    justify-content: space-between;
    button{
      outline: none;
      width: 120px;
      height:34px;
      text-align: center;
      border: none;
      line-height: 34px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:12px;
      margin-right: 10px;
      color:rgba(102,102,102,1);
      cursor: pointer;
      &.boxShow{
        box-shadow:0px 2px 8px 0px rgba(5,7,37,0.17);
      }
      &.on{
        border:1px solid rgba(51,177,93,1);
        color: rgba(51,177,93,1);
      }
      &.off{
        border:1px solid rgba(227,76,76,1);
        color: rgba(227,76,76,1);
      }
      &.signOut{
        background:rgba(233,74,74,1);
        color: #fff;
      }
    }
  }
  h3{
    color: #333333;
    height: 40px;
    line-height: 40px;
    font-size:16px;
    margin-bottom: 10px !important;
    font-weight:bold;
  }
  .ar-video_view {
    display: flex;
    flex-wrap: wrap;
    width: 100%; 
    height: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    .canvas{
      z-index: 999;
      position: absolute;
      left: 50%;
      top: 50%;
      overflow: hidden;
      overflow-y: auto;
      transform: translate(-50%, -50%);
      background-color: #FFF;
      box-sizing: border-box;
      box-shadow: 0px 0px 6px rgba(0,0,0,.1);
    }
  }
  ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  }
  ::-webkit-scrollbar-track {
  background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #DDD;
  }
</style>

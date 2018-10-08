"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var eLineType;
(function (eLineType) {
    eLineType[eLineType["_nonde"] = 0] = "_nonde";
    eLineType[eLineType["_draw"] = 1] = "_draw";
    eLineType[eLineType["_arrow"] = 2] = "_arrow";
    eLineType[eLineType["_line"] = 3] = "_line";
    eLineType[eLineType["_rect"] = 4] = "_rect";
})(eLineType || (eLineType = {}));
;
var AnyRTCBoardCode;
(function (AnyRTCBoardCode) {
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeParameterEmpty"] = 3000] = "AnyRTCBoardCodeParameterEmpty";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeNoNet"] = 3001] = "AnyRTCBoardCodeNoNet";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeUserIdIsNull"] = 3002] = "AnyRTCBoardCodeUserIdIsNull";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeSessionPastDue"] = 201] = "AnyRTCBoardCodeSessionPastDue";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeDeveloperInfoError"] = 202] = "AnyRTCBoardCodeDeveloperInfoError";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeDeveloperArrearage"] = 203] = "AnyRTCBoardCodeDeveloperArrearage";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeDeveloperNotOpen"] = 206] = "AnyRTCBoardCodeDeveloperNotOpen";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeDatabaseError"] = 301] = "AnyRTCBoardCodeDatabaseError";
    AnyRTCBoardCode[AnyRTCBoardCode["AnyRTCBoardCodeBackgroundListIsNull"] = 300] = "AnyRTCBoardCodeBackgroundListIsNull";
})(AnyRTCBoardCode || (AnyRTCBoardCode = {}));
;
var Logcat = (function () {
    function Logcat() {
        this.debug = true;
    }
    Logcat.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.log.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    Logcat.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.info.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    Logcat.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.error.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    Logcat.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.warn.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    Logcat.prototype.group = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.group.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    Logcat.prototype.groupEnd = function () {
        if (this.debug) {
            console.groupEnd();
        }
    };
    Logcat.prototype.time = function () {
        if (this.debug) {
            console.time();
        }
    };
    Logcat.prototype.timeEnd = function () {
        if (this.debug) {
            console.timeEnd();
        }
    };
    Logcat.prototype.table = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.info.apply(console, ["[AnyRTCBoard] %O", new Date().toLocaleTimeString()].concat(args));
        }
    };
    return Logcat;
}());
var Emitter = (function (_super) {
    __extends(Emitter, _super);
    function Emitter() {
        var _this = _super.call(this) || this;
        _this.events = {};
        return _this;
    }
    Emitter.prototype.on = function (evName, evCallback) {
        if (this.events[evName]) {
            this.events[evName].push(evCallback);
        }
        else {
            this.events[evName] = [];
            this.events[evName].push(evCallback);
        }
    };
    Emitter.prototype.emit = function (evName) {
        var restOfName = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            restOfName[_i - 1] = arguments[_i];
        }
        if (this.events[evName]) {
            this.events[evName].map(function (item, index) {
                item.apply(void 0, restOfName);
            });
        }
    };
    Emitter.prototype.removeAll = function () {
        this.events = {};
    };
    return Emitter;
}(Logcat));
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(el, elBox) {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        _this.el = {};
        _this.elBox = {};
        _this.ctx = {};
        _this.width = 0;
        _this.height = 0;
        _this.socket = socket_io_client_1.default("https://board.teameeting.cn");
        _this.isEdit = false;
        _this.candraw = false;
        _this.lineType = 0;
        _this.lineWidth = 1;
        _this.lineColor = "#000000";
        _this.scale = 1;
        _this.xStart = 0;
        _this.yStart = 0;
        _this.xStop = 0;
        _this.yStop = 0;
        _this.canvasData = {};
        _this.jPoint = [];
        _this.dataQueue = [];
        _this.fileId = "";
        _this.anyRTCId = "";
        _this.userId = "";
        _this.backgroundList = [];
        _this.nBgIndex = 0;
        _this.nBgTotal = 0;
        _this.currentBoardInfo = [];
        _this.allboardInfo = [];
        _this.boardLocalIdList = [];
        _this.doneQueue = [];
        _this.version = "2.0.0";
        var that = _this;
        if (_newTarget === Board) {
            if (el !== undefined && Object.prototype.toString.call(el).indexOf("[object HTML") !== -1) {
                _this.el = el;
                _this.ctx = el.getContext("2d");
                _this.width = el.getBoundingClientRect().width;
                _this.height = el.getBoundingClientRect().height;
                _this.el.width = _this.width;
                _this.el.height = _this.height;
                _this.el.onmousedown = function (e) {
                    if (that.isEdit) {
                        if (e.button === 0) {
                            var xDown = e.clientX, yDown = e.clientY;
                            var canvasOffsetLeft = that.el.offsetLeft, canvasOffsetTop = that.el.offsetTop;
                            that.xStart = xDown - that.el.getBoundingClientRect().x + window.pageXOffset;
                            that.yStart = yDown - that.el.getBoundingClientRect().y + window.pageYOffset + that.elBox.scrollTop;
                            that.canvasData = {};
                            that.canvasData['DType'] = that.lineType;
                            that.canvasData['DWidth'] = that.lineWidth;
                            that.canvasData['DColor'] = that.lineColor;
                            that.canvasData['DCanvasWidth'] = that.width;
                            that.canvasData['DCanvasHeight'] = that.height;
                            that.canvasData['DStartX'] = that.xStart;
                            that.canvasData['DStartY'] = that.yStart;
                            that.jPoint = [];
                            that.candraw = true;
                        }
                    }
                    else {
                    }
                };
                _this.el.onmousemove = function (e) {
                    if (that.candraw) {
                        var canvasOffsetLeft = that.el.offsetLeft, canvasOffsetTop = that.el.offsetTop;
                        var xUp = e.clientX - that.el.getBoundingClientRect().x + window.pageXOffset, yUp = e.clientY - that.el.getBoundingClientRect().y + window.pageYOffset + that.elBox.scrollTop;
                        that.xStop = xUp;
                        that.yStop = yUp;
                        if (that.lineType === 1) {
                            if (that.jPoint === undefined || that.jPoint === null || that.jPoint.length === 0) {
                                that.jPoint.push([that.xStart, that.yStart]);
                                that.jPoint.push([xUp, yUp]);
                            }
                            else {
                                that.jPoint.push([xUp, yUp]);
                            }
                            that.canvasData['DPoint'] = JSON.stringify(that.jPoint);
                        }
                        else {
                            that.canvasData['DPoint'] = "";
                            that.ctx.clearRect(0, 0, that.width, that.height);
                            if (that.dataQueue.length != 0) {
                                that.ctx.putImageData(that.dataQueue[that.dataQueue.length - 1], 0, 0, 0, 0, that.width, that.height);
                            }
                        }
                        that.canvasData['DEndX'] = xUp;
                        that.canvasData['DEndY'] = yUp;
                        that[eLineType[that.lineType]](that.canvasData);
                    }
                };
                _this.el.onmouseup = _this.el.onmouseout = function (e) {
                    if (that.candraw) {
                        if (that.canvasData['DEndX'] === "" || that.canvasData['DEndX'] === null || that.canvasData['DEndX'] === undefined) {
                            that.canvasData['DEndX'] = that.xStart;
                        }
                        if (that.canvasData['DEndY'] === "" || that.canvasData['DEndY'] === null || that.canvasData['DEndY'] === undefined) {
                            that.canvasData['DEndY'] = that.yStart;
                        }
                        that._save();
                        that.candraw = false;
                        var localBID = "web:" + that.userId + that._randomString(16);
                        (typeof that.boardLocalIdList[that.nBgIndex] === "undefined") && (that.boardLocalIdList[that.nBgIndex] = []);
                        that.boardLocalIdList[that.nBgIndex].push(localBID);
                        var bdata = {
                            board_seqid: that.fileId,
                            board_localid: localBID,
                            board_anyrtcid: that.anyRTCId,
                            board_number: that.nBgIndex,
                            board_data: that.canvasData
                        };
                        that.socket.emit('push_board', JSON.stringify(bdata));
                        if (that.doneQueue.length !== 0) {
                            that.strokeBoard(that.doneQueue);
                        }
                    }
                };
            }
            else {
                throw new Error('缺少参数，本类不能实例化');
                return _this;
            }
            if (elBox === undefined) {
                _this.elBox = el;
            }
        }
        else {
            throw new Error('请使用 new 命令生成实例');
        }
        return _this;
    }
    Board.prototype._randomString = function (nLen) {
        var len = nLen || 8;
        var string = "";
        var strArr = "abcdefghijklmnopqrstuvwxyz123456789";
        var nArr = strArr.length;
        for (var i = 0; i < len; i++) {
            var ran = nArr * Math.random();
            string += strArr.split('')[parseInt(ran)];
        }
        return "web:" + string;
    };
    Board.prototype._draw = function (boardData) {
        var that = this;
        var topCtx = that.ctx;
        var scale = that.width / boardData.DCanvasWidth;
        topCtx.lineCap = "round";
        topCtx.strokeStyle = boardData.DColor ? boardData.DColor : that.lineColor;
        topCtx.lineWidth = boardData.DWidth ? boardData.DWidth * scale : that.lineWidth * scale;
        if (!boardData.DPoint) {
            return;
        }
        var point;
        if (typeof boardData.DPoint === "string") {
            point = JSON.parse(boardData.DPoint);
        }
        else if (typeof boardData.DPoint === "object") {
            point = boardData.DPoint;
        }
        if (point.length !== 0) {
            for (var j = 0; j < point.length - 1; j++) {
                topCtx.beginPath();
                topCtx.moveTo(point[j][0] * scale, point[j][1] * scale);
                topCtx.lineTo(point[j + 1][0] * scale, point[j + 1][1] * scale);
                topCtx.stroke();
                topCtx.closePath();
            }
        }
    };
    Board.prototype._line = function (boardData) {
        var that = this;
        var topCtx = that.ctx;
        var scale = that.width / boardData.DCanvasWidth;
        topCtx.beginPath();
        topCtx.lineCap = "round";
        topCtx.strokeStyle = boardData.DColor ? boardData.DColor : that.lineColor;
        topCtx.lineWidth = boardData.DWidth ? boardData.DWidth * scale : that.lineWidth * scale;
        topCtx.moveTo(boardData.DStartX * scale, boardData.DStartY * scale);
        topCtx.lineTo(boardData.DEndX * scale, boardData.DEndY * scale);
        topCtx.stroke();
    };
    Board.prototype._rect = function (boardData) {
        var that = this, xMoved, yMoved, rectWidth, rectHeight, topCtx = that.ctx;
        var scale = that.width / boardData.DCanvasWidth, xStart = boardData.DStartX * scale, yStart = boardData.DStartY * scale, xStop = boardData.DEndX * scale, yStop = boardData.DEndY * scale;
        xMoved = xStop - xStart;
        yMoved = yStop - yStart;
        rectWidth = Math.abs(xMoved);
        rectHeight = Math.abs(yMoved);
        topCtx.beginPath();
        topCtx.strokeStyle = boardData.DColor ? boardData.DColor : that.lineColor;
        topCtx.lineWidth = boardData.DWidth ? boardData.DWidth * scale : that.lineWidth * scale;
        topCtx.rect((xStop >= xStart ? xStart : xStop), (yStop >= yStart ? yStart : yStop), rectWidth, rectHeight);
        topCtx.stroke();
    };
    Board.prototype._arrow = function (boardData) {
        var that = this, topCtx = that.ctx;
        var scale = that.width / boardData.DCanvasWidth, xStart = boardData.DStartX * scale, yStart = boardData.DStartY * scale, xStop = boardData.DEndX * scale, yStop = boardData.DEndY * scale;
        var theta = 30;
        var headlen = 10;
        var width = boardData.DWidth ? boardData.DWidth * scale : that.lineWidth * scale;
        var color = boardData.DColor ? boardData.DColor : that.lineColor;
        var angle = Math.atan2(yStart - yStop, xStart - xStop) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, topX = headlen * Math.cos(angle1), topY = headlen * Math.sin(angle1), botX = headlen * Math.cos(angle2), botY = headlen * Math.sin(angle2);
        topCtx.save();
        topCtx.beginPath();
        var arrowX = xStart - topX, arrowY = yStart - topY;
        topCtx.moveTo(arrowX, arrowY);
        topCtx.moveTo(xStart, yStart);
        topCtx.lineTo(xStop, yStop);
        arrowX = xStop + topX;
        arrowY = yStop + topY;
        topCtx.moveTo(arrowX, arrowY);
        topCtx.lineTo(xStop, yStop);
        arrowX = xStop + botX;
        arrowY = yStop + botY;
        topCtx.lineTo(arrowX, arrowY);
        topCtx.strokeStyle = color;
        topCtx.lineWidth = width;
        topCtx.stroke();
        topCtx.restore();
    };
    Board.prototype._save = function () {
        var that = this;
        that.dataQueue.push(that.ctx.getImageData(0, 0, that.width, that.height));
    };
    Board.prototype._clear = function () {
        var that = this;
        that.ctx.clearRect(0, 0, that.width, that.height);
        that.dataQueue = [];
    };
    Board.prototype.strokeBoard = function (BData) {
        var that = this;
        that._clear();
        if (BData.length !== 0) {
            for (var i = 0; i < BData.length; i++) {
                var data = void 0, strBData = BData[i].board_data;
                if (typeof strBData === "string") {
                    data = JSON.parse(strBData);
                }
                else if (typeof strBData === "object") {
                    data = strBData;
                }
                var nType = data.DType;
                that[eLineType[nType]](data);
            }
            that.dataQueue.push(that.ctx.getImageData(0, 0, that.width, that.height));
            if (that.doneQueue.length !== 0) {
                that.doneQueue = [];
            }
        }
    };
    Board.prototype.initEngineWithAnyRTCInfo = function (DEV_ID, APP_ID, APP_KEY, APP_TOKEN, APP_DOMAIN) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.once("connect", function () {
                _this.socket.emit('init_anyrtc', {
                    anyrtc_developerid: DEV_ID,
                    anyrtc_appid: APP_ID,
                    anyrtc_appkey: APP_KEY,
                    anyrtc_apptoken: APP_TOKEN
                });
                _this.socket.once('init_anyrtc_success', function (res) {
                    _this.log("initEngineWithAnyRTCInfo success");
                    resolve(res);
                });
                _this.socket.once('init_anyrtc_failed', function (res) {
                    _this.error("initEngineWithAnyRTCInfo failed");
                    _this.emit("onBoardError", AnyRTCBoardCode[res.code]);
                    reject(res);
                    if (res.code === 201) {
                    }
                });
            });
            _this.socket.once("connect_error", function (error) {
                _this.error("connect service error");
                reject(error);
            });
            _this.socket.once("connect_timeout", function (error) {
                _this.error("connect service timeout");
                reject(error);
            });
            _this.socket.once("disconnect", function (error) {
                _this.error("disconnect service");
                _this.emit('onBoardServerDisconnect', error);
                _this.removeAll();
                reject(error);
            });
        });
    };
    Board.prototype.initWithRoomID = function (anyRTCId, fileId, userId, backgroundList) {
        var that = this;
        if (typeof anyRTCId !== "string") {
            return;
        }
        if (typeof fileId !== "string") {
            return;
        }
        if (typeof userId !== "string") {
            return;
        }
        that.userId = userId;
        if (typeof backgroundList !== "object" && Object.prototype.toString.call(backgroundList) !== "[object Array]") {
            return;
        }
        return new Promise(function (resolve) {
            that.fileId = fileId;
            that.anyRTCId = anyRTCId;
            that.socket.emit('init_all_board', {
                board_seqid: fileId,
                board_anyrtcid: anyRTCId,
                board_array: backgroundList
            });
            that.socket.once('init_all_board', function (req) {
                if (req.code === 0) {
                    that.log("initWithRoomID success");
                    var boardInfo = req.board_info;
                    var docInfo = req.doc_info;
                    that.nBgIndex = docInfo.sys_docs_curt_number;
                    that.nBgTotal = boardInfo.length;
                    for (var i in boardInfo) {
                        var boardInfoList = JSON.parse(boardInfo[i]['board_info_list']);
                        that.allboardInfo.push(boardInfoList);
                        that.backgroundList.push({
                            board_number: boardInfo[i]['sys_board_number'],
                            board_background: boardInfo[i]['sys_board_background']
                        });
                        boardInfoList.map(function (item, index) {
                            if (item['board_localid'].indexOf("web:" + userId) !== -1) {
                                that.boardLocalIdList[that.nBgIndex] = that.boardLocalIdList[that.nBgIndex] || [];
                                that.boardLocalIdList[that.nBgIndex].push(item['board_localid']);
                            }
                        });
                    }
                    that.currentBoardInfo = that.allboardInfo[that.nBgIndex - 1];
                    that.strokeBoard(that.currentBoardInfo);
                    that.handleListener();
                    resolve({
                        code: 0,
                        data: {
                            "currPageIndex": docInfo.sys_docs_curt_number,
                            "maxPageIndex": boardInfo.length,
                            "isEdit": docInfo.sys_docs_is_edit == 1 ? true : false,
                            "boardInfo": boardInfo,
                            "docInfo": docInfo,
                            "backgroundList": that.backgroundList
                        }
                    });
                    return;
                }
                else {
                    that.emit("onBoardError", AnyRTCBoardCode[req.code]);
                }
                that.log("initWithRoomID failed");
                resolve(req);
            });
        });
    };
    Board.prototype.handleListener = function () {
        var that = this;
        that.socket.removeAllListeners(['push_board', 'update_board', 'revoke_board', 'clear_single_board', 'clear_all_board', 'destroy_board', 'add_board', 'delete_board', 'switch_board', 'update_board_background']);
        that.socket.on("push_board", function (req) {
            that.log("push_board self", req);
            if (req.code === 0) {
                var res = req.result;
                that.currentBoardInfo.push(res[0]);
                that.allboardInfo[that.nBgIndex - 1].push(res[0]);
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[req.code]);
            }
        });
        that.socket.on('update_board', function (req) {
            that.log('update_board', req);
            if (req.code === 0) {
                var res = req.result;
                if (res[0].board_number == that.nBgIndex) {
                    that.currentBoardInfo.push(res[0]);
                    that.allboardInfo[that.nBgIndex - 1] = that.currentBoardInfo;
                    that.strokeBoard(that.currentBoardInfo);
                }
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[req.code]);
            }
        });
        that.socket.on('revoke_board', function (req) {
            that.log("revoke_board", req);
            if (req.code === 0) {
                var res = req.result;
                var newData = res.all_board_info;
                that.allboardInfo[that.nBgIndex - 1] = newData;
                that.currentBoardInfo = newData;
                that.strokeBoard(newData);
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[req.code]);
            }
        });
        that.socket.on('clear_single_board', function (res) {
            that.log('clear_single_board', res);
            that._clear();
            that.currentBoardInfo = [];
            that.allboardInfo[that.nBgIndex - 1] = [];
            that.boardLocalIdList[that.nBgIndex] = [];
        });
        that.socket.on('clear_all_board', function () {
            that._clear();
            that.currentBoardInfo = [];
            that.allboardInfo = [];
            that.boardLocalIdList = [];
        });
        that.socket.on('destroy_board', function (res) {
            that._clear();
            that.allboardInfo = [];
            that.currentBoardInfo = [];
            that.boardLocalIdList = [];
            that.backgroundList = [];
            that.emit("onBoardDestroy");
        });
        that.socket.on('add_board', function (res) {
            that.log('add_board', res);
            if (res.code === 0) {
                var boardInfo = res.board_info;
                var docInfo = res.doc_info;
                that.allboardInfo = [];
                that.backgroundList = [];
                for (var i in boardInfo) {
                    var boardInfoList = JSON.parse(boardInfo[i]['board_info_list']);
                    that.allboardInfo.push(boardInfoList);
                    that.backgroundList.push({
                        board_number: boardInfo[i]['sys_board_number'],
                        board_background: boardInfo[i]['sys_board_background']
                    });
                    boardInfoList.map(function (item, index) {
                        if (item['board_localid'].indexOf("web:" + that.userId) !== -1) {
                            that.boardLocalIdList[that.nBgIndex] = that.boardLocalIdList[that.nBgIndex] || [];
                            that.boardLocalIdList[that.nBgIndex].push(item['board_localid']);
                        }
                    });
                }
                that.nBgIndex = docInfo.sys_docs_curt_number;
                that.nBgTotal = boardInfo.length;
                that.currentBoardInfo = that.allboardInfo[that.nBgIndex - 1];
                that.strokeBoard(that.currentBoardInfo);
                that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[res.code]);
            }
        });
        that.socket.on('delete_board', function (res) {
            that.log('delete_board', res);
            if (res.code == 0) {
                var boardInfo = res.board_info;
                var docInfo = res.doc_info;
                that.allboardInfo = [];
                that.backgroundList = [];
                for (var i in boardInfo) {
                    var boardInfoList = JSON.parse(boardInfo[i]['board_info_list']);
                    that.allboardInfo.push(boardInfoList);
                    that.backgroundList.push({
                        board_number: boardInfo[i]['sys_board_number'],
                        board_background: boardInfo[i]['sys_board_background']
                    });
                    boardInfoList.map(function (item, index) {
                        if (item['board_localid'].indexOf("web:" + that.userId) !== -1) {
                            that.boardLocalIdList[that.nBgIndex] = that.boardLocalIdList[that.nBgIndex] || [];
                            that.boardLocalIdList[that.nBgIndex].push(item['board_localid']);
                        }
                    });
                }
                that.nBgIndex = docInfo.sys_docs_curt_number;
                that.nBgTotal = boardInfo.length;
                that.currentBoardInfo = that.allboardInfo[that.nBgIndex - 1];
                that.strokeBoard(that.currentBoardInfo);
                that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[res.code]);
            }
        });
        that.socket.on("switch_board", function (res) {
            that.log("switch_board", res);
            if (res.code === 0) {
                var boardInfo = res.board_info, switchInfo = res.switch_info;
                that.nBgIndex = switchInfo.board_number;
                try {
                    var bInfoList = JSON.parse(boardInfo[0]['board_info_list']);
                    that.currentBoardInfo = bInfoList;
                    that.doneQueue = [];
                    that.strokeBoard(bInfoList);
                }
                catch (err) {
                }
                that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[res.code]);
            }
        });
        that.socket.on("update_board_background", function (res) {
            that.log("update_board_background", res);
            if (res.code == 0) {
                var data = JSON.parse(res.result);
                that.backgroundList[data.board_number - 1] = data.board_background;
            }
            else {
                that.emit("onBoardError", AnyRTCBoardCode[res.code]);
            }
            that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
        });
    };
    Board.prototype.setBrushModel = function (nType) {
        if (typeof nType !== "number") {
            return;
        }
        this.lineType = nType;
        switch (nType) {
            case 0:
            case 5:
                this.isEdit = false;
                break;
            case 1:
            case 2:
            case 3:
            case 4:
                this.isEdit = true;
                break;
            default:
                this.isEdit = true;
                this.lineType = 0;
                break;
        }
    };
    Board.prototype.getBrushModel = function () {
        return this.lineType;
    };
    Board.prototype.setBrushWidth = function (nWidth) {
        if (typeof nWidth !== "number") {
            return false;
        }
        this.lineWidth = nWidth;
        return true;
    };
    Board.prototype.getBrushWidth = function () {
        return this.lineWidth;
    };
    Board.prototype.setBrushColor = function (strColor) {
        if (typeof strColor !== "string") {
            return;
        }
        this.lineColor = strColor;
    };
    Board.prototype.getBrushColor = function () {
        return this.lineColor;
    };
    Board.prototype.updateCurrentBgImage = function (boardBGUrl) {
        var that = this;
        that.socket.emit("update_board_background", JSON.stringify({
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId,
            board_number: that.nBgIndex,
            board_background: boardBGUrl
        }));
    };
    Board.prototype.getCurrentBgImageURL = function () {
        try {
            if (this.backgroundList[this.nBgIndex - 1]) {
                return this.backgroundList[this.nBgIndex - 1];
            }
        }
        catch (err) {
            return false;
        }
    };
    Board.prototype.addBoard = function (withFront, boardBGUrl) {
        var that = this;
        if (typeof withFront !== "number") {
            return;
        }
        that.socket.emit('add_board', JSON.stringify({
            is_before: withFront,
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId,
            board_number: that.nBgIndex,
            board_background: boardBGUrl
        }));
    };
    Board.prototype.deleteCurrentBoard = function () {
        var that = this;
        that.socket.emit('delete_board', JSON.stringify({
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId,
            board_number: that.nBgIndex
        }));
    };
    Board.prototype.prePage = function (needSync) {
        var that = this;
        var nIndex = that.nBgIndex;
        if (nIndex <= 1) {
            return false;
        }
        that.nBgIndex--;
        if (needSync) {
            that.socket.emit("switch_board", {
                board_seqid: that.fileId,
                board_anyrtcid: that.anyRTCId,
                board_number: nIndex
            });
        }
        else {
            if (that.allboardInfo[that.nBgIndex - 1]) {
                that.strokeBoard(that.allboardInfo[that.nBgIndex - 1]);
            }
            that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
        }
        return true;
    };
    Board.prototype.nextPage = function (needSync) {
        var that = this;
        var nIndex = that.nBgIndex;
        if (nIndex >= that.nBgTotal) {
            return false;
        }
        that.nBgIndex++;
        if (needSync) {
            that.socket.emit("switch_board", {
                board_seqid: that.fileId,
                board_anyrtcid: that.anyRTCId,
                board_number: nIndex
            });
        }
        else {
            if (that.allboardInfo[that.nBgIndex - 1]) {
                that.strokeBoard(that.allboardInfo[that.nBgIndex - 1]);
            }
            that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
        }
        return true;
    };
    Board.prototype.switchPage = function (needSync, nIndex) {
        var that = this;
        if (typeof nIndex !== "number") {
        }
        if (nIndex === 0 || nIndex === that.nBgTotal + 1) {
            return false;
        }
        if (needSync) {
            that.socket.emit("switch_board", {
                board_seqid: that.fileId,
                board_anyrtcid: that.anyRTCId,
                board_number: nIndex
            });
        }
        else {
            if (that.allboardInfo[that.nBgIndex - 1]) {
                that.strokeBoard(that.allboardInfo[that.nBgIndex - 1]);
            }
            that.emit("onBoardPageChange", that.nBgIndex, that.nBgTotal, that.backgroundList[that.nBgIndex - 1]['board_background'], that.backgroundList);
        }
        return true;
    };
    Board.prototype.getCurrentSnapShortImage = function (filename) {
        var that = this;
        return;
        var imgObj = new Image();
        imgObj.crossOrigin = 'Anonymous';
        imgObj.onload = function () {
            var newCanvas = document.createElement('canvas');
            var newCtx = newCanvas.getContext('2d');
            newCanvas.width = 800;
            newCanvas.height = 600;
            newCtx.drawImage(imgObj, 0, 0);
            newCtx.beginPath();
            newCtx.lineWidth = "10";
            newCtx.strokeStyle = "blue";
            newCtx.rect(50, 50, 150, 80);
            newCtx.stroke();
            var imgData = newCanvas.toDataURL("image/png");
            var save_link = document.createElement('a');
            save_link.href = imgData;
            save_link.download = filename;
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };
        imgObj.src = "http://oss.teameeting.cn/docs/010884893/20180629174813795629/document_20180629174813607084_1.jpg";
    };
    Board.prototype.undo = function () {
        var that = this;
        if (that.boardLocalIdList.length === 0 || !that.boardLocalIdList[that.nBgIndex]) {
            return false;
        }
        else {
            that.socket.emit('revoke_board', JSON.stringify({
                board_localid: that.boardLocalIdList[that.nBgIndex].pop()
            }));
            return true;
        }
    };
    Board.prototype.clear = function () {
        var that = this;
        that.socket.emit('destroy_board', JSON.stringify({
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId
        }));
    };
    Board.prototype.cleanAllDraws = function () {
        var that = this;
        that.socket.emit('clear_all_board', JSON.stringify({
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId
        }));
    };
    Board.prototype.clearCurrentDraw = function () {
        var that = this;
        that.socket.emit('clear_single_board', JSON.stringify({
            board_seqid: that.fileId,
            board_anyrtcid: that.anyRTCId,
            board_number: that.nBgIndex
        }));
        that.allboardInfo[that.nBgIndex] = [];
        that.currentBoardInfo = [];
        that.boardLocalIdList = [];
        that.dataQueue = [];
    };
    Board.prototype.leave = function () {
        var that = this;
        that.socket.disconnect();
        that.allboardInfo = [];
        that.currentBoardInfo = [];
        that.boardLocalIdList = [];
        that.dataQueue = [];
    };
    return Board;
}(Emitter));
// exports.Board = Board;
export default Board;
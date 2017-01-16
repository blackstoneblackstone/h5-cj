/**
 * Created by lihb on 1/3/17.
 */
function CPage5() {
    var p5sharetip, p5playup, p5playdown, p5shareup, p5lunzi1, p5lunzi2, p5recordup, p5recorddown, p5player, p5textbottom, p5texttop;
    var _recordId = 0;
    var tw1, tw2, state, page5, text;
    this.init = function () {
        p5texttop = createBitmap(s_oSpriteLibrary.getSprite('p5texttop'));
        p5texttop.y = 150;
        p5texttop.x = 750;
        s_oStage.addChild(p5texttop);
        p5textbottom = createBitmap(s_oSpriteLibrary.getSprite('p5textbottom'));
        p5textbottom.y = 950;
        p5textbottom.x = 750;
        s_oStage.addChild(p5textbottom);
        p5player = createBitmap(s_oSpriteLibrary.getSprite('p5player'));
        p5player.x = (CANVAS_WIDTH - 610) / 2 + 700;
        p5player.y = 300 + 100;
        s_oStage.addChild(p5player);

        p5sharetip = createBitmap(s_oSpriteLibrary.getSprite('p5sharetip'));
        p5sharetip.on("mousedown", function () {
            s_oStage.removeChild(p5sharetip);
        });

        text = new createjs.Text("", "80px Arial", "#ff7700");
        text.x = 380;
        text.y = 630;
        text.lineWidth = 100;
        text.textAlign = "center";
        text.color = "#f98803";
        text.textBaseline = "alphabetic";
        s_oStage.addChild(text);

        createjs.Tween.get(p5texttop).to({
            x: 0
        }, 1500, createjs.Ease.linear);
        createjs.Tween.get(p5textbottom).to({
            x: 0
        }, 1500, createjs.Ease.linear)

        createjs.Tween.get(p5player).to({
            x: (CANVAS_WIDTH - 610) / 2
        }, 1000, createjs.Ease.linear).call(function () {
            p5playdown = new CGfxButton(197, 700 + 100, s_oSpriteLibrary.getSprite('p5playdown'));
            p5playdown.getButtonImage().alpha = 0;

            p5playup = new CGfxButton(197, 700 + 100, s_oSpriteLibrary.getSprite('p5playup'));
            p5playup.addEventListener(ON_MOUSE_UP, page5._tryPlay, page5);


            p5shareup = new CGfxButton(552, 700 + 100, s_oSpriteLibrary.getSprite('p5shareup'));
            p5shareup.addEventListener(ON_MOUSE_UP, page5._up, page5);


            p5recorddown = new CGfxButton(375, 700 + 100, s_oSpriteLibrary.getSprite('p5recorddown'));
            p5recorddown.getButtonImage().alpha = 0;

            p5recordup = new CGfxButton(375, 700 + 100, s_oSpriteLibrary.getSprite('p5recordup'));
            p5recordup.addEventListener(ON_MOUSE_UP, page5._recordStart, page5);

            p5lunzi1 = createBitmap(s_oSpriteLibrary.getSprite('p5lunzi'));
            p5lunzi1.x = 220 + 58;
            p5lunzi1.regX = 58;
            p5lunzi1.regY = 58;
            p5lunzi1.y = 450 + 58 + 100;
            s_oStage.addChild(p5lunzi1);

            p5lunzi2 = createBitmap(s_oSpriteLibrary.getSprite('p5lunzi'));
            p5lunzi2.x = 420 + 58;
            p5lunzi2.y = 450 + 58 + 100;
            p5lunzi2.regX = 58;
            p5lunzi2.regY = 58;
            s_oStage.addChild(p5lunzi2);
        });

    }
    this.unload = function () {

    }
    this._up = function () {
        if (_recordId == 0) {
            showFail("请先录音才能制成");
            return;
        }
        wx.uploadVoice({
            localId: _recordId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                $.get("http://www.wexue.top:25000/spring/upRecord", {
                    openid: openid,
                    mediaid: serverId
                }, function (data) {
                    if (data.code == 0) {
                        mid = serverId;
                        wx.onMenuShareAppMessage({
                            title: UN + '送给你的新年问候,快打开来听听吧', // 分享标题
                            desc: '过年了,等你回家!', // 分享描述
                            link: "http://www.wexue.top/games/cj/friends.php?fid=" + openid + "&mid=" + mid, // 分享链接
                            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    }
                    s_oStage.addChild(p5sharetip);
                });
            }
        });
    }
    this._tryStop = function () {
        state = 3;
        tw1.pause();
        tw2.pause();
        p5playup.addEventListener(ON_MOUSE_UP, this._tryPlay, this);
        p5playdown.getButtonImage().alpha = 0;
        p5playup.getButtonImage().alpha = 1;
        wx.stopVoice({
            localId: _recordId
        });
    }
    this._tryPlay = function () {
        if (_recordId == 0) {
            showFail("请先录音才能播放");
            return;
        }
        if (state == 0) {
            showFail("请先结束录音才能播放");
            return;
        }
        text.text = "";
        state = 2;
        tw1 = createjs.Tween.get(p5lunzi1, {loop: true}).to({
            rotation: 360
        }, 1000, createjs.Ease.linear);
        tw2 = createjs.Tween.get(p5lunzi2, {loop: true}).to({
            rotation: 360
        }, 1000, createjs.Ease.linear);
        p5playup.addEventListener(ON_MOUSE_UP, this._tryStop, this);
        p5playdown.getButtonImage().alpha = 1;
        p5playup.getButtonImage().alpha = 0;
        wx.playVoice({
            localId: _recordId
        });
        wx.onVoicePlayEnd({
            success: function () {
                showFail("播放结束");
                page5._tryStop();
            }
        });
    }
    this._recordStop = function () {
        state = 1;
        tw1.pause();
        tw2.pause();
        p5recordup.addEventListener(ON_MOUSE_UP, this._recordStart, this);
        p5recorddown.getButtonImage().alpha = 0;
        p5recordup.getButtonImage().alpha = 1;
        wx.stopRecord({
            success: function (res) {
                _recordId = res.localId;
            }
        });
    }
    this._recordStart = function () {
        text.text = 1;
        if (state == 2) {
            this._tryStop();
        }
        state = 0;
        tw1 = createjs.Tween.get(p5lunzi1, {loop: true}).to({
            rotation: 360
        }, 1000, createjs.Ease.linear).call(function () {
            text.text = text.text + 1;
            if (text.text == 59) {
                page5._recordStop();
                text.text = "";
            }
        });
        tw2 = createjs.Tween.get(p5lunzi2, {loop: true}).to({
            rotation: 360
        }, 1000, createjs.Ease.linear);
        p5recordup.addEventListener(ON_MOUSE_UP, this._recordStop, this);
        p5recorddown.getButtonImage().alpha = 1;
        p5recordup.getButtonImage().alpha = 0;
        wx.startRecord({
            fail: function () {
                showFail("您的客户端不支持录音");
            }
        });
        wx.onVoiceRecordEnd({
            fail: function () {
                showFail("您的客户端不支持录音");
            },
            complete: function (res) {
                _recordId = res.localId;
                showFail("超过60秒,录音结束");
                page5._recordStop();
            }
        });
    }

    this.update = function () {

    }
    page5 = this;
    this.init();
}
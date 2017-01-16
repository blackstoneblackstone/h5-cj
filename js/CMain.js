function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _oData;
    var _oPreloader;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_iPrevTime = new Date().getTime();


        //版权信息
        var copyright = new createjs.Text(COPY_TEXT, "12px 微软雅黑", "#ffffff");
        copyright.textAlign = "center";
        copyright.textBaseline = "alphabetic";
        copyright.y = CANVAS_HEIGHT - 50;
        copyright.x = CANVAS_WIDTH / 2;
        s_oStage.addChild(copyright);
        s_oStage.setChildIndex(copyright, 200);

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
        CURRENT_PAGE = _oPreloader;
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(21);
    };

    this.preloaderReady = function () {
        this._initSounds();
        this._loadImages();
        _bUpdate = true;
    };

    //初始化声音
    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
        // createjs.Sound.registerSound("./sounds/bg.mp3", "bg");
        createjs.Sound.registerSound("./sounds/p4-mp3.mp3", "p4");

        RESOURCE_TO_LOAD += 1;
    };

    //下载图片
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("px", "./sprites/p-x.png");
        s_oSpriteLibrary.addSprite("p1denglong", "./sprites/p1-denglong.png");
        s_oSpriteLibrary.addSprite("p1ren1", "./sprites/p1-ren1.png");
        s_oSpriteLibrary.addSprite("p1bg", "./sprites/p1-bg.jpg");
        s_oSpriteLibrary.addSprite("p1ren2", "./sprites/p1-ren2.png");
        s_oSpriteLibrary.addSprite("p1ren3", "./sprites/p1-ren3.png");
        s_oSpriteLibrary.addSprite("p1ren12", "./sprites/p1-ren1-2.png");
        s_oSpriteLibrary.addSprite("p1ren22", "./sprites/p1-ren2-2.png");
        s_oSpriteLibrary.addSprite("p1ren32", "./sprites/p1-ren3-2.png");
        s_oSpriteLibrary.addSprite("p1text", "./sprites/p1-text.png");
        s_oSpriteLibrary.addSprite("p1text2", "./sprites/p1-text2.png");
        s_oSpriteLibrary.addSprite("p1zhuozi", "./sprites/p1-zhuozi.png");
        s_oSpriteLibrary.addSprite("p1bandeng", "./sprites/p1-bandeng.png");
        s_oSpriteLibrary.addSprite("p2bg", "./sprites/p2-bg.jpg");
        s_oSpriteLibrary.addSprite("p2bg2", "./sprites/p2-bg2.jpg");
        s_oSpriteLibrary.addSprite("p2ma", "./sprites/p2-ma.png");
        s_oSpriteLibrary.addSprite("p2ma2", "./sprites/p2-ma2.png");
        s_oSpriteLibrary.addSprite("p2wang", "./sprites/p2-wang.png");
        s_oSpriteLibrary.addSprite("p2text", "./sprites/p2-text.png");
        s_oSpriteLibrary.addSprite("p2text2", "./sprites/p2-text2.png");
        s_oSpriteLibrary.addSprite("p3ba", "./sprites/p3-ba.png");
        s_oSpriteLibrary.addSprite("p3bg1", "./sprites/p3-bg-1.jpg");
        s_oSpriteLibrary.addSprite("p3bg2", "./sprites/p3-bg-2.png");
        s_oSpriteLibrary.addSprite("p3bg3", "./sprites/p3-bg-3.jpg");
        s_oSpriteLibrary.addSprite("p3ma", "./sprites/p3-ma.png");
        s_oSpriteLibrary.addSprite("p3bama", "./sprites/p3-bama.png");
        s_oSpriteLibrary.addSprite("p3text2", "./sprites/p3-text2.png");
        s_oSpriteLibrary.addSprite("p3jiaozi", "./sprites/p3-jiaozi.png");
        s_oSpriteLibrary.addSprite("p3ji", "./sprites/p3-ji.png");
        s_oSpriteLibrary.addSprite("p3yu", "./sprites/p3-yu.png");
        s_oSpriteLibrary.addSprite("p3zhuozi", "./sprites/p3-zhuozi.png");
        s_oSpriteLibrary.addSprite("p4bg", "./sprites/p4-bg.jpg");
        s_oSpriteLibrary.addSprite("p4shan", "./sprites/p4-shan.png");
        s_oSpriteLibrary.addSprite("p4huoche", "./sprites/p4-huoche.png");
        s_oSpriteLibrary.addSprite("p4zui", "./sprites/p4-zui.png");
        s_oSpriteLibrary.addSprite("p5lunzi", "./sprites/p5-lunzi.png");
        s_oSpriteLibrary.addSprite("p5playdown", "./sprites/p5-play-down.png");
        s_oSpriteLibrary.addSprite("p5playup", "./sprites/p5-play-up.png");
        s_oSpriteLibrary.addSprite("p5player", "./sprites/p5-player.png");
        s_oSpriteLibrary.addSprite("p5recordup", "./sprites/p5-record-up.png");
        s_oSpriteLibrary.addSprite("p5recorddown", "./sprites/p5-record-down.png");
        s_oSpriteLibrary.addSprite("p5shareup", "./sprites/p5-share-up.png");
        s_oSpriteLibrary.addSprite("p5textbottom", "./sprites/p5-text-bottom.png");
        s_oSpriteLibrary.addSprite("p5texttop", "./sprites/p5-text-top.png");
        s_oSpriteLibrary.addSprite("p5sharetip", "./sprites/p5-sharetip.png");
        s_oSpriteLibrary.addSprite("yanhua", "./sprites/yanhua.png");


        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };


    //一个图片下载完成
    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
        if (_iCurResource === RESOURCE_TO_LOAD) {
            setTimeout(function () {
                s_oMain._gotoPage1();
            }, 100);
        }
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
        if (_iCurResource === RESOURCE_TO_LOAD) {
            setTimeout(function () {
                s_oMain._gotoPage1();
            }, 100);
        }
    };

    this._gotoPage1 = function () {
        _oPreloader.unload(function () {
            s_oStage.removeAllChildren();
            var bg = createBitmap(s_oSpriteLibrary.getSprite("p3bg1"));
            s_oStage.addChild(bg);
            CURRENT_PAGE = new CPage1();
        });
    }
    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };


    this.stopUpdate = function () {
        _bUpdate = false;
    };

    this.startUpdate = function () {
        _bUpdate = true;
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        CURRENT_PAGE.update();
        s_oStage.update(event);
    };

    s_oMain = this;

    this.initContainer();
}
var s_iPrevTime = 0;

var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oCanvas;

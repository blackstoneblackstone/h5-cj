function CPreloader() {
    var _oLoadingText;
    var _iPerc;
    var logo;
    var photo, x, xt, xin1, xin2, text;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg", "./sprites/p3-bg-1.jpg");
        s_oSpriteLibrary.addSprite("xin1", "./sprites/p-xin1.png");
        s_oSpriteLibrary.addSprite("xin2", "./sprites/p-xin2.png");
        s_oSpriteLibrary.addSprite("x", "./sprites/p-x.png");
        s_oSpriteLibrary.addSprite("photo", "./sprites/p-photo.jpg");
        s_oSpriteLibrary.addSprite("text", "./sprites/p-text.png");
        s_oSpriteLibrary.loadSprites();

    };
    this.unload = function (call) {
        createjs.Tween.get(photo).to({y: 200}, 500, createjs.Ease.bounceOut).to({
            y: 100,
            rotation: 360 * 2
        }, 800, createjs.Ease.linear).call(function () {
            createjs.Tween.get(xin1).to({alpha: 0}, 500, createjs.Ease.bounceOut);
            createjs.Tween.get(xin2).to({alpha: 0}, 500, createjs.Ease.bounceOut);
            createjs.Tween.get(text).to({alpha: 0}, 500, createjs.Ease.bounceOut);
            createjs.Tween.get(logo).to({alpha: 0}, 500, createjs.Ease.bounceOut);
            createjs.Tween.get(_oLoadingText).to({alpha: 0}, 500, createjs.Ease.bounceOut);
            createjs.Tween.get(photo).to({
                x: 300,
                y: 287,
                scaleX: 1,
                scaleY: 1
            }, 500, createjs.Ease.backInOut).call(function () {
                createjs.Tween.get(photo).to({
                    y: -900
                }, 1000, createjs.Ease.backInOut).call(call);
            });
        });
        createjs.Tween.get(x).to({x: CANVAS_WIDTH - 100, y: CANVAS_HEIGHT - 160}, 1000, createjs.Ease.linear);
    };
    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        this._attachSprites()
        s_oMain.preloaderReady();
    };

    //添加Loading页面的元素
    this._attachSprites = function () {
        var bg = createBitmap(s_oSpriteLibrary.getSprite("bg"));
        s_oStage.addChild(bg);
        xin1 = createBitmap(s_oSpriteLibrary.getSprite("xin1"));
        xin1.y = CANVAS_HEIGHT / 2 - 200 + 60;
        xin1.x = CANVAS_WIDTH / 2 - 127 + 10;
        s_oStage.addChild(xin1);
        photo = createBitmap(s_oSpriteLibrary.getSprite("photo"));
        photo.scaleX = 0.3;
        photo.scaleY = 0.25;
        // photo.rotation=20;
        photo.y = 520;
        photo.x = CANVAS_WIDTH / 2 - 12;
        photo.regY = 287;
        photo.regX = 300;
        s_oStage.addChild(photo);
        xin2 = createBitmap(s_oSpriteLibrary.getSprite("xin2"));
        xin2.y = CANVAS_HEIGHT / 2 - 100 + 60;
        xin2.x = CANVAS_WIDTH / 2 - 120 + 10;
        s_oStage.addChild(xin2);

        x = createBitmap(s_oSpriteLibrary.getSprite("x"));
        var s = new createjs.Shadow("#ffffff", 5, 5, 10);
        x.shadow = s;
        x.y = CANVAS_HEIGHT / 2 + 30;
        x.x = CANVAS_WIDTH / 2;
        x.regX = 59 / 2;
        x.regY = 56 / 2;
        s_oStage.addChild(x);

        xt = createjs.Tween.get(x, {loop: true}).to({scaleX: 1.5, scaleY: 1.5}, 1000, createjs.Ease.bounceOut).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, createjs.Ease.bounceIn).call(function () {

        });

        text = createBitmap(s_oSpriteLibrary.getSprite("text"));
        text.y = CANVAS_HEIGHT / 2 + 100 + 60;
        text.x = CANVAS_WIDTH / 2 - 90;
        s_oStage.addChild(text);

        _oLoadingText = new createjs.Text("0%", "30px STXingkai", "#ff0000");
        _oLoadingText.x = CANVAS_WIDTH / 2;
        _oLoadingText.y = CANVAS_HEIGHT / 2 + 100;
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        s_oStage.addChild(_oLoadingText);

        logo = createBitmap(s_oSpriteLibrary.getSprite("logo"));
        logo.regX = 100;
        logo.x = CANVAS_WIDTH / 2;
        logo.y = CANVAS_HEIGHT - 100;
        s_oStage.addChild(logo);
    };

    //执行
    this.update = function () {

    }

    this.refreshLoader = function (iPerc) {
        _iPerc = iPerc;
        _oLoadingText.text = _iPerc + "%";
    };


    this._init();


}


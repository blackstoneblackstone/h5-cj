/**
 * Created by lihb on 1/3/17.
 */
function CPage2() {
    var _p2bg;
    var _p2ma;
    var _p2ma2;
    var _p2bg2;
    var _p2wang;
    var _page2, p2text, p2text2, x;
    this.init = function () {
        var p4bg = createBitmap(s_oSpriteLibrary.getSprite('p3bg1'));
        s_oStage.addChild(p4bg);
        _p2bg = createBitmap(s_oSpriteLibrary.getSprite('p2bg'));
        _p2bg.y = CANVAS_HEIGHT;
        s_oStage.addChild(_p2bg);

        _p2bg2 = createBitmap(s_oSpriteLibrary.getSprite('p2bg2'));
        _p2bg2.x = CANVAS_WIDTH;
        s_oStage.addChild(_p2bg2);

        _p2ma = createBitmap(s_oSpriteLibrary.getSprite('p2ma'));
        _p2ma.x = -300;
        _p2ma.y = CANVAS_HEIGHT - 980;
        s_oStage.addChild(_p2ma);


        _p2wang = createBitmap(s_oSpriteLibrary.getSprite('p2wang'));
        _p2wang.x = 400 + CANVAS_WIDTH;
        _p2wang.y = 800;
        _p2wang.alpha = 0;
        s_oStage.addChild(_p2wang);


        _p2ma2 = createBitmap(s_oSpriteLibrary.getSprite('p2ma2'));
        _p2ma2.x = CANVAS_WIDTH;
        _p2ma2.y = (CANVAS_HEIGHT - 980) + 450;
        _p2ma2.scaleX = 0.5;
        _p2ma2.scaleY = 0.5;
        _p2ma2.alpha = 0;
        s_oStage.addChild(_p2ma2);

        p2text = createBitmap(s_oSpriteLibrary.getSprite('p2text'));
        p2text.x = 250;
        p2text.y = 100;

        p2text2 = createBitmap(s_oSpriteLibrary.getSprite('p2text2'));
        p2text2.x = 200;
        p2text2.y = 493;
        p2text2.regY = 393;

        var s = new createjs.Shadow("#ffffff", 5, 5, 10);
        x = createBitmap(s_oSpriteLibrary.getSprite("px"));
        x.shadow = s;
        x.y = CANVAS_HEIGHT - 160;
        x.x = CANVAS_WIDTH - 100;
        x.regX = 59 / 2;
        x.regY = 56 / 2;
        s_oStage.addChild(x);

        createjs.Tween.get(_p2bg).to({
            y: 0
        }, 500, createjs.Ease.backInOut).call(function () {

        });
        createjs.Tween.get(_p2ma).to({
            x: 10,
            y: CANVAS_HEIGHT - 980
        }, 2000, createjs.Ease.backInOut).call(function () {
            s_oStage.addChild(p2text);
            createjs.Tween.get(p2text, {loop: true}).to({
                x: 250 + 2,
                y: 100 + 2
            }, 300, createjs.Ease.backInOut).to({
                x: 250 - 2,
                y: 100 - 2
            }, 300, createjs.Ease.backInOut);
            createjs.Tween.get(_p2bg).wait(2000).to({
                x: -CANVAS_WIDTH
            }, 1000, createjs.Ease.backInOut).call(function () {
                s_oStage.removeChild(p2text);
            });
            createjs.Tween.get(_p2ma).wait(1500).to({
                x: CANVAS_WIDTH,
                y: (CANVAS_HEIGHT - 980) + 450,
                scaleX: 0.5,
                scaleY: 0.5
            }, 2000, createjs.Ease.backInOut).call(function () {
                s_oStage.removeChild(_p2ma);
            });
            createjs.Tween.get(_p2bg2).wait(2000).to({
                x: 0
            }, 1000, createjs.Ease.backInOut).call(function () {
                s_oStage.removeChild(_p2bg);

                createjs.Tween.get(_p2ma2).to({
                    alpha: 1,
                    x: -30,
                    y: CANVAS_HEIGHT - 980,
                    scaleX: 0.85,
                    scaleY: 0.85
                }, 1000, createjs.Ease.backInOut).call(function () {
                    s_oStage.removeChild(_p2bg);
                });
                createjs.Tween.get(_p2wang).to({
                    alpha: 1,
                    x: 400
                }, 100, createjs.Ease.backInOut).call(function () {
                    s_oStage.addChild(p2text2);

                    createjs.Tween.get(p2text2, {loop: true}).to({
                        scaleX: 1.1,
                        scaleY: 1.1
                    }, 800, createjs.Ease.bounceOut).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 500, createjs.Ease.linear);

                    createjs.Tween.get(x).wait(2000).to({
                        y: 900,
                        x: 350
                    }, 1000, createjs.Ease.backInOut).call(function () {
                        x.on("mousedown", _page2.goToNext);
                        createjs.Tween.get(x, {loop: true}).to({
                            scaleX: 1.5,
                            scaleY: 1.5
                        }, 1000, createjs.Ease.linear).to({
                            scaleX: 1,
                            scaleY: 1
                        }, 500, createjs.Ease.linear).call(function () {

                        });
                    });
                });
            });
        });
    }

    this.unload = function () {
        createjs.Tween.get(x).to({
            y: CANVAS_HEIGHT - 160,
            x: CANVAS_WIDTH - 100
        }, 1000, createjs.Ease.backInOut).call(function () {
            s_oStage.removeAllChildren();
            new CPage3();
        });
    }

    this.update = function () {

    }
    this.goToNext = function () {
        _page2.unload();

    }

    _page2 = this;
    this.init();
}



/**
 * Created by lihb on 1/3/17.
 */
function CPage3() {
    var _p3bg1;
    var _p3bg2;
    var _zhuozi;
    var _p3ma;
    var _p3ba;
    var _p3ji;
    var _p3yu;
    var _p3jiaozi;
    var _p1text;
    var _p3bg3;
    var _p3text2;
    var container1;
    var container2;
    var _page3, x, _CPage4;
    this.init = function () {

        container1 = new createjs.Container();
        _p3bg1 = createBitmap(s_oSpriteLibrary.getSprite('p3bg1'));
        _p3bg1.y = -1400;
        container1.addChild(_p3bg1);

        _p3ma = createBitmap(s_oSpriteLibrary.getSprite('p3ma'));
        _p3ma.y = 300;
        _p3ma.x = -(50 + 300);
        container1.addChild(_p3ma);

        _p3ba = createBitmap(s_oSpriteLibrary.getSprite('p3ba'));
        _p3ba.x = CANVAS_WIDTH - 400 + CANVAS_WIDTH;
        _p3ba.y = 250;
        container1.addChild(_p3ba);


        _zhuozi = createBitmap(s_oSpriteLibrary.getSprite('p3zhuozi'));
        _zhuozi.y = CANVAS_HEIGHT - 656 + CANVAS_HEIGHT;
        container1.addChild(_zhuozi);


        _p3yu = createBitmap(s_oSpriteLibrary.getSprite('p3yu'));
        _p3yu.y = CANVAS_HEIGHT - 780 + CANVAS_HEIGHT;
        _p3yu.x = 150;
        container1.addChild(_p3yu);

        _p3jiaozi = createBitmap(s_oSpriteLibrary.getSprite('p3jiaozi'));
        _p3jiaozi.y = CANVAS_HEIGHT - 500 + CANVAS_HEIGHT;
        _p3jiaozi.x = 350;
        container1.addChild(_p3jiaozi);

        _p3ji = createBitmap(s_oSpriteLibrary.getSprite('p3ji'));
        _p3ji.y = CANVAS_HEIGHT - 500 + CANVAS_HEIGHT;
        _p3ji.x = -50;
        container1.addChild(_p3ji);

        _p3bg2 = createBitmap(s_oSpriteLibrary.getSprite('p3bg2'));
        _p3bg2.alpha = 0;
        _p3bg2.scaleX = 5;
        _p3bg2.scaleY = 5;
        _p3bg2.x = CANVAS_WIDTH / 2;
        _p3bg2.y = CANVAS_HEIGHT / 2;
        _p3bg2.regX = CANVAS_WIDTH / 2;
        _p3bg2.regY = CANVAS_HEIGHT / 2;
        container1.addChild(_p3bg2);

        _p1text = createBitmap(s_oSpriteLibrary.getSprite('p1text'));
        _p1text.x = 120;
        _p1text.y = 60;
        container1.addChild(_p1text);


        createjs.Tween.get(_p3bg1).to({
            x: 0,
            y: 0
        }, 500, createjs.Ease.backInOut).call(function () {
            createjs.Tween.get(_p1text, {loop: true}).to({
                x: 120 + 2,
                y: 60 + 2
            }, 300, createjs.Ease.backInOut).to({
                x: 120 - 2,
                y: 60 - 2
            }, 300, createjs.Ease.backInOut);
        })
        createjs.Tween.get(_p3ma).to({
            x: 50
        }, 1000, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_p3ba).to({
            x: CANVAS_WIDTH - 400,
        }, 1000, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_zhuozi).to({
            y: CANVAS_HEIGHT - 656
        }, 500, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_p3yu).to({
            y: CANVAS_HEIGHT - 780
        }, 1000, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_p3jiaozi).to({
            y: CANVAS_HEIGHT - 500
        }, 1500, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_p3ji).to({
            y: CANVAS_HEIGHT - 500
        }, 2000, createjs.Ease.backInOut).call(function () {

        })
        createjs.Tween.get(_p3bg2).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1
        }, 3000, createjs.Ease.backInOut).call(function () {
            _page3.animate();
        })


        container2 = new createjs.Container();

        _p3bg3 = createBitmap(s_oSpriteLibrary.getSprite('p3bg3'));
        container2.addChild(_p3bg3);

        _p3text2 = createBitmap(s_oSpriteLibrary.getSprite('p3text2'));
        _p3text2.x = 50 + 620;
        _p3text2.y = 10 + 363;
        _p3text2.regX = 620;
        _p3text2.regY = 363;
        _p3text2.scaleX = 0.1;
        _p3text2.scaleY = 0.1;
        _p3text2.alpha = 0;

        container2.y = CANVAS_HEIGHT;
        container2.regX = 0;
        container2.regY = CANVAS_HEIGHT;
        container2.scaleX = 3;
        container2.scaleY = 3;
        container2.addChild(_p3text2);
        s_oStage.addChild(container2);

        container1.y = CANVAS_HEIGHT;
        container1.regY = CANVAS_HEIGHT;
        s_oStage.addChild(container1);

        var s = new createjs.Shadow("#ffffff", 5, 5, 10);
        x = createBitmap(s_oSpriteLibrary.getSprite("px"));
        x.shadow = s;
        x.y = CANVAS_HEIGHT - 160;
        x.x = CANVAS_WIDTH - 100;
        x.regX = 59 / 2;
        x.regY = 56 / 2;
        s_oStage.addChild(x);
    }

    this.animate = function () {
        createjs.Tween.get(container1).wait(1000).to({
            scaleX: 0,
            scaleY: 0
        }, 1000, createjs.Ease.linear).call(function () {
            s_oStage.removeChild(container1);
            createjs.Tween.get(_p3text2).to({
                alpha: 1,
                scaleY: 0.8,
                scaleX: 0.8
            }, 1000, createjs.Ease.backInOut).call(function () {
                createjs.Tween.get(_p3text2, {loop: true}).to({
                    scaleY: 1,
                    scaleX: 1
                }, 1000, createjs.Ease.backInOut).to({
                    scaleY: 0.8,
                    scaleX: 0.8
                }, 500, createjs.Ease.linear);
            });
            createjs.Tween.get(x).to({
                y: 650,
                x: 620
            }, 1000, createjs.Ease.backInOut).call(function () {
                createjs.Tween.get(x, {loop: true}).to({
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 1000, createjs.Ease.bounceOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 1000, createjs.Ease.bounceIn).call(function () {

                });
                x.on("mousedown", _page3.goToNext);
            });
        });
        createjs.Tween.get(container2).wait(1000).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, createjs.Ease.linear).call(function () {

        });
    }

    this.unload = function () {
        createjs.Tween.get(x).to({
            y: CANVAS_HEIGHT - 160,
            x: CANVAS_WIDTH - 100
        }, 500, createjs.Ease.backInOut).call(function () {
            new CPage4();
            setTimeout(function () {
                s_oStage.removeChild(container2);
                s_oStage.removeChild(x);
            }, 1000);
        });
    }
    this.update = function () {

    }
    this.goToNext = function () {
        _page3.unload();
        createjs.Sound.play("p4", {loop: -1});
    }
    _page3 = this;
    this.init();
}
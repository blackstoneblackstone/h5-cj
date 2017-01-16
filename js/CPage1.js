/**
 * Created by lihb on 1/3/17.
 */
function CPage1() {
    var _bg, container, x, _denglong, _ren1, _ren2, _ren3, _ren12,
        _ren22,
        _ren32,
        _text,
        _zhuozi,
        _bandeng,
        _text2,
        _page1;
    this.init = function () {
        container = new createjs.Container();
        _bg = createBitmap(s_oSpriteLibrary.getSprite('p1bg'));
        _denglong = createBitmap(s_oSpriteLibrary.getSprite('p1denglong'));
        _ren1 = createBitmap(s_oSpriteLibrary.getSprite('p1ren1'));
        _ren2 = createBitmap(s_oSpriteLibrary.getSprite('p1ren2'));
        _ren3 = createBitmap(s_oSpriteLibrary.getSprite('p1ren3'));
        _text = createBitmap(s_oSpriteLibrary.getSprite('p1text'));
        _text2 = createBitmap(s_oSpriteLibrary.getSprite('p1text2'));
        _zhuozi = createBitmap(s_oSpriteLibrary.getSprite('p1zhuozi'));
        _ren12 = createBitmap(s_oSpriteLibrary.getSprite('p1ren12'));
        _ren22 = createBitmap(s_oSpriteLibrary.getSprite('p1ren22'));
        _ren32 = createBitmap(s_oSpriteLibrary.getSprite('p1ren32'));
        _bandeng = createBitmap(s_oSpriteLibrary.getSprite('p1bandeng'));

        _bg.y = -1500;
        container.addChild(_bg);

        _denglong.x = 60;
        _denglong.y = -80;
        container.addChild(_denglong);

        _ren2.x = 0;
        _ren2.y = -345;
        _ren22.x = -100;
        _ren22.y = 200;
        _ren22.alpha = 0;
        container.addChild(_ren2);
        container.addChild(_ren22);

        _ren3.x = 730;
        _ren3.y = -800;
        _ren32.x = 650;
        _ren32.y = 600;
        _ren3.rotation = 10;
        _ren32.alpha = 0;
        _ren32.rotation = 10;
        _ren32.regX = 322;
        _ren32.regY = 491;
        _ren3.regX = 322;
        _ren3.regY = 491;
        container.addChild(_ren3);
        container.addChild(_ren32);

        _zhuozi.x = (CANVAS_WIDTH - 670) / 2;
        _zhuozi.y = -(CANVAS_HEIGHT - 700);
        container.addChild(_zhuozi);

        _bandeng.x = CANVAS_WIDTH;
        _bandeng.y = CANVAS_HEIGHT - 250;
        container.addChild(_bandeng);

        _ren1.y = -(CANVAS_HEIGHT - 540);
        _ren12.y = CANVAS_HEIGHT - 780;
        container.addChild(_ren1);

        _text.x = 100 + 491;
        _text.y = 50 + 363;
        _text.regX = 491;
        _text.regY = 363;
        _text.scaleX = 0;
        _text.scaleY = 0;
        _text2.x = 100 + 491;
        _text2.y = 50 + 363;
        _text2.regX = 491;
        _text2.regY = 363;
        container.addChild(_text);


        x = createBitmap(s_oSpriteLibrary.getSprite("px"));
        var s = new createjs.Shadow("#ffffff", 5, 5, 10);
        x.shadow = s;
        x.y = CANVAS_HEIGHT - 160;
        x.x = CANVAS_WIDTH - 100;
        x.regX = 59 / 2;
        x.regY = 56 / 2;
        container.addChild(x);

        s_oStage.addChild(container);

        this._animationInto();

    }

    this._animationInto = function () {
        createjs.Tween.get(_bg).to({x: 0, y: 0}, 500, createjs.Ease.backInOut).call(function () {

        });
        createjs.Tween.get(_denglong).to({x: 60, y: 80}, 1000, createjs.Ease.backInOut).call(function () {
            createjs.Tween.get(_denglong, {loop: true}).to({rotation: 5}, 1000, createjs.Ease.linear).to({rotation: 0}, 1000, createjs.Ease.linear).call(function () {

            });
        });
        createjs.Tween.get(_ren1).to({y: CANVAS_HEIGHT - 540}, 1000, createjs.Ease.backInOut).call(function () {

        });
        createjs.Tween.get(_ren2).to({y: 345}, 1500, createjs.Ease.backInOut).call(function () {

        });
        createjs.Tween.get(_ren3).to({y: 850}, 2000, createjs.Ease.backInOut).call(function () {
            createjs.Tween.get(_text).to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.backInOut).call(function () {

                createjs.Tween.get(_text, {loop: true}).to({
                    x: 100 + 491 - 2,
                    y: 50 + 363 + 2
                }, 100, createjs.Ease.backInOut).to({
                    x: 100 + 491 + 2,
                    y: 50 + 363 - 2
                }, 100, createjs.Ease.linear);

                createjs.Tween.get(_ren1, {}).wait(1500).to({
                    y: (CANVAS_HEIGHT - 780),
                    scaleX: 1.5,
                    scaleY: 1.5
                }, 1000, createjs.Ease.backInOut).to({alpha: 0.5}, 1).call(function () {
                    container.removeChild(_ren1);
                    container.addChild(_ren12);
                })

                createjs.Tween.get(_ren2, {}).wait(1500).to({
                    y: 200,
                    scaleX: 1.5,
                    scaleY: 1.5
                }, 1000, createjs.Ease.backInOut).to({alpha: 0.5}, 1).call(function () {
                    container.removeChild(_ren2);
                    _ren22.alpha = 1;
                })

                createjs.Tween.get(_ren3, {}).wait(1500).to({
                    scaleX: 1.5,
                    scaleY: 1.5
                }, 1000, createjs.Ease.backInOut).call(function () {
                    container.removeChild(_ren3);
                    _ren32.alpha = 1;
                    container.removeChild(_text);
                    container.addChild(_text2);


                    createjs.Tween.get(_text2, {loop: true}).to({
                        scaleX: 1.1,
                        scaleY: 1.1
                    }, 1000, createjs.Ease.backInOut).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 500, createjs.Ease.linear).call(function () {

                    });
                    createjs.Tween.get(x, {loop: true}).to({
                        scaleX: 1.5,
                        scaleY: 1.5
                    }, 1000, createjs.Ease.bounceOut).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 1000, createjs.Ease.bounceIn).call(function () {

                    });
                    x.on("mousedown", _page1.goToNext);
                })

            });
        });
        createjs.Tween.get(_zhuozi).to({y: (CANVAS_HEIGHT - 700)}, 1000, createjs.Ease.backInOut).call(function () {

        });
        createjs.Tween.get(_bandeng).to({x: (CANVAS_WIDTH - 200)}, 1000, createjs.Ease.backInOut).call(function () {

        });
    }
    this.unload = function () {
        createjs.Tween.get(container).to({y: -CANVAS_HEIGHT}, 500, createjs.Ease.linear).call(function () {
            container.removeAllChildren();
            s_oStage.removeChild(container);
            new CPage2();
        });
    }

    this.update = function () {
    }


    this.goToNext = function () {
        _page1.unload();
    }

    _page1 = this;

    this.init();

}
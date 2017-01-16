/**
 * Created by lihb on 1/3/17.
 */

function CPage4() {
    var _p4huoche, x;
    var playState = false;
    var _page4, container, _p4shan1, shanTw1, shanTw2, textInt, _p4shan2, lineContainer, text, lineContainer1, text1, animation, animation1, p4bg;
    this.init = function () {
        container = new createjs.Container();
        p4bg = createBitmap(s_oSpriteLibrary.getSprite('p4bg'));
        container.addChild(p4bg);
        createjs.Tween.get(p4bg).to({
            alpha: 1
        }, 2000, createjs.Ease.backInOut).call(function () {

        })
        var g = new createjs.Graphics();
        g.beginFill(createjs.Graphics.getRGB(255, 0, 0));
        g.drawCircle(0, 0, 3);
        var g1 = new createjs.Graphics();
        g1.beginFill(createjs.Graphics.getRGB(255, 255, 255));
        var gcommod = g1.drawCircle(0, 0, 4).command;
        lineContainer = new createjs.Container();
        lineContainer.x = CANVAS_WIDTH / 2;
        lineContainer.y = CANVAS_HEIGHT - 200;
        lineContainer.alpha = 0;
        lineContainer.addChild(new createjs.Shape(g1));
        lineContainer.addChild(new createjs.Shape(g));
        container.addChild(lineContainer);

        text = new createjs.Text("", 'bolder 40px "PingFang SC", "Lantinghei SC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", 微软雅黑, STHeitiSC-Light, simsun, 宋体, "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", sans-serif', "#ff0000");
        text.textBaseline = "alphabetic";
        text.textAlign = "center";
        text.width = 750;
        text.scaleX = 0.1;
        text.scaleY = 0.1;
        container.addChild(text);


        createjs.Tween.get(gcommod, {loop: true}).to({
            radius: 5
        }, 500, createjs.Ease.backInOut).to({
            radius: 4
        }, 500, createjs.Ease.backInOut).call(function () {

        });

        createjs.Tween.get(lineContainer).to({
            alpha: 1
        }, 2000, createjs.Ease.backInOut).call(function () {

        })

        var dx = random(50, 700);
        var dy = random(100, 500);
        createjs.Tween.get(lineContainer).to({
            x: dx,
            y: dy
        }, 1500, createjs.Ease.backIn).call(function () {
            var r = getRandom(1, 2.5);
            animation.x = dx;
            animation.y = dx;
            animation.alpha = 1;
            animation.scaleX = r;
            animation.scaleY = r;
            animation.gotoAndPlay("run");
            if (!animation.complete) {
                // not preloaded, listen for the complete event:
                animation.addEventListener("animationend", function () {
                    animation.alpha = 0;
                });
            }

            lineContainer.x = CANVAS_WIDTH / 2;
            lineContainer.y = CANVAS_HEIGHT - 200;
        });
        textInt = setInterval(function () {
            var dx = random(50, 700);
            var dy = random(100, 500);
            text.color = "rgba(" + parseInt(getRandom(100, 255)) + "," + parseInt(getRandom(100, 255)) + "," + parseInt(getRandom(100, 255)) + " , 0.7)";
            createjs.Tween.get(lineContainer).to({
                x: dx,
                y: dy,
            }, 2000, createjs.Ease.easeOut).call(function () {
                text.text = DM_TEXT[random(0, DM_TEXT.length - 1)];
                text.x = dx;
                text.y = dy;
                createjs.Tween.get(text).to({
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                }, 500, createjs.Ease.easeOut).call(function () {
                    createjs.Tween.get(text).wait(500).to({
                        alpha: 0,
                        scaleX: 0.1,
                        scaleY: 0.1
                    }, 500, createjs.Ease.easeOut).call(function () {
                    });
                });

                lineContainer.x = CANVAS_WIDTH / 2;
                lineContainer.y = CANVAS_HEIGHT - 200;
            });
        }, 2100);


        var g11 = new createjs.Graphics();
        g11.beginFill(createjs.Graphics.getRGB(255, 0, 0));
        g11.drawCircle(0, 0, 3);
        var g12 = new createjs.Graphics();
        g12.beginFill(createjs.Graphics.getRGB(255, 255, 255));
        var gcommod1 = g12.drawCircle(0, 0, 4).command;
        lineContainer1 = new createjs.Container();
        lineContainer1.x = CANVAS_WIDTH / 2;
        lineContainer1.y = CANVAS_HEIGHT - 200;
        lineContainer1.addChild(new createjs.Shape(g1));
        lineContainer1.addChild(new createjs.Shape(g));
        container.addChild(lineContainer1);

        text1 = new createjs.Text("", '40px "PingFang SC", "Lantinghei SC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", 微软雅黑, STHeitiSC-Light, simsun, 宋体, "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", sans-serif', "#ff0000");
        text1.textBaseline = "alphabetic";
        text1.textAlign = "center";
        text1.width = 750;
        text1.scaleX = 0.1;
        text1.scaleY = 0.1;
        container.addChild(text1);


        createjs.Tween.get(gcommod1, {loop: true}).to({
            radius: 5
        }, 500, createjs.Ease.backInOut).to({
            radius: 4
        }, 500, createjs.Ease.backInOut).call(function () {

        });

        var dx1 = random(200, 550);
        var dy1 = random(100, 500);
        createjs.Tween.get(lineContainer1).to({
            x: dx1,
            y: dy1
        }, 1500, createjs.Ease.backIn).call(function () {
            lineContainer1.x = CANVAS_WIDTH / 2;
            lineContainer1.y = CANVAS_HEIGHT - 200;
        });
        setInterval(function () {
            var dx1 = random(200, 550);
            var dy1 = random(100, 500);
            text1.color = "rgba(" + parseInt(getRandom(100, 255)) + "," + parseInt(getRandom(100, 255)) + "," + parseInt(getRandom(100, 255)) + " , 0.7)";
            createjs.Tween.get(lineContainer1).wait(1000).to({
                x: dx1,
                y: dy1,
            }, 2000, createjs.Ease.easeOut).call(function () {
                var r = getRandom(1, 2.5);
                animation.x = dx1;
                animation.y = dy1;
                animation.alpha = 1;
                animation.scaleX = r;
                animation.scaleY = r;
                animation.gotoAndPlay("run");
                if (!animation.complete) {
                    animation.addEventListener("animationend", function () {
                        animation.alpha = 0;
                    });
                }

                lineContainer1.x = CANVAS_WIDTH / 2;
                lineContainer1.y = CANVAS_HEIGHT - 200;
            });
        }, 3100);


        _p4shan1 = createBitmap(s_oSpriteLibrary.getSprite('p4shan'));
        _p4shan2 = createBitmap(s_oSpriteLibrary.getSprite('p4shan'));
        _p4shan1.y = CANVAS_HEIGHT - 485;
        _p4shan1.x = -1500;
        _p4shan2.x = 0;
        _p4shan2.y = CANVAS_HEIGHT - 485;
        container.addChild(_p4shan1);
        container.addChild(_p4shan2);
        _p4huoche = createBitmap(s_oSpriteLibrary.getSprite('p4huoche'));
        _p4huoche.y = CANVAS_HEIGHT - 230;
        _p4huoche.x = 180;
        container.addChild(_p4huoche);

        shanTw1 = createjs.Tween.get(_p4shan1, {loop: true}).to({
            x: 0
        }, 3000, createjs.Ease.linear).call(function () {

        });
        shanTw2 = createjs.Tween.get(_p4shan2, {loop: true}).to({
            x: 1500
        }, 3000, createjs.Ease.linear).call(function () {

        });


        var data = {
            images: [s_oSpriteLibrary.getSprite('yanhua')],
            frames: {width: 255, height: 255, spacing: 0},
            framerate: 10,
            animations: {
                stand: 15,
                run: [0, 15]
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        animation = new createjs.Sprite(spriteSheet, "stand");
        animation.regX = 255 / 2;
        animation.regY = 255 / 2;
        container.addChild(animation);


        var data1 = {
            images: [s_oSpriteLibrary.getSprite('p4zui')],
            frames: {width: 92, height: 92, spacing: 0},
            framerate: 4,
            animations: {
                stand: 0,
                run: [0, 1]
            }
        };
        var spriteSheet1 = new createjs.SpriteSheet(data1);
        animation1 = new createjs.Sprite(spriteSheet1, "run");
        animation1.x = CANVAS_WIDTH - 150;
        animation1.y = 60;
        animation1.on("mousedown", this._play);
        container.addChild(animation1);

        var s = new createjs.Shadow("#ffffff", 5, 5, 10);
        x = createBitmap(s_oSpriteLibrary.getSprite("px"));
        x.shadow = s;
        x.y = CANVAS_HEIGHT - 160;
        x.x = CANVAS_WIDTH - 100;
        x.regX = 59 / 2;
        x.regY = 56 / 2;
        container.addChild(x);
        container.x = CANVAS_WIDTH;
        s_oStage.addChild(container);
        createjs.Tween.get(container).to({x: 0}, 1000, createjs.Ease.linear).call(function () {
            createjs.Tween.get(x).to({x: 662, y: 1080}, 500, createjs.Ease.backInOut).call(function () {
                x.on("mousedown", _page4.goToNext);
                createjs.Sound.play("p4", {loop: -1});
                createjs.Tween.get(x, {loop: true}).to({
                    scaleX: 1.5,
                    scaleY: 1.5
                }, 1000, createjs.Ease.bounceOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 1000, createjs.Ease.bounceIn).call(function () {

                });
            });
        });
    }

    this._play = function () {
        if (playState) {
            playState = false;
            animation1.gotoAndPlay("run");
            createjs.Sound.play("p4", {loop: -1});
        } else {
            playState = true;
            animation1.gotoAndPlay("stand");
            createjs.Sound.stop("p4");
        }
    }
    this.unload = function () {
        createjs.Sound.stop("p4");
        container.removeChild(x, animation1);
        clearInterval(textInt);
        createjs.Tween.get(_p4huoche).to({
            x: -1640
        }, 2000, createjs.Ease.linear).call(function () {
            shanTw1.pause();
            shanTw2.pause();
            container.removeChild(_p4huoche);
        });

    }
    this.update = function () {

    }
    this.goToNext = function () {
        _page4.unload();
        new CPage5();
    }
    _page4 = this;
    this.init();
}
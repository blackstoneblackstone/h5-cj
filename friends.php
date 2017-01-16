<?php
$openid = $_GET['openid'];
$fid = $_GET['fid'];
$mid = $_GET['mid'];
if ($mid == null || $mid == "") {
    header("location:index.php");
    exit();
}
if ($openid == '' || $openid == null) {
    if ($_COOKIE['openid'] == null || $_COOKIE['openid'] == '') {
        $sourceUrl = "http://www.wexue.top/games/cj/friends.php?fid=" . $fid . "&mid=" . $mid;
        $sourceUrl = urlencode($sourceUrl);
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef15e6f871323efd&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=" . $sourceUrl . "#wechat_redirect");
    } else {
        $openid = $_COOKIE['openid'];
    }
} else {
    setcookie('openid', $openid);
}
if($openid==$fid){
    header("location:index.php");
    exit();
}

$wxParams = curlGet("http://www.wexue.top/wfj-wxjs.php?url=" . urlencode('http://www.wexue.top' . $_SERVER["REQUEST_URI"]));
$user = curlGet("http://www.wexue.top:25000/spring/user?openid=" . $openid . "&avatar=&username=&type=1");
$friend = curlGet("http://www.wexue.top:25000/spring/friend?openid=" . $fid . "&friend=" . $openid);
function curlGet($url)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $info = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Errno' . curl_error($ch);
    } else {
        // echo 'success!!!';

        curl_close($ch);

        return $info;
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>过年了,我有话想对你说</title>
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta name="viewport" content="width=480, target-densitydpi=device-dpi">
    <script>
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                var phoneScale = parseInt(window.screen.width) / 480;
                document.write('<meta name="viewport" content="width=480, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            } else {
                document.write('<meta name="viewport" content="width=480, target-densitydpi=device-dpi">');
            }
        } else {
            document.write('<meta name="viewport" content="width=480, user-scalable=no, target-densitydpi=device-dpi">');
        }

        var openid = "<?php echo $openid;?>";
        var fid = "<?php echo $fid;?>";
        var mid = "<?php echo $mid;?>";
    </script>
    <link href="css/weui.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <style>
        img {
            margin-left: auto;
            margin-right: auto;
        }

        #city {
            background-color: rgba(255, 255, 255, 1)
        }

        .city-item {
            width: 100%;
            text-align: center;
            display: none;
        }

        .city-item img {
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        .city-item span {
            display: block;
            margin-left: auto;
            margin-right: auto;
            color: #ffffff;
            font-size: 20px;
        }

        .lunzi {
            -webkit-animation: circle 1s infinite linear; /*匀速 循环*/
        }

        @-webkit-keyframes circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }

        @keyframes circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }
    </style>
</head>
<body ondragstart="return false;" ondrop="return false;"
      style="background: url(sprites/f-bg.jpg);background-size: 100%;">
<?php if ($friend == 0) { ?>
    <div id="header"
         style="text-align:center;font-size:20px;position: absolute;top:0;right: 0;left: 0;height: 50px;line-height: 50px;background-color: rgba(255,0,0,.5);color: #ffffff;">
        语音正在准备...
    </div>
    <div
        style="z-index:-1;position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
    <audio id="audio" preload="preload">
        您的浏览器不支持 audio 标签。
    </audio>
    <div style="width: 100%;text-align: center">
        <img src="sprites/f-text-top.png" style="width: 70%;margin-top: 80px">
        <br>
        <img src="sprites/f-xingli.png" style="width: 60%;margin-top: 20px">
        <br>
        <img id="listen" src="sprites/f-btn-listen-1.png" style="width: 40%;margin-top: 60px;">
        <br>
        <img id="duijiang" src="sprites/f-btn-duhuan-1.png" style="width: 40%;margin-top: 20px">
        <br>
        <img id="play" src="sprites/f-btn-play-1.png" style="width: 40%;margin-top: 20px">
        <br>
    </div>
    <div style="height: 50px;position: absolute;bottom: 20px;text-align: center;width:100%;">
        <img src="sprites/logo.png" style="height:40px;margin-right: auto;margin-left: auto">
    </div>

    <div id="city" class="animated fadeInDownBig"
         style="display:none;position: absolute;top:0;left: 0;right: 0;z-index: 99;background: url(sprites/f-bg.jpg);background-size: 100%">
        <div style="font-size: 20px;padding: 30px;color: #b4252d">
            关注公众号,点击"回家有礼"菜单,有机会获得王府井集团提供的精美礼品一份，数量有限，先到先得
        </div>
        <hr style="background-color: #ffffff;margin-bottom: 20px">
        <div class="weui-flex">
            <a href="javascript:;" style="margin: 20px;background-color: #642f08" id="selectCity"
               class="weui-btn weui-btn_primary weui-flex__item">
                选择你所在的地区
            </a>
            <a href="javascript:;" id="close" style="margin: 20px;" class="weui-btn weui-btn_warn">
                关闭
            </a>
        </div>

        <div style="color: #b4252d;font-size: 30px;width: 100%;text-align: center">长按二维码关注</div>
        <div id="beijing" class="city-item">
            <div>
                (北京)
            </div>
            <div>
                <img src="qcode/3.jpg">
                <span>北京市百货大楼</span>
            </div>
            <div>
                <img src="qcode/8.jpg">
                <span>大兴王府井百货</span>
            </div>
            <div>
                <img src="qcode/9.jpg">
                <span>东安市场</span>
            </div>
            <div>
                <img src="qcode/21.jpg">
                <span>双安商场</span>
            </div>
            <div>
                <img src="qcode/29.jpg">
                <span>长安商场</span>
            </div>
        </div>
        <div id="baotou" class="city-item">
            (包头)
            <div>
                <img src="qcode/1.jpg">
                <span>包头王府井百货昆区店</span>
            </div>
            <div>
                <img src="qcode/2.jpg">
                <span>包头王府井百货青山店</span>
            </div>
        </div>
        <div id="chengdu" class="city-item">
            (成都)
            <div>
                <img src="qcode/4.jpg">
                <span>成都王府井百货</span>
            </div>
            <div>
                <img src="qcode/5.jpg">
                <span>成都王府井购物中心</span>
            </div>
        </div>
        <div id="chongqing" class="city-item">
            (重庆)
            <div>
                <img src="qcode/6.jpg">
                <span>重庆王府井奥莱解放碑店</span>
            </div>
            <div>
                <img src="qcode/7.jpg">
                <span>重庆王府井百货沙坪坝店</span>
            </div>
        </div>
        <div id="eerduosi" class="city-item">
            (鄂尔多斯)
            <div>
                <img src="qcode/10.jpg">
                <span>鄂尔多斯王府井百货</span>
            </div>
        </div>
        <div id="fuzhou" class="city-item">
            (福州)
            <div>
                <img src="qcode/11.jpg">
                <span>福州王府井百货</span>
            </div>
        </div>
        <div id="guangzhou" class="city-item">
            (广州)
            <div>
                <img src="qcode/12.jpg">
                <span>广州王府井百货</span>
            </div>
        </div>
        <div id="huhehaote" class="city-item">
            (呼和浩特)
            <div>
                <img src="qcode/13.jpg">
                <span>呼和浩特王府井奥莱</span>
            </div>
        </div>
        <div id="jiaozuo" class="city-item">
            (焦作)
            <div>
                <img src="qcode/14.jpg">
                <span>焦作王府井百货</span>
            </div>
        </div>
        <div id="kunming" class="city-item">
            (昆明)
            <div>
                <img src="qcode/15.jpg">
                <span>昆明王府井百货</span>
            </div>
        </div>
        <div id="leshan" class="city-item">
            (乐山)
            <div>
                <img src="qcode/17.jpg">
                <span>乐山王府井购物中心</span>
            </div>
        </div>
        <div id="lanzhou" class="city-item">
            (兰州)
            <div>
                <img src="qcode/16.jpg">
                <span>兰州王府井百货</span>
            </div>
        </div>
        <div id="luoyang" class="city-item">
            (洛阳)
            <div>
                <img src="qcode/18.jpg">
                <span>洛阳王府井百货</span>
            </div>
            <div>
                <img src="qcode/19.jpg">
                <span>洛阳王府井购物中心</span>
            </div>
        </div>
        <div id="nanning" class="city-item">
            (南宁)
            <div>
                <img src="qcode/20.jpg">
                <span>南宁王府井奥莱</span>
            </div>
        </div>
        <div id="taiyuan" class="city-item">
            (太原)
            <div>
                <img src="qcode/22.jpg">
                <span>太原王府井百货</span>
            </div>
        </div>
        <div id="wulumuqi" class="city-item">
            (乌鲁木齐)
            <div>
                <img src="qcode/23.jpg">
                <span>乌鲁木齐王府井奥莱</span>
            </div>
        </div>
        <div id="wuhan" class="city-item">
            (武汉)
            <div>
                <img src="qcode/24.jpg">
                <span>武汉王府井百货</span>
            </div>
        </div>
        <div id="xian" class="city-item">
            (西安)
            <div>
                <img src="qcode/25.jpg">
                <span>西安王府井百货南门店</span>
            </div>
        </div>
        <div id="xining" class="city-item">
            (西宁)
            <div>
                <img src="qcode/26.jpg">
                <span>西宁王府井百货新宁广场店</span>
            </div>
            <div>
                <img src="qcode/27.jpg">
                <span>西宁王府井百货中心广场店</span>
            </div>
        </div>
        <div id="yinchuan" class="city-item">
            (银川)
            <div>
                <img src="qcode/28.jpg">
                <span>银川王府井百货</span>
            </div>
        </div>
        <div id="changsha" class="city-item">
            (长沙)
            <div>
                <img src="qcode/30.jpg">
                <span>长沙王府井百货</span>
            </div>
            <div>
                <img src="qcode/31.jpg">
                <span>长沙王府井FamilyPARK购物中心</span>
            </div>
        </div>
        <div id="zhengzhou" class="city-item">
            (郑州)
            <div>
                <img src="qcode/32.jpg">
                <span>郑州王府井百货</span>
            </div>
        </div>
        <div style="width: 100%;margin-bottom: 30px;margin-top:20px;text-align: center">
            <img src="sprites/logo.png" style="height:40px;margin-right: auto;margin-left: auto">
        </div>
    </div>
    <div id="playerDiv" class="animated bounceIn"
         style="display:none;position: absolute;top: 0;left: 0;right: 0;z-index: 1000;text-align: center">
        <img src="sprites/p5-record-down.png" id="stop" style="position: absolute;top:270px;left: 170px;height: 60px">
        <img src="sprites/p5-lunzi.png" class="lunzi" style="position: absolute;top:130px;left: 135px;height: 80px">
        <img src="sprites/p5-lunzi.png" class="lunzi" style="position: absolute;top:130px;right: 135px;height: 80px">
        <img src="sprites/p5-player.png" style="width: 80%;margin-left: auto;margin-right: auto;margin-top: 50px">
    </div>
<?php } else { ?>

    <div class="page" style="margin-top: 100px">
        <div class="weui-msg">
            <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title" style="font-size: 30px">超过次数限制</h2>
                <p class="weui-msg__desc" style="color: #ffffff;font-size: 20px">每人只能分享给3个好友,已经超过限制了</p>
            </div>
            <div class="weui-msg__opr-area">
                <p class="weui-btn-area">
                    <a href="index.php" class="weui-btn weui-btn_warn">玩游戏</a>
                </p>
            </div>
            <div class="weui-msg__extra-area">
                <div class="weui-footer">
                    <div style="width: 100%;margin-bottom: 30px;margin-top:20px;text-align: center">
                        <img src="sprites/logo.png" style="height:40px;margin-right: auto;margin-left: auto">
                    </div>
                </div>
            </div>
        </div>
    </div>


<?php } ?>
<script type="text/javascript" src="lib/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="jplayer/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="lib/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"></script>
<script type="text/javascript" src="lib/weui.min.js"></script>
<script type="text/javascript" src="js/friends.js"></script>
<script type="text/javascript" src="http://pingjs.qq.com/h5/stats.js" name="MTAH5" sid="500387182" ></script>
<script type="text/javascript">

    wx.config(
        <?php echo $wxParams;?>
    );
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '过年了,等你回家', // 分享标题
            link: 'http://www.wexue.top/games/cj/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
            success: function () {
                MtaH5.clickShare('timelineshare');
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '过年了,等你回家', // 分享标题
            desc: '过年了,你还不回家,在等什么?', // 分享描述
            link: 'http://www.wexue.top/games/cj/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                MtaH5.clickShare('msgshare');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });

</script>
</body>
</html>
<?php
$openid = $_GET['openid'];
$un = $_GET['un'];
if ($openid == '' || $openid == null) {
    if ($_COOKIE['openid'] == null || $_COOKIE['openid'] == '') {
        $sourceUrl = "http://www.wexue.top/games/cj/index.php";
        $sourceUrl = urlencode($sourceUrl);
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef15e6f871323efd&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxInfoAuth.php&response_type=code&scope=snsapi_userinfo&state=" . $sourceUrl . "#wechat_redirect");
    } else {
        $openid = $_COOKIE['openid'];
        $un = $_COOKIE['un'];
    }
} else {
    setcookie('openid', $openid);
    setcookie('un', $un);
}
$surl = $_SERVER["REQUEST_URI"];
if (strpos($surl, "&") > 0) {
    $wxParams = curlGet("http://www.wexue.top/wfj-wxjs.php?url=" . urlencode('http://www.wexue.top/games/cj/index.php?openid=' . $openid . "&un=") . urlencode($un));
} else {
    $wxParams = curlGet("http://www.wexue.top/wfj-wxjs.php?url=" . urlencode('http://www.wexue.top' . $_SERVER["REQUEST_URI"]));
}
$un = base64_decode($un);
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
    <title>过年了,等你回家</title>
    <link rel="stylesheet" href="css/index.css" type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta name="viewport" content="width=750, target-densitydpi=device-dpi">
    <script>
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                var phoneScale = parseInt(window.screen.width) / 750;
                document.write('<meta name="viewport" content="width=750, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            } else {
                document.write('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">');
            }
        } else {
            document.write('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
        }

        var openid = "<?php echo $openid;?>";
        var UN = "<?php echo $un;?>";
        var mid = "";
        var CANVAS_WIDTH = 750;
        var CANVAS_HEIGHT = 1350;
        var STATE = 10000;
        var STATE_LOADING = 0;
        var STATE_PAGE1 = 1;
        var STATE_PAGE2 = 2;
        var STATE_PAGE3 = 3;
        var STATE_PAGE4 = 4;
        var STATE_PAGE5 = 5;
        var COPY_TEXT = "王府井版权所有";
        var ON_MOUSE_DOWN = 0;
        var ON_MOUSE_UP = 1;
        var ON_MOUSE_OVER = 2;
        var ON_MOUSE_OUT = 3;
        var ON_DRAG_START = 4;
        var ON_DRAG_END = 5;

        var CURRENT_PAGE;

        var DM_TEXT = [
            "过年了，快回家吧!",
            "年终奖发了吗?",
            "打麻将啦，三缺一",
            "胖子，你妈喊你回家过年!",
            "过年了还不回家,你再想什么?",
            "有钱没钱,回家过年!",
            "买回家的火车票了吗?"
        ];
        function audioAutoPlay(id){
            document.addEventListener("WeixinJSBridgeReady", function () {
                var audio = document.getElementById(id);
                audio.play();
            }, false);
        }
        audioAutoPlay('music');
    </script>
</head>
<body ondragstart="return false;" ondrop="return false;">
<div id="header"
     style="z-index:999;text-align:center;font-size:20px;display:none;position: absolute;top:0;right: 0;left: 0;height: 60px;line-height: 60px;background-color: rgba(255,0,0,.3);color: #ffffff;">

</div>
<div style=display:none;font-weight:100;font-family:
"PingFang SC", "Lantinghei SC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", 微软雅黑, STHeitiSC-Light, simsun,
宋体, "WenQuanYi Zen Hei", "WenQuanYi Micro Hei", sans-serif;>

</div>
<canvas id="c" class='ani_hack' width="750" height="1300"
        style="position:absolute;z-index:-1;height: 100%;width: 100%;">
</canvas>
<canvas id="canvas" class='ani_hack' width="750" height="1330"
        style="position:absolute;z-index:10;height: 100%;width: 100%;">
</canvas>
<img id="musicbtn" src="sprites/music1.png" style="position: absolute;top: 50px;right: 50px;z-index: 9999;">
<audio id="music" src="sounds/bgmp3.mp3" preload="auto" autoplay="autoplay" loop="loop"></audio>
<script type="text/javascript" src="lib/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="lib/createjs-2014.12.12.min.js"></script>
<script type="text/javascript" src="lib/jweixin-1.0.0.js"></script>
<script>
    var _mtac = {"performanceMonitor":1};
    (function() {
        var mta = document.createElement("script");
        mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
        mta.setAttribute("name", "MTAH5");
        mta.setAttribute("sid", "500387182");
        mta.setAttribute("cid", "500388882");
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    })();
</script>
<script type="text/javascript" src="js/index.js?v=2"></script>
<script type="text/javascript">

    var playState = true;
    $("#musicbtn").click(function () {
        if (playState) {
            document.getElementById("music").pause();
            $("#musicbtn").attr("src","sprites/music2.png");
            playState = false;
        } else {
            document.getElementById("music").play();
            $("#musicbtn").attr("src","sprites/music1.png");
            playState = true;
        }
    });
    $.get("http://www.wexue.top:25000/spring/user", {
        openid: openid,
        avatar: '',
        username: UN,
        type: 0
    }, function (data) {

    });

    wx.config(
        <?php echo $wxParams;?>
    );
    wx.ready(function () {
        new CMain();
        wx.onMenuShareTimeline({
            title: '过年了,等你回家', // 分享标题
            link: 'http://www.wexue.top/games/cj/index.php', // 分享链接
            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
            success: function () {
                MtaH5.clickStat('timelineshare');
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '过年了,等你回家', // 分享标题
            desc: '过年了,你还不回家,在想什么!', // 分享描述
            link: "http://www.wexue.top/games/cj/friends.php?fid=" + openid + "&mid=" + mid, // 分享链接
            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                MtaH5.clickStat('msgshare');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });

</script>

<script>
//    $(function () {
//        new CMain();
//    });
</script>
</body>
</html>
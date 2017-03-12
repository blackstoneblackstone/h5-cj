<?php
$openid = $_GET['openid'];
if ($openid == '' || $openid == null) {
    if ($_COOKIE['openid'] == null || $_COOKIE['openid'] == '') {
        $sourceUrl = "http://www.wexue.top/games/cj/price.php";
        $sourceUrl = urlencode($sourceUrl);
        header("location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef15e6f871323efd&redirect_uri=http%3a%2f%2fwww.wexue.top%2fwxAuth.php&response_type=code&scope=snsapi_base&state=" . $sourceUrl . "#wechat_redirect");
    } else {
        $openid = $_COOKIE['openid'];
    }
} else {
    setcookie('openid', $openid);
}

$wxParams = curlGet("http://www.wexue.top/wfj-wxjs.php?url=" . urlencode('http://www.wexue.top' . $_SERVER["REQUEST_URI"]));
$pricestate = curlGet("http://www.wexue.top:25000/spring/priceState?openid=" . $openid);
if ($pricestate == 2) {
    header("location:index.php");
}
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
    <title>我的奖品</title>
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
    </script>
    <link href="css/weui.css" rel="stylesheet">
    <style>
        .weui-flex__item > {
            text-align: center;
        }

        .weui-flex__item > img {
            height: 60px;
        }

    </style>
</head>
<body ondragstart="return false;" ondrop="return false;"
      style="background: url(sprites/p5-bg.jpg) no-repeat;background-size: 100% 100%;text-align: center">

<div class="weui-flex" style="font-size: 30px;color: #eed9b3;font-weight: bolder;padding: 20px;margin-top: 70px">
    春节将至,王府井集团为您送来一份新年礼物
</div>
<div class="weui-flex" style="text-align: center">
    <img src="sprites/price-li.png" style="margin-left: 80px;width: 400px;">
</div>
<div class="weui-flex" style="margin-top: 50px">
    <div class="weui-flex__item" id="play">
        <img src="sprites/price-play.png">
    </div>
    <?php if ($pricestate == 0) {
        ?>
        <div class="weui-flex__item" id="dj">
            <img src="sprites/price-dj.png">
        </div>
    <?php } ?>
    <?php if ($pricestate != 0) {
        ?>
        <div class="weui-flex__item">
            <img src="sprites/price-dj-h.png">
        </div>
    <?php } ?>
</div>
<div style="color: #eed9b3;font-size: 16px;padding: 40px;text-align: left">
    <p>1.领取方法：选择您附近的王府井门店并关注微信公众号，即有机会到店领取精美礼品一份</p>
    <p>2.礼品数量有限，先到先得，领完即止</p>
    <p>3.每个微信号只能领取一份礼品</p>
    <p>4.领取时间：2017年1月20日至2017年2月2日</p>
    <p>5.领取地点详询门店</p>
</div>
<div style="height: 50px;text-align: center;width:100%;">
    <img src="sprites/logo.png" style="height:40px;margin-right: auto;margin-left: auto">
</div>
<div class="js_dialog" id="androidDialog1" style="opacity: 1;display: none">
    <div class="weui-mask"></div>
    <div class="weui-dialog weui-skin_android">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">输入兑奖密码</strong></div>
        <div class="weui-dialog__bd">
            <input type="tel" class="weui-input" id="pwd"
                   style="height: 60px;border: solid #cccccc 1px;font-size: 30px">
        </div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" id="cancel" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
            <a href="javascript:;" id="confirm" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
        </div>
    </div>
</div>
<div id="toast" style="display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
    </div>
</div>
<script type="text/javascript" src="lib/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="lib/weui.min.js"></script>
<script type="text/javascript" src="lib/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="http://pingjs.qq.com/h5/stats.js" name="MTAH5" sid="500387182"></script>
<script type="text/javascript">
    function toast(text) {
        $(".weui-toast__content").text(text);
        var $toast = $('#toast');
        if ($toast.css('display') != 'none') return;
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000);
    }
    $("#play").click(function () {
        window.location.href = "index.php";
    });
    $("#dj").click(function () {
        $("#androidDialog1").fadeIn(200);
    });
    $("#cancel").click(function () {
        $("#androidDialog1").fadeOut(200);
    });
    $("#confirm").click(function () {
        $("#androidDialog1").fadeOut(200);
        var pwd = $("#pwd").val();
        $.ajax({
            url: "http://www.wexue.top:25000/spring/price",
            type: 'get',
            data: {pwd: pwd, openid: openid},
            success: function (data) {
                if (data.code == 0) {
                    toast(data.msg);
                    window.location.reload();
                } else {
                    toast(data.msg);
                }
            }
        })
    });
    wx.config(
        <?php echo $wxParams;?>
    );
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '过年了,等你回家', // 分享标题
            link: 'http://www.wexue.top/games/cj/', // 分享链接
            imgUrl: 'http://www.wexue.top/games/cj/sprites/page1.png', // 分享图标
            success: function () {
                MtaH5.clickShare('timelineshare');
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '过年了,等你回家', // 分享标题
            desc: '过年了,等你回家', // 分享描述
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
/**
 * Created by lihb on 1/10/17.
 */
var audioMain = $("#audio");
var playState = false;
audioMain.jPlayer({
    ready: function (event) {
        $(this).jPlayer("setMedia", {
            mp3: "http://www.wexue.top/games/cj/record/" + mid + ".mp3"
        });
        $("#header").fadeOut();
        playState = true;
    },
    swfPath: "jplayer/jquery.jplayer.swf", // jquery.jplayer.swf 文件存放的位置
    supplied: "oga,m4a,mp3",
    wmode: "window", // 设置Flash 的wmode，具体设置参见文档说明，写window 就好了
    useStateClassSkin: true, // 默认情况下，播放和静音状态下的dom 元素会添加class jp-state-playing, jp-state-muted 这些状态会对应一些皮肤，是否使用这些状态对应的皮肤。
    autoBlur: false, // 点击之后自动失去焦点
    smoothPlayBar: true, // 平滑过渡
    keyEnabled: true, // 是否允许键盘控制播放
    remainingDuration: true, // 是否显示剩余播放时间,如果为false 那么duration 那个dom显示的是【3:07】,如果为true 显示的为【-3:07】
    toggleDuration: true //允许点击剩余时间的dom 时切换 剩余播放时间的方式，比如从【3:07】点击变成【-3：07】如果设置为false ,那么点击无效，只能显示remainingDuration 设置的方式。
});
function showTip(text) {
    $("#header").text(text);
    $("#header").fadeIn();
    setTimeout(function () {
        $("#header").fadeOut();
    }, 2000);
}
$(function () {
    $("#cityName").text(remote_ip_info.city);
    var city = remote_ip_info.city;
    var cityArray = [{
        label: '北京',
        value: "beijing"
    }, {
        label: '长沙',
        value: 'changsha'
    }, {
        label: '银川',
        value: 'yinchuan'
    }, {
        label: '西宁',
        disabled: true,
        value: 'xining'
    }, {
        label: '西安',
        value: 'xian'
    }, {
        label: '武汉',
        value: 'wuhan'
    }, {
        label: '乌鲁木齐',
        value: 'wulumuqi'
    }, {
        label: '太原',
        value: 'taiyuan'
    }, {
        label: '洛阳',
        value: 'luoyang'
    }, {
        label: '兰州',
        value: 'lanzhou'
    }, {
        label: '乐山',
        value: 'leshan'
    }, {
        label: '昆明',
        value: 'kunming'
    }, {
        label: '焦作',
        value: 'jiaozuo'
    }, {
        label: '呼和浩特',
        value: 'huhehaote'
    }, {
        label: '广州',
        value: 'guangzhou'
    }, {
        label: '福州',
        value: 'fuzhou'
    }, {
        label: '鄂尔多斯',
        value: 'eerduosi'
    }, {
        label: '重庆',
        value: 'chongqing'
    }, {
        label: '成都',
        value: 'chengdu'
    }, {
        label: '包头',
        value: 'baotou'
    }];

    for (var i = 0; i < cityArray.length; i++) {
        if (city == cityArray[i].label) {
            $("#" + cityArray[i].value).show();
        }
    }
    $('#selectCity').on('click', function () {
        weui.picker(cityArray, {
            onChange: function (result) {

            },
            onConfirm: function (result) {
                $('.city-item').hide();
                $("#" + result[0]).fadeIn();
            }
        });
    });

    $("#listen").click(function () {
        if (playState) {
            audioMain.jPlayer("play", 0);
            $("#playerDiv").fadeIn();
            audioMain.bind($.jPlayer.event.ended, function () {
                $("#playerDiv").fadeOut();
                audioMain.jPlayer("stop", 0);
                showTip("话说完了");
            });
        } else {
            showTip("播放器还没准备就绪,稍后再试...");
        }
    });
    $("#close").click(function () {
        $("#city").fadeOut();
    });
    $("#duijiang").click(function () {
        $("#city").fadeIn();
    });

    $("#play").click(function () {
        window.location.href = "index.php";
    });
    $("#stop").click(function () {
        $("#playerDiv").fadeOut();
        audioMain.jPlayer("stop", 0);
    });

});

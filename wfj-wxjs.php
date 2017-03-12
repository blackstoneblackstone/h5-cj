<?php
header("Access-Control-Allow-Origin: *");
$url = $_GET['url'];
class JSSDK {
    private $appId;
    private $appSecret;
    public function __construct($appId, $appSecret) {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
    }
    public function getSignPackage($url) {
        $jsapiTicket = $this->getJsApiTicket();
        if(!$url) {
            $url = "http://$_SERVER[HTTP_HOST]" . '/';
        }
        $timestamp = time();
        $nonceStr = $this->createNonceStr();
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
        $signature = sha1($string);
        $signPackage = array(
            "appId"     => $this->appId,
            "nonceStr"  => $nonceStr,
            "timestamp" => $timestamp,
            "url"       => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }
    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    private function getFileName($name) {
        //$fileName = sys_get_temp_dir() . "/weixin-" . $name;
        $fileName = dirname(__FILE__) . "/weixin-". $name;
        return $fileName;
    }

    private function saveData($name, $content) {
        $fileName = $this->getFileName($name);

        $fp = fopen($fileName, "wb+");
        if($fp) {
            fwrite($fp, $content);
            fclose($fp);
        }

        return;
    }

    private function loadData($name, $defaultContent) {
        $fileName = $this->getFileName($name);
        $content = file_get_contents($fileName);

        if($content) {
            return $content;
        }
        else {
            return $defaultContent;
        }

        return;
    }

    private function getJsApiTicket() {
        $data = json_decode($this->loadData("wfj_jsapi_ticket.json", '{"jsapi_ticket":"", "expire_time":0}'));
        if ($data->expire_time < time()) {
            $accessToken = $this->getAccessToken();
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
            $res = json_decode($this->httpGet($url));
            $ticket = $res->ticket;
            if ($ticket) {
                $data->expire_time = time() + 3600;
                $data->jsapi_ticket = $ticket;
                $this->saveData("wfj_jsapi_ticket.json",  json_encode($data));
            }
        } else {
            $ticket = $data->jsapi_ticket;
        }
        return $ticket;
    }

    private function getAccessToken() {
        $data = json_decode($this->loadData("wfj_access_token.json", '{"access_token":"", "expire_time": 0}'));
        if ($data->expire_time < time()) {
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
            $res = json_decode($this->httpGet($url));
            if(!isset($res->access_token)) {
                print_r($res);
                exit;
            }

            $access_token = $res->access_token;
            if ($access_token) {
                $data->expire_time = time() + 3000;
                $data->access_token = $access_token;
                $this->saveData("wfj_access_token.json", json_encode($data));
            }
        } else {
            $access_token = $data->access_token;
        }
        return $access_token;
    }

    private function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }
}

session_start();
if(!isset($_REQUEST['url'])) {
    echo "invalid arguments";
    exit;
}

$appID = "wxef15e6f871323efd";
$appSecret = "a67cb321429a3410146e220e93114e15";

$url = urldecode($url);


$jssdk = new JSSDK($appID, $appSecret);
$signPackage = $jssdk->getSignPackage($url);
$signPackage['jsApiList'] = array('checkJsApi', 'chooseImage',
    'onMenuShareTimeline', 'onMenuShareAppMessage',
    'onMenuShareQQ', 'previewImage', 'uploadImage',
    'downloadImage', 'getNetworkType','startRecord','stopRecord','onVoiceRecordEnd'
,'playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice');
echo json_encode($signPackage);
?>
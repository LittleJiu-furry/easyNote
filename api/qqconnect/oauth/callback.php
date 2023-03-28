<?php
error_reporting(0);
require_once("../API/qqConnectAPI.php");
$qc = new QC();
// $access_token = $qc->qq_callback();
// $user_openid = $qc->get_openid();

// 请求接口数据
$user_info = $qc->__call("get_user_info","");
class user_info{
    var $nickname;
    var $icon;
}

$ui = new user_info();
$ui->nickname = $user_info["nickname"];
$ui->icon = $user_info["figureurl_qq"];

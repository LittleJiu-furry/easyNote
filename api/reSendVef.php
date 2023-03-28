<?php
error_reporting(0);
// 请求服务器静态配置文件
include_once("./conn/conf.php");
require("./PHPMailer.use.php");

// GET方法，需要获得GET参数
$emailAdd = $_GET["em"];
$inputUser = $_GET["inputuser"];
$VefCode = getVef();
$emailBody = '<html>
<body>
    <center><h2 style="color:red">欢迎加入</h2></center>
    <hr>
    <p><strong><span>'.$inputUser.'</span>,你好</strong></p>
    <br>
    <p>欢迎注册本站</p>
    <p>你的验证代码为：<strong><span>'.$VefCode.'</span></strong></p>
    <br>
    <br>
    <span>你会收到本邮件，是因为有人使用了你的邮箱注册了 <span>'.$_conf["siteTitle"].'</span></span>
    <br>
    <span>如非你本人操作，请忽略本邮件</span>
</body>
</html>';

$em = new emUse($_conf["SMTP_host"],$_conf["SMTP_Auth"],$_conf["SMTP_username"],$_conf["SMTP_PWD"],$_conf["SMTP_port"]);
$em->send_mail($_conf["SMTP_fromAddress"],$_conf["SMTP_fromName"],$emailAdd,$emailBody); // 发送邮件验证


function getVef(){
    // 生成方法：
    // 取当前时间戳，对时间戳取MD5值，取出前10位，再取MD5值，再取前6位，生成验证代码
    $now = time(); // 秒级时间戳
    $tempMD5 = substr(md5($now),0,10); // 中间MD5
    $ret = substr(md5($tempMD5),0,6);

    // 向服务器记录注册验证码
    include_once("./conn/sql.inc.php");
    $sql = new mysqli($host,$username,$passwd,$database,$port);
    if($sql->connect_error){
        die(); // 直接结束本脚本执行，如果无法发送，用户可以使用验证页面的重发验证码来实现重发
    }
    // 记录到数据库
    saveVefCode($sql,$pre,$ret);
    return $ret;
}

function saveVefCode(\mysqli $sql,$pre,$vef){
    // $sql : 数据库操作游标指针
    // $pre : 记录的数表前缀

    // 先记录code的信息
    $code_uuid = rand_str(10);
    $code_st = time();
    $code_for = "REG_" . base64_encode($GLOBALS["emailAdd"]);
    $code_content = $vef;
    $sql->query("insert into `". $pre ."code`(`code_id`,`code_content`,`code_st`,`code_for`) value('".$code_uuid."','".$code_content."','".$code_st."','".$code_for."');");

    
}

function rand_str(int $length):string{
    $tempArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    $tempArray = str_shuffle($tempArray);
    $str_len = strlen($tempArray);
    $retStr = "";
    for ($i=0; $i < $length; $i++) { 
        $q = mt_rand(0,$str_len - 1);
        $retStr = $retStr . $tempArray[$q];
    }
    return $retStr;
}



?>
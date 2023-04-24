<?php
error_reporting(0);
class retmsg{
    var $code;
    var $msg;
}
$vefcode = $_GET["code"];
$em = $_GET["em"];

if($vefcode == "" or $vefcode == null){
    die(retMsgFunction(-1,"验证失败，可能是验证码不正确或已失效"));
}

include_once("./conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port);

if($sql->connect_error){
    die(retMsgFunction(-1,"无法验证"));
}

// 处理验证码，转base64并取md5
$vefcode = dealVefcode($vefcode);
// 查询
$code_id = $sql->query("select `code` from `" . $pre .  "user` where `uid` = '" . $_COOKIE["user_uid"] . "';")->fetch_assoc();
$code_info = $sql->query("select * from `". $pre . "code` where `code_id` = '" . $code_id["code"] . "' and `code_for` = 'REG_" . base64_encode($em) ."';")->fetch_assoc();
if($vefcode == $code_info["code_content"] and time() - $code_info["code_st"] < 300){
    die(retMsgFunction(0,"验证成功"));
}
else{
    die(retMsgFunction(-1,"验证失败，可能是验证码不正确或已失效"));
}


function retMsgFunction($code,$msg){
    $tempRet = new retmsg();
    $tempRet->code = $code;
    $tempRet->msg = $msg;
    return json_encode($tempRet,JSON_UNESCAPED_UNICODE);
}

function dealVefcode($o_vef){
    $tempB64 = base64_encode($o_vef);
    return md5($tempB64);
}

?>
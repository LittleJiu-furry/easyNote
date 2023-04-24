<?php
error_reporting(0);
// 临时性质模拟数据
class retMsgClass{
    var $login;
    var $name;
    var $icon;
}
$t = new retMsgClass();
$t->login = "false";
$t->name = "狐小九Little_Jiu";
$t->icon = "./static/img/testicon.jpg";
die(json_encode($t,JSON_UNESCAPED_UNICODE));

// 校验用户cookie
$token = $_COOKIE["u_token"];
if($token == "" || $token == null){
    // 用户不存在用于二次登录验证的cookie
    die(retMsg(false,"",""));
}

// 二次登录验证的cookie包含的凭证信息
// {
//     "uid":"",
//     "pwd_sha256":"",
//     "login_type":2  1是密码登录，2是cookie登录
// }


include_once("./conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port);
if($sql->connect_error){
    die(retMsg(false,"",""));
}

$user_token = json_decode($token);
// 获得服务端记录的密钥
if($user_token["login_type"] == 1){
    $user_info = $sql->query("select * from `".$pre."user` where `em` = '".$user_token["em"]."';")->fetch_assoc();
}
elseif($user_token["login_type"] == 1){
    $user_info = $sql->query("select * from `".$pre."user` where `uid` = '".$user_token["uid"]."';")->fetch_assoc();
}
$user_pwd_i = $user_info["pwd_i"];
$user_pwd[] = $user_info["pwd_1"];
$user_pwd[] = $user_info["pwd_2"];
$user_pwd[] = $user_info["pwd_3"];
$user_pwd_pwd = $user_info["pwd_pwd"];

// 重新拼组用户密钥
$user_pwd_st = json_decode(base64_decode($user_pwd_i));
$user_real_pwd = "";
for ($i=0; $i < 3; $i++) { 
    $user_real_pwd = $user_real_pwd . $user_pwd[$user_pwd_st[$i]];
}

if($user_token["login_type"] == 2){
    $user_hmac_pwd = hash_hmac("sha256",$user_real_pwd,$user_pwd_pwd);
    if($user_token["pwd_sha256"] == $user_hmac_pwd){
        // 获得需求的用户信息
        $user_nick_name = $user_info["nickname"];
        $user_icon = $user_info["user_icon"];
        $sql->close();
        die(retMsg(true,$user_nick_name,$user_icon));
    }
    else{
        $sql->close();
        die(retMsg(false,"",""));
    }
}
elseif($user_token["login_type"] == 1){
    $user_sha256_pwd = hash("sha256",$user_real_pwd);
    if($user_token["pwd_sha256"] == $user_real_pwd){
        // 获得需求的用户信息
        class PwdLogin{
            var $uid;
            var $pwd_sha256;
            var $login_type;
        }
        $q = new PwdLogin();
        $q->uid = $user_info["uid"];
        $q->pwd_sha256 = hash_hmac("sha256",$user_real_pwd,$user_pwd_pwd);
        $q->login_type = 2;
        $sql->close();
        setcookie("u_token",json_encode($q,JSON_UNESCAPED_UNICODE),0,"/");
        header("Location:/",true,301); // 301 永久重定向
        exit();
    }
    else{
        $sql->close();
        die(retMsg(false,"",""));
    }
}


function retMsg(bool $loginStatus,string $name,string $icon){
    $r = new retMsgClass();
    $r->login = ($loginStatus?"true":"false");
    $r->name = $name;
    $r->icon = $icon;
    return  json_encode($r,JSON_UNESCAPED_UNICODE);
}

?>
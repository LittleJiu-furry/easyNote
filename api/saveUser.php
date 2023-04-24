<?php
error_reporting(0);

die(UserSign());

// 获得传入的用户信息
$userinfo = json_decode(base64_decode($_POST["d"]));
include_once("./auth/auth.php");
include_once("./conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port);
if($sql->connect_error){
    die();
}

// 处理密码
$hashed_pwd = md5(hash("sha256",$userinfo["pwd"]));
$cut_len = 30 - strlen($hashed_pwd);
for ($i=0; $i < $cut_len; $i++) { 
    $hashed_pwd .= "F";
}

// 生成拼接索引
$tempIndex = array();
$getIndex = [0,1,2];
for ($i=0; $i < 3; $i++) { 
    $ind = mt_rand(0,2-$i);
    $tempIndex[] = $getIndex[$ind];
    array_splice($getIndex,$ind,1);
}

// 分割字段
$tempString = array();
$tempString[] = substr($hashed_pwd,0,10);
$tempString[] = substr($hashed_pwd,10,10);
$tempString[] = substr($hashed_pwd,20,10);
$user_pwd_i = "[".$tempIndex[0].",".$tempIndex[1].",".$tempIndex[2]."]";

// 生成用户uuid
$user_uuid = UserUUID($_COOKIE["user_uid"]);

// 生成用户sign
$user_sign = UserSign();

// 生成UCPPK和UCPSK


$comm_ret = $sql->query(
    "update ".$pre."user set
        pwd_1 = '".$tempString[$tempIndex[0]]."',
        pwd_2 = '".$tempString[$tempIndex[1]]."',
        pwd_3 = '".$tempString[$tempIndex[2]]."',
        pwd_i = '".$user_pwd_i."',
        uuid = '".$user_uuid."',
        nick_account = '".$user_uuid."',
        nick_sign = '".$user_sign."',
        nickname = '".base64_encode($userinfo["name"])."'
    where uid = '".$_COOKIE["user_uid"]."';"
);

if($comm_ret){
    header("Location: /login/",true,301); // 永久重定向
}



function UserPPK(string $uid){
    
}




function UserSign():string{
    return mt_rand(0,999999);
}

function UserUUID(string $uid):string{
    $now = time();
    $seed = hash("sha256",$uid);
    $tempseed = 0;
    $find = preg_filter("/\D/","",$seed,-1);
    $find .= $now;
    for ($i=0; $i < strlen($find); $i++) { 
        $tempseed += intval($seed[$i]);
    }
    $new_seed = ((intval($tempseed) * intval($now)) / 7);
    $tempHash = hash("sha256",base64_encode($new_seed));
    $hashed = substr($tempHash,0,25);
    $ret = "";
    for ($i=0; $i < 5; $i++) { 
        $ret .= substr($hashed,5 * $i,5) . "-";
    }
    return substr($ret,0,-1);
}


?>
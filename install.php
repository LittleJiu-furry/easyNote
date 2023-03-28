<?php
error_reporting(0); // 屏蔽错误输出
// 检索sql配置
include_once("./api/conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port,NULL);
if($sql->connect_error){
    // 连接报错
    // 尝试是否已经安装
    $installStatus = file_get_contents("./api/conn/installed");
    if($installStatus == "NO" or $installStatus == NULL){
        // 尚未安装，继续执行本脚本
        goto installProgram; // GOTO跳转
    }
    else{
        if($seted){
            die('<center><h3 style="color:red;">[ERROR] 检查已经安装，但是数据库连接失败，请检查网络或者数据库权限配置！</h1></center>');
        }
        else{
            goto installProgram;
        }
    }
}
else{
    $sql->close(); // 回收这个数据库游标
    header("Location: /",true,301); // 301 永久重定向
    exit();
}


installProgram:;
$htmlRespond = file_get_contents("./install.html");
echo $htmlRespond;
$sqlcontent = '<?php
    // 数据库配置信息
    $seted = ture;
    $host = "localhost";
    $username = "root";
    $passwd = "";
    $database = "";
    $port = 3306;
    ?>'
?>
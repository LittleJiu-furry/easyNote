<?php
require("./client.php");
include_once("../conn/conf.php");

$emailAdd = $_GET["email"];
$inputUser = $_GET["use"];
$VefCode = "test";
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

$em = new SocketMail($_conf["SMTP_host"],$_conf["SMTP_port"],$_conf["SMTP_username"],$_conf["SMTP_PWD"]);
$em->send_mail($emailAdd,"[测试验证]",$emailBody);


?>
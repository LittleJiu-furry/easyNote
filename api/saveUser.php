<?php
error_reporting(0);

$userinfo = json_decode($_POST["d"]);
include_once("./auth/auth.php");
include_once("./conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port);




$sql->query("update `".$pre."user` set `code` = '',`nickname` = '".$_COOKIE["user_uid"]."'   ")
?>
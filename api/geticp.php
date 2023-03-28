<?php
error_reporting(0); // 屏蔽报错输出
include_once("./conn/sql.inc.php");

$sql = new mysqli($host,$username,$passwd,$database,$port,null);
if($sql->connect_error){
    die("");
}

$value = $sql->query("select `value` form ". $pre ."`setting` where `key` = 'icp';")->fetch_assoc();
$sql->close();
die($value["value"])


?>
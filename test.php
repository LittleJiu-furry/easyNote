<?php
$hashed_pwd = "012345678901234567890123456789";
$tempString = array();
$tempString[] = substr($hashed_pwd,0,10);
$tempString[] = substr($hashed_pwd,10,10);
$tempString[] = substr($hashed_pwd,20,10);
var_dump($tempString);
?>
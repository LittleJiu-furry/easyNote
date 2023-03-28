<?php
error_reporting(0);
$installStatus = file_get_contents("./api/conn/install.inc.php");
if(error_get_last() != NULL){
    $installStatus = "NO";
}

die($installStatus);
?>
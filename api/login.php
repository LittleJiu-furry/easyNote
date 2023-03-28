<?php
error_reporting(0);
header("Content-Type:text/plain");
var_dump($_POST);
exit();

include_once("./conn/sql.inc.php");
$sql = new mysqli($host,$username,$passwd,$database,$port);


?>
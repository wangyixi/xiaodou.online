<?php
header("Content-type:text/html;charset=utf-8");
$link = mysql_connect("localhost","root","&HKMWYZ123a&");
mysql_select_db("xiaodoumsg",$link);
mysql_query("utf-8");

$username = $_GET['username'];

$sql = "update users set state=0  where username='$username' ";
if(!mysql_query($sql)){
	echo 41;
}
mysql_close($link);
?>

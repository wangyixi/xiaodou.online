
<?php
$link = mysql_connect("localhost","root","&HKMWYZ123a&");
mysql_select_db('xiaodoumsg',$link);
mysql_query('set names utf-8');

$user = $_POST['user'];
$msg  = $_POST['msg'];

$sql1 = "insert into message values (null,'$user','$msg',now())";
mysql_query($sql1);
$mid = mysql_insert_id();
mysql_close($link);
echo $mid
?>


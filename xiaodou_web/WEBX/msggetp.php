<?php
$link = mysql_connect('localhost','root','&HKMWYZ123a&');
mysql_select_db('xiaodoumsg',$link);
mysql_query('set names utf-8');
$maxID = $_GET['maxID'];
$sql = "select * from message where id>'$maxID'";
$qry = mysql_query($sql);

$info = array();
while($rst = mysql_fetch_assoc($qry) ){
                $info[] = $rst;
}
echo json_encode($info);
mysql_close($link);
?>



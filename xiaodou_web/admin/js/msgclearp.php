<?php
$link = mysql_connect('localhost','root','&HKMWYZ123a&');
mysql_select_db('xiaodoumsg',$link);
mysql_query('set names utf-8');

$sql = "delete from message";
if(mysql_query($sql)){
        echo "已经清空所有对话数据！";
}
else{
     	echo "清除失败";
}
?>

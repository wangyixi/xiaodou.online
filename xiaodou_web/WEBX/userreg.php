<?php
header("Content-type:text/html;charset=utf-8");
$link = mysql_connect("localhost","root","&HKMWYZ123a&");
mysql_select_db("xiaodoumsg",$link);
mysql_query("utf-8");

$username = $_GET['username'];
$psword = $_GET['psword'];
$email = $_GET['email'];

$sql = "select * from users where username='$username' ";
$rst = mysql_query($sql,$link);
$res =mysql_fetch_row($rst);
if($res[1]!==null){
        echo "该用户名已经被注册";
}
else{
        $sql = "insert into users values(null,'$username','$psword',0,'$email') ";
        if(mysql_query($sql)){
                echo 11;
        }
        else{
                echo 41;
        }
}
mysql_close($link);
?>


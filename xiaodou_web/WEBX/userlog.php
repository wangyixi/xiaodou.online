<?php
header("Content-type:text/html;charset=utf-8");
$link = mysql_connect("localhost","root","&HKMWYZ123a&");
mysql_select_db("xiaodoumsg",$link);
mysql_query("utf-8");

$username = $_GET['username'];
$psword = $_GET['psword'];


$sql1 = "select * from users where username='$username' ";
$rst1 = mysql_query($sql1,$link);
$res1 =mysql_fetch_row($rst1);
$sql2 = "select * from users where email='$username' ";
$rst2 = mysql_query($sql2,$link);
$res2 =mysql_fetch_row($rst2);

if($res1[1]!=null){
	if($res1[2]==$psword){	
	     $sql = "update users set state=1 where id=$res1[0] ";
             mysql_query($sql);
		echo $res1[1];
        }
	else{
		echo 101;
	}
}
else if($res2[3]!=null){
	     if($res2[2]==$psword){
              $sql = "update users set state=1 where id=$res2[0] ";
              mysql_query($sql);
                 echo $res2[1];
         }
          else{   
                 echo 101;
         }  

}
else{
	echo 202;
}
?>

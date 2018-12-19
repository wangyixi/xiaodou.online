<?php
header("Content-type:text/html;charset=utf-8");
include 'mfunction.php';
@set_time_limit(0);

$msg = $_GET['txt'];
if(strpos($msg,"天气")!==FALSE){
	$pmsg = str_replace("天气","",$msg);
	$link = mysql_connect('localhost','root','&HKMWYZ123a&');
        mysql_select_db('xiaodoumsg',$link);
        mysql_query('set names utf8');
	$sql = "select * from cityinfo where city=\"$pmsg\" ";
        $res = mysql_query($sql);
        $num = mysql_fetch_row($res);
	if($num[2]==null){
   	       $ip = getip();
	       $info = @file_get_contents("http://ip.taobao.com/service/getIpInfo.php?ip=".$ip);
	       $info = json_decode($info,true);
	       $city = $info['data']['city'];
	       $sql = "select * from cityinfo where city=\"$city\" ";
	       $res = mysql_query($sql);
	       $rnum = mysql_fetch_row($res);
     
               echo "为您抓取到".$city."未来24小时天气：\n";
	       passthru("python3 wgetWeather.py ".$rnum[2]);
	       echo "如果城市定位不准确或信息为空\n请尝试输入城市如：杭州天气";
	 }
	else{
               echo "为您抓取到".$pmsg."未来24小时天气：\n";
	       passthru("python3 wgetWeather.py ".$num[2]);
	}
	mysql_close($link);
}
else if(strpos($msg,"热搜")!==false ||strpos($msg,"微博")!==false){
	echo "为您抓取到当前微博热搜\n感兴趣的话去看看吧\n";
	passthru("python3 wgetHot.py");
}
else if(strpos($msg,"功能")!==false){
	echo "目前小豆已经学会了天气和微博热搜爬虫\n输入相关问题试试吧";
}
else{
    $msg = str_replace(" ","%20",$msg);
    $key = "74b538c610e14b1aa6ac7aac64ba7275";
    $resp = @file_get_contents("http://www.tuling123.com/openapi/api?key=".$key."&info=".$msg);
    $r = json_decode($resp,true);
    $r = $r['text'];
    if($r==null){
         $resp = @file_get_contents("http://api.qingyunke.com/api.php?key=free&appid=0&msg=".$msg);
         $r = json_decode($resp,true);
         $r = str_replace("，"," ",$r['content']);
         filtemsg($r);
    }
    else{
        echo $r;
    }
}
?>


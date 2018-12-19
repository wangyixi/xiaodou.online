<?php
header("Content-type:text/html;charset=utf-8");
@set_time_limit(0);
function getip() {
	if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
		$ip = getenv('HTTP_CLIENT_IP');
	} elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
		$ip = getenv('HTTP_X_FORWARDED_FOR');
	} elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
		$ip = getenv('REMOTE_ADDR');
	} elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	$res =  preg_match ( '/[\d\.]{7,15}/', $ip, $matches ) ? $matches [0] : '';
	return $res;
}
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
                
               echo "为您抓取到".$city."未来24小时天气：</br>";
	       passthru("python3 ./getWeather.py ".$rnum[2]);
	       echo "如果城市定位不准确或信息为空</br>请尝试输入城市如：杭州天气";
	 }
	else{
               echo "为您抓取到".$pmsg."未来24小时天气：</br>";
	       passthru("python3 ./getWeather.py ".$num[2]);
	}
	mysql_close($link);
}
else if(strpos($msg,"热搜")!==false ||strpos($msg,"微博")!==false){
	echo "为你抓取到当前微博热搜</br>感兴趣的话去看看吧</br>";
	passthru("python3 getHot.py");
}
else{
   passthru("python3 ./Seq2Seq/s2s1.py"); 
}
?>


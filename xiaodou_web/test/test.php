<?php
header("Content-type:text/html;charset=utf-8");
$output = shell_exec('python ./test.py');

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
        $ip = getip();
        $info = @file_get_contents("http://freeapi.ipip.net/".$ip);
        $s=str_replace('"','', $info);
        $city= explode(",",$s);
	$link = mysql_connect('localhost','root','&HKMWYZ123a&');
	mysql_select_db('xiaodoumsg',$link);
	mysql_query('set names utf8');
	$c = $city[2];
	$sql = "select * from cityinfo where city=\"$c\" ";
	$num = mysql_query($sql);
	while($d= mysql_fetch_row($num)){
	echo $d[2];
}
?>

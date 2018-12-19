<?php
$ip = @file_get_contents("http://ip.taobao.com/service/getIpInfo.php?ip=".$_GET["ip"]);
echo $ip;
?>

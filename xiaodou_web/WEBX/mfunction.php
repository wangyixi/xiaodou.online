<?php
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
function filtemsg($m){
        if(strpos($m,"菲菲")!==false){
               echo  str_replace("菲菲","小豆",$m);
               return;
        }
	$keyword=["傻","操","贱","猪","滚","笨","逼","蠢"];
        for($i=0;$i<count($keyword);$i++){
             if(strpos("$m",$keyword[$i])!==false){
                  echo "河蟹";
                 return;
             }
	}
	if(strlen($m)<=6||strpos($m,"null")!==false){
                echo "小豆暂时不能为您解答哦";
                return;
        }
	echo $m;
}
?>

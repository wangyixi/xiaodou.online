window.onload= function(){
	var ajaxip;
	try{
			//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			ajaxip = new XMLHttpRequest();
	} catch(e) {
			// IE6, IE5 浏览器执行代码
			ajaxip = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajaxip.open("GET" ,"/WEB16/register_test", true);
	ajaxip.send();
	ajaxip.onreadystatechange = function() {
					if(ajaxip.readyState == 4 && ajaxip.status == 200) {
							; //do nothing
					  }
			}
}


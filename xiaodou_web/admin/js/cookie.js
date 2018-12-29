function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str)
{
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if (str2=="s")
	{
	return str1*1000;
	}
	else if (str2=="h")
	{
	return str1*60*60*1000;
	}
	else if (str2=="d")
	{
	return str1*24*60*60*1000;
	}
}
function setCookiet(name,value,time)
{
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
	function fnLogin() {
		 var oUname = document.getElementById("uname");
		 var oUpass = document.getElementById("upass");
		 var oError = document.getElementById("error_box");
		var user = oUname.value;
		var pwd = oUpass.value;
		var logajax = new XMLHttpRequest();
		logajax.onreadystatechange=function(){
		   if(logajax.readyState==4){
				var r = logajax.responseText;
				if(r==41){
					oError.innerHTML =  "密码错误";
				}
				else if(r==42){
                                          oError.innerHTML =  "账号不存在";
                                }                   
				else{
					console.log(r);
					setCookiet("name",r,"s1800");
					window.location.href ="chatroom.html";
            			}
		   }
	    }
		logajax.open("GET","/WEBX/userlog.php?username="+user+"&psword="+pwd);
		logajax.send();
	}	

function fnRegist() {
	 var oUname = document.getElementById("uname");
	 var oUpass = document.getElementById("upass");
	 var oError = document.getElementById("error_box");
	 var oEmail = document.getElementById("uemail"); 
	var isError = true;
	 if (oUname.value.length > 20 || oUname.value.length < 5) {
	  oError.innerHTML = "用户名请输入5-20位字符";
	  isError = false;
	  return;
	 }else if((oUname.value.charCodeAt(0)>=48) && (oUname.value.charCodeAt(0)<=57)){
	  oError.innerHTML = "首字符必须为字母";
	  return;
	 }else for(var i=0;i<oUname.value.charCodeAt(i);i++){
	  if((oUname.value.charCodeAt(i)<48)||(oUname.value.charCodeAt(i)>57) && (oUname.value.charCodeAt(i)<97)||(oUname.value.charCodeAt(i)>122) &&(oUname.value.charCodeAt(i)<65||oUname.value.charCodeAt(i)>90)){
	   oError.innerHTML = "必须为字母跟数字组成";
	   return;
	  }
	 } 
	 if (oUpass.value.length > 20 || oUpass.value.length < 6) {
	  oError.innerHTML = "密码请输入6-20位字符";
	  isError = false;
	  return;
	 }
	 if(!/^\S+@\S+\.\S{2,}$/.test(oEmail.value)){
	   oError.innerHTML = "邮箱格式有误";
           isError = false; 
           return; 
	} 
	 var user = oUname.value;
	 var pwd = oUpass.value;
	var email =  oEmail.value;
	var logajax = new XMLHttpRequest();
	logajax.onreadystatechange=function(){
	   if(logajax.readyState==4){
			var r = logajax.responseText;
			if(r==11){
				setCookiet("name",user,"s1800");
				window.location.href="hrefreg.html";
			 }
			else{
				oError.innerHTML = r;
			}
	   }
	}
	logajax.open("GET","/WEBX/userreg.php?username="+user+"&psword="+pwd+"&email="+email);
	logajax.send();
}
function logoff(){
        var logoff = new XMLHttpRequest();
        logoff.onreadystatechange=function(){
                if(logoff.readyState==4){
			if(logoff.reponseText!=41){
				delCookie("name");
                       		window.location="login.html";
			}
                }
        }
        logoff.open("GET","WEBX/userlogoff.php?username="+username);
        logoff.send();
}
window.onload=function(){
		var Uname = document.getElementById("uname");
		Uname.value = getCookie("name");
}





	

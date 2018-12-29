function getCookie(name)
{
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
}

window.onload=function(){
	var name = getCookie("name");
	if(name !="admin"){
		window.location="../login.html";
	}
}

var username="";
var maxID=0;

function getMsg(){
        var msget = new XMLHttpRequest();
        msget.onreadystatechange = function(){
                        if(msget.readyState==4){
                                  eval("var msinfo = " +msget.responseText);
                                  var s="";
                                  for (var i=0; i<msinfo.length; i++){                 
                                                s += msinfo[i].sender + " ";
                                                s += msinfo[i].time + "</br>";
                                                s += msinfo[i].msg;
                                                maxID = msinfo[i].id;
                                                var ul = document.getElementById('content');
                                                var newLi2 = document.createElement('li');
                                                newLi2.innerHTML = s ;
                                                if(msinfo[i].sender==username){
						newLi2.className = 'right text-style pos bubble plain';
						}
						else{
				  			newLi2.className = 'left text-style-left pos-left bubble-left plain';
                                                }
						ul.appendChild(newLi2);
                                                var div = document.createElement('div');
                                                div.style = 'clear:both';
                                                ul.appendChild(div);
                                                newLi2.scrollIntoView(); //将元素滚动到可见位置
                                                s = "";					
                                        }

                        }
        }
	msget.open('get','WEBX/msggetp.php?maxID='+maxID);
        msget.send();
}
function sendMsg() {
                var input = document.getElementById('msg_input');
                var info = "user=" + username + "&msg=" + input.value;
                var ul = document.getElementById('content');
                var newLi = document.createElement('li');
                newLi.innerHTML = input.value;
                newLi.className = 'right text-style pos bubble plain';
                ul.appendChild(newLi);
                var div = document.createElement('div');
                div.style = 'clear:both';
                ul.appendChild(div);
                input.value = '';
                var dHeight = document.documentElement.li;
                newLi.style.height = dHeight + 30 + "px";
                newLi.scrollIntoView(); //将元素滚动到可见位置
                 var msgsend = new XMLHttpRequest();
                msgsend.onreadystatechange = function(){
                          if(msgsend.readyState==4){
                                   var mid = msgsend.responseText;
					  maxID = mid;		
                                }
                }
                msgsend.open("post","WEBX/msgsendp.php");
                msgsend.setRequestHeader("content-type","application/x-www-form-urlencoded");
                msgsend.send(info);
}
window.onload = function(){
                username=getCookie("name"); 
		if(username==null){
                          window.location.href="login.html";
                 }
                 else{
        		document.getElementById("vname").innerHTML = username;
		}
                var sendbtn = document.getElementById('sendbtn');
                sendbtn.onclick = function() {
                        sendMsg();
                }
                //快捷键 发送
                document.onkeypress = function(event) {
                        var e = event || window.event;
                        var keycode = e.keyCode || e.which;
                        if (keycode == 10) { //判断同时按下ctrl 和enter
                                sendMsg();
                        }
                }
                setInterval("getMsg()",4500);
}



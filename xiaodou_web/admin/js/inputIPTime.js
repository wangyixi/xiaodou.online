
window.onload = function(){

var nbut = document.getElementById("btnip");
nbut.addEventListener("click" , function(){
            var uip = document.getElementById("inip").value;
                var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                var reg = uip.match(exp);
                if(reg == null) {
                        document.getElementById("tab1").innerHTML="";
                        document.getElementById("suggest").innerHTML="输入的IP地址格式有误！";
                }
                else{
                     	var ajax;
                        try{
                                        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                                        ajax = new XMLHttpRequest();
                        } catch(e) {
                                    	// IE6, IE5 浏览器执行代码
                                        ajax = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        ajax.open("GET","/WEB16/query_specific_ip?specific_ip="+uip,true);
                        ajax.send();
                        ajax.onreadystatechange = function() {
                                        if(ajax.readyState == 4 && ajax.status == 200) {
                                                        var response = ajax.responseText;
                                                        response = response.replace("[","");
                                                        response = response.replace("]","");
                                                        var reg = new RegExp('\"',"g");
                                                        response = response.replace(reg,"");
                                                        var str = response.split(",");
                                                        if(str!=""){
                                                                var show = "<tr><th>" + "序号" + "</th><th>" + "IP地址" + "</th><th>" + "最近访问时间" + "</th>";
                                                                for(var i=0;i<str.length; i++){
                                                                                var visitor = str[i].split("+");
                                                                                show += "<tr>" + "<td>" + (i+1) + "</td>" ;
                                                                                for(var j=0; j<visitor.length; j++){
                                                                                                show +="<td>" + visitor[j] + "</td>";
                                                                                } 
                                                                                show += "</tr>";
                                                                }
                                                                document.getElementById("suggest").innerHTML="查询到下列访客信息：";
                                                                document.getElementById("tab1").innerHTML = show;
                                                        }
                                                        else{
                                                                        document.getElementById("tab1").innerHTML="";
                                                                        document.getElementById("suggest").innerHTML="所查询的ip地址不存在！";
                                                        }
                                        }
                        }
                }
},false);
var mbut = document.getElementById("btntime");
mbut.addEventListener("click" , function(){
        var time1 = document.getElementById("intime1").value;
        var time2 = document.getElementById("intime2").value;
        document.getElementById("tab2").innerHTML="";
        var ajaxt;
        try{
                                        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                                        ajaxt = new XMLHttpRequest();
        } catch(e) {
                                        // IE6, IE5 浏览器执行代码
                                        ajaxt = new ActiveXObject("Microsoft.XMLHTTP");
        }
	var serverurl = "/WEB16/query_specific_time?maxtime="+ time2 + "&&mintime=" + time1;
        ajaxt.open("GET" ,serverurl, true);
        ajaxt.send();
        ajaxt.onreadystatechange = function() {
                                        if(ajaxt.readyState == 4 && ajaxt.status == 200) {
                                                var response = ajaxt.responseText;
                                                response = response.replace("[","");
                                                response = response.replace("]","");
                                                var reg = new RegExp('\"',"g");
                                                response = response.replace(reg,"");
                                                var str = response.split(",");
                                                if(str!=""){
                                                            	 var show = "<tr><th>" + "序号" + "</th><th>" + "IP地址" + "</th><th>" + "最近访问时间" + "</th>";
                                                                for(var i=0;i<str.length; i++){
                                                                                               	var visitor = str[i].split("+");
                                                                                                show += "<tr>" + "<td>" + (i+1) + "</td>" ;
                                                                                                for(var j=0; j<visitor.length; j++){
                                                                                                                                show +="<td>" + visitor[j] + "</td>";
                                                                                                }
                                                                                                show += "</tr>";
                                                                }
                                                                console.log(show);
                                                                document.getElementById("suggest2").innerHTML="查询到下列访客信息：";
                                                                document.getElementById("tab2").innerHTML = show;
                                                }
                                                else{
                                                                                document.getElementById("suggest2").innerHTML="所查询的时间段没有访客记录！";
                                                                                document.getElementById("tab2").innerHTML="";
                                                }
                                          }
                        }
},false);

}
    

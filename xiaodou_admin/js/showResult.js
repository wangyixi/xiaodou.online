  window.onload = function() {
  var btn = document.querySelector("butv");
  btnv.onclick = function() {
		 var ajax;
		 try{
				//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
				 ajax = new XMLHttpRequest();
		 } catch(e) {
				 // IE6, IE5 浏览器执行代码
				 ajax = new ActiveXObject("Microsoft.XMLHTTP");
		 }
		 ajax.open("GET","/WEB16/query_ip",true);
		 ajax.send();
		 ajax.onreadystatechange = function() {
				 if(ajax.readyState == 4 && ajax.status == 200) {
						 var response = ajax.responseText;
						 response = response.replace("[","");
						 response = response.replace("]","");
						var reg = new RegExp('\"',"g");
						response = response.replace(reg,"");
						 var str = response.split(",");
						 var show = "<tr><th>" + "序号" + "</th><th>" + "IP地址" + "</th><th>" + "最近访问时间" + "</th>";
						 if(str.length >= 0){
								 for(var i=0;i<str.length; i++){
										 var visitor = str[i].split("+");
										 show += "<tr>" + "<td>" + (i+1) + "</td>" ;
										 for(var j=0; j<visitor.length; j++){
												 show +="<td>" + visitor[j] + "</td>";
										 }
										 show += "</tr>";
								 }
						 }
						 //console.log(show);
						 document.getElementById("tab").innerHTML = show;
				 }
		 }
 }
}

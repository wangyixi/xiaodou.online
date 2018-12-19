        window.onload = function() {
                            var input = document.getElementById('msg_input'); //查找缓存
                            document.getElementById('sendbtn').onclick = function() {
                                sendMsg();
                            }
                            //快捷键 发送
                            document.onkeypress = function(event) {
                                var e = event || window.event;
                                var keycode = e.keyCode || e.which;
                                if (keycode == 10) { //判断同时按下ctrl 和enter
                                    sendMsg()
                                }
                            }
                            function sendMsg() {
                                var input = document.getElementById('msg_input'); 
				var inmsg = encodeURIComponent(input.value);
                                var ul = document.getElementById('content');
                                var newLi = document.createElement('li');
                                newLi.innerHTML = input.value;
                                newLi.className = 'right text-style pos bubble plain';
                                ul.appendChild(newLi);
                                var div = document.createElement('div');
                                div.style = 'clear:both';
                                ul.appendChild(div);
                                loadXMLDoc(inmsg);
                                input.value = '';
                                var dHeight = document.documentElement.li;
                                newLi.style.height = dHeight + 30 + "px";
                                newLi.scrollIntoView(); //将元素滚动到可见位置
                            }
                            function loadXMLDoc(v) {
                                var xmlhttp;
                                if (window.XMLHttpRequest) {
                                    xmlhttp = new XMLHttpRequest();
                                } else {
                                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                xmlhttp.onreadystatechange = function() {
                                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                        var ul = document.getElementById('content');
                                        var newLi2 = document.createElement('li');
                                        newLi2.innerHTML = xmlhttp.responseText;
                                        newLi2.className = 'left text-style-left pos-left bubble-left plain';
                                        ul.appendChild(newLi2);
                                        var div = document.createElement('div');
                                        div.style = 'clear:both';
                                        ul.appendChild(div);
                                        newLi2.scrollIntoView(); //将元素滚动到可见位置
                                    }
                                }
                                xmlhttp.open("GET", "/WEBX/chat.php" + "?txt=" + v, true);
                                xmlhttp.send();
                            }
                        }
       


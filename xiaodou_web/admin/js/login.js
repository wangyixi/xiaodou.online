function enter() {
    var AdminName = document.getElementById('username').value;
    var AdminPassword = document.getElementById('password').value;
    if (AdminName == "123456" && AdminPassword == "123456") {
        window.location = "index.html";
    } else {
        alert("输入错误！");
        setTimeout("javascript:location.href='login.html'", 1000);
    }
}
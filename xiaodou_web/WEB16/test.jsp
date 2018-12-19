<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<form action="/WEB16/deliver" method="post" id="regForm">
<fieldset>
<legend>个人基本信息</legend>
<div>
<label for="userName">名称：</label>
<input id="useName" type="text" name='name' />
</div>
<div>
<label for="passWord">密码：</label>
<input id="passWord" type="password" />
</div>
<div>
<label for="msg">详细信息：</label>
<textarea id="msg"></textarea>
</div>

<input type="submit" value="submit" name="submit"/>
</fieldset>
</form>

</body>
</html>
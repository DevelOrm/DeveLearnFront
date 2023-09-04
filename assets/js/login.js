const url = "http://52.79.53.117";

$(document).ready(function () {
  $("#loginButton").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();

    const userData = {
      username: username,
      password: password,
    };

    $.post(`${url}/user/login/`, userData, function (data) {
      try {
        setToken(data.access, data.refresh, data.user["user_id"]);
        alert("로그인 성공!");
        window.location.href = "index.html";
      } catch (error) {
        alert("유저네임 또는 비밀번호가 틀렸습니다.");
      }
    });
  });
});

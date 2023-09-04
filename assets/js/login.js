if (accessToken != null && refreshToken != null) {
  window.location.href = "index.html";
}

const url = "http://3.37.187.68:8000";
const loginAPI = url +  "/user/login/";
const socialLoginAPI = url + "/user/social/naver/";

const $username = document.querySelector("#username");
const $password = document.querySelector("#password");
const $loginBtn = document.querySelector("#loginBtn");
const $naverLogin = document.querySelector("#naverLogin");
const $loginAlert = document.querySelector("#loginAlert");
const $usernameAlert = document.querySelector("#usernameAlert");
const $passwordAlert = document.querySelector("#passwordAlert");

$usernameAlert.style.display = "none";
$passwordAlert.style.display = "none";
$loginAlert.style.display = "none";

$loginBtn.addEventListener("click", function(event) {
  event.preventDefault()
  const usernameData = $username.value.toString();
  const passwordData = $password.value.toString();

  if (usernameData === "") {
    $usernameAlert.style.display = "block";
    if (passwordData === "") {
      $passwordAlert.style.display = "block";
    }
    return
  } else {
    $usernameAlert.style.display = "none";
  }

  if (passwordData === "") {
    $passwordAlert.style.display = "block";
    return
  } else {
    $passwordAlert.style.display = "none";
  }

  const loginData = {
    username: usernameData,
    password: passwordData,
  };

  fetch(loginAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.non_field_errors) {
        $loginAlert.style.display = "block";
      } else {
        setToken(res.access, res.refresh, res.user["user_id"]);
        window.location.href = "index.html";
      }
    })
    .catch((e) => {
  });
});

$naverLogin.addEventListener("click", function(event) {
  fetch(socialLoginAPI, {
    method: "GET",
  })
    .then((res) => res)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
  });
});
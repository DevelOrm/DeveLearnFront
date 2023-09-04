if (accessToken != null && refreshToken != null) {
  window.location.href = "index.html";
}

const url = "http://52.79.53.117";
const registrationAPI = url +  "/user/registration/"
const useridDuplicationAPI = url +  "/user/duplication/userid/"
const emailDuplicationAPI = url +  "/user/duplication/email/"
const phonenumberDuplicationAPI = url +  "/user/duplication/phonenumber/"

const $username = document.querySelector("#username");
const $email = document.querySelector("#email");
const $password = document.querySelector("#password");
const $passwordConfirm = document.querySelector("#passwordConfirm");
const $profileImage = document.querySelector("#profileImage");
const $phoneNumber = document.querySelector("#phoneNumber");
const $isTeacher = document.querySelector("#isTeacher");

const $usernameCheckBtn = document.querySelector("#usernameCheckBtn");
const $emailCheckBtn = document.querySelector("#emailCheckBtn");
const $phoneNumberCheckBtn = document.querySelector("#phoneNumberCheckBtn")
const $registrationBtn = document.querySelector("#registrationBtn");

const $usernameAlert = document.querySelector("#usernameAlert");
const $usernameDuplicationCheckSuccess = document.querySelector("#usernameDuplicationCheckSuccess");
const $usernameDuplicationCheckAlert = document.querySelector("#usernameDuplicationCheckAlert");
const $usernameDuplicateAlert = document.querySelector("#usernameDuplicateAlert");

const $emailAlert = document.querySelector("#emailAlert");
const $emailDuplicationCheckSuccess = document.querySelector("#emailDuplicationCheckSuccess");
const $emailDuplicationCheckAlert = document.querySelector("#emailDuplicationCheckAlert");
const $emailDuplicateAlert = document.querySelector("#emailDuplicateAlert");
const $emailFormatAlert = document.querySelector("#emailFormatAlert")

const $passwordAlert = document.querySelector("#passwordAlert");
const $passwordConfirmAlert = document.querySelector("#passwordConfirmAlert");
const $passwordCheckAlert = document.querySelector("#passwordCheckAlert");

const $phoneNumberAlert = document.querySelector("#phoneNumberAlert");
const $phoneNumberDuplicationCheckSuccess = document.querySelector("#phoneNumberDuplicationCheckSuccess");
const $phoneNumberDuplicationCheckAlert = document.querySelector("#phoneNumberDuplicationCheckAlert");
const $phoneNumberDuplicateAlert = document.querySelector("#phoneNumberDuplicateAlert");

$usernameAlert.style.display = "none";
$usernameDuplicationCheckSuccess.style.display = "none";
$usernameDuplicationCheckAlert.style.display = "none";
$usernameDuplicateAlert.style.display = "none";

$emailAlert.style.display = "none";
$emailDuplicationCheckSuccess.style.display = "none";
$emailDuplicationCheckAlert.style.display = "none";
$emailDuplicateAlert.style.display = "none";

$passwordAlert.style.display = "none";
$passwordConfirmAlert.style.display = "none";
$passwordCheckAlert.style.display = "none";

$phoneNumberAlert.style.display = "none";
$phoneNumberDuplicationCheckSuccess.style.display = "none";
$phoneNumberDuplicationCheckAlert.style.display = "none";
$phoneNumberDuplicateAlert.style.display = "none";

let usernameCheck = false;
let emailCheck = false;
let phoneNumberCheck = false;
let passwordCheck = false;

const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const autoHyphen = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
}

$username.addEventListener("change", function() {
  $usernameDuplicationCheckSuccess.style.display = "none";
  $usernameDuplicationCheckAlert.style.display = "block";
  usernameCheck = false;
});

$email.addEventListener("change", function() {
  $emailDuplicationCheckSuccess.style.display = "none";
  $emailDuplicationCheckAlert.style.display = "block";
  emailCheck = false;
});

$phoneNumber.addEventListener("change", function() {
  $phoneNumberDuplicationCheckSuccess.style.display = "none";
  $phoneNumberDuplicationCheckAlert.style.display = "block";
  phoneNumberCheck = false;
});


$usernameCheckBtn.addEventListener("click", function(event) {
  event.preventDefault()

  $usernameDuplicationCheckAlert.style.display = "none";
  $usernameDuplicationCheckAlert.style.display = "none";
  $usernameDuplicationCheckSuccess.style.display = "none";

  const usernameData = $username.value.toString();

  if (usernameData === "") {
    $usernameAlert.style.display = "block";
  } else {
    $usernameAlert.style.display = "none";

    const checkData = {
      user_id: usernameData,
    };
  
    fetch(useridDuplicationAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "중복된 항목이 없습니다.") {
          usernameCheck = true;
          $usernameDuplicateAlert.style.display = "none";
          $usernameDuplicationCheckSuccess.style.display = "block";
        } else {
          usernameCheck = false;
          $usernameDuplicateAlert.style.display = "block";
          $usernameDuplicationCheckSuccess.style.display = "none";
        }
      })
      .catch((e) => {
    });
  }
});

$emailCheckBtn.addEventListener("click", function(event) {
  event.preventDefault()

  $emailDuplicationCheckAlert.style.display = "none";
  $emailDuplicationCheckAlert.style.display = "none";
  $emailDuplicationCheckSuccess.style.display = "none";
  
  const emailData = $email.value.toString();

  if (regex.test(emailData) == false) {
    $emailAlert.style.display = "block";
  } else {
    $emailAlert.style.display = "none";
  
    const checkData = {
      email: emailData,
    };
  
    fetch(emailDuplicationAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "중복된 항목이 없습니다.") {
          emailCheck = true;
          $emailDuplicateAlert.style.display = "none";
          $emailDuplicationCheckSuccess.style.display = "block";
        } else {
          emailCheck = false;
          $emailDuplicateAlert.style.display = "block";
          $emailDuplicationCheckSuccess.style.display = "none";
        }
      })
      .catch((e) => {
    });
  }
});

$phoneNumberCheckBtn.addEventListener("click", function(event) {
  event.preventDefault()

  $phoneNumberDuplicationCheckAlert.style.display = "none";
  $phoneNumberDuplicationCheckAlert.style.display = "none";
  $phoneNumberDuplicationCheckSuccess.style.display = "none";

  const phoneNumberData = $phoneNumber.value.toString();

  if (phoneNumberData.length != "13") {
    $phoneNumberAlert.style.display = "block";
  } else {
    $phoneNumberAlert.style.display = "none";

    const checkData = {
      phone_number: phoneNumberData,
    };
  
    fetch(phonenumberDuplicationAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "중복된 항목이 없습니다.") {
          phoneNumberCheck = true;
          $phoneNumberDuplicateAlert.style.display = "none";
          $phoneNumberDuplicationCheckSuccess.style.display = "block";
        } else {
          phoneNumberCheck = false;
          $phoneNumberDuplicateAlert.style.display = "block";
          $phoneNumberDuplicationCheckSuccess.style.display = "none";
        }
      })
      .catch((e) => {
    });
  }
});

$registrationBtn.addEventListener("click", function(event) {
  event.preventDefault()

  const usernameData = $username.value.toString();
  if (usernameData === "") {
    $usernameAlert.style.display = "block";
  } else {
    $usernameAlert.style.display = "none";
  }

  const emailData = $email.value.toString();
  if (regex.test(emailData) == false) {
    $emailAlert.style.display = "block";
  } else {
    $emailAlert.style.display = "none";
  }

  const passwordData = $password.value.toString();
  if (passwordData === "" || (passwordData.length) < 7) {
    $passwordAlert.style.display = "block";
  } else {
    $passwordAlert.style.display = "none";
  }

  const passwordConfirmData = $passwordConfirm.value.toString();
  if (passwordConfirmData != passwordData) {
    $passwordCheckAlert.style.display = "block";
    passwordCheck = false;
  } else {
    $passwordCheckAlert.style.display = "none";
    passwordCheck = true;
  }
  const profileImageData = $profileImage.files[0];
  const phoneNumberData = $phoneNumber.value.toString();
  if (phoneNumberData.length != "13") {
    $phoneNumberAlert.style.display = "block";
  } else {
    $phoneNumberAlert.style.display = "none";
  }
  const isTeacherData = $isTeacher.checked.toString();

  if (usernameCheck && emailCheck && phoneNumberCheck && passwordCheck) {
    const formData = new FormData();

    formData.append("username", usernameData);
    formData.append("email", emailData);
    formData.append("password1", passwordData);
    formData.append("password2", passwordConfirmData);
    formData.append("nickname", "");
    if (profileImageData) {
      formData.append("profile_image", profileImageData);
    }
    formData.append("phone_number", phoneNumberData);
    formData.append("is_teacher", isTeacherData);
  
    fetch(registrationAPI, {
      method: "POST",
      body: formData,
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.detail == "확인 이메일을 발송했습니다.") {
          window.location.href = "registration-email.html";
        }
      })
      .catch((e) => {
    });
  } else {
    if (usernameCheck === false) {
      $usernameDuplicationCheckAlert.style.display = "block";
    }
    if (emailCheck === false) {
      $emailDuplicationCheckAlert.style.display = "block";
    }
    if (phoneNumberCheck === false) {
      $phoneNumberDuplicationCheckAlert.style.display = "block";
    }
  }
});
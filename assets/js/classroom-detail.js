const classroomDetailURL = "http://3.37.187.68:8000/classroom/detail";
const classroomNames = document.querySelectorAll(".classroom-name");
const classroomInfo = document.querySelectorAll(".classroom-info");
const classroomTag = document.querySelectorAll(".classroom-tag");
const classroomDate = document.querySelectorAll(".classroom-date");

function getPKFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("pk");
}

function setClassroomName(name) {
  classroomNames.forEach(element => {
    element.innerText = name;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${classroomDetailURL}/${getPKFromQuery()}/`)
    .then(response => response.json())
    .then(data => {
      setClassroomName(data.class_name);
      classroomInfo[0].innerText = data.class_info;
      classroomTag[0].innerText = data.tag.join(" ");
      classroomDate[0].innerText = data.created_at;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

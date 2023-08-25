const classroomDetailURL = "http://3.37.187.68:8000/classroom/detail";
const classroomNames = $(".classroom-name");
const classroomInfo = $(".classroom-info");
const classroomTag = $(".classroom-tag");
const classroomDate = $(".classroom-date");

function getPKFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("pk");
}

function setClassroomName(name) {
  for (let index = 0; index < classroomNames.length; index++) {
    classroomNames[index].innerText = name;
  }
}

$(document).ready(function () {
  $.get(`${classroomDetailURL}/${getPKFromQuery()}/`, function (data) {
    setClassroomName(data.class_name);
    classroomInfo[0].innerText = data.class_info;
    classroomTag[0].innerText = data.tag.join(" ");
    classroomDate[0].innerText = data.created_at;
  });
});

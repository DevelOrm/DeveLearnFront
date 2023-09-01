const boardURL = "http://3.37.187.68:8000/";
const classroomNames = document.querySelectorAll(".classroom-name");

document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create-button");
    const resultDiv = document.getElementById("result");

createButton.addEventListener("click", function () {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const uploadFile = document.getElementById("upload_file").files[0];
    const uploadImage = document.getElementById("upload_image").files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (uploadFile) {
      formData.append("upload_file", uploadFile);
    }
    
    if (uploadImage) {
      formData.append("upload_image", uploadImage);
    }
    
    formData.append("board", "2");
    formData.append("board", "2")

    console.log(formData)

    fetch(`${boardURL}classroom/lecturenote/post/`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = JSON.stringify(data);
    })
    .catch(error => {
      console.error("Error creating lecture note:", error);
    });
    });
});
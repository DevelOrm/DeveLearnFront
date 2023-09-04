import {getPKFromQuery} from "./utils.js"
import {serverURL} from "./utils.js"

// ?????????????
document.addEventListener("DOMContentLoaded", function () {
    const commentCreate = document.querySelector("#comment-create");

commentCreate.addEventListener("click", function () {
    const commentInput = document.querySelector("#comment-input").value;
    console.log(commentInput)

    const formData = new FormData();
    formData.append("content", commentInput);
    console.log(getPKFromQuery("board-type"), getPKFromQuery("post"))
    formData.append(getPKFromQuery("board-type"), getPKFromQuery("post"))

    fetch(`${serverURL}classroom/${getPKFromQuery("board-type")}/comment/`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
      console.error("Error write comment", error);
    });
    });
});
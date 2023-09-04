import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"
import {dateFormatting} from "./utils.js"

document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault()
    const createButton = document.querySelector("#create-button");

createButton.addEventListener("click", function (event) {
    event.preventDefault()
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const tag = document.querySelector("#tags").value.split(',')
    const tagArray = tag.map(tag => tag.trim())

    fetch(`${serverURL}classroom/`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "class_name": title,
      "class_info": content,
      "tag": tagArray
    })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.href = "classroom.html"
    })
    .catch(error => {
      console.error("Error creating classroom note:", error);
    });
    });
});
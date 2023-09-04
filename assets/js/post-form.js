import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"
import {dateFormatting} from "./utils.js"

document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault()
    const createButton = document.querySelector("#create-button");

    const inputForm = document.querySelector(".input-form")

    if (getPKFromQuery("board-type") === "lecture_note") {
      const upload_File = document.createElement("input")
      const fileLabel = document.createElement("label");

      upload_File.setAttribute("type", "file");
      upload_File.setAttribute("id", "upload_file");
      upload_File.setAttribute("name", "upload_file");

      fileLabel.setAttribute("for", "upload_file");
      fileLabel.textContent = "Upload File: ";

      const upload_Image = document.createElement("input")
      const imageLabel = document.createElement("label");

      upload_Image.setAttribute("type", "file");
      upload_Image.setAttribute("id", "upload_image");
      upload_Image.setAttribute("name", "upload_image");

      imageLabel.setAttribute("for", "upload_image");
      fileLabel.textContent = "Upload Image: ";

      inputForm.appendChild(fileLabel)
      inputForm.appendChild(upload_File)
      inputForm.appendChild(imageLabel)
      inputForm.appendChild(upload_Image)
    }

    if (getPKFromQuery("board-type") === "test") {
      const solution = document.createElement("input")
      const solutionLabel = document.createElement("label");

      solution.setAttribute("type", "text");
      solution.setAttribute("id", "solution");
      solution.setAttribute("name", "solution");

      solutionLabel.setAttribute("for", "solution")
      solutionLabel.textContent = "Solution: ";

      const autoScore = document.createElement("input")
      autoScore.setAttribute("id", "autoscore")
      autoScore.setAttribute("name", "autoscore")
      autoScore.type = "checkbox";
            
      const autoScoreLabel = document.createElement("label");
      autoScore.setAttribute("for", "autoscore")
      autoScoreLabel.textContent = "AutoScore";

      inputForm.appendChild(autoScoreLabel)
      inputForm.appendChild(autoScore)
      inputForm.appendChild(solutionLabel)
      inputForm.appendChild(solution)
    }

createButton.addEventListener("click", function (event) {
    event.preventDefault()
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (getPKFromQuery("board-type") === "lecture_note") {
      const uploadFile = document.querySelector("#upload_file").files[0]
      const uploadImage = document.querySelector("#upload_image").files[0]

      if (uploadFile) {
        formData.append("upload_file", uploadFile);
      }
      if (uploadImage) {
        formData.append("upload_image", uploadImage);
      }
    }

    // if (getPKFromQuery("board-type") === "test") {
      const solution = document.querySelector("#solution").value.split(',')
      const solutionArray = solution.map(solution => solution.trim())
      const autoScore = document.querySelector("#autoscore").value

      let autoScoreValue = false
      if (autoScore === "on") {
        autoScoreValue = true
      }
      else {
        autoScoreValue = false
      }

      console.log(title, content, solution, autoScoreValue, getPKFromQuery("board"), getPKFromQuery("board-type"))
    // }

    fetch(`${serverURL}classroom/${getPKFromQuery("board-type")}/post/`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "title": title,
      "content": content,
      "board": getPKFromQuery("board"),
      "auto_score": autoScoreValue,
      "solution": solutionArray
    })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.href = "post-list.html?classroom=2&board-type=test&board=2#"
    })
    .catch(error => {
      console.error("Error creating lecture note:", error);
    });
    });
});
import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"

function getBoardTypeFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("board-type")
}

// getBoardTypeFromQuery()
document.addEventListener("DOMContentLoaded", function () {
fetch(`${serverURL}classroom/lecturenote/post/${getPKFromQuery("board")}/`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`
}
})
  .then(response => response.json())
  .then(data => {
    console.log(getPKFromQuery("board-type"))
    const postContainer = document.querySelector(".posts-list");
    data.forEach(post => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-xl-12 col-md-6";
      colDiv.innerHTML = `
        <article>
          <p class="post-category">${post.updated_at}</p>
          <h2 class="title">
            <a href="post-detail.html?post=${post.board}">${post.title}</a>
          </h2>
        </article>
      `;
      postContainer.appendChild(colDiv)
    });
  })
  .catch(error => {
  console.error("Error fetching data:", error);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${serverURL}classroom/detail/${getPKFromQuery("classroom")}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
  }
  })
  .then(response => response.json())
  .then(data => {
    setName(".classroom-name", data.class_name);
    setHref(".classroom-name", `http://127.0.0.1:50744/board.html?classroom/detail/${data.id}/`)
  })
  .catch(error => {
  console.error("Error fetching data:", error);
  });
});
  
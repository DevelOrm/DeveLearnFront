import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"
import {dateFormatting} from "./utils.js"

function getBoardTypeFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("board-type")
}

document.addEventListener("DOMContentLoaded", function () {
fetch(`${serverURL}classroom/${getBoardTypeFromQuery("board-type")}/post/${getPKFromQuery("board")}/`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`
}
})
  .then(response => response.json())
  .then(data => {
    const postContainer = document.querySelector(".posts-list");
    data.forEach(post => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-xl-12 col-md-6";
      colDiv.innerHTML = `
        <article>
          <p class="post-category">${dateFormatting(post)}</p>
          <h2 class="title">
            <a href="post-detail.html?classroom=${getPKFromQuery("classroom")}&board=${getPKFromQuery("board")}&board-type=${getPKFromQuery("board-type")}&post=${post.id}">${post.title}</a>
          </h2>
          <p>${post.content}</p>
        </article>
      `;
      postContainer.appendChild(colDiv)

      setHref(".write-post", `post-form.html?classroom=${getPKFromQuery("classroom")}&board-type=${getPKFromQuery("board-type")}&board=${getPKFromQuery("board")}`);
    });
  })
  .catch(error => {
  console.error("Error fetching data:", error);
  });
});

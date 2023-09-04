import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {serverURL} from "./utils.js"

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${serverURL}classroom/board?classroom=${getPKFromQuery()}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data[0])
    const boardContainer = document.querySelector(".posts-list");
    data.forEach(board => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-xl-4 col-md-6";
      colDiv.innerHTML = `
        <article>
          <p class="post-category">${board.title}</p>

          <h2 class="title">
            <a href=post-list.html?classroom=${getPKFromQuery("classroom")}&board-type=${board.board_type}&board=${board.id}>${board.content}</a>
          </h2>

          <div class="d-flex align-items-center">
            <img src="assets/img/blog/blog-author.jpg" alt="" class="img-fluid post-author-img flex-shrink-0" />
            <div class="post-meta">
              <p class="post-author-list">${board.user}</p>
              <p class="post-date">
                <time datetime="2022-01-01">${board.created_at}</time>
              </p>
            </div>
          </div>
        </article>
      `;
      boardContainer.appendChild(colDiv)
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
    })
    .catch(error => {
    console.error("Error fetching data:", error);
    });
  });
  
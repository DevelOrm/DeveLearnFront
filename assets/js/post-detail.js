import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {serverURL} from "./utils.js"

// getPKFromQuery("board-type")
document.addEventListener("DOMContentLoaded", function () {
fetch(`${serverURL}classroom/lecturenote/post/detail/${getPKFromQuery("post")}/`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`
}
})
  .then(response => response.json())
  .then(data => {
    const postContainer = document.querySelector(".blog-details");
      const article = document.createElement("div");
      article.innerHTML = `
      <div class="post-img">
        <!-- <img src="assets/img/blog/blog-1.jpg" alt="" class="img-fluid" /> -->
        이미지 (필요시)
        </div>

        <h2 class="title">${data.title}</h2>

        <div class="meta-top">
        <ul>
          <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-details.html">${data.user}</a></li>
          <li class="d-flex align-items-center">
          <i class="bi bi-clock"></i> <a href="blog-details.html"><time datetime="2020-01-01">${data.updated_at}</time></a>
          </li>
          <li class="d-flex align-items-center"><i class="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a></li>
        </ul>
        </div>
        <!-- End meta top -->

        <div class="content">
          <p>${data.content}</p>
        </div>
        <!-- End post content -->

        <div class="meta-bottom">
        <i class="bi bi-folder"></i>
        <ul class="cats">
            <li><a href="#">Business</a></li>
        </ul>

        <i class="bi bi-tags"></i>
        <ul class="tags">
            <li><a href="#">Creative</a></li>
            <li><a href="#">Tips</a></li>
            <li><a href="#">Marketing</a></li>
        </ul>
        </div>
        <!-- End meta bottom -->
      `;
      postContainer.appendChild(article)
  })
  .catch(error => {
  console.error("Error fetching data:", error);
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   fetch(`${serverURL}classroom/detail/${getPKFromQuery()}/`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//   }
//   })
//     .then(response => response.json())
//     .then(data => {
//       setClassroomName(data.class_name);
//     })
//     .catch(error => {
//     console.error("Error fetching data:", error);
//     });
//   });
  
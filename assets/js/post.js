const boardURL = "http://52.79.53.117/";
const classroomNames = document.querySelectorAll(".classroom-name");

function getPKFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("board");
}

function setClassroomName(name) {
  for (let index = 0; index < classroomNames.length; index++) {
    classroomNames[index].innerText = name;
  }
}

document.addEventListener("DOMContentLoaded", function () {
fetch(`${boardURL}classroom/board/${getPKFromQuery()}/`, {
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
          <p class="post-category">${post.updated_at}</p>
          <h2 class="title">
            <a href="post-detail.html">${post.title}</a>
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
  fetch(`${boardURL}classroom/detail/${getPKFromQuery()}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
  }
  })
    .then(response => response.json())
    .then(data => {
      setClassroomName(data.class_name);
    })
    .catch(error => {
    console.error("Error fetching data:", error);
    });
  });
  
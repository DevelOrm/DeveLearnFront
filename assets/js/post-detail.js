import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"
import {dateFormatting} from "./utils.js"

document.addEventListener("DOMContentLoaded", function () {
fetch(`${serverURL}classroom/${getPKFromQuery("board-type")}/post/detail/${getPKFromQuery("post")}/`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    setName(".classroom-title", data.title)
    setName(".classroom-user", data.user)
    setName(".classroom-date", dateFormatting(data))
    setName(".classroom-content", data.content)
    
    if (getPKFromQuery("board-type") === "test") {
      const blogDetail = document.querySelector(".blog-details")
      blogDetail.innerHTML += `
        <div class="meta-bottom">
          <input type="text" class="answerInput" placeholder="정답을 입력하세요">
          <button class="testSubmitButton">정답 제출</button>
        </div>
      `

      fetch(`${serverURL}classroom/testsubmit/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data != "") {
          console.log(data)
          const myScore = document.querySelector(".my-score");
          
          myScore.innerHTML = `
            <div class="flex">
              <h4 class="mb-3 text-center">${data[0].user}</h4>
              <img src="assets/img/blog/blog-author.jpg" class="rounded-circle flex-shrink-0" alt="" />
            </div>
            <div>
              <table class="border align-items-center m-3">
                <thead>
                  <tr>
                    <th class="border p-4 text-center">제출한 답</th>
                    <th class="border p-4 text-center">정답여부</th>
                    <th class="border p-4 text-center">제출 일시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4 text-center">${data[0].user_answer}</td>
                    <td class="border p-4 text-center">${data[0].answer_status}</td>
                    <td class="border p-4 text-center">${dateFormatting(data[0])}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        }
        else {
          const myScore = document.querySelector(".my-score");
          myScore.innerHTML = `
            <p>정답을 제출해주세요</p>
          `
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    }
    
    if (getPKFromQuery("board-type") === "test") {
      const submitButton = document.querySelector(".testSubmitButton");
      const answerInput = document.querySelector(".answerInput");

      submitButton.addEventListener("click", function () {
        const userAnswer = answerInput.value;
        fetch(`${serverURL}classroom/testsubmit/`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "test": getPKFromQuery("post"),
            "user_answer": userAnswer
          })
        })
        .then(response => response.json())
        .then(data => {
          location.reload()
        })
      });
    }
  })
  .catch(error => {
  console.error("Error fetching data:", error);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${serverURL}classroom/${getPKFromQuery("board-type")}/comment/${getPKFromQuery("post")}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const postComment = document.querySelector(".post-comment")
      setName(".comments-count", data.length + " Comments")
      if (data != "") {
        data.forEach(comment => {
          // 사용자의 댓글 삭제버튼 추가필요
          postComment.innerHTML += `
            <div id="comment-1" class="comment">
              <div class="d-flex comment-box">
                <div class="comment-img"><img src="assets/img/blog/comments-1.jpg" alt="" /></div>
                <div>
                  <h5>
                    <a href="">${comment.user}</a>
                  </h5>
                  <time datetime="2020-01-01">${dateFormatting(comment)}</time>
                  <p>${comment.content}</p>
                </div>
              </div>
            </div>
          `
        });
      }
  })
})


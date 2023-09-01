import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {serverURL} from "./utils.js"

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${serverURL}classroom/detail/${getPKFromQuery("pk")}/`)
    .then(response => response.json())
    .then(data => {
      setName(".classroom-name", data.class_name);
      const portfolioDetail = document.querySelector(".portfolio-details")
      portfolioDetail.innerHTML = `
        <div class="container" data-aos="fade-up">
          <div class="row justify-content-between gy-4 mt-4">
            <div class="col-lg-8">
              <div class="portfolio-description">
                <h2>${data.class_name}</h2>
                <p class="classroom-info">${data.class_info}</p>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="portfolio-info">
                <h3>상세 정보</h3>
                <ul>
                  <li><strong>카테고리</strong> <span class="classroom-tag">${data.tag.join(" ")}</span></li>
                  <li><strong>생성 날짜</strong> <span class="classroom-date">${data.created_at}</span></li>
                  <li><a href="#" class="btn-visit align-self-start">수강 신청</a></li>
                  <li><a href="board.html?classroom=${data.id}" class="board-list btn-visit align-self-start">학습 게시판</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

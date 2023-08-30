// const serverURL = "http://3.37.187.68:8000";
const resultsContainer = document.querySelector("#results");
const paginationContainer = document.querySelector(".pagination");
const searchBtn = document.querySelector("#searchBtn");

if (searchBtn) {
  document.addEventListener("DOMContentLoaded", function () {
    searchBtn.addEventListener("click", NewsListAPI);
    NewsListAPI();
  });
}

function NewsListAPI() {
  const keyword = document.querySelector("#keyword").value;
  resultsContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  // API 요청 및 결과 처리
  fetch(`${serverURL}/news/search/?q=${keyword}`)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      for (const result of results) {
        resultsContainer.innerHTML += `<a href='${result.link}' class="mb-4 list-group-item list-group-item-action list-group-item-success">${result.title}</a>`;
      }

      // Pagination 처리
      const pageCount = Math.ceil(data.count / data.page_size);
      for (let i = 1; i <= pageCount; i++) {
        paginationContainer.innerHTML += `<li class="page-item"><button class="page-link" onclick="paginate(${i})">${i}</button></li>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function paginate(page) {
  const keyword = document.querySelector("#keyword").value;
  const resultsContainer = document.querySelector("#results");
  resultsContainer.innerHTML = "";

  // 특정 페이지의 검색 결과를 가져오는 API 요청
  fetch(`${serverURL}/news/search/?q=${keyword}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      for (const result of results) {
        resultsContainer.innerHTML += `<a href='${result.link}' class="mb-4 list-group-item list-group-item-action list-group-item-success">${result.title}</a>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

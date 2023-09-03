const resultsContainer = $("#results");
const paginationContainer = $(".pagination");
const searchBtn = $("#searchBtn");
const SearchURL = "http://develearn.co.kr/api/news/search/";

if (searchBtn) {
  $(document).ready(function () {
    searchBtn.click(NewsListAPI);
    NewsListAPI();
  });
}

function NewsListAPI() {
  const keyword = $("#keyword").val();
  resultsContainer.empty();
  paginationContainer.empty();

  // API 요청 및 결과 처리
  $.get(`${SearchURL}?q=${keyword}`, function (data) {
    const results = data.results;
    for (const result of results) {
      resultsContainer.append(`<a href='${result.link}' class="mb-4 list-group-item list-group-item-action list-group-item-success">${result.title}</a>`);
    }

    // Pagination 처리
    const pageCount = Math.ceil(data.count / data.page_size);
    for (let i = 1; i <= pageCount; i++) {
      paginationContainer.append(`<li class="page-item"><button class="page-link" onclick="paginate(${i})">${i}</button></li>`);
    }
  });
}

function paginate(page) {
  const keyword = $("#keyword").val();
  const resultsContainer = $("#results");
  resultsContainer.empty();

  // 특정 페이지의 검색 결과를 가져오는 API 요청
  $.get(`${SearchURL}?q=${keyword}&page=${page}`, function (data) {
    const results = data.results;
    for (const result of results) {
      resultsContainer.append(`<a href='${result.link}' class="mb-4 list-group-item list-group-item-action list-group-item-success">${result.title}</a>`);
    }
  });
}

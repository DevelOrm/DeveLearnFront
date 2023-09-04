document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("sticked");
        if (nextElement) nextElement.classList.add("sticked-header-offset");
      } else {
        selectHeader.classList.remove("sticked");
        if (nextElement) nextElement.classList.remove("sticked-header-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    document.addEventListener("scroll", headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll("#navbar a");

  function navbarlinksActive() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper(".slides-3", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
});

const serverURL = "http://3.37.187.68:8000/";

/**
 * 이달의 클래스룸 출력
 */
const classroomContainer = document.querySelector(".portfolio-container");
if (classroomContainer) {
  document.addEventListener("DOMContentLoaded", function () {
    fetch(`${serverURL}classroom/`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          const tag_list = element.tag.map((item) => "filter-" + item.toLowerCase()).join(" ");
          classroomContainer.innerHTML += `
                <div class="col-xl-4 col-md-6 portfolio-item ${tag_list}">
                  <div class="portfolio-wrap">
                    <div class="portfolio-info">
                      <h4><a href="classroom-detail.html?pk=${element.id}" title="More Details">${element.class_name}</a></h4>
                      <p>${element.class_info}</p>
                      <p>${element.tag}</p>
                    </div>
                  </div>
                </div>
                `;
        });

        /**
         * Porfolio isotope and filter
         */
        let portfolionIsotope = document.querySelector(".portfolio-isotope");

        if (portfolionIsotope) {
          let portfolioFilter = portfolionIsotope.getAttribute("data-portfolio-filter") ? portfolionIsotope.getAttribute("data-portfolio-filter") : "*";
          let portfolioLayout = portfolionIsotope.getAttribute("data-portfolio-layout") ? portfolionIsotope.getAttribute("data-portfolio-layout") : "masonry";
          let portfolioSort = portfolionIsotope.getAttribute("data-portfolio-sort") ? portfolionIsotope.getAttribute("data-portfolio-sort") : "original-order";

          let portfolioIsotope = new Isotope(document.querySelector(".portfolio-container"), {
            itemSelector: ".portfolio-item",
            layoutMode: portfolioLayout,
            filter: portfolioFilter,
            sortBy: portfolioSort,
          });

          let menuFilters = document.querySelectorAll(".portfolio-isotope .portfolio-flters li");
          menuFilters.forEach(function (el) {
            el.addEventListener(
              "click",
              function () {
                document.querySelector(".portfolio-isotope .portfolio-flters .filter-active").classList.remove("filter-active");
                this.classList.add("filter-active");
                portfolioIsotope.arrange({
                  filter: this.getAttribute("data-filter"),
                });
                if (typeof aos_init === "function") {
                  aos_init();
                }
              },
              false
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
}

/**
 * 최근 개발자 뉴스 출력
 */

const newsContainer = document.querySelector(".news-container");

if (newsContainer) {
  document.addEventListener("DOMContentLoaded", function () {
    fetch(`${serverURL}news/recent/`)
      .then((response) => response.json())
      .then((data) => {
        for (let index = 0; index < 6; index++) {
          newsContainer.innerHTML += `
                    <div class="col-xl-4 col-md-6">
                        <article>
                            <h2 class="title">
                                <a href="${data[index].link}">${data[index].title}</a>
                            </h2>
                        </article>
                    </div>
                    `;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
}

/**
 * 로그인 정보 저장
 */
function setToken(access, refresh, username) {
  document.cookie = `access=${access}; path=/`;
  const expirationDate = new Date(); // 만료 날짜 설정
  expirationDate.setDate(expirationDate.getDate() + 7); // 예: 7일 후 만료
  document.cookie = `refresh=${refresh}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}; path=/`;
}

function getCookie(cookieName) {
  const cookies = document.cookie.split("; "); // 쿠키 문자열을 ';'와 공백으로 분리하여 배열로 만듦

  for (const cookie of cookies) {
    const [name, value] = cookie.split("="); // 쿠키를 이름과 값으로 분리
    if (name === cookieName) {
      return value; // 입력한 이름과 일치하는 쿠키의 값을 반환
    }
  }

  return null; // 해당 이름의 쿠키가 없을 경우 null 반환
}
function deleteCookie(cookieName) {
  // 현재 날짜를 이용하여 쿠키의 만료 시간을 설정
  const pastDate = new Date(0);
  document.cookie = `${cookieName}=; expires=${pastDate.toUTCString()}; path=/`;
}

function logout() {
  deleteCookie("username");
  deleteCookie("access");
  deleteCookie("refresh");
  window.location.href = "index.html";
}

/**
 * 로그인 정보 출력
 */
const headerContainer = document.querySelector(".header-container");
const accessToken = getCookie("access");
const refreshToken = getCookie("refresh");

if (accessToken && refreshToken) {
  headerContainer.innerHTML += `
  <li class="dropdown">
    <a href="#"><span>${getCookie("username")}</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
    <ul class="dropdown-menu">
      <li><a href="profile.html" class="dropdown-item">프로필</a></li>
      <li><a href="index.html" class='logoutBtn dropdown-item'>로그아웃</a></li>
    </ul>
  </li>
  `;
  const logoutButton = document.querySelector(".logoutBtn");
  logoutButton.click(function () {
    logout();
  });
} else {
  headerContainer.innerHTML += `
  <li><a href="login.html">로그인</a></li>
  `);
}

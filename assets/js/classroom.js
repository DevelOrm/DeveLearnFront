import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {serverURL} from "./utils.js"

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${serverURL}classroom/`)
    .then(response => response.json())
    .then(data => {
      const tag_list = element.tag.map((item) => "filter-" + item.toLowerCase()).join(" ");
      const mainContent = document.querySelector(".main-content")
      mainContent.innerHTML = (`
        <div class="col-xl-4 col-md-6 portfolio-item ${tag_list}">
          <div class="portfolio-wrap">
            <!-- <a href="#" data-gallery="portfolio-gallery-app" class="glightbox"><img src="assets/img/portfolio/app-1.jpg" class="img-fluid" alt="" /></a> -->
            <div class="portfolio-info">
              <h4><a href="classroom-detail.html?pk=${element.id}" title="More Details">${element.class_name}</a></h4>
              <p>${element.class_info}</p>
              <p>${element.tag}</p>
            </div>
          </div>
        </div>
      `);
      setName(".classroom-name", data.class_name)
    })
}).then((data) => {
      /**
       * Porfolio isotope and filter
       */
      const portfolionIsotope = document.querySelector(".portfolio-isotope");

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
    });


const classroomContainer = document.querySelector(".main-content");

if (classroomContainer) {
  fetch(`${serverURL}classroom/`)
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        const tag_list = element.tag.map(item => "filter-" + item.toLowerCase()).join(" ");
        classroomContainer.innerHTML += `
          <div class="col-xl-4 col-md-6 portfolio-item ${tag_list}">
            <div class="portfolio-wrap">
              <!-- <a href="#" data-gallery="portfolio-gallery-app" class="glightbox"><img src="assets/img/portfolio/app-1.jpg" class="img-fluid" alt="" /></a> -->
              <div class="portfolio-info">
                <h4><a href="classroom-detail.html?pk=${element.id}" title="More Details">${element.class_name}</a></h4>
                <p>${element.class_info}</p>
                <p>${element.tag}</p>
              </div>
            </div>
          </div>
        `;
      });
    })
    .then(() => {
      /**
       * Porfolio isotope and filter
       */
      let portfolionIsotope = document.querySelector(".portfolio-isotope");

      if (portfolionIsotope) {
        let portfolioFilter = portfolionIsotope.dataset.portfolioFilter || "*";
        let portfolioLayout = portfolionIsotope.dataset.portfolioLayout || "masonry";
        let portfolioSort = portfolionIsotope.dataset.portfolioSort || "original-order";

        let portfolioIsotope = new Isotope(document.querySelector(".portfolio-container"), {
          itemSelector: ".portfolio-item",
          layoutMode: portfolioLayout,
          filter: portfolioFilter,
          sortBy: portfolioSort,
        });

        let menuFilters = document.querySelectorAll(".portfolio-isotope .portfolio-flters li");
        menuFilters.forEach(el => {
          el.addEventListener("click", function () {
            document.querySelector(".portfolio-isotope .portfolio-flters .filter-active").classList.remove("filter-active");
            this.classList.add("filter-active");
            portfolioIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aos_init === "function") {
              aos_init();
            }
          });
        });
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
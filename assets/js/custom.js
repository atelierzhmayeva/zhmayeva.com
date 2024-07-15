$(window.location.hash).modal("show");
$('a[data-toggle="modal"]').click(function () {
  window.location.hash = $(this).attr("href");
});

function revertToOriginalURL() {
  var original = window.location.href.substr(
    0,
    window.location.href.indexOf("#")
  );
  history.replaceState({}, document.title, original);
}

$(".modal").on("hidden.bs.modal", function () {
  revertToOriginalURL();
});

function applyPortfolioCategoryFilter(category) {
  var allPortfolios = $("div[data-category]");

  if (category === "") {
    allPortfolios.show(1000);
    return;
  }

  if (category === "men" || category === "women") {
    function genderFilterFunction() {
      var currentCategory = $(this).attr("data-category");
      return currentCategory === category || currentCategory === "unisex";
    }

    allPortfolios.filter(genderFilterFunction).show();
    allPortfolios.not(genderFilterFunction).hide();
    return;
  }

  function filterFunction() {
    return $(this).attr("data-category") === category;
  }

  allPortfolios.filter(filterFunction).show();
  allPortfolios.not(filterFunction).hide();
}

$(".tab-button").on("click", function () {
  var isWasSelected = $(this).attr("data-portfolio-selected");
  $(".tab-button").removeClass("selected-category");
  $(".tab-button").attr("data-portfolio-selected", "");

  if (isWasSelected) {
    applyPortfolioCategoryFilter("");
    return;
  }

  $(this).attr("data-portfolio-selected", true);
  $(this).addClass("selected-category");

  var categoryToShow = $(this).attr("data-portfolio-category");
  applyPortfolioCategoryFilter(categoryToShow);
});

$(".up-button").on("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("#call-widget").on("click", function () {
  $(this).toggleClass("opened");
});

(function ($) {
  "use strict";

  // Filter

  $(document).ready(function () {
    $(".buttons").on("click", function () {
      var buttonvalue = $(this).attr("data-filter");

      if (buttonvalue == "all") {
        $(".image-filter").show("1000");
      } else {
        $(".image-filter")
          .not("." + buttonvalue)
          .hide("200");
        $(".image-filter")
          .filter("." + buttonvalue)
          .show("200");
      }
      $(this).addClass("active").siblings().removeClass("active");
    });
  });

  // Testimonial Slider

  $("#testimonial").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    animateOut: "fadeOut",
    animateIn: "flipInX",
    responsive: {
      0: {
        dots: true,
        items: 1,
      },
      600: {
        dots: true,
        items: 1,
      },
      1000: {
        dots: true,
        items: 1,
      },
    },
  });

  // Animation
  new WOW().init();

  // Home Slider
  if ($(".flexslider").length > 0) {
    $(".flexslider").flexslider({
      animation: "slide",
      controlNav: "thumbnails",
    });
  }

  // Parallax
  var scene = document.getElementById("scene");
  if ($("#scene").length > 0) {
    var parallax = new Parallax(scene);
  }

  if ($("#results-container").length > 0) {
    var urlPart = location.href.replace(location.origin, "");
    var urlParts = urlPart.split("/");
    urlPart = urlParts.length > 2 ? urlParts[1] + "/" : "/";
    var sjs = SimpleJekyllSearch({
      searchInput: document.getElementById("search-input"),
      resultsContainer: document.getElementById("results-container"),
      json: "/" + urlPart + "search.json",
    });
  }
})(window.jQuery);

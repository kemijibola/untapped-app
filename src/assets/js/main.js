(function ($) {
  "use strict";

  jQuery(document).ready(function ($) {
    setTimeout(function () {
      $("#talents-scroll").scrollLeft(10);
    }, 500);
    setTimeout(function () {
      $("#talents-scroll").scrollLeft(20);
    }, 1000);
    setTimeout(function () {
      $("#talents-scroll").scrollLeft(30);
    }, 1200);
    setTimeout(function () {
      $("#talents-scroll").scrollLeft(40);
    }, 1600);
    setTimeout(function () {
      $("#talents-scroll").scrollLeft(70);
    }, 2000);
    $(".embed-responsive iframe").addClass("embed-responsive-item");
    $(".carousel-inner .item:first-child").addClass("active");

    $('[data-toggle="tooltip"]').tooltip();

    $("#mobile-menu-active").meanmenu({
      meanScreenWidth: "767",
      meanMenuContainer: ".menu-prepent",
    });

    $(".menu-open").click(function () {
      $(".slide-menu").addClass("activee");
    });
    $(".close-btn").click(function () {
      $(".slide-menu").removeClass("activee");
    });

    $(".blog-slide").owlCarousel({
      items: 5,
      nav: true,
      dot: true,
      loop: true,
      margin: 15,
      autoplay: false,
      autoplayTimeout: 3000,
      smartSpeed: 1000,
      navText: [
        "<i class='fal fa-angle-left'></i>",
        "<i class='fal fa-angle-right'></i>",
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 3,
        },
        1000: {
          items: 5,
        },
      },
    });
  });

  var accordions = document.getElementsByClassName("accordion");
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function () {
      this.classList.toggle("is-open");

      var content = this.nextElementSibling;
      console.log(content);
      if (content.style.maxHeight) {
        // accordion is currently open, so close it
        content.style.maxHeight = null;
      } else {
        // accordion is currently closed, so open it
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };
  }

  // Toggle button Query
  document
    .querySelectorAll(".toggle-btn .toggle-outer")
    .forEach(function (each) {
      each.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    });

  $("select").niceSelect();

  $(".container").imagesLoaded(function () {
    // images have loaded

    $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 1,
      },
    });
  });

  // jQuery(window).load(function(){

  // });
  // for contest form

  // Talent page Accordion menu

  // Checkbox query Signup page

  // fot Masonary talent page 1
  $(".grid").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: ".grid-sizer",
    },
  });
})(jQuery);

$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>', // only single quotes work, double quotes do not work
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>', // ../ Delete -> in order to run the script without a server.
    responsive: [
      {
        breakpoint: 900,
        settings: {
          dots: true,
          arrows: false,
          variableWidth: false
        }
      },
      {
        breakpoint: 420,
        settings: {
          dots: false,
          arrows: false,
          variableWidth: false
        }

      }

    ]
  });

  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab--active)", function () {
    $(this)
      .addClass("catalog__tab--active").siblings().removeClass("catalog__tab--active").closest("div.container")
      .find("div.catalog__content").removeClass("catalog__content--active").eq($(this).index()).addClass("catalog__content--active");
  });

  // $(".catalog-item__link").each(function(i) {
  //   $(this).on("click", function(e) {
  //     e.preventDefault();
  //     $(".catalog-item__content")
  //       .eq(i)
  //       .toggleClass("catalog-item__content--active");
  //     $(".catalog-item__list")
  //       .eq(i)
  //       .toggleClass("catalog-item__list--active");
  //   });
  // });

  // $(".catalog-item__back").each(function(i) {
  //   $(this).on("click", function(e) {
  //     e.preventDefault();
  //     $(".catalog-item__content")
  //       .eq(i)
  //       .toggleClass("catalog-item__content--active");
  //     $(".catalog-item__list")
  //       .eq(i)
  //       .toggleClass("catalog-item__list--active");
  //   });
  // });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content").eq(i).toggleClass("catalog-item__content--active");
        $(".catalog-item__card").eq(i).toggleClass("catalog-item__card--active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Modal 

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });

  $(".button--mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow"); // command showing the modal window
    })
  });


  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }

      },
      messages: {
        name: {
          required: "Будь ласка, введіть своє ім'я",
          minlength: jQuery.validator.format("Потрібно щонайменше {0} символи!")
        },
        phone: "Будь ласка, введіть свій номер телефону",
        email: {
          required: "Нам потрібна ваша електронна адреса, щоб зв'язатися з вами",
          email: "Ваша електронна адреса повинна бути у форматі name@domain.com"
        }
      }
    });
  };
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+38(999) 999-9999");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  // Smooth scroll and page up

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();

});


"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  // console.log(`navbar height: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Hnadle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  //navbar 클릭했을 때 출력 X (link있는 경우에만 수행)
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContact = document.querySelector(".home__contact");
homeContact.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scroll down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // console.log(1 - window.scrollY / homeHeight); //0,800인 경우 1 - 0 = 1 이 되어 불투명, 400,800인 경우 1 - 0.5 = 0.5
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

//Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  //btn 혹은 span in btn
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //remove selection from the previous and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  // span일 경우 btn을 사용
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      //전부 다 이거나, 클릭한 필터와 데이터 타입이 매칭되면 보여준다.
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// scroll이동, 반복되는 method 추출 (utility function)
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

//counter animation

// $(function () {
//   $('.flex_box .count').each(function (i) {
//     $(this)
//       .prop('Counter', 0)
//       .animate(
//         {
//           Counter: $(this).text(),
//         },
//         {
//           duration: 4000,
//           easing: 'swing',
//           step: function (now) {
//             $(this).text(Math.ceil(now));
//           },
//         }
//       );
//   });
// });

$(function () {
  $(window).scroll(function () {
    let scTop = $(this).scrollTop();
    console.log(scTop);
    if (scTop > 1700) {
      $(".flex_box .count").each(function (i) {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 4000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
    }
  });
});

// water animation

$(function () {
  let a = 0;
  $(window).scroll(function () {
    let oTop = $(".major").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      console.log($(".major:nth-child(2) .wave"));
      $(".major:first-child .wave").animate({ top: "18%" }, 1500);
      $(".major:nth-child(2) .wave").animate({ top: "19%" }, 1500);
      $(".major:nth-child(3) .wave").animate({ top: "24%" }, 1500);
      $(".wave").addClass("waveAni");
    }
  });
});

const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

// ===== MENU (Only if exists) =====
if (btnToggleNav && nav) {
  const toggleNav = () => {
    nav.classList.toggle("hidden");
    document.body.classList.toggle("lock-screen");

    if (nav.classList.contains("hidden")) {
      btnToggleNav.textContent = "menu";
    } else {
      setTimeout(() => {
        btnToggleNav.textContent = "close";
      }, 475);
    }
  };

  btnToggleNav.addEventListener("click", toggleNav);

  if (navMenu) {
    navMenu.addEventListener("click", (e) => {
      if (e.target.localName === "a") {
        toggleNav();
      }
    });
  }

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !nav.classList.contains("hidden")) {
      toggleNav();
    }
  });

  const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');
  if (lastFocusedEl) {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
        e.preventDefault();
        btnToggleNav.focus();
      }
    });
  }
}

// ===== THEME SWITCH =====
document.addEventListener("DOMContentLoaded", function () {
  const switchThemeEl = document.querySelector('#theme-switch');
  const storedTheme = localStorage.getItem("theme");

  if (!switchThemeEl) return;

  // Apply saved theme
  if (storedTheme === "dark" || storedTheme === null) {
    document.body.classList.add("dark");
    switchThemeEl.checked = true;
  } else {
    document.body.classList.add("light");
    switchThemeEl.checked = false;
  }

  // Handle toggle
  switchThemeEl.addEventListener("change", () => {
    if (switchThemeEl.checked) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});

// ===== WORK ANIMATION ON SCROLL =====
workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// ===== LOGO ROTATION ANIMATION =====
const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// ===== UPDATE YEAR =====
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

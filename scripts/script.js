import { DOM } from "./DOM.js";
import { games } from "./games.js";

let menuState = false;

DOM.btnMenu.forEach((e) => {
  e.addEventListener("click", () => {
    menuState = !menuState;

    DOM.menu.style.width = menuState ? "220px" : "0px";
    DOM.menu.style.padding = menuState ? "20px 20px" : " 20px 0px";
    DOM.menu.style.borderLeft = menuState ? "1px solid var(--cor3)" : "none";
  });
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scroll para baixo
    DOM.header.classList.add("header-fixed");
  } else {
    // Scroll para cima
    DOM.header.classList.remove("header-fixed");
  }

  lastScrollY = currentScrollY;

  console.log("Foi!");
});

const createElement = (tag) => {
  const element = document.createElement(tag);
  return element;
};

games.forEach((e, i) => {
  const article = createElement("article");

  article.style.backgroundImage = `linear-gradient(to bottom, #032ca6d2, transparent, #785ed8bb),
    url(./img/portrait/${e.access}.png)`;

  article.addEventListener("click", () => {
    DOM.modal.style.display = "flex";
    contentModal(i);
    DOM.header.classList.remove("header-fixed");
    document.body.style.overflow = "hidden";
  });

  const span = createElement("span");
  span.innerText = "Jogue";

  DOM.containerGames.appendChild(article);
  article.appendChild(span);
});

DOM.btnCloseModal.addEventListener("click", () => {
  DOM.modal.style.display = "none";
  document.body.style.overflow = "";
});

const contentModal = (path) => {
  DOM.modalHeader.style.backgroundImage = `url('./img/banner/${games[path].access}.jpg')`;

  DOM.btnModalPlay.href = games[path].link;

  DOM;
};

DOM.btnModalSection.forEach((button, i) => {
  button.addEventListener("click", () => {
    DOM.modalSection.forEach((section) => {
      section.style.display = "none";
    });

    DOM.modalSection[i].style.display = "flex";
  });
});

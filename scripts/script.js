// Importa os módulos necessários
import { DOM } from "./DOM.js";
import { games } from "./games.js";

/* ===== Controle do Menu Lateral ===== */
let isMenuOpen = false;

const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;

  DOM.menu.style.width = isMenuOpen ? "220px" : "0";
  DOM.menu.style.padding = isMenuOpen ? "20px" : "20px 0";
  DOM.menu.style.borderLeft = isMenuOpen ? "1px solid var(--cor3)" : "none";
};

DOM.btnMenu.forEach((btn) => btn.addEventListener("click", toggleMenu));

/* ===== Fixar Header no Scroll ===== */
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    DOM.header.classList.add("header-fixed");
  } else {
    DOM.header.classList.remove("header-fixed");
  }

  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", handleScroll);

/* ===== Utilitários ===== */
const createElement = (tag) => document.createElement(tag);

/* ===== Renderização dos Jogos =====*/
const renderGames = () => {
  games.forEach((game, index) => {
    const article = createElement("article");
    article.style.backgroundImage = `
      linear-gradient(to bottom, #032ca6d2, transparent, #785ed8bb),
      url(./img/portrait/${game.access}.png)
    `;

    article.addEventListener("click", () => openModal(index));

    const span = createElement("span");
    span.innerText = "Jogue";

    article.appendChild(span);
    DOM.containerGames.appendChild(article);
  });
};

/* ===== Modal ===== */
const openModal = (index) => {
  DOM.modal.style.display = "flex";
  renderModalInfos(index);
  renderModalUpdate(index);
  DOM.header.classList.remove("header-fixed");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  DOM.modal.style.display = "none";
  document.body.style.overflow = "";
};

const renderModalInfos = (index) => {
  const game = games[index];

  if (DOM.modalHeader) {
    DOM.modalHeader.style.backgroundImage = `url('./img/banner/${game.access}.jpg')`;
  }
  if (DOM.btnModalPlay) {
    DOM.btnModalPlay.href = game.link;
  }
  if (DOM.infoImg) {
    DOM.infoImg.src = `./img/portrait/${game.access}.png`;
  }
  if (DOM.infoDescription) {
    DOM.infoDescription.textContent = game.description;
  }
  if (DOM.infoRelease) {
    DOM.infoRelease.textContent = game.release;
  }
  if (DOM.infoGithub) {
    DOM.infoGithub.href = game.github;
  }
};

const renderModalUpdate = (index) => {
  DOM.modalUpdates.innerHTML = "";

  const updates = games[index].update;
  if (!updates) return;

  updates.forEach((update) => {
    const card = document.createElement("div");

    const date = document.createElement("div");

    date.innerHTML = `<img src="img/joystick.png" alt="Joystick Icon" /> ${update.date}`;
    card.appendChild(date);

    if (update.updates) {
      update.updates.forEach((section) => {
        const block = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = section.title;
        block.appendChild(title);

        const list = document.createElement("ul");
        section.items.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `&#9679  ${item}`;
          list.appendChild(li);
        });
        block.appendChild(list);

        card.appendChild(block);
      });
    }

    DOM.modalUpdates.appendChild(card);
  });
};

DOM.btnCloseModal.addEventListener("click", closeModal);

/* ===== Navegação dentro do Modal ===== */

DOM.btnModalSection[0].style.backgroundImage = `linear-gradient(to right, var(--cor6), var(--cor5))`;

const handleModalSection = () => {
  DOM.btnModalSection.forEach((button, i) => {
    button.addEventListener("click", () => {
      DOM.btnModalSection.forEach((e) => {
        e.style.background = "none"
      });

      DOM.modalSection.forEach((section) => {
        section.style.display = "none";
        button.style.backgroundImage = `linear-gradient(to right, var(--cor6), var(--cor5))`;
      });

      DOM.modalSection[i].style.display = "flex";
    });
  });
};

/* ===== Inicialização ===== */
const init = () => {
  renderGames();
  handleModalSection();
};

init();

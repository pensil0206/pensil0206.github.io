const datasetUrl = "words.json";

let translationData;

document.addEventListener("DOMContentLoaded", async () => {
  const data = await (await fetch(datasetUrl)).json();

  translationData = Object.entries(data);

  console.log("Loaded translations", translationData);

  generateDictionary();

  document.querySelector("#loading").style.display = "none";
  document.querySelector("#app").style.display = "";
});

const getTranslatedText = (v) => {
  /**
   * @type {string}
   */
  let text = v;
  for (const [from, to] of translationData) {
    if (text.includes(from))
      return {
        text: to,
        exists: true,
      };
  }

  return {
    text,
    exists: false,
  };
};

/**
 * @type {HTMLTextAreaElement}
 */
const displayArea = document.querySelector("#displayArea");
/**
 * @type {HTMLElement}
 */
const notFoundArea = document.querySelector("#notFound");

// Function to handle input submission
function translate(value) {
  const result = getTranslatedText(value);

  notFoundArea.style.display = !result.exists ? "block" : "none";

  if (result.exists) {
    displayArea.value = result.text;
  } else displayArea.value = "";

  // displayArea.value =
  //   getTranslatedText(value);
}

/**
 * @type {HTMLTextAreaElement}
 */
const input = document.querySelector("#userInput");

document.querySelector("#clear").addEventListener("click", () => {
  input.value = "";
  translate("");
});

document.querySelector("#submit").addEventListener("click", () => {
  translate(input.value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    translate(input.value);
    return;
  }
});

input.text = ""; // reset

tippy("[data-tippy-content]");

/**
 * @type {HTMLTemplateElement}
 */
const dictItemTemplate = document.querySelector("template#dict-item-template");
const dictItemContainer = document.querySelector("#dict-word-list");

const generateDictionary = () => {
  for (const [from, to] of translationData) {
    const clone = dictItemTemplate.content.cloneNode(true);

    clone.querySelector(".dict-item-from").innerText = from;
    clone.querySelector(".dict-item-to").innerText = to;

    dictItemContainer.appendChild(clone);
  }
};

const sidebarButtonsContainer = document.querySelector(".sidebar");
const sidebarOverlayContainer = document.querySelector(
  ".sidebar-overlay-container"
);

const tabButtons = sidebarButtonsContainer.querySelectorAll("[data-open-tab]");

const tabContents = {};
const tabButtonElements = {};
let isOpen = false;
let openId = null;

document.querySelectorAll("[data-tab-id]").forEach((tab) => {
  tabContents[tab.getAttribute("data-tab-id")] = tab;
  tab.style.display = "none";
});

tabButtons.forEach((button) => {
  const tabId = button.getAttribute("data-open-tab");
  tabButtonElements[tabId] = button;
  button.addEventListener("click", (e) => {
    if (tabId === openId && isOpen) {
      sidebarOverlayContainer.classList.remove("open");
      isOpen = false;
      openId = false;
      Object.values(tabButtonElements).forEach((el) =>
        el.classList.remove("active")
      );
      return;
    }

    sidebarOverlayContainer.classList.add("open");
    isOpen = true;
    openId = tabId;
    for (const id in tabContents) {
      const el = tabContents[id];
      el.style.display = tabId === id ? "" : "none";
    }

    for (const id in tabButtonElements) {
      const el = tabButtonElements[id];
      if (id === tabId) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  });
});

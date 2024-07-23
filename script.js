const datasetUrl = "words.json";

let translationData;

document.addEventListener("DOMContentLoaded", async () => {
  const data = await (await fetch(datasetUrl)).json();

  translationData = Object.entries(data);

  console.log("Loaded translations", translationData);

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

const datasetUrl =
  "https://raw.githubusercontent.com/paring-chan/pensil0206.github.io/main/words.json";

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
  let matchCount = 0;
  for (const [from, to] of translationData) {
    if (text.includes(from)) matchCount++;
    text = text.split(from).join(to);
  }

  return {
    text,
    matches: matchCount,
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

  notFoundArea.style.display = result.matches === 0 ? "block" : "none";

  if (result.matches > 0) {
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

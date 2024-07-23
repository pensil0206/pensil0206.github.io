const translationData = [
  [/해주세요/g, "돈주세요"],
  // 추가 예시: [/안녕하세요/g, '펜바실보']
];

const getTranslatedText = (v) => {
  /**
   * @type {string}
   */
  let text = v;
  let matchCount = 0;
  for (const [from, to] of translationData) {
    if (from.test(text)) matchCount++;
    text = text.replace(from, to);
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
  }

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

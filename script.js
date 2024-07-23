const translationData = [
  [/해주세요/g, "돈주세요"],
  // 추가 예시: [/안녕하세요/g, '펜바실보']
];

const getTranslatedText = (v) => {
  let text = v;
  for (const [from, to] of translationData) {
    text = text.replace(from, to);
  }

  return text;
};

// Function to handle input submission
function translate(value) {
  document.querySelector("#displayArea").value = getTranslatedText(value);
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

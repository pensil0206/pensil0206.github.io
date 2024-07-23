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

const input = document.querySelector("#userInput");

// input.addEventListener(
//   "input",
//   (e) => {
//     translate(input.value);
//   },
//   false
// );

document.querySelector("#clear").addEventListener("click", () => {
  input.value = "";
  translate("");
});

document.querySelector("#submit").addEventListener("click", () => {
  translate(input.value);
});

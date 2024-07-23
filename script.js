
// Function to handle input submission
function handleSubmit() {
    // Get the value of the input field with id="userInput"
    var inputVal = document.getElementById("userInput").value;

    // Regular expression to find occurrences of "해주세요"
    var regex = /해주세요/g;

    // Count the number of occurrences
    var matches = inputVal.match(regex);

    // Determine the number of matches
    var matchCount = matches ? matches.length : 0;

    // Generate the appropriate display text based on the number of matches
    var displayText = matchCount > 0 ? '돈주세요\n'.repeat(matchCount).trim() : inputVal;

    // Set the display text
    document.getElementById("displayArea").innerText = displayText;

    // Clear the input field
    document.getElementById("userInput").value = "";
}

// Add event listener for the submit button
document.getElementById("submitButton").addEventListener("click", handleSubmit);

// Add event listener for the input field to detect "Enter" key press
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission if the input is inside a form
        handleSubmit();
    }
});

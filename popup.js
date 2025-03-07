document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("solve-button");

    if (button) {
        button.addEventListener("click", () => {
            alert("Solving POTD...");
            // Add logic to fetch problem and send it to OpenAI API
        });
    }
});

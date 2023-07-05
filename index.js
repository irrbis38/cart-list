document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    const addToListButton = document.querySelector(".addToList__button");
    const addToListInput = document.querySelector(".addToList__input");

    addToListButton.addEventListener("click", () => {
        const inputValue = addToListInput.value;
        console.log(inputValue);
    });

    addToListInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const inputValue = addToListInput.value;
            console.log(inputValue);
        }
    });
}

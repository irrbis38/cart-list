document.addEventListener("DOMContentLoaded", initApp);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

function initApp() {
    const appSettings = {
        databaseURL:
            "https://cart-list-798e2-default-rtdb.europe-west1.firebasedatabase.app/",
    };
    const app = initializeApp(appSettings);
    const database = getDatabase(app);
    const shopingListInDB = ref(database, "shopingList");

    // console.log(database);

    const shoppingListButton = document.querySelector(".shoppingList__button");
    const shoppingListInput = document.querySelector(".shoppingList__input");
    const shoppingList = document.querySelector(".shoppingList__list");

    const elements = {
        shoppingListButton,
        shoppingListInput,
        shoppingList,
    };

    function handleInput(elements) {
        const { shoppingListInput } = elements;
        // push new value to database
        push(shopingListInDB, shoppingListInput);

        // create new item and append to shopping list
        appendNewItemToShoppingList(elements);

        // clear input field
        clearInputFiled(elements);
    }

    function appendNewItemToShoppingList(elements) {
        const { shoppingListInput, shoppingList } = elements;
        const inputValue = shoppingListInput.value;
        const li = document.createElement("LI");
        li.classList.add("shoppingList__item");
        li.textContent = inputValue;
        shoppingList.append(li);
    }

    function clearInputFiled(elements) {
        const { shoppingListInput } = elements;
        shoppingListInput.value = "";
    }

    shoppingListButton.addEventListener("click", () => {
        handleInput(elements);
    });

    shoppingListInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleInput(elements);
        }
    });
}

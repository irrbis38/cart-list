document.addEventListener("DOMContentLoaded", initApp);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

function initApp() {
    const appSettings = {
        databaseURL:
            "https://cart-list-798e2-default-rtdb.europe-west1.firebasedatabase.app/",
    };
    const app = initializeApp(appSettings);
    const database = getDatabase(app);
    const shopingListInDB = ref(database, "shopingList");

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
        const inputValue = shoppingListInput.value;

        if (inputValue !== "") {
            // clear shopping list
            clearShoppingList();

            // push new value to database
            push(shopingListInDB, inputValue);

            // clear input field
            clearInputFiled(elements);
        }
    }

    onValue(shopingListInDB, function (snapshot) {
        // clear shopping list
        clearShoppingList();

        //get value from database and convert to array
        const listArray = Object.entries(snapshot.val());

        // render array of values
        const fragment = document.createDocumentFragment();
        listArray.forEach((item) =>
            appendNewItemToShoppingList(fragment, item)
        );
        shoppingList.append(fragment);
    });

    function appendNewItemToShoppingList(item) {
        const { 0: id, 1: value } = item;
        const li = document.createElement("LI");
        li.classList.add("shoppingList__item");
        li.textContent = value;
        li.dataset.id = id;
        fragment.append(li);
        li.addEventListener("click", (e) => console.log(e.target));
    }

    function clearInputFiled(elements) {
        const { shoppingListInput } = elements;
        shoppingListInput.value = "";
    }

    function clearShoppingList() {
        shoppingList.innerHTML = "";
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

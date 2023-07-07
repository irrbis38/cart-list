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

    const addToListButton = document.querySelector(".addToList__button");
    const addToListInput = document.querySelector(".addToList__input");

    function handleInput() {
        const inputValue = addToListInput.value;
        push(shopingListInDB, inputValue);
        addToListInput.value = "";
    }

    addToListButton.addEventListener("click", handleInput);

    addToListInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleInput();
        }
    });
}

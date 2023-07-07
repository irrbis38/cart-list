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

    const cartListButton = document.querySelector(".cartList__button");
    const cartListInput = document.querySelector(".cartList__input");

    function handleInput() {
        const inputValue = cartListInput.value;
        push(shopingListInDB, inputValue);
        cartListInput.value = "";
    }

    cartListButton.addEventListener("click", handleInput);

    cartListInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleInput();
        }
    });
}

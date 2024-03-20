import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shop-cart-c53ce-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDb = ref(database, "shoppingCart");

const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
let shoppingListEl = document.getElementById("shopping-list");

addButton.addEventListener("click", () => {
  let inputValue = inputField.value;
  push(shoppingListDb, inputValue);
  clearInputFieldValue();
});

onValue(shoppingListDb, (snapshot) => {
  if (snapshot.exists()) {
    let newDb = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < newDb.length; i++) {
      let currentItem = newDb[i];
      appendToInputValueList(currentItem);
    }
  } else {
    return (shoppingListEl.textContent = "No items here yet....");
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldValue() {
  inputField.value = "";
}

function appendToInputValueList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  // and make it so you console log the id of the item when it's pressed.

  let createEl = document.createElement("li");
  createEl.textContent = itemValue;

  createEl.addEventListener("dblclick", () => {
    let locationOfItemInDB = ref(database, `shoppingCart/${itemValue}`);
    remove(locationOfItemInDB);
  });
  shoppingListEl.append(createEl);
}

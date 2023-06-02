import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-e937c-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shopping list');

const addBtn = document.getElementById('add-button');
const inputBox = document.getElementById('input-field');
const listEl = document.getElementById('shopping-list');

addBtn.addEventListener('click', function () {
  let inputValue = inputBox.value;

  if (inputBox.value === '') {
    alert('Please enter a grocery item before adding to cart :)');
  } else {
    push(shoppingListInDB, inputValue);
  }

  clearInputFieldEl();

  //   appendToList(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendToList(currentItem);
    }
  } else {
    listEl.innerHTML = 'No items added... yet';
  }
});

function clearShoppingListEl() {
  listEl.innerHTML = '';
}

function clearInputFieldEl() {
  inputBox.value = '';
}

function appendToList(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement('li');

  newEl.textContent = itemValue;

  newEl.addEventListener('click', function () {
    let exactDatabaseLocation = ref(database, `shopping list/${itemID}`);

    remove(exactDatabaseLocation);
    console.log('removed');
  });

  listEl.append(newEl);
}

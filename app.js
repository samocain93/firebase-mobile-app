import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-e937c-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shopping list');

const addBtn = document.getElementById('add-button');
const inputBox = document.getElementById('input-field');
const listEl = document.getElementById('shopping-list')

addBtn.addEventListener('click', function () {
    let inputValue = inputBox.value 

    push(shoppingListInDB, inputValue)

   inputBox.value = "";

   listEl.innerHTML += `<li>${inputValue}</li>`;
   
});



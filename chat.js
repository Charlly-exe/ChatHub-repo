onload = () => {
    if(localStorage.username === undefined || localStorage.userAuth === undefined || localStorage.userPhoto === undefined){
        location.href = 'index.html';
    }
}

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {ref,getDatabase,push,onValue} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQQrMFjQalYH2O2Oi9V4uN53f_rugtJaQ",
  authDomain: "realtimechat-85333.firebaseapp.com",
  projectId: "realtimechat-85333",
  databaseURL: "https://realtimechat-85333-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "realtimechat-85333.appspot.com",
  messagingSenderId: "766975976239",
  appId: "1:766975976239:web:431cbe45da333233e837da"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

const chatDataInDB = ref(database, 'chatData');

// read data from database and add it to the DOM.
const messagesRoot = document.querySelector('.messagesRoot');
const messagesContainer = document.querySelector('.messagesContainer');


onValue(chatDataInDB, (snapshot) => {
  const chatData = snapshot.val();
  if (chatData) {
    const chatDataArry = Object.values(chatData);
    messagesRoot.innerHTML = '';
    for(let i = 0; i < chatDataArry.length; i++){
      const userFullMsg = chatDataArry[i].split(':');
      const username = userFullMsg[0].trim();
      const userMsg = userFullMsg[1].trim();
      const userPhotoUrlPartOne = userFullMsg[2].trim();
      const userPhotoUrlPartTwo = userFullMsg[3].trim();
      const userPhotoFullUrl = `${userPhotoUrlPartOne}:${userPhotoUrlPartTwo}`;
          messagesRoot.innerHTML += `<div class="user-msg">
          <div class="userPfpAndNameContainer">
          <img src="${userPhotoFullUrl}" alt="user-img" id="user-img">
          <span class="userName">${username}</span>
          </div>
          <span class="msg-content">${userMsg}</span>
          </div>
          </div>`;
          
        }
        messagesRoot.scrollTop = messagesRoot.scrollHeight;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } else {
    console.error('No data found at the specified location');
  }
});

//push data to database
const sendMsgBtn = document.getElementById('sendMsgBtn');
const msgInput = document.getElementById('msgInput');

sendMsgBtn.addEventListener('click', () => {
  let messageValue = msgInput.value;
  if(localStorage.username != null && localStorage.userAuth != null){
    if(messageValue.length <= 0){
      push(chatDataInDB, `${localStorage.username}: Empty Message ;):${localStorage.userPhoto}`);
    }
    else{
      push(chatDataInDB, `${localStorage.username}: ${messageValue}:${localStorage.userPhoto}`);
      msgInput.value = '';
    }
  }
  else{
    location.href = 'index.html';
  }
});

msgInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMsgBtn.click();
  }
});

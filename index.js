
import dotenv from './dotenv';
dotenv.config();

onload = () => {
    if(localStorage.userAuth === 'true' && localStorage.userPhoto != null){
      location.href = 'chat.html';
    }
    else{
      if(localStorage.username != null){
        usernameInput.value = localStorage.username;
        }
        else{
          usernameInput.value = '';
      }
    }
};

const apiKey = process.env.API_KEY;
// Using Google Authentication:
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "realtimechat-85333.firebaseapp.com",
  projectId: "realtimechat-85333",
  databaseURL: "https://realtimechat-85333-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "realtimechat-85333.appspot.com",
  messagingSenderId: "766975976239",
  appId: "1:766975976239:web:431cbe45da333233e837da"
};

const app = initializeApp(firebaseConfig);

const loginBtn = document.querySelector('.loginBtn');
const loginInput = document.querySelector('.loginInput');
const usernameInput = document.querySelector('.username-input');

let correctLoginKey = process.env.LOGIN_KEY;
loginBtn.addEventListener('click', () => {

  if(loginInput.value === correctLoginKey && usernameInput.value.length >= 4 && usernameInput.value.length <= 20){
    localStorage.username = usernameInput.value;
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    const userPhotoUrl = user.photoURL;
    console.log(userPhotoUrl);
    localStorage.userPhoto = userPhotoUrl;

    localStorage.userAuth = 'true';
    location.href = 'chat.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    alert(errorCode);
    const errorMessage = error.message;
    alert(errorMessage);
  });
  }
  else{
    alert('invalid information, Please Try Again !');
  }
});

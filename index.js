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
  }

// Using Google Authentication:
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// Using Firebase Realtime Database:
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {ref,getDatabase,onValue} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

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
const database = getDatabase(app);

const loginKeyInDB = ref(database, 'loginKey');

const loginBtn = document.querySelector('.loginBtn');
const loginInput = document.querySelector('.loginInput');
const usernameInput = document.querySelector('.username-input');

onValue(loginKeyInDB, (snapshot) => {
  const refDataAsObj = snapshot.val();
  const refDtaAsArry = Object.values(refDataAsObj);
  const loginKeyInDB = refDtaAsArry[0];
  let correctLoginKey = loginKeyInDB;

  loginBtn.addEventListener('click', () => {

    if(loginInput.value === correctLoginKey && usernameInput.value.length >= 4 && usernameInput.value.length <= 15){
      localStorage.username = usernameInput.value;
      const auth = getAuth();
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
});
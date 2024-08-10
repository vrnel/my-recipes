import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCyltSnKewRbsTjCUH298lm-yEalmd3jeo",
    authDomain: "myrecipes-72991.firebaseapp.com",
    projectId: "myrecipes-72991",
    storageBucket: "myrecipes-72991.appspot.com",
    messagingSenderId: "218921875645",
    appId: "1:218921875645:web:4242196ef49146fc1c1fd4"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
  let storage = firebase.storage();

  export  {
    firebase, db, storage
  };
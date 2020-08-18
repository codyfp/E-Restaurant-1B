import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAfGtYk8iutKGryvqhHJeNPlyhstKqf3uY",
    authDomain: "efood-c1bf3.firebaseapp.com",
    databaseURL: "https://efood-c1bf3.firebaseio.com",
    projectId: "efood-c1bf3",
    storageBucket: "efood-c1bf3.appspot.com",
    messagingSenderId: "181632153",
    appId: "1:181632153:web:dec1ff29e22b2779b54c08",
    measurementId: "G-9T8N4VPZRG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();
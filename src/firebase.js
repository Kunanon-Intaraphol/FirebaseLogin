import firebase from "firebase";

var firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyDr60DmJMw0C6WM7Sv12xKdz_aduR7WJt4",
  authDomain: "nsc-newsproof.firebaseapp.com",
  projectId: "nsc-newsproof",
  storageBucket: "nsc-newsproof.appspot.com",
  messagingSenderId: "176552657",
  appId: "1:176552657:web:52baef8766c22865ff23f0",
  measurementId: "G-K0MCLQLE99"
});

var db = firebaseApp.firestore();

export {db} ;

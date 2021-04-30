import firebase from 'firebase';

// API deprecated, just example, should be a environment variable
const firebaseConfig = {
    apiKey: "AIzaSyBJBYiAPcTJ15Y6Quotl7Wyia9UDkrWVYk",
    authDomain: "clone-9ade1.firebaseapp.com",
    databaseURL: "https://clone-9ade1.firebaseio.com",
    projectId: "clone-9ade1",
    storageBucket: "clone-9ade1.appspot.com",
    messagingSenderId: "449907886317",
    appId: "1:449907886317:web:e2779a95756d5e77d364e4",
    measurementId: "G-KBGVEYEXEL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
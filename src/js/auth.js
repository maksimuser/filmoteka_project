import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0wFqssa1iGGeTQCKmksr66cMMVCSABlU",
  authDomain: "prada-5d339.firebaseapp.com",
  databaseURL: "https://prada-5d339-default-rtdb.firebaseio.com",
  projectId: "prada-5d339",
  storageBucket: "prada-5d339.appspot.com",
  messagingSenderId: "514379101865",
     appId: "1:514379101865:web:f8fddd7c1adb579b635bb8"
  
};
      
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
    // firebase.analytics();  

document.addEventListener('DOMContentLoaded', function() {

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});



const auth = firebase.auth();
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default {auth,db};

import ref from './refs';
import obj from './auth';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import firebase from 'firebase/app';

ref.movieContainer.addEventListener('click', e => {
  console.log(e.target);
});
ref.homeLinkRef.addEventListener('click', toExitLibrary);
ref.logoRef.addEventListener('click', toExitLibrary);
ref.btnWatched.addEventListener('click', addSecWatched);
function addSecWatched() {
  ref.sectionQueue.style.display = 'none';
  ref.sectionWatched.style.display = 'block';
}

ref.btnQueue.addEventListener('click', addSecQueue);
function addSecQueue() {
  ref.sectionQueue.style.display = 'block';
  ref.sectionWatched.style.display = 'none';
}

// Выйти из кабинета
function toExitLibrary() {
  ref.sectionWatched.style.display = 'none';
  ref.sectionQueue.style.display = 'none';
  ref.btnWatched.style.display = 'none';
  ref.btnQueue.style.display = 'none';
  ref.pagination.style.display = 'flex';
  ref.sectionTrend.style.display = 'block';
}

ref.logout.addEventListener('click', e => {
  ref.listQueue.innerHTML = '';
  ref.listWatched.innerHTML = '';
  ref.sectionWatched.style.display = 'none';
  ref.sectionQueue.style.display = 'none';
  ref.btnWatched.style.display = 'none';
  ref.btnQueue.style.display = 'none';
  ref.pagination.style.display = 'flex';
  ref.sectionTrend.style.display = 'block';
  obj.auth.signOut();
  PNotify.success({
    text: 'You have left your account!',
    delay: 1000,
  });
});

//login

ref.loginForm.addEventListener('submit', e => {
  e.preventDefault();

  //get user info
  const email = ref.loginForm['login-email'].value;
  const password = ref.loginForm['login-password'].value;
  obj.auth.signInWithEmailAndPassword(email, password).then(cred => {
    //close the login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    ref.loginForm.reset();
    PNotify.success({
      text: 'Welcome back!',
      delay: 1000,
    })
  }).catch(err => {
    PNotify.error({
      text: 'Invalid password',
      delay: 1000,
    })
  });;
 
  ref.accountDetails.style.display = 'block';
});




let cardsArr = '';

function addToQueue() {
 
  obj.auth.onAuthStateChanged(user => {
     obj.db
      .collection('users')
      .doc(user.uid)
      .update({
        queue: firebase.firestore.FieldValue.arrayUnion(cardsArr),
      });
    
    
  });
  PNotify.success({
    text: 'The movie have added to Queue!',
    delay: 1000,
  });
}
function addToWatched() {
 
  obj.auth.onAuthStateChanged(user => {
    obj.db
      .collection('users')
      .doc(user.uid)
      .update({
        queue: firebase.firestore.FieldValue.arrayRemove(cardsArr),
        watched: firebase.firestore.FieldValue.arrayUnion(cardsArr),
      });

    
    
  });
  PNotify.success({
    text: 'The movie have added to Watched!',
    delay: 1000,
  });
}
function getCard(card) {
 
  cardsArr = card;
}

export default { addToQueue, getCard, addToWatched };

  
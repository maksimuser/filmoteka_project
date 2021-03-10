import obj from './auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firestore';

import trendMoviesMarkup from '../templates/trend-movies.hbs';
import openModal from '../js/modal';
import { log } from 'handlebars';

import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

// const searchInput = document.querySelector('.search-input')

const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
// const accountModal = document.querySelector('.account-modal')

const sectionWatched = document.querySelector('.section-watched');
const listWatched = document.querySelector('.list-watched');
const btnWatched = document.querySelector('.watched-btn');
const btnQueue = document.querySelector('.queue-btn');

const sectionQueue = document.querySelector('.section-queue');
const listQueue = document.querySelector('.list-queue');

const sectionTrend = document.querySelector('.section-trend');
const homeLinkRef = document.querySelector('.home');
homeLinkRef.addEventListener('click', toExitLibrary);

btnWatched.addEventListener('click', addSecWatched);
function addSecWatched() {
  sectionQueue.style.display = 'none';
  sectionWatched.style.display = 'block';
}

btnQueue.addEventListener('click', addSecQueue);
function addSecQueue() {
  sectionQueue.style.display = 'block';
  sectionWatched.style.display = 'none';
}

// Выйти из кабинета
function toExitLibrary() {
  sectionWatched.style.display = 'none';
  sectionQueue.style.display = 'none';
  btnWatched.style.display = 'none';
  btnQueue.style.display = 'none';
  sectionTrend.style.display = 'block';
}
// Войти в кабинет
function toComeInLibrary(e) {
  btnWatched.style.display = 'inline';
  btnQueue.style.display = 'inline';
  // searchInput.style.display = 'none'
  sectionQueue.style.display = 'block';
  sectionTrend.style.display = 'none';
  sectionWatched.style.display = 'none';
  sectionQueue.addEventListener(`click`, openModal);
}
const setupUI = user => {
  if (user) {
    //account info
    obj.db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
        <div>Logged in as ${user.email}</div>
        <div>Nick-name ${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html;
      });

    // togle UI elements

    loggedInLinks.forEach(item => (item.style.display = 'block'));
    loggedInLinks[1].addEventListener('click', toComeInLibrary);

    loggedOutLinks.forEach(item => (item.style.display = 'none'));
  } else {
    //hide account info
    accountDetails.innerHTML = '';
    //togle UI elements

    loggedInLinks.forEach(item => (item.style.display = 'none'));
    loggedOutLinks.forEach(item => (item.style.display = 'block'));
  }
};

//setup guides

const setupGuides = (dataQueue, dataWatched) => {
  if (dataQueue) {
    let markupQueue = '';
    let markupWatched = '';
    markupQueue = trendMoviesMarkup(dataQueue);
    markupWatched = trendMoviesMarkup(dataWatched);
    // listLibrary.insertAdjacentHTML('beforeend', markup);
    listQueue.innerHTML = markupQueue;
    listWatched.innerHTML = markupWatched;
  }
};

//listen for auth status changes

obj.auth.onAuthStateChanged(user => {
  if (user) {
    obj.db
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        doc => {
          setupGuides(doc.data().queue, doc.data().watched);

          setupUI(user);
        },
        err => {
          console.log(err);
        },
      );
  } else {
    setupUI();
    setupGuides();
  }
});

//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  //get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const confirmPassword = signupForm['confirm-password'].value;
  if (password === confirmPassword) {
    obj.auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return obj.db.collection('users').doc(cred.user.uid).set({
          bio: signupForm['signup-bio'].value,
          queue: [],
          watched: [],
        });
      })
      .then(() => {
        PNotify.success({
          text: 'Registration successful!',
          delay: 1000,
          addClass: 'PNotify',
          addModalClass: 'PNotify',
          addModelessClass: 'PNotify',
          // styling: 'scss'
        });
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
      })
      .catch(
        PNotify.success({
          text: 'Password should contain at least 6 symbols!',
          delay: 1500,
          addClass: 'PNotify',
          addModalClass: 'PNotify',
          addModelessClass: 'PNotify',
          // styling: 'scss'
        }),
      );
  } else {
    PNotify.success({
      text: 'Password confirmation is not correct!',
      delay: 1500,
      addClass: 'PNotify',
      addModalClass: 'PNotify',
      addModelessClass: 'PNotify',
      // styling: 'scss'
    });
  }

  // sign up the user
});

//logout

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
  e.preventDefault();
  listQueue.innerHTML = '';
  listWatched.innerHTML = '';
  sectionWatched.style.display = 'none';
  sectionQueue.style.display = 'none';
  sectionTrend.style.display = 'block';
  obj.auth.signOut();
  PNotify.success({
    text: 'You have left your account!',
    delay: 1500,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
    addModelessClass: 'PNotify',
    // styling: 'scss'
  });
});

//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  obj.auth.signInWithEmailAndPassword(email, password).then(cred => {
    //close the login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
  PNotify.success({
    text: 'Welcome back!',
    delay: 1500,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
    addModelessClass: 'PNotify',
    // styling: 'scss'
  });
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
    delay: 1500,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
    addModelessClass: 'PNotify',
    // styling: 'scss'
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
    text: 'The movie have added to Watched',
    delay: 1500,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
    addModelessClass: 'PNotify',
    // styling: 'scss'
  });
}
function getCard(card) {
  cardsArr = card;
}

export default { addToQueue, getCard, addToWatched };

import obj from './auth';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import ref from './refs';

const { defaultModules } = require('@pnotify/core');
const PNotifyMobile = require('@pnotify/mobile');
defaultModules.set(PNotifyMobile, {});

class User {
  constructor(email, password, confirmPassword) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  createUser() {
    if (this.password === this.confirmPassword) {
      obj.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          return obj.db.collection('users').doc(cred.user.uid).set({
            name: ref.signupForm['signup-bio'].value,
            queue: [],
            watched: [],
          });
        })
        .then(() => {
          PNotify.success({
            text: 'Registration successful!',
            delay: 1000,
          });
          const modal = document.querySelector('#modal-signup');
          M.Modal.getInstance(modal).close();
          ref.signupForm.reset();
        })
        .catch(err => {
          PNotify.error({
            text: 'Password should contain at least 6 symbols!',
            delay: 1000,
          })
        }
          
        );
    } else {
      PNotify.error({
        text: 'Password confirmation is not correct!',
        delay: 1000,
      });
    }
  }
}

let currentUser = null;

ref.signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = ref.signupForm['signup-email'].value;
  const password = ref.signupForm['signup-password'].value;
  const confirmPassword = ref.signupForm['confirm-password'].value;
  currentUser = new User(email, password, confirmPassword);
  currentUser.createUser();
});



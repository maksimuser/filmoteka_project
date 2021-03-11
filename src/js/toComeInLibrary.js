class User {
    constructor(email, password, confirmPassword) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.currentCard = ''
    }

    createUser() {
        if (this.password === this.confirmPassword) {
            obj.auth.createUserWithEmailAndPassword(this.email, this.password).then(cred => {
                return obj.db.collection('users').doc(cred.user.uid).set({
                    NickName: ref.signupForm['signup-bio'].value,
                    queue: [],
                    watched: []
                })
            
            }).then(() => {
                PNotify.success({
               text: 'Ргистрация прошла успешно',
               delay: 1000,
               addClass: 'PNotify',
               addModalClass: 'PNotify',
               addModelessClass: 'PNotify',
            // styling: 'scss'
          });
                const modal = document.querySelector('#modal-signup')
                M.Modal.getInstance(modal).close()
                ref.signupForm.reset()
            }).catch(PNotify.success({
                text: 'пароль должен содержать не мение 6 симвалов',
               delay: 1000,
               addClass: 'PNotify',
               addModalClass: 'PNotify',
              addModelessClass: 'PNotify',
               // styling: 'scss'
             }))
        } else {
        
           PNotify.success({
           text: 'Не коректное подтверждени пароля',
           delay: 1000,
           addClass: 'PNotify',
           addModalClass: 'PNotify',
           addModelessClass: 'PNotify',
           // styling: 'scss'
         });
       }
    }

    logOut() {
        ref.listQueue.innerHTML = ''
        ref.listWatched.innerHTML = ''
        ref.sectionWatched.style.display = 'none'
        ref.sectionQueue.style.display = 'none'
        ref.btnWatched.style.display = 'none'
        ref.btnQueue.style.display = 'none'
        ref.sectionTrend.style.display = 'block'
        obj.auth.signOut()
        PNotify.success({
         text: 'Вы покинули свой аккаунт',
        delay: 1000,
        addClass: 'PNotify',
        addModalClass: 'PNotify',
       addModelessClass: 'PNotify',
        // styling: 'scss'
        }) 
    }

    login() {
        //get user info
    const email = ref.loginForm['login-email'].value;
    const password = ref.loginForm['login-password'].value;
    obj.auth.signInWithEmailAndPassword(email, password).then(cred => {
        
        //close the login modal and reset the form
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        ref.loginForm.reset()
    })
      PNotify.success({
     text: 'С возвращением!',
    delay: 1000,
    addClass: 'PNotify',
    addModalClass: 'PNotify',
   addModelessClass: 'PNotify',
    // styling: 'scss'
      })
      ref.accountDetails.style.display = 'block' 
    }

    set currentCard(card) {
        this.currentCard = card
    }

    get currentCard() {
        return this.currentCard
    }

    addToQueue() {
        obj.auth.onAuthStateChanged(user => {
            obj.db.collection("users").doc(user.uid).update({
                queue: firebase.firestore.FieldValue.arrayUnion(currentUser.currentCard)
                 })
            })
               PNotify.success({
                  text: 'Картачка добавлена в Queue',
                  delay: 1000,
                  addClass: 'PNotify',
                  addModalClass: 'PNotify',
                  addModelessClass: 'PNotify',
               // styling: 'scss'
             });
           
    }


    addToWatched() {
        obj.auth.onAuthStateChanged(user => {
        obj.db.collection("users").doc(user.uid).update({
        queue: firebase.firestore.FieldValue.arrayRemove(currentUser.currentCard),
        watched: firebase.firestore.FieldValue.arrayUnion(currentUser.currentCard),
       
     })
    })
     PNotify.success({
          text: 'Картачка добавлена в Watched',
          delay: 1000,
          addClass: 'PNotify',
          addModalClass: 'PNotify',
          addModelessClass: 'PNotify',
       // styling: 'scss'
     });
   
    }

    toExitLibrary() {
        ref.sectionWatched.style.display = 'none'
        ref.sectionQueue.style.display = 'none'
        ref.btnWatched.style.display = 'none'
        ref.btnQueue.style.display = 'none'
        ref.sectionTrend.style.display = 'block'
        
    }
    

    

}


let currentUser = null

ref.signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = ref.signupForm['signup-email'].value;
    const password = ref.signupForm['signup-password'].value;
    const confirmPassword = ref.signupForm['confirm-password'].value;
    currentUser = new User(email,password,confirmPassword)
    currentUser.createUser()

})

ref.logout.addEventListener('click', e => {
    e.preventDefault()
    currentUser.logOut()
})

ref.loginForm.addEventListener('submit', e => {
    e.preventDefault();
    currentUser.login()
   
})





export default currentUser
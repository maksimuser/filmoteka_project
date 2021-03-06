import obj from './auth'
import "firebase/firestore";

const guideList = document.querySelector('.guides')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details')

const setupUI = user => {
    if (user) {
        //account info
         obj.db.collection('users').doc(user.uid).get().then(doc => {
          const html = `
        <div>Logged in as ${user.email}</div>
        <div>Nick-name ${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html;  
        })
        
        // togle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
     //hide account info
        accountDetails.innerHTML = '';
    //togle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
}

 //setup guides
const setupGuides = data => {
    if (data.length) {  
    let html = ''
    // data.forEach(doc => {
    //     const guide = doc.data()
    //     const li = `
    //   <li>
    //   <div class="collapsible-header grey lighten-4">${guide.title}</div>
    //   <div class="collapsible-body white">${guide.content}</div>
    //   </li>`
    //     html += li
    // })
    // guideList.innerHTML = html
    } else {
         guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
}
}

//listen for auth status changes
obj.auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
    obj.db.collection('guides').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
    }, err => {
            console.log(err)
    })
    } else {
    setupUI()
    setupGuides([])
    }
})

// create nem guide

// const createForm = document.querySelector('#create-form')
// createForm.addEventListener('submit', e => {
//     e.preventDefault();
//     obj.db.collection('guides').add({
//         title: createForm['title'].value,
//         content: createForm['content'].value
//     }).then(() => {
//           //close modal and reset form
//           const modal = document.querySelector('#modal-create')
//         M.Modal.getInstance(modal).close()
//         createForm.reset()
//     }).catch(err => {
//           console.log(err.messagea)
//       })
// })


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
//get user info 
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    // sign up the user

    obj.auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return obj.db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
        
    }).then(() => {
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signupForm.reset()
    })
})

//logout

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    obj.auth.signOut()
})


//login и шо?


const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    obj.auth.signInWithEmailAndPassword(email, password).then(cred => {
        
        //close the login modal and reset the form
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
    })
})

import obj from './auth'
import trendMoviesMarkup from '../templates/library.hbs';
import ref from './refs'
import openModal from '../js/modal'




ref.sectionWatched.addEventListener(`click`, openModal);

function toComeInLibrary(e) {
    ref.btnWatched.style.display = 'inline'
    ref.btnQueue.style.display = 'inline'
    ref.sectionQueue.style.display = 'block'
    ref.sectionTrend.style.display = 'none'
    ref.pagination.style.display = 'none'
    ref.sectionWatched.style.display = 'none'
    
    ref.sectionQueue.addEventListener(`click`, openModal);
}
const setupUI = user => {
    if (user) {
        //account info
         obj.db.collection('users').doc(user.uid).get().then(doc => {
          const html = `
        <div>Logged in as : ${user.email}</div>
        <div>Name :  ${doc.data().name}</div>
        `;
             ref.accountDetails.innerHTML = html;
             ref.accountDetails.style.display = 'block'     
        })
        
        // togle UI elements
        
        ref.loggedInLinks.forEach(item => item.style.display = 'block')
        ref.loggedInLinks[1].addEventListener('click', toComeInLibrary)
        ref.loggedOutLinks.forEach(item => item.style.display = 'none')

        
        
    } else {
     //hide account info
        ref.accountDetails.innerHTML = '';
    //togle UI elements
        
        ref.loggedInLinks.forEach(item => item.style.display = 'none')
        ref.loggedOutLinks.forEach(item => item.style.display = 'block')
}
}

 //setup guides
 
const setupCards = (dataQueue, dataWatched) => {
    
    
    if (dataQueue) {
        const dataQ = dataQueue.map((data) => {
            data.release_date = data.release_date.slice(0, 4)
             return data
        })
        const dataW = dataWatched.map((data) => {
            data.release_date = data.release_date.slice(0, 4)
             return data
       })
        
        let markupQueue = ''
        let markupWatched = ''
        markupQueue = trendMoviesMarkup(dataQ);
        markupWatched = trendMoviesMarkup(dataW);
         
        ref.listQueue.innerHTML = markupQueue 
        ref.listWatched.innerHTML = markupWatched
        
    } 
    
}

//listen for auth status changes

   obj.auth.onAuthStateChanged(user => {
       if (user) {
        obj.db.collection('users').doc(user.uid).onSnapshot(doc => {
        setupCards(doc.data().queue,doc.data().watched);
        setupUI(user);
    }, err => {
            console.log(err)
    })
        } else {
           
            
 
    setupUI()
    setupCards()
       }
       
       
   })
    
   
import modal from '../templates/main-modal.hbs';
import * as BasicLightBox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import obj from './auth';

import signFn from '../js/library-api';

const key = `ebb87b3c3ccf067a0867ba65db09dab4`;
const filmCard = document.querySelector(`.trend-items`);
let mas = {};
const findMovieById = idNum => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${idNum}?api_key=${key}&language=en-US`,
  )
    .then(res => res.json())
    .then(filmById => {
      mas = filmById;

      const formModal = modal(filmById);
      createModal(formModal);
    })
    .catch(error => console.log(error));
};

const createModal = (event, filmById) => {
  const instance = BasicLightBox.create(
    `${event}

          <button type="button" class="modal-close-button" data-action="close-modal"></button>`,
    {
      onShow: instance => {
        instance
          .element()
          .querySelector('.modal-close-button')
          .addEventListener(`click`, closeByEsc);
          obj.auth.onAuthStateChanged(user => {
            if (!user) {
            
        instance
          .element()
          .querySelector('.to-watched').style.display = 'none';
          
        instance
          .element()
          .querySelector('.add-to-queue').style.display = 'none';
          
            } else {
              instance
          .element()
          .querySelector('.modal-box')
          .addEventListener('click', signFn.getCard(mas));
        instance
          .element()
          .querySelector('.to-watched')
          .addEventListener('click', signFn.addToWatched);
        instance
          .element()
          .querySelector('.add-to-queue')
          .addEventListener('click', signFn.addToQueue);
            }
           })
        
      },
    },
  );

  instance.show();
  const lightBoxWindow = document.querySelector(`.basicLightbox`);
  if (event.target !== lightBoxWindow) {
    closeOnBgn();
  }
};

const openModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  
  const idNum = event.target.dataset.src;
  document.querySelector(`.body`).classList.add(`no-scroll`);
  findMovieById(idNum);
  window.addEventListener('keydown', modalClose);
};

const modalClose = event => {
  if (event.key === `Escape`) {
    closeByEsc();
  }
};

const closeByEsc = event => {
  window.removeEventListener('keydown', modalClose);
  const lightBoxWindow = document.querySelector(`.basicLightbox`);
  const removeWindow = function (elem) {
    document.querySelector(`.body`).classList.remove(`no-scroll`);
    elem.classList.remove('basicLightbox--visible');
    elem.parentElement.removeChild(elem);
    return;
  };
  removeWindow(lightBoxWindow);
};
filmCard.addEventListener(`click`, openModal);

const closeOnBgn = event => {
  const lightBoxWindow = document.querySelector(`.basicLightbox`);

  lightBoxWindow.addEventListener('click', e => {
    window.removeEventListener('keydown', modalClose);
    if (e.target !== lightBoxWindow) return;
    const removeWindow = function (elem) {
      elem.classList.remove('basicLightbox--visible');

      document.querySelector(`.body`).classList.remove(`no-scroll`);
      window.removeEventListener('keydown', modalClose);

      // return;
    };
    removeWindow(lightBoxWindow);
  });
};

export default openModal;

import modal from '../templates/main-modal.hbs';
import * as BasicLightBox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
const filmCard = document.querySelector(`.trend-items`);
const key = `ebb87b3c3ccf067a0867ba65db09dab4`;

const findMovieById = idNum => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${idNum}?api_key=${key}&language=en-US`,
  )
    .then(res => res.json())
    .then(filmById => {
      const formModal = modal(filmById);
      createModal(formModal);
    })
    .catch(error => console.log(error));
};
const createModal = event => {
  const instance = BasicLightBox.create(
    `${event}

          <button type="button" class="modal-close-button" data-action="close-modal"></button>`,
    {
      onShow: instance => {
        instance
          .element()
          .querySelector('.modal-close-button')
          .addEventListener(`click`, closeByEsc);
      },
    },
  );

  instance.show();
};
const openModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const idNum = event.target.dataset.src;

  findMovieById(idNum);
  // closeOnBgn();
  window.addEventListener('keydown', modalClose);
};

const modalClose = event => {
  console.log(event.key);

  if (event.key === `Escape`) {
    closeByEsc();
  }
};

const closeByEsc = event => {
  window.removeEventListener('keydown', modalClose);
  const lightBoxWindow = document.querySelector(`.basicLightbox`);
  const removeWindow = function (elem) {
    elem.classList.remove('basicLightbox--visible');
    elem.parentElement.removeChild(elem);
    return;
  };
  removeWindow(lightBoxWindow);
};
filmCard.addEventListener(`click`, openModal);
// const closeOnBgn = event => {
//   const lightBoxWindow = document.querySelector(`.basicLightbox`);
//   if (lightBoxWindow.classList.contains(`.basicLightbox--visible`))
//     lightBoxWindow.addEventListener('click', e => {
//       // If e.target is not the same element as elem,
//       // then the user clicked a descendant of the element.
//       if (e.target !== lightBoxWindow) return;

//       // Close lightbox with the instance function
//       const removeWindow = function (elem) {
//         elem.classList.remove('basicLightbox--visible');
//         elem.parentElement.removeChild(elem);
//         return;
//       };
//       removeWindow(lightBoxWindow);
//     });
// };

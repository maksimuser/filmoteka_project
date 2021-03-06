import modal from '../templates/main-modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
const filmCard = document.querySelector(`.section-trend`);
const key = `ebb87b3c3ccf067a0867ba65db09dab4`;
function openModal(event) {
  event.preventDefault();
  const idNum = event.target.dataset.src;
  const type = event.target.dataset.type;
  fetch(
    `https://api.themoviedb.org/3/${type}/${idNum}?api_key=${key}&language=en-US&external_source=imdb_id`,
  )
    .then(res => res.json())
    .then(filmById => {
      const formModal = modal(filmById);
      const instance = basicLightbox.create(
        `
    
        ${formModal}
        
        <button type="button" class="modal-close-button" data-action="close-modal"></button>
  
    
`,
        {
          onShow: instance => {
            instance.element().querySelector('.modal-close-button').onclick =
              instance.close;
          },
        },
      );

      instance.show();
    })
    .catch(error => console.log(error));
}
filmCard.addEventListener(`click`, openModal);

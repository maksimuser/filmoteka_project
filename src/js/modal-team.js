const openModalBtn = document.querySelector('a[data-action="open-modal"]');
const closeModalBtn = document.querySelector('button[data-action="close-modal"]');
const backdropRef = document.querySelector('.js-backdrop');

openModalBtn.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
backdropRef.addEventListener('click', onBackDropClick);

function onOpenModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onPressEscape);
  document.body.classList.add('show-modal');
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  document.body.classList.remove('show-modal');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
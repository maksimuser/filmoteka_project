import './js/modal';
import './sass/styles.scss';
import './js/refs';

import './js/auth';
import './js/sign-up';
import './js/input-service';

import './js/changes-st';
import './js/library-api';
import './js/pagination';

import apiService from './js/api-service';
import updateTrendMarkup from './js/update-markup';
import inputService from './js/input-service';
import debounce from 'lodash.debounce';




import MicroModal from 'micromodal';
MicroModal.init();

apiService.fetchTrendMovie().then(trendMovies => {
  updateTrendMarkup(trendMovies);
});

const searchInput = document.querySelector('.js-input');
const movieContainer = document.querySelector('.trend-movies-js');
const spinnerRef = document.querySelector('.loader');
const homeRef = document.querySelector('.navigation-link-home');
const library = document.querySelector('.navigation-link-library');
const formRef = document.querySelector('.search-form');
const header = document.querySelector('.page-header');

header.classList.add('page-bg-home');
// header.classList.remove('page-bg-lib');

library.classList.remove('current');
homeRef.classList.add('current');

spinnerRef.hidden = true;
formRef.hidden = false;

searchInput.addEventListener(
  'input',
  debounce(() => {
    apiService.resetPage();
    const inputValue = searchInput.value.trim();
    if (inputValue) {
      movieContainer.innerHTML = '';
      spinnerRef.hidden = false;
      inputService.fetchInputMovie(inputValue).then(trendMovies => {
        updateTrendMarkup(trendMovies);
        spinnerRef.hidden = true;
      });
    }
  }, 1500),
);

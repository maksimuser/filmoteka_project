import './sass/styles.scss';
import './js/refs';
import './js/modal';
import './js/auth';
import './js/sign-up';
import './js/input-service';
import './js/modal-team';
import './js/changes-st';
import './js/library-api';
import './js/pagination';


import apiService from './js/api-service';
import updateTrendMarkup from './js/update-markup';
import inputService from './js/input-service';
import debounce from 'lodash.debounce';

apiService.fetchTrendMovie().then(trendMovies => {
  updateTrendMarkup(trendMovies);
});

const searchInput = document.querySelector('.js-input');
const movieContainer = document.querySelector('.trend-movies-js');
const spinnerRef = document.querySelector('.loader');

spinnerRef.hidden = true;

searchInput.addEventListener(
  'input',
  debounce(() => {
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

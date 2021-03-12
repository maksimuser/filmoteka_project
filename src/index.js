import './js/modal';
import './sass/styles.scss';
import './js/refs';
import './js/auth';
import './js/sign-up';
import './js/input-service';
import './js/changes-st';
import './js/library-api';
import './js/pagination';
import refs from './js/refs';
import apiService from './js/api-service';
import updateTrendMarkup from './js/update-markup';
import inputService from './js/input-service';
import debounce from 'lodash.debounce';

import MicroModal from 'micromodal';
MicroModal.init();

apiService.fetchTrendMovie().then(trendMovies => {
  updateTrendMarkup(trendMovies);
});

refs.header.classList.add('page-bg-home');
refs.library.classList.remove('current');
refs.homeRef.classList.add('current');
refs.spinnerRef.hidden = true;
refs.formRef.hidden = false;

refs.searchInput.addEventListener(
  'input',
  debounce(() => {
    apiService.resetPage();
    const inputValue = refs.searchInput.value.trim();
    if (inputValue) {
      refs.movieContainer.innerHTML = '';
      refs.spinnerRef.hidden = false;
      inputService.fetchInputMovie(inputValue).then(trendMovies => {
        updateTrendMarkup(trendMovies);
        refs.spinnerRef.hidden = true;
      });
    }
  }, 1500),
);

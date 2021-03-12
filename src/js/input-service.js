import axios from 'axios';
import apiService from './api-service';
import updateTrendMarkup from './update-markup';
import createPagination from './pagination';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import refs from './refs';

const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';

refs.logout.addEventListener('click', returnHome);
refs.library.addEventListener('click', switchToLibrary);
refs.formRef.addEventListener('submit', event => {
  event.preventDefault();
});
refs.homeRef.addEventListener('click', goHome);
refs.logoRef.addEventListener('click', goHome);
refs.btnWatched.addEventListener('click', activeWatchedBtn);
refs.btnQueue.addEventListener('click', activeQueueBtn);

function activeWatchedBtn() {
  refs.btnQueue.classList.remove('btn-active-color');
  refs.btnWatched.classList.add('btn-active-color');
}

function activeQueueBtn() {
  refs.btnQueue.classList.add('btn-active-color');
  refs.btnWatched.classList.remove('btn-active-color');
}

function returnHome() {
  refs.formRef.hidden = false;
  refs.homeRef.classList.add('current');
  refs.library.classList.remove('current');
  refs.header.classList.add('page-bg-home');
  refs.header.classList.remove('page-bg-lib');
}

function switchToLibrary() {
  refs.btnWatched.classList.remove('btn-active-color');
  refs.btnQueue.classList.add('btn-active-color');
  refs.spinnerRef.hidden = true;
  refs.formRef.hidden = true;
  refs.homeRef.classList.remove('current');
  refs.library.classList.add('current');
  refs.header.classList.remove('page-bg-home');
  refs.header.classList.add('page-bg-lib');
}

function goHome() {
  refs.element.hidden = false;
  refs.formRef.hidden = false;
  refs.header.classList.add('page-bg-home');
  refs.header.classList.remove('page-bg-lib');
  refs.homeRef.classList.add('current');
  refs.library.classList.remove('current');

  apiService.resetPage();
  apiService.fetchTrendMovie().then(trendMovies => {
    refs.movieContainer.innerHTML = '';
    refs.formRef.reset();
    updateTrendMarkup(trendMovies);
  });
}

export default {
  async fetchInputMovie(searchQuery, page = 1) {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=${searchQuery}&page=${page}`;
    try {
      const inputVal = await axios.get();
      apiService.totalPages = inputVal.data.total_pages;
      createPagination(apiService.totalPages, page);

      const dataVal = inputVal.data.results;

      if (apiService.totalPages <= 1) {
        refs.element.hidden = true;
      } else {
        refs.element.hidden = false;
      }

      if (!dataVal.length) {
        error({
          title: 'Film not found!',
          text: 'Check film name and try again!',
          delay: 3000,
          closerHover: true,
        });
        return;
      } else {
        apiService.getAvailWidth(dataVal);
        return apiService.requestParamTrend(dataVal);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data');
    }
  },
};

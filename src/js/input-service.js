import axios from 'axios';
import apiService from './api-service';
import updateTrendMarkup from './update-markup';
import createPagination from './pagination';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';
const formRef = document.querySelector('.search-form');
const movieContainer = document.querySelector('.trend-movies-js');
const searchInput = document.querySelector('.js-input');
const logoRef = document.querySelector('.logo-link');
const homeRef = document.querySelector('.navigation-link-home');
const library = document.querySelector('.navigation-link-library');
const element = document.querySelector('.pagination ul');
const logout = document.querySelector('#logout');

logout.addEventListener('click', event => {
  formRef.hidden = false;
  homeRef.classList.add('current');
  library.classList.remove('current');
});

library.addEventListener('click', event => {
  formRef.hidden = true;
  homeRef.classList.remove('current');
  library.classList.add('current');
});

formRef.addEventListener('submit', event => {
  event.preventDefault();
});

homeRef.addEventListener('click', goHome);
logoRef.addEventListener('click', goHome);

function goHome() {
  element.hidden = false;
  formRef.hidden = false;

  homeRef.classList.add('current');
  library.classList.remove('current');

  apiService.resetPage();

  apiService.fetchTrendMovie().then(trendMovies => {
    movieContainer.innerHTML = '';
    formRef.reset();
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
        element.hidden = true;
      } else {
        element.hidden = false;
      }

      if (!dataVal.length) {
        error({
          title: 'Film not found.',
          text: 'Check film name and try again.',
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

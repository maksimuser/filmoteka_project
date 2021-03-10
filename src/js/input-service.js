import axios from 'axios';
import apiService from './api-service';
import updateTrendMarkup from './update-markup';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';
const formRef = document.querySelector('.search-form');
const movieContainer = document.querySelector('.trend-movies-js');
const searchInput = document.querySelector('.js-input');

const element = document.querySelector('.pagination ul');
const logoRef = document.querySelector('.logo-link');
const homeRef = document.querySelector('.navigation-link');

formRef.addEventListener('submit', event => {
  event.preventDefault();
});

homeRef.addEventListener('click', goHome);
logoRef.addEventListener('click', goHome);

function goHome() {
  const eve = event.target;
  console.log(eve);

  apiService.fetchTrendMovie().then(trendMovies => {
    movieContainer.innerHTML = '';
    formRef.reset();
    updateTrendMarkup(trendMovies);
    searchInput.value = '';

    const elm = document.querySelector('.paginatorFirst');
    console.log(elm);
    elm.classList.add('active');
    eve.classList.remove('active');
    console.log(elm);
  });
}

export default {
  async fetchInputMovie(searchQuery, page = 1) {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=${searchQuery}&page=${page}`;
    try {
      const inputVal = await axios.get();
      const dataVal = inputVal.data.results;
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

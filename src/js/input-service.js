import axios from 'axios';
import apiService from './api-service';
import updateTrendMarkup from './update-markup';

const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';
const formRef = document.querySelector('.search-form');
const movieContainer = document.querySelector('.trend-movies-js');

const logoRef = document.querySelector('.logo-link');
const homeRef = document.querySelector('.navigation-link');

formRef.addEventListener('submit', event => {
  event.preventDefault();
});
homeRef.addEventListener('click', goHome);
logoRef.addEventListener('click', goHome);
function goHome() {
  apiService.fetchTrendMovie().then(trendMovies => {
    movieContainer.innerHTML = '';
    formRef.reset();
    updateTrendMarkup(trendMovies);
    console.log('click');
  });
}

export default {
  async fetchInputMovie(searchQuery, page = 1) {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=${searchQuery}&page=${page}`;
    try {
      const inputVal = await axios.get();
      const dataVal = inputVal.data.results;

      apiService.getAvailWidth(dataVal);

      return apiService.requestParamTrend(dataVal);
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data');
    }
  },
};

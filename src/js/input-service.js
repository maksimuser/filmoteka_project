// import movieTpl from './templates/trend-movies.hbs';
import debounce from 'lodash.debounce';
import updateTrendMarkup from './update-markup';

const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';

const movieContainer = document.querySelector('.trend-movies-js');
const searchInput = document.querySelector('.js-input');

searchInput.addEventListener(
  'input',
  debounce(() => {
    const inputValue = searchInput.value.trim();
    if (inputValue) {
      movieContainer.innerHTML = '';
      fetchInputMovie(inputValue);
    }
  }, 500),
);

function fetchInputMovie(searchQuery) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=${searchQuery}`;
  fetch(url)
    .then(response => response.json())
    .then(({ results }) => updateTrendMarkup(results))
    .catch(error => console.log(error));
}

// function updateMovieMarkup(results) {
//   const markup = movieTpl(results);
//   movieContainer.insertAdjacentHTML('beforeend', markup);
// }

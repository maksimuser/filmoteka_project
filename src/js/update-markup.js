import trendMoviesMarkup from '../templates/trend-movies.hbs';
import refs from './refs';

function updateTrendMarkup(trendMovies) {
  console.log(trendMovies);
  const markup = trendMoviesMarkup(trendMovies);

  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}

export default updateTrendMarkup;

import trendMoviesMarkup from '../templates/trend-movies.hbs';

const refs = {
  movies: document.querySelector('.trend-movies-js'),
};

function updateTrendMarkup(trendMovies) {
  const markup = trendMoviesMarkup(trendMovies);

  refs.movies.insertAdjacentHTML('beforeend', markup);
}



export default updateTrendMarkup;

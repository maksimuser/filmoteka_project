import './sass/styles.scss';
import apiService from './js/api-service';
import './js/refs';
import updateTrendMarkup from './js/update-markup';

apiService.fetchTrendMovie().then(trendMovies => {
  updateTrendMarkup(trendMovies);
});

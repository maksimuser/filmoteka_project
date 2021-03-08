import './sass/styles.scss';
import './js/refs';
import './js/modal';
import './js/auth';
import './js/sign-up';
import './js/input-service';
import './js/modal-team';

import apiService from './js/api-service';
import updateTrendMarkup from './js/update-markup';

apiService.fetchTrendMovie().then(trendMovies => {
  updateTrendMarkup(trendMovies);
});

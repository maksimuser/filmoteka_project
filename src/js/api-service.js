import axios from 'axios';
import createPagination from './pagination';
const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';

export default {
  totalPages: 0,
  page: 1,

  async fetchTrendMovie() {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${this.page}`;
    try {
      const resTrend = await axios.get();
      this.totalPages = resTrend.data.total_pages;
      createPagination(this.totalPages, this.page);

      if (resTrend.status !== 200) {
        throw new Error('error');
      }

      const dataTrend = resTrend.data.results;

      this.getAvailWidth(dataTrend);

      return this.requestParamTrend(dataTrend);
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data');
    }
  },

  requestParamTrend(data) {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    )
      .then(res => res.json())
      .then(({ genres }) => {
        return data.map(
          ({ release_date, poster_path, title, id, media_type, genre_ids }) => {
            if (!release_date) {
              return;
            }

            release_date = release_date.slice(0, 4);

            genre_ids.forEach((el, index) => {
              genres.map(({ id, name }) => {
                if (el === id) {
                  genre_ids[index] = ' ';
                  genre_ids[index] += name;
                }
              });
            });

            return {
              release_date,
              poster_path,
              title,
              id,
              media_type,
              genre_ids,
            };
          },
        );
      });
  },

  getAvailWidth(data) {
    data.length = 9;
    if (screen.availWidth < 767) {
      data.length = 4;
    }
    if (screen.availWidth >= 768 && screen.availWidth <= 1023) {
      data.length = 8;
    }
  },

  resetPage() {
    this.page = 1;
  },
};

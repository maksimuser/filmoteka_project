import axios from 'axios';
const apiKey = 'ebb87b3c3ccf067a0867ba65db09dab4';

export default {
  async fetchTrendMovie(page = 1) {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`;
    try {
      const resTrend = await axios.get();

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

  requestParamTrend(dataTrend) {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    )
      .then(res => res.json())
      .then(({ genres }) => {
        return dataTrend.map(
          ({ release_date, poster_path, title, id, media_type, genre_ids }) => {
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

  getAvailWidth(dataTrend) {
    dataTrend.length = 9;
    if (screen.availWidth < 767) {
      dataTrend.length = 4;
      console.log(dataTrend.length);
    }
    if (screen.availWidth >= 768 && screen.availWidth <= 1023) {
      dataTrend.length = 8;
      console.log(dataTrend.length);
    }
  },
};

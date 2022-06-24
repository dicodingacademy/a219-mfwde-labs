import TheMovieDbSource from '../../data/themoviedb-source';
import {
  createMovieItemTemplate,
  createSkeletonMovieTemplate,
} from '../templates/template-creator';

const Upcoming = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Upcoming in Cinema</h2>
        <div id="movies" class="movies">
          ${createSkeletonMovieTemplate(20)}
        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await TheMovieDbSource.upcomingMovies();
    const moviesContainer = document.querySelector('#movies');
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
      moviesContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default Upcoming;

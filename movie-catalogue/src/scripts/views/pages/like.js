import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import FavoriteMovieView from './liked-movies/favorite-movie-view';
import FavoriteMovieShowPresenter from './liked-movies/favorite-movie-show-presenter';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter';

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    // eslint-disable-next-line no-new
    new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMovieIdb });
  },
};

export default Like;

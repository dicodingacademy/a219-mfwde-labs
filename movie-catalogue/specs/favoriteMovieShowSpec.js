import FavoriteMovieSearchView
  from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';
import FavoriteMovieShowPresenter
  from '../src/scripts/views/pages/liked-movies/favorite-movie-show-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Showing all favorite movies', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no movies have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);

      new FavoriteMovieShowPresenter({
        view,
        favoriteMovies,
      });

      expect(favoriteMovies.getAllMovies).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no movies have been liked', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
      favoriteMovies.getAllMovies.and.returnValues([]);

      new FavoriteMovieShowPresenter({
        view,
        favoriteMovies,
      });
    });
  });

  describe('When favorite movies exist', () => {
    it('should show the movies', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(2);
        done();
      });

      const favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
      favoriteMovies.getAllMovies.and.returnValues([
        {
          id: 11, title: 'A', vote_average: 3, overview: 'Sebuah film A',
        },
        {
          id: 22, title: 'B', vote_average: 4, overview: 'Sebuah film B',
        },
      ]);

      new FavoriteMovieShowPresenter({
        view,
        favoriteMovies,
      });
    });
  });
});

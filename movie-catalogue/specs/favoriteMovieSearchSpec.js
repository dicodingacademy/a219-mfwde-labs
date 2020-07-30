import FavoriteMovieSearchPresenter
  from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieSearchView
  from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';

describe('Searching movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies,
      view,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchMovies('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });

    it('should ask the model to search for movies', () => {
      searchMovies('film a');

      expect(favoriteMovies.searchMovies)
        .toHaveBeenCalledWith('film a');
    });

    it('should show the found movies', () => {
      presenter._showFoundMovies([{ id: 1 }]);
      expect(document.querySelectorAll('.movie-item').length)
        .toEqual(1);

      presenter._showFoundMovies([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('.movie-item').length)
        .toEqual(2);
    });

    it('should show the title of the found movies', () => {
      presenter._showFoundMovies([{
        id: 1,
        title: 'Satu',
      }]);
      expect(document.querySelectorAll('.movie__title')
        .item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);

      searchMovies('film a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchMovies(' ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length)
        .toEqual(0);
    });

    it('should show all favorite movies', () => {
      searchMovies('    ');

      expect(favoriteMovies.getAllMovies)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite movies could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);

        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);

      searchMovies('film a');
    });

    it('should not show any movie', (done) => {
      document.getElementById('movies').addEventListener('movies:updated', () => {
        expect(document.querySelectorAll('.movie-item').length)
          .toEqual(0);
        done();
      });

      favoriteMovies.searchMovies.withArgs('film a')
        .and
        .returnValues([]);

      searchMovies('film a');
    });
  });
});

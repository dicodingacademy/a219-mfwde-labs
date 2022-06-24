import { createMovieItemTemplate } from '../../templates/template-creator';

class FavoriteMovieSearchView {
  getTemplate() {
    return `
      <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Movie</h2>
        <div id="movies" class="movies">
        </div>
      </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showMovies(movies) {
    this.showFavoriteMovies(movies);
  }

  showFavoriteMovies(movies = []) {
    let html;
    if (movies.length) {
      html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('movies').innerHTML = html;

    document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="movie-item__not__found movies__not__found">Tidak ada film untuk ditampilkan</div>';
  }
}

export default FavoriteMovieSearchView;

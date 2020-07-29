class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies }) {
    this._listenToSearchRequestByUser();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchMovies(event.target.value);
    });
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery;

    const foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);

    this._showFoundMovies(foundMovies);
  }

  _showFoundMovies(movies) {
    const html = movies.reduce(
      (carry, movie) => carry.concat(`<li class="movie"><span class="movie__title">${movie.title || '-'}</span></li>`),
      '',
    );

    document.querySelector('.movies').innerHTML = html;

    document.getElementById('movie-search-container')
      .dispatchEvent(new Event('movies:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;

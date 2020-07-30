const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  it('should return the movie that has been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1))
      .toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2))
      .toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3))
      .toEqual(undefined);
  });

  it('should refuse a movie from being added if it does not have the correct property', async () => {
    favoriteMovie.putMovie({ aProperty: 'property' });

    expect(await favoriteMovie.getAllMovies())
      .toEqual([]);
  });

  it('can return all of the movies that have been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite movie', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(1);

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a movie even though the movie has not been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(4);

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for movies', async () => {
    favoriteMovie.putMovie({ id: 1, title: 'film a' });
    favoriteMovie.putMovie({ id: 2, title: 'film b' });
    favoriteMovie.putMovie({ id: 3, title: 'film abc' });
    favoriteMovie.putMovie({ id: 4, title: 'ini mah film abcd' });

    expect(await favoriteMovie.searchMovies('film a')).toEqual([
      { id: 1, title: 'film a' },
      { id: 3, title: 'film abc' },
      { id: 4, title: 'ini mah film abcd' },
    ]);
  });
};

export { itActsAsFavoriteMovieModel };

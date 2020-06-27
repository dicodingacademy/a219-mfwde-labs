import DataSource from '../../data/data-source';

const NowPlaying = {
  async render() {
    return `
      <h2>Now Playing Page</h2>
    `;
  },

  async afterRender() {
    const movies = await DataSource.nowPlayingMovies();
    console.log(movies);

    // TODO: tampilkan movies di dalam DOM
  },
};

export default NowPlaying;

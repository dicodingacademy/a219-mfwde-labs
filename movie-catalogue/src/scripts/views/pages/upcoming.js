import DataSource from '../../data/data-source';

const Upcoming = {
  async render() {
    return `
      <h2>Upcoming page</h2>
    `;
  },

  async afterRender() {
    const movies = await DataSource.upcomingMovies();
    console.log(movies);

    // TODO: tampilkan movies di dalam DOM
  },
};

export default Upcoming;

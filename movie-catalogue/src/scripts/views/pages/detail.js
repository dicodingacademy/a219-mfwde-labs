import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';

const Detail = {
  async render() {
    return `
      <h2>Detail Page</h2>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await DataSource.detailMovie(url.id);
    console.log(movie);

    // TODO: tampilkan movie di dalam DOM
  },
};

export default Detail;

Feature('Liking Movies');

Before((I) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', (I) => {
  I.seeElement('#query');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one movie', (I) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');
  // … kita akan mengisi uji coba berikutnya …
});

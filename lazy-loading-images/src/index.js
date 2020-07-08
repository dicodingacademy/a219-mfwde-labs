import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const generateImage = () => {
  for (let i = START; i < START + NUMBER_OF_IMAGES; i++) {
    document.body.innerHTML += `<img class="lazyload" data-src="https://picsum.photos/id/${i}/400/400" alt="dummy images"><br>`;
  }
};

generateImage();

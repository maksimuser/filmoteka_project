import apiService from './api-service';
import updateTrendMarkup from './update-markup';

const refs = {
  movies: document.querySelector('.trend-movies-js'),
};

const element = document.querySelector('.pagination ul');

let totalPages = 30;
let page = 1;
element.innerHTML = createPagination(totalPages, page);

function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    liTag += `<li class="btn prev paginatorPrev"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if (page > 2) {
    liTag += `<li class="first numb paginatorFirst"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (page == plength) {
      active = 'active';
    } else {
      active = '';
    }

    liTag += `<li class="numb paginatorNumb ${active}" data-number='${plength}'><span class="spanNumber">${plength}</span></li>`;
    console.log(liTag);
    console.log(plength);
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb paginatorLast"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next paginatorNext"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag;
  return liTag;
}

element.addEventListener('click', event => {
  //   console.log(event.target.className);
  if (event.target.className.includes('paginatorNumb')) {
    page = event.target.dataset.number;
    // console.log(event.target.className);
  } else if (event.target.className.includes('paginatorFirst')) {
    page = 1;
  } else if (event.target.className.includes('paginatorPrev')) {
    page = page - 1;
  } else if (event.target.className.includes('paginatorLast')) {
    page = totalPages;
  } else if (event.target.className.includes('paginatorNext')) {
    page = Number(page) + 1;
    // console.log(page);
    // console.log(event.target.className);
  }

  createPagination(totalPages, page);

  apiService.fetchTrendMovie(page).then(trendMovies => {
    updateTrendMarkup(trendMovies);
  });
});

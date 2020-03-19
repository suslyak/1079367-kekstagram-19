'use strict';
(function () {
  var URL = window.settings.API_URL + window.settings.API_DATA_URL;

  var fragment = document.createDocumentFragment();
  var picturesContainerElement = document.querySelector('.pictures');
  var filtersElement = document.querySelector('.img-filters');
  var randomFilterElement = document.querySelector('#filter-random');
  var discussedFilterElement = document.querySelector('#filter-discussed');
  var defaultFilterElement = document.querySelector('#filter-default');
  window.defaultPictures = [];

  var createPictures = function (pictures) {
    var counter = 1;
    pictures.forEach(function (picture) {

      localStorage.setItem('picture' + counter, JSON.stringify(picture));
      fragment.appendChild(window.picture.create(counter, picture.url, picture.comments.length, picture.likes));
      counter++;
    });

    return fragment;
  };

  var insertPictures = function (pictures) {
    picturesContainerElement.appendChild(createPictures(pictures));
  };

  var successHandler = function (response) {
    var pictures = [];
    var limit = (window.settings.PICTURES_ON_PAGE <= response.length) ? window.settings.PICTURES_ON_PAGE : response.length;
    for (var i = 0; i < limit; i++) {
      var comments = [];

      response[i].comments.forEach(function (comment) {
        var commentObject = {
          avatar: comment.avatar,
          message: comment.message,
          name: comment.name
        };

        comments.push(commentObject);
      });

      pictures.push({
        url: response[i].url,
        description: response[i].description,
        likes: response[i].likes,
        comments: comments
      });
    }

    insertPictures(pictures);
    filtersElement.classList.remove('img-filters--inactive');
    window.defaultPictures = pictures;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'text-align: center; background-color: lightcoral; text-transform: none; border-radius: 30px;';
    node.style.padding = '20px';
    node.innerText = errorMessage;
    picturesContainerElement.appendChild(node);
  };

  var filterPicturesByRandom = function (pictures) {
    var picturesArray = window.utils.cloneObject(pictures);
    var numberOfPictures = (window.settings.RANDOM_PICTURES_FILTER_COUNT < pictures.length) ? window.settings.RANDOM_PICTURES_FILTER_COUNT : pictures.length;
    var randomPictures = [];
    for (var i = 0; i < numberOfPictures; i++) {
      randomPictures[i] = window.utils.getRandomArrayElement(picturesArray);
      picturesArray.splice(picturesArray.indexOf(randomPictures[i]), 1);
    }

    return randomPictures;
  };

  var filterPicturesByComments = function (pictures) {
    var picturesArray = window.utils.cloneObject(pictures);
    var filteredPictures = picturesArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return filteredPictures;
  };

  var selectFilterElement = function (targetElement) {
    filtersElement.querySelectorAll('.img-filters__button--active').forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    targetElement.classList.add('img-filters__button--active');
  };

  var applyGalleryFilter = function (filter, pictures) {
    picturesContainerElement.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });

    insertPictures(filter(pictures));
  };
  randomFilterElement.addEventListener('click', function (event) {
    selectFilterElement(event.target);
  });
  randomFilterElement.addEventListener('click', window.debounce(function (event) {
    selectFilterElement(event.target);
    applyGalleryFilter(filterPicturesByRandom, window.defaultPictures);
  }));
  discussedFilterElement.addEventListener('click', function (event) {
    selectFilterElement(event.target);
  });
  discussedFilterElement.addEventListener('click', window.debounce(function (event) {
    selectFilterElement(event.target);
    applyGalleryFilter(filterPicturesByComments, window.defaultPictures);
  }));
  defaultFilterElement.addEventListener('click', function (event) {
    selectFilterElement(event.target);
  });
  defaultFilterElement.addEventListener('click', window.debounce(function (event) {
    selectFilterElement(event.target);
    applyGalleryFilter(function (pictures) {
      return pictures;
    }, window.defaultPictures);
  }));

  window.transactions.request(window.settings.API_LOAD_METHOD, URL, successHandler, errorHandler);
})();

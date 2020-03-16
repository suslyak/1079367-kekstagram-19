'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var picturesContainerElement = document.querySelector('.pictures');

  var createMockPicturesData = function (numberOfPictures) {
    var mockObjects = [];

    for (var i = 1; i < numberOfPictures + 1; i++) {
      var mockComments = [];

      for (var j = 0; j < window.utils.getRandomIntInclusive(1, 5); j++) {
        var mockComment = {
          avatar: 'img/avatar-' + window.utils.getRandomIntInclusive(1, 6) + '.svg',
          message: window.utils.getRandomArrayElement(window.data.MockData.COMMENTS_MESSAGES),
          name: window.utils.getRandomArrayElement(window.data.MockData.COMMENTS_NAMES)
        };

        mockComments.push(mockComment);
      }

      mockObjects.push({
        url: 'photos/' + i + '.jpg',
        description: 'описание фотографии',
        likes: window.utils.getRandomIntInclusive(15, 200),
        comments: mockComments
      });
    }

    return mockObjects;
  };

  var setInitialPicture = function (pictureObject) {
    var bigPictureContainerElement = document.querySelector('.big-picture');
    var bigPictureElement = bigPictureContainerElement.querySelector('.big-picture__img > img');
    var bigPictureSocialElement = bigPictureContainerElement.querySelector('.big-picture__social');
    var bigPictureLikesElement = bigPictureSocialElement.querySelector('.likes-count');
    var bigPictureDescriptionElement = bigPictureSocialElement.querySelector('.social__caption');
    var bigPictureCommentsCountElement = bigPictureContainerElement.querySelector('.social__comment-count');
    var bigPictureCommentsElement = bigPictureContainerElement.querySelector('.social__comments');
    var bigPictureCommentsLoaderElement = bigPictureContainerElement.querySelector('.comments-loader');
    var bigPictureCommentTemplate = bigPictureCommentsElement.querySelector('.social__comment');

    bigPictureElement.setAttribute('src', pictureObject.url);
    bigPictureLikesElement.innerText = pictureObject.likes;
    bigPictureDescriptionElement.innerText = pictureObject.description;
    bigPictureCommentsCountElement.innerText = pictureObject.comments.length;
    bigPictureCommentsElement.innerText = '';

    pictureObject.comments.forEach(function (element) {
      var listElement = bigPictureCommentTemplate.cloneNode(true);

      window.utils.setAttributes(listElement.querySelector('.social__picture'), {'src': element.avatar, 'alt': element.name});
      listElement.querySelector('.social__text').innerText = element.message;

      bigPictureCommentsElement.appendChild(listElement);
    });

    bigPictureCommentsCountElement.classList.add('hidden');
    bigPictureCommentsLoaderElement.classList.add('hidden');
  };

  var createPictures = function (pictures) {
    setInitialPicture(pictures[0]);
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
    var limit = (window.settings.picturesOnPage <= response.length) ? window.settings.picturesOnPage : response.length;
    for (var i = 0; i < limit; i++) {
      var comments = [];

      response[i].comments.forEach(function (comment) {
        var commentObject = {
          vatar: comment.avatar,
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
  };

  var errorHandler = function (errorMessage, needMock) {
    if (needMock) {
      insertPictures(createMockPicturesData(window.settings.picturesOnPage));
    } else {
      var node = document.createElement('div');
      node.style = 'text-align: center; background-color: lightcoral; text-transform: none; border-radius: 30px;';
      node.style.padding = '20px';

      node.textContent = errorMessage;
      picturesContainerElement.appendChild(node);
    }
  };

  window.transactions.load(successHandler, errorHandler);
})();

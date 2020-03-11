'use strict';
(function () {
  var fragment = document.createDocumentFragment();

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

  var createMockPictures = function () {
    var mockPictures = createMockPicturesData(25);
    var initialPicture = mockPictures[0];
    var pictureTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture');

    setInitialPicture(initialPicture);

    mockPictures.forEach(function (element) {
      var picture = pictureTemplate.cloneNode(true);

      picture.querySelector('.picture__img').setAttribute('src', element.url);
      picture.querySelector('.picture__comments').innerText = element.comments.length;
      picture.querySelector('.picture__likes').innerText = element.likes;

      fragment.appendChild(picture);
    });

    return fragment;
  };

  var insertMockPictures = function () {
    var picturesContainerElement = document.querySelector('.pictures');
    picturesContainerElement.appendChild(createMockPictures());
  };

  insertMockPictures();
})();

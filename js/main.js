'use strict';

var fragment = document.createDocumentFragment();
var MockData = {
  COMMENTS_MESSAGES: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  COMMENTS_NAMES: [
    'Вася',
    'Петя',
    'Коля',
    'Василиса',
    'Оля',
    'Гурген',
  ]
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var setAttributes = function (element, attributes) {
  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
};

var createmockPicturesData = function (numberOfPictures) {
  var mockObjects = [];

  for (var i = 1; i < numberOfPictures + 1; i++) {
    var mockComments = [];

    for (var j = 0; j < getRandomIntInclusive(1, 5); j++) {
      var mockComment = {
        avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
        message: getRandomArrayElement(MockData.COMMENTS_MESSAGES),
        name: getRandomArrayElement(MockData.COMMENTS_NAMES)
      };

      mockComments.push(mockComment);
    }

    mockObjects.push({
      url: 'photos/' + i + '.jpg',
      description: 'описание фотографии',
      likes: getRandomIntInclusive(15, 200),
      comments: mockComments
    });
  }

  return mockObjects;
};

var setInitialPicture = function (pictureObject) {
  var bigPictureContainer = document.querySelector('.big-picture');
  var bigPicture = bigPictureContainer.querySelector('.big-picture__img > img');
  var bigPictureSocial = bigPictureContainer.querySelector('.big-picture__social');
  var bigPictureLikes = bigPictureSocial.querySelector('.likes-count');
  var bigPictureDescription = bigPictureSocial.querySelector('.social__caption');
  var bigPictureCommentsCount = bigPictureContainer.querySelector('.social__comment-count');
  var bigPictureComments = bigPictureContainer.querySelector('.social__comments');
  var bigPictureCommentsLoader = bigPictureContainer.querySelector('.comments-loader');
  var bigPictureCommentTemplate = bigPictureComments.querySelector('.social__comment');

  if (bigPictureContainer.classList.contains('hidden')) {
    bigPictureContainer.classList.remove('hidden');
  }

  bigPicture.setAttribute('src', pictureObject.url);
  bigPictureLikes.innerText = pictureObject.likes;
  bigPictureDescription.innerText = pictureObject.description;
  bigPictureCommentsCount.innerText = pictureObject.comments.length;
  bigPictureComments.innerHTML = '';

  pictureObject.comments.forEach(function (element) {
    var listElement = bigPictureCommentTemplate.cloneNode(true);

    setAttributes(listElement.querySelector('.social__picture'), {'src': element.avatar, 'alt': element.name});
    listElement.querySelector('.social__text').innerText = element.message;

    bigPictureComments.appendChild(listElement);
  });

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

var createMockPictures = function () {
  var mockPictures = createmockPicturesData(25);
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
  var picturesContainer = document.querySelector('.pictures');
  picturesContainer.appendChild(createMockPictures());
};

insertMockPictures();
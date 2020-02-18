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

var createmockPictures = function () {
  var mockPictures = createmockPicturesData(25);
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  mockPictures.forEach(function (element) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', element.url);
    picture.querySelector('.picture__comments').innerText = element.comments.length;
    picture.querySelector('.picture__likes').innerText = element.likes;

    fragment.appendChild(picture);

  });

  return fragment;
};

var insertmockPictures = function () {
  var picturesContainer = document.querySelector('.pictures');
  picturesContainer.appendChild(createmockPictures());
};

insertmockPictures();

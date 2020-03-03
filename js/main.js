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

var filterEffectsLevel = 20;

var filters = {
  'none': {'effect': 'none'},
  'chrome': {'effect': 'grayscale', 'range': [0, 1], 'measure': ''},
  'sepia': {'effect': 'sepia', 'range': [0, 1], 'measure': ''},
  'marvin': {'effect': 'invert', 'range': [0, 1], 'measure': '%'},
  'phobos': {'effect': 'blur', 'range': [0, 3], 'measure': 'px'},
  'heat': {'effect': 'brightness', 'range': [1, 3], 'measure': ''},
}


var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var setAttributes = function (element, attributes) {
  Object.keys(attributes).forEach(function (key) {
    element.setAttribute(key, attributes[key]);
  });
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

    setAttributes(listElement.querySelector('.social__picture'), {'src': element.avatar, 'alt': element.name});
    listElement.querySelector('.social__text').innerText = element.message;

    bigPictureCommentsElement.appendChild(listElement);
  });

  bigPictureCommentsCountElement.classList.add('hidden');
  bigPictureCommentsLoaderElement.classList.add('hidden');
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
  var picturesContainerElement = document.querySelector('.pictures');
  picturesContainerElement.appendChild(createMockPictures());
};

var uploadElement = document.querySelector('.img-upload');
var uploadFileInputElement = uploadElement.querySelector('.img-upload__input');
var uploadFormElement = uploadElement.querySelector('.img-upload__form');
var uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
var uploadCloseElement = uploadOverlayElement.querySelector('.img-upload__cancel');
var uploadEffectLevelElement = uploadOverlayElement.querySelector('.img-upload__effect-level');
var uploadEffectElements = uploadOverlayElement.querySelectorAll('.effects__radio');
var previewPictureElement = uploadOverlayElement.querySelector('.img-upload__preview > img');
var filterEffectLevelPinElement = uploadOverlayElement.querySelector('.effect-level__pin');

var listenESCKey = function(event) {
  if (event.keyCode==27) {
      closeUploadHandler();
  }
}

var closeUploadHandler = function() {
  uploadOverlayElement.classList.add('hidden');
  uploadFileInputElement.value = '';
  document.querySelector('body').classList.remove('modal-open');
  window.removeEventListener("keydown", listenESCKey);
}

var openUploadHandler = function() {
  uploadEffectLevelElement.classList.add('hidden');
  uploadEffectElements[0].checked = true;
  uploadOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  window.addEventListener("keydown", listenESCKey);
}

var applyFilterEffect = function (element,filter) {
  var filter = filters[filter];
  var effectProportion = filterEffectsLevel / 100;
  var effectValue = '';

  if (filter.range) {
    effectValue = '(';
    effectValue += effectProportion * filter.range[1];

    if (filter.measure) {
      effectValue += effect.measure;
    }

    effectValue += ')';
  }

  element.style.filter = filter.effect + effectValue;

  return element.style.filter;
}

uploadEffectElements.forEach(function (filter) {
  filter.addEventListener('click', function () {
    var modificator = filter.getAttribute('id').replace('effect-','');
    if (modificator != 'none') {
      uploadEffectLevelElement.classList.remove('hidden');
    }
    previewPictureElement.setAttribute('class','effects__preview--' + modificator);

  });
});

uploadFileInputElement.addEventListener('change', openUploadHandler);
uploadCloseElement.addEventListener('click', closeUploadHandler);

insertMockPictures();

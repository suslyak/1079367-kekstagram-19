'use strict';
(function () {
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
    ],
  };

  window.data = {
    MockData: MockData,
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,
  };
})();

'use strict';
(function () {
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

  var closePopup = function (popupElement) {
    popupElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  var openPopup = function (popupElement) {
    popupElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  };

  var escKeyHandler = function (event, action) {
    if (event.keyCode === 27) {
      action();
    }
  };

  window.utils = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArrayElement: getRandomArrayElement,
    setAttributes: setAttributes,
    closePopup: closePopup,
    openPopup: openPopup,
    escKeyHandler: escKeyHandler
  };
})();

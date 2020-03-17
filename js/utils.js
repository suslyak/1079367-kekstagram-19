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

  var keyHandler = function (event, key, action) {
    if (event.keyCode === key) {
      action();
    }
  };

  var generateUniqueNumbers = function (number, range) {
    var array = [];
    while (array.length < number) {
      var randomNumber = getRandomIntInclusive(0, range);
      if (array.indexOf(randomNumber) === -1) {
        array.push(randomNumber);
      }
    }

    return array;
  };

  var getUniqueKeys = function (items) {
    var unique = {};
    items.forEach(function (item) {
      if (!unique[item]) {
        unique[item] = true;
      }
    });

    return Object.keys(unique);
  };

  window.utils = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArrayElement: getRandomArrayElement,
    setAttributes: setAttributes,
    closePopup: closePopup,
    openPopup: openPopup,
    keyHandler: keyHandler,
    generateUniqueNumbers: generateUniqueNumbers,
    getUniqueKeys: getUniqueKeys
  };
})();

'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = window.settings.loadTimeout;

  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    /*
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, false);
      }
    });*/
    xhr.addEventListener('load', function () {
      errorHandler('Произошла ошибка соединения', true);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс', false);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };
})();

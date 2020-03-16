'use strict';
(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = window.settings.loadTimeout;

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Произошла ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText, false);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения', false);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс', false);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler('Публикация отправлена на сервер');
      } else {
        errorHandler('Произошла ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText, false);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка отправки данных на сервер', false);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс', false);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.transactions = {
    load: load,
    upload: upload
  };
})();

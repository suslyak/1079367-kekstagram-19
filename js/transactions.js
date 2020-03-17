'use strict';
(function () {
  var TIMEOUT = window.settings.loadTimeout;

  var request = function (method, url, successHandler, errorHandler, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = window.settings.API_RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.settings.ApiStatusCode.OK) {
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

    xhr.open(method, url);
    /*if (data) {
      xhr.send(data);
    } else*/
    xhr.send(data);
  };

  window.transactions = {
    request: request
  };
})();

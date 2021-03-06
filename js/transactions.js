'use strict';
(function () {
  var TIMEOUT = window.settings.API_LOAD_TIMEOUT;

  var request = function (method, url, successHandler, errorHandler, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = window.settings.API_RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.settings.ApiStatusCode.OK) {
        var response = (data) ? 'Публикация загружена успешно.' : xhr.response;
        successHandler(response);
      } else {
        errorHandler('Произошла ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.transactions = {
    request: request
  };
})();

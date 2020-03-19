'use strict';
(function () {
  window.settings = {
    PICTURES_ON_PAGE: 25,
    INITIAL_SCALE_VALUE: 100,
    SCALE_RANGE: 25,
    COMMENT_MAX_LENGTH: 140,
    HASHTAGS_MAX_LENGTH: 20,
    HASHTAGS_MAX_COUNT: 5,
    FILTER_LEVEL_BAR_LENGTH: 453,
    INITIAL_FILTER_EFFECTS_LEVEL: 100,
    RANDOM_PICTURES_FILTER_COUNT: 10,
    API_URL: 'https://js.dump.academy/kekstagram',
    API_DATA_URL: '/data',
    API_RESPONSE_TYPE: 'json',
    API_LOAD_METHOD: 'GET',
    API_SAVE_METHOD: 'POST',
    API_LOAD_TIMEOUT: 10000,
    COMMENTS_PER_PAGE: 5,
    LEGAL_FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    INVALID_FIELD_BORDER_COLOR: 'lightcoral',
    VALID_FIELD_BORDER_COLOR: 'rgb(238, 238, 238)',
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,
    ApiStatusCode: {
      OK: 200
    },
    filters: {
      'none': {'effect': 'none'},
      'chrome': {'effect': 'grayscale', 'range': [0, 1], 'measure': ''},
      'sepia': {'effect': 'sepia', 'range': [0, 1], 'measure': ''},
      'marvin': {'effect': 'invert', 'range': [0, 100], 'measure': '%'},
      'phobos': {'effect': 'blur', 'range': [0, 3], 'measure': 'px'},
      'heat': {'effect': 'brightness', 'range': [1, 3], 'measure': ''},
    },
  };
})();

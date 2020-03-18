'use strict';
(function () {
  window.settings = {
    picturesOnPage: 25,
    loadTimeout: 10000,
    initialScaleValue: 100,
    scaleRange: 25,
    commentMaxLength: 140,
    hashtagMaxLength: 20,
    hashtagsMaxCount: 5,
    filterLevelBarLength: 453,
    initialFilterEffectsLevel: 100,
    randomPicturesFilterCount: 10,
    API_URL: 'https://js.dump.academy/kekstagram',
    API_DATA_URL: '/data',
    API_RESPONSE_TYPE: 'json',
    API_LOAD_METHOD: 'GET',
    API_SAVE_METHOD: 'POST',
    ApiStatusCode: {
      OK: 200
    },
    COMMENTS_PER_PAGE: 5,
    LEGAL_FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    INVALID_FIELD_BORDER_COLOR: 'lightcoral',
    VALID_FIELD_BORDER_COLOR: 'rgb(238, 238, 238)',
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

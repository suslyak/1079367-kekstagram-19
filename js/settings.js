'use strict';
(function () {
  window.settings = {
    picturesOnPage: 25,
    loadTimeout: 10000,
    initialScaleValue: 100,
    scaleRange: 25,
    initialFilterEffectsLevel: 100,
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

'use strict';
(function () {
  var uploadElement = document.querySelector('.img-upload');
  var uploadFileInputElement = uploadElement.querySelector('.img-upload__input');
  var uploadFormElement = uploadElement.querySelector('.img-upload__form');
  var uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadCloseElement = uploadOverlayElement.querySelector('.img-upload__cancel');
  var uploadEffectLevelElement = uploadOverlayElement.querySelector('.img-upload__effect-level');
  var uploadEffectElements = uploadOverlayElement.querySelectorAll('.effects__radio');
  var previewPictureElement = uploadOverlayElement.querySelector('.img-upload__preview > img');
  var filterEffectLevelElement = uploadOverlayElement.querySelector('.img-upload__effect-level');
  var filterEffectLevelLineElement = uploadOverlayElement.querySelector('.effect-level__line');
  var filterEffectLevelPinElement = filterEffectLevelElement.querySelector('.effect-level__pin');
  var filterEffectLevelDepthElement = filterEffectLevelElement.querySelector('.effect-level__depth');
  var scaleSmallerElement = uploadOverlayElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = uploadOverlayElement.querySelector('.scale__control--bigger');
  var scaleInput = uploadOverlayElement.querySelector('.scale__control--value');
  var hashtagsInputElement = uploadOverlayElement.querySelector('.text__hashtags');
  var commentElement = uploadOverlayElement.querySelector('.text__description');

  var ecsKey = function (event) {
    window.utils.keyHandler(event, 27, closeUploadHandler);
  };

  var initUploadOverlay = function () {
    uploadEffectLevelElement.classList.add('hidden');
    uploadEffectElements[0].checked = true;

    scaleInput.setAttribute('value', window.settings.initialScaleValue + '%');
    previewPictureElement.style.transform = 'scale(' + window.settings.initialScaleValue / 100 + ')';

    applyFilterEffect(previewPictureElement, 'none');
  };

  var closeUploadHandler = function () {
    if (![hashtagsInputElement, commentElement].includes(document.activeElement)) {
      uploadFileInputElement.value = '';

      window.utils.closePopup(uploadOverlayElement);

      window.removeEventListener('keydown', ecsKey);
    }
  };

  var openUploadHandler = function () {
    initUploadOverlay();

    window.utils.openPopup(uploadOverlayElement);

    window.addEventListener('keydown', ecsKey);
  };

  var getFilterLevelValue = function () {
    var levelValue = (filterEffectLevelPinElement.offsetLeft / filterEffectLevelLineElement.offsetWidth) * 100;

    return Math.round(levelValue);
  };

  var applyFilterEffect = function (element, filter) {
    var filterName = filter;
    var effectProportion = getFilterLevelValue() / 100;
    var effectValue = '';
    var filterToApply = '';

    filterToApply = window.settings.filters[filterName] ? window.settings.filters[filterName] : window.settings.filters['none'];

    previewPictureElement.setAttribute('class', 'effects__preview--' + filterName);

    if (filterToApply.range) {
      effectValue = '(';
      effectValue += effectProportion * filterToApply.range[1];

      if (filterToApply.measure) {
        effectValue += filterToApply.measure;
      }

      effectValue += ')';
    }

    element.style.filter = filterToApply.effect + effectValue;
  };

  var setFilterLevelElements = function (level) {
    var filterLevelInput = filterEffectLevelElement.querySelector('input[name=\'effect-level\']');

    filterEffectLevelPinElement.style.left = level + '%';
    filterEffectLevelDepthElement.style.width = level + '%';

    filterLevelInput.setAttribute('value', level);
  };

  uploadEffectElements.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var filterName = filter.getAttribute('id').replace('effect-', '');

      setFilterLevelElements(window.settings.initialFilterEffectsLevel);

      if (filterName !== 'none') {
        uploadEffectLevelElement.classList.remove('hidden');
      } else {
        uploadEffectLevelElement.classList.add('hidden');
      }

      applyFilterEffect(previewPictureElement, filterName);
    });
  });

  filterEffectLevelPinElement.addEventListener('mouseup', function () {
    var modificator = previewPictureElement.getAttribute('class').replace('effects__preview--', '');

    setFilterLevelElements(getFilterLevelValue());
    applyFilterEffect(previewPictureElement, modificator);
  });

  uploadFileInputElement.addEventListener('change', openUploadHandler);
  uploadCloseElement.addEventListener('click', closeUploadHandler);

  scaleSmallerElement.addEventListener('click', function () {
    var intValue = parseInt(scaleInput.getAttribute('value'), 10);

    if (intValue > window.settings.scaleRange) {
      intValue -= window.settings.scaleRange;
      scaleInput.setAttribute('value', intValue + '%');
      previewPictureElement.style.transform = 'scale(' + intValue / 100 + ')';
    }
  });

  scaleBiggerElement.addEventListener('click', function () {
    var intValue = parseInt(scaleInput.getAttribute('value'), 10);

    if (intValue < 100) {
      intValue += window.settings.scaleRange;
    }
    if (intValue % 100 < window.settings.scaleRange) {
      intValue -= intValue % 100;
    }

    scaleInput.setAttribute('value', intValue + '%');
    previewPictureElement.style.transform = 'scale(' + intValue / 100 + ')';
  });

  hashtagsInputElement.addEventListener('input', function (event) {
    event.preventDefault();
    var validityMessage = '';
    if (hashtagsInputElement.value) {
      var hashtagsInputValue = hashtagsInputElement.value.toLowerCase().trim();
      var hashtags = hashtagsInputValue.split(' ');

      if (hashtags.length > 5) {
        validityMessage += 'Нельзя указать больше пяти хэш-тегов. ';
      }

      for (var i = 0; i < hashtags.length; i++) {
        if (!/^#[a-z0-9]+$/.test(hashtags[i])) {
          validityMessage += 'Хэш-тег должен начинаться с символа # (решётка). Хеш-тег не может состоять только из одной решётки, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, символы пунктуации и спецсимволы. ';
          break;
        }

        if (hashtags[i] > 20) {
          validityMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
          break;
        }

        if (hashtags[i].split('#').length - 1 > 1) {
          validityMessage += 'Хэш-теги разделяются пробелами. ';
          break;
        }

        if (hashtagsInputValue.split(hashtags[i]).length > 2) {
          validityMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
          break;
        }
      }
    }

    hashtagsInputElement.setCustomValidity(validityMessage);
  });

  commentElement.addEventListener('input', function (event) {
    event.preventDefault();
    var validityMessage = '';
    if (commentElement.value) {
      var commentElementValue = commentElement.value.toLowerCase().trim();
      if (commentElementValue.length > 140) {
        validityMessage += 'Длина комментария не может составлять больше 140 символов.';
      }
    }

    commentElement.setCustomValidity(validityMessage);
  });
})();

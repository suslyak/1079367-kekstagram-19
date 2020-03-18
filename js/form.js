'use strict';
(function () {
  var URL = window.settings.API_URL;

  var mainElement = document.querySelector('main');
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
  var filterLevelInput = filterEffectLevelElement.querySelector('input[name="effect-level"]');
  var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
  var messageElement = null;
  var preventEscCloseElements = [hashtagsInputElement, commentElement];

  var escKeyHandler = function (event) {
    window.utils.keyHandler(event, window.data.ESC_KEY_CODE, closeUploadHandler);
  };

  var MessageEscKeyHandler = function (event) {
    window.utils.keyHandler(event, window.data.ESC_KEY_CODE, function () {
      closeFormMessage();
      window.removeEventListener('keydown', MessageEscKeyHandler);
    });
  };

  var initUploadOverlay = function () {
    uploadEffectLevelElement.classList.add('hidden');
    uploadEffectElements[0].checked = true;

    var file = uploadFileInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.settings.LEGAL_FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPictureElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    scaleInput.setAttribute('value', window.settings.INITIAL_SCALE_VALUE + '%');
    previewPictureElement.style.transform = 'scale(' + window.settings.INITIAL_SCALE_VALUE / 100 + ')';

    applyFilterEffect(previewPictureElement, 'none');
  };

  var closeUploadHandler = function () {
    if (!preventEscCloseElements.includes(document.activeElement)) {
      uploadFileInputElement.value = '';
      hashtagsInputElement.value = '';
      commentElement.value = '';

      window.utils.closePopup(uploadOverlayElement);

      window.removeEventListener('keydown', escKeyHandler);
    }
  };

  var openUploadHandler = function () {
    initUploadOverlay();

    window.utils.openPopup(uploadOverlayElement);

    window.addEventListener('keydown', escKeyHandler);
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
    filterEffectLevelPinElement.style.left = level + '%';
    filterEffectLevelDepthElement.style.width = level + '%';

    filterLevelInput.setAttribute('value', level);
  };

  var showFormResultMessage = function (template, messageText) {
    var message = template.cloneNode(true);
    var title = message.querySelector('h2');
    var button = message.querySelector('button');

    button.addEventListener('click', function () {
      message.remove();
    });

    title.innerText = messageText;
    messageElement = message;

    mainElement.insertAdjacentElement('afterbegin', message);

    window.addEventListener('keydown', MessageEscKeyHandler);
    document.addEventListener('click', closeFormMessage);
  };
  var closeFormMessage = function () {
    if (messageElement) {
      messageElement.remove();
    }
    document.removeEventListener('click', closeFormMessage);
  };

  var successFormHandler = function (response) {
    showFormResultMessage(successTemplate, response);
  };

  var errorFormHandler = function (response) {
    showFormResultMessage(errorTemplate, response);
  };

  filterEffectLevelPinElement.addEventListener('mousedown', function (event) {
    var modificator = previewPictureElement.getAttribute('class').replace('effects__preview--', '');
    var level = getFilterLevelValue();

    var startCoords = {
      x: event.clientX
    };

    var mouseMoveHandler = function (moveEvent) {
      var shift = {
        x: startCoords.x - moveEvent.clientX
      };

      startCoords = {
        x: moveEvent.clientX
      };

      if ((filterEffectLevelPinElement.offsetLeft - shift.x < window.settings.FILTER_LEVEL_BAR_LENGTH) && (filterEffectLevelPinElement.offsetLeft - shift.x >= 0)) {
        filterEffectLevelPinElement.style.left = filterEffectLevelPinElement.offsetLeft - shift.x + 'px';
        level = getFilterLevelValue();
        filterEffectLevelDepthElement.style.width = level + '%';
        filterLevelInput.setAttribute('value', level);
        applyFilterEffect(previewPictureElement, modificator);
      }
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      setFilterLevelElements(getFilterLevelValue());
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var indicateInvalidField = function (element, indicator) {
    element.style.borderColor = (indicator) ? window.settings.INVALID_FIELD_BORDER_COLOR : window.settings.VALID_FIELD_BORDER_COLOR;
  };

  uploadEffectElements.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var filterName = filter.getAttribute('id').replace('effect-', '');

      setFilterLevelElements(window.settings.INITIAL_FILTER_EFFECTS_LEVEL);

      if (filterName !== 'none') {
        uploadEffectLevelElement.classList.remove('hidden');
      } else {
        uploadEffectLevelElement.classList.add('hidden');
      }

      applyFilterEffect(previewPictureElement, filterName);
    });
  });

  uploadFileInputElement.addEventListener('change', openUploadHandler);
  uploadCloseElement.addEventListener('click', closeUploadHandler);

  scaleSmallerElement.addEventListener('click', function () {
    var intValue = parseInt(scaleInput.getAttribute('value'), 10);

    if (intValue > window.settings.SCALE_RANGE) {
      intValue -= window.settings.SCALE_RANGE;
      scaleInput.setAttribute('value', intValue + '%');
      previewPictureElement.style.transform = 'scale(' + intValue / 100 + ')';
    }
  });

  scaleBiggerElement.addEventListener('click', function () {
    var intValue = parseInt(scaleInput.getAttribute('value'), 10);

    if (intValue < 100) {
      intValue += window.settings.SCALE_RANGE;
    }
    if (intValue % 100 < window.settings.SCALE_RANGE) {
      intValue -= intValue % 100;
    }

    scaleInput.setAttribute('value', intValue + '%');
    previewPictureElement.style.transform = 'scale(' + intValue / 100 + ')';
  });

  hashtagsInputElement.addEventListener('input', function () {
    var validityMessage = '';
    if (hashtagsInputElement.value) {
      var hashtagsInputValue = hashtagsInputElement.value.toLowerCase().trim();
      var hashtags = hashtagsInputValue.split(' ');

      if (hashtags.length > window.settings.HASHTAGS_MAX_COUNT) {
        validityMessage += 'Нельзя указать больше чем' + window.settings.HASHTAGS_MAX_COUNT + 'хэш-тегов. ';
      }

      for (var i = 0; i < hashtags.length; i++) {
        if (!/^#[a-zа-я0-9]+$/.test(hashtags[i])) {
          validityMessage += 'Хэш-тег должен начинаться с символа # (решётка). Хеш-тег не может состоять только из одной решётки, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, символы пунктуации и спецсимволы. ';
          break;
        }

        if (hashtags[i].length > window.settings.HASHTAGS_MAX_LENGTH) {
          validityMessage += 'Максимальная длина одного хэш-тега' + window.settings.HASHTAGS_MAX_LENGTH + 'символов, включая решётку. ';
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

    indicateInvalidField(hashtagsInputElement, validityMessage);
  });

  commentElement.addEventListener('input', function () {
    var validityMessage = '';
    if (commentElement.value) {
      var commentElementValue = commentElement.value.toLowerCase().trim();
      if (commentElementValue.length > window.settings.COMMENT_MAX_LENGTH) {
        validityMessage += 'Длина комментария не может составлять больше' + window.settings.COMMENT_MAX_LENGTH + 'символов.';
      }
    }

    commentElement.setCustomValidity(validityMessage);

    indicateInvalidField(commentElement, validityMessage);
  });

  uploadFormElement.addEventListener('submit', function (event) {
    event.preventDefault();
    window.transactions.request(window.settings.API_SAVE_METHOD, URL, successFormHandler, errorFormHandler, new FormData(uploadFormElement));
    closeUploadHandler();
  });
})();

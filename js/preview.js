'use strict';
(function () {
  var bigPictureContainerElement = document.querySelector('.big-picture');
  var bigPictureElement = bigPictureContainerElement.querySelector('.big-picture__img > img');
  var bigPictureSocialElement = bigPictureContainerElement.querySelector('.big-picture__social');
  var bigPictureLikesElement = bigPictureSocialElement.querySelector('.likes-count');
  var bigPictureDescriptionElement = bigPictureSocialElement.querySelector('.social__caption');
  var bigPictureCommentsCountElement = bigPictureContainerElement.querySelector('.social__comment-count');
  var bigPictureCommentsElement = bigPictureContainerElement.querySelector('.social__comments');
  var bigPictureCommentTemplate = bigPictureCommentsElement.querySelector('.social__comment');
  var bigPictureCloseElement = bigPictureContainerElement.querySelector('.big-picture__cancel');
  var loadMoreCommentsElement = bigPictureSocialElement.querySelector('.comments-loader');
  var comments = [];

  var escKeyHandler = function (event) {
    window.utils.keyHandler(event, window.data.ESC_KEY_CODE, closePreviewHandler);
  };

  var closePreviewHandler = function () {
    window.utils.closePopup(bigPictureContainerElement);

    window.removeEventListener('keydown', escKeyHandler);
  };

  var openPreviewHandler = function () {
    window.utils.openPopup(bigPictureContainerElement);

    window.addEventListener('keydown', escKeyHandler);
  };

  var loadLomments = function (number) {
    var commentsToload = comments.splice(0, number);

    commentsToload.forEach(function (element) {
      var listElement = bigPictureCommentTemplate.cloneNode(true);

      window.utils.setAttributes(listElement.querySelector('.social__picture'), {'src': element.vatar, 'alt': element.name});
      listElement.querySelector('.social__text').innerText = element.message;

      bigPictureCommentsElement.appendChild(listElement);
    });

    if (comments.length > 0) {
      loadMoreCommentsElement.classList.remove('hidden');
      loadMoreCommentsElement.addEventListener('click', commentsShowHandler);
    } else {
      loadMoreCommentsElement.classList.add('hidden');
      loadMoreCommentsElement.removeEventListener('click', commentsShowHandler);
    }
  };

  var commentsShowHandler = function () {
    loadLomments(window.settings.INITIAL_COMMENTS_COUNT);
  };

  var showPicture = function (id) {
    var pictureObject = JSON.parse(localStorage.getItem('picture' + id));
    comments = pictureObject.comments;

    bigPictureElement.setAttribute('src', pictureObject.url);
    bigPictureLikesElement.innerText = pictureObject.likes;
    bigPictureDescriptionElement.innerText = pictureObject.description;
    bigPictureCommentsCountElement.innerText = pictureObject.comments.length;
    bigPictureCommentsElement.innerText = '';

    loadLomments(window.settings.INITIAL_COMMENTS_COUNT);
    openPreviewHandler();

    bigPictureCloseElement.addEventListener('click', closePreviewHandler);
  };

  window.preview = {
    show: showPicture
  };
})();

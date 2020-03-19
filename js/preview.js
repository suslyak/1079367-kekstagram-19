'use strict';
(function () {
  var bigPictureContainerElement = document.querySelector('.big-picture');
  var bigPictureElement = bigPictureContainerElement.querySelector('.big-picture__img > img');
  var bigPictureSocialElement = bigPictureContainerElement.querySelector('.big-picture__social');
  var bigPictureLikesElement = bigPictureSocialElement.querySelector('.likes-count');
  var bigPictureDescriptionElement = bigPictureSocialElement.querySelector('.social__caption');
  var bigPictureCommentsCountElement = bigPictureContainerElement.querySelector('.social__comment-count');
  var bigPictureAllCommentsElement = bigPictureCommentsCountElement.querySelector('.comments-count');
  var bigPictureCommentsElement = bigPictureContainerElement.querySelector('.social__comments');
  var bigPictureCommentTemplate = bigPictureCommentsElement.querySelector('.social__comment');
  var bigPictureCloseElement = bigPictureContainerElement.querySelector('.big-picture__cancel');
  var loadMoreCommentsElement = bigPictureSocialElement.querySelector('.comments-loader');
  var comments = [];
  var allCommentsCount = 0;

  var escKeyHandler = function (event) {
    window.utils.keyHandler(event, window.settings.ESC_KEY_CODE, closePreviewHandler);
  };

  var closePreviewHandler = function () {
    window.utils.closePopup(bigPictureContainerElement);

    window.removeEventListener('keydown', escKeyHandler);
  };

  var openPreviewHandler = function () {
    window.utils.openPopup(bigPictureContainerElement);

    window.addEventListener('keydown', escKeyHandler);
  };

  var loadComments = function (number) {
    var commentsToload = comments.splice(0, number);
    var shownCommentsCount = allCommentsCount - comments.length;
    var textNode = document.createTextNode(' комментариев');

    bigPictureCommentsCountElement.innerText = shownCommentsCount + ' из ';
    bigPictureCommentsCountElement.appendChild(bigPictureAllCommentsElement);
    bigPictureCommentsCountElement.appendChild(textNode);

    commentsToload.forEach(function (element) {
      var listElement = bigPictureCommentTemplate.cloneNode(true);

      window.utils.setAttributes(listElement.querySelector('.social__picture'), {'src': element.avatar, 'alt': element.name});
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
    loadComments(window.settings.COMMENTS_PER_PAGE);
  };

  var showPicture = function (id) {
    var pictureObject = JSON.parse(localStorage.getItem('picture' + id));
    comments = pictureObject.comments;
    allCommentsCount = pictureObject.comments.length;

    bigPictureElement.setAttribute('src', pictureObject.url);
    bigPictureLikesElement.innerText = pictureObject.likes;
    bigPictureDescriptionElement.innerText = pictureObject.description;
    bigPictureAllCommentsElement.innerText = allCommentsCount;
    bigPictureCommentsElement.innerText = '';

    loadComments(window.settings.COMMENTS_PER_PAGE);
    openPreviewHandler();

    bigPictureCloseElement.addEventListener('click', closePreviewHandler);
  };

  window.preview = {
    show: showPicture
  };
})();

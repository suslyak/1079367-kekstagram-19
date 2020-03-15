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

  var ecsKey = function (event) {
    window.utils.keyHandler(event, 27, closePreviewHandler);
  };

  var closePreviewHandler = function () {
    window.utils.closePopup(bigPictureContainerElement);

    window.removeEventListener('keydown', ecsKey);
  };

  var openPreviewHandler = function () {
    window.utils.openPopup(bigPictureContainerElement);

    window.addEventListener('keydown', ecsKey);
  };

  var showPicture = function (id) {
    var pictureObject = JSON.parse(localStorage.getItem('picture' + id));

    bigPictureElement.setAttribute('src', pictureObject.url);
    bigPictureLikesElement.innerText = pictureObject.likes;
    bigPictureDescriptionElement.innerText = pictureObject.description;
    bigPictureCommentsCountElement.innerText = pictureObject.comments.length;
    bigPictureCommentsElement.innerText = '';

    pictureObject.comments.forEach(function (element) {
      var listElement = bigPictureCommentTemplate.cloneNode(true);

      window.utils.setAttributes(listElement.querySelector('.social__picture'), {'src': element.vatar, 'alt': element.name});
      listElement.querySelector('.social__text').innerText = element.message;

      bigPictureCommentsElement.appendChild(listElement);
    });

    openPreviewHandler();

    bigPictureCloseElement.addEventListener('click', closePreviewHandler);
  };

  window.preview = {
    show: showPicture
  };
})();

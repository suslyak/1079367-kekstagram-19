'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture');

  var createPicture = function (url, commentsCount, likes) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', url);
    picture.querySelector('.picture__comments').innerText = commentsCount;
    picture.querySelector('.picture__likes').innerText = likes;

    return picture;
  };

  window.picture = {
    create: createPicture
  };
})();

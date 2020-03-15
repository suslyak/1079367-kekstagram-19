'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture');

  var createPicture = function (id, url, commentsCount, likes) {
    var picture = pictureTemplate.cloneNode(true);

    window.utils.setAttributes(picture.querySelector('.picture__img'), {'src': url, 'data-id': id});
    picture.querySelector('.picture__comments').innerText = commentsCount;
    picture.querySelector('.picture__likes').innerText = likes;

    picture.addEventListener('click', function () {
      window.preview.show(id);
    });

    picture.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        window.preview.show(id);
      }
    });

    return picture;
  };

  window.picture = {
    create: createPicture
  };
})();

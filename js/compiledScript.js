"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @desc - All projects with number of detail images for every project
 */
var listOfProjects = {
  rpb: 4,
  icfis: 3,
  dev1: 10,
  dev2: 6,
  inco: 8,
  classroom: 10,
  documents: 6,
  body1: 10,
  body2: 8,
  body11: 6,
  body12: 6,
  process: 5
};
var project = document.getElementById('project');

var ImageGallery = /*#__PURE__*/function () {
  function ImageGallery() {
    var _this = this;

    _classCallCheck(this, ImageGallery);

    _defineProperty(this, "currentImage", 1);

    _defineProperty(this, "projectName", project.className);

    _defineProperty(this, "totalImages", this.getImgNumberFromProject(this.projectName, listOfProjects));

    _defineProperty(this, "leftArrow", document.getElementById('left').onclick = function () {
      _this.minus();
    });

    _defineProperty(this, "rightArrow", document.getElementById('right').onclick = function () {
      _this.plus();
    });

    _defineProperty(this, "plus", function () {
      if (_this.currentImage < _this.totalImages) {
        _this.currentImage++;
      } else {
        _this.currentImage = 1;
      }

      _this.setImageNumber(_this.currentImage);
    });

    _defineProperty(this, "minus", function () {
      if (_this.currentImage !== 1) {
        _this.currentImage--;
      } else {
        _this.currentImage = _this.totalImages;
      }

      _this.setImageNumber(_this.currentImage);
    });
  }

  _createClass(ImageGallery, [{
    key: "getImgNumberFromProject",
    // leftArrow.onclick = () => {
    //   minus();
    // }
    // rightArrow.onclick = () => {
    //   this.plus();
    // }
    value: function getImgNumberFromProject(projectName, listOfProjects) {
      if (listOfProjects[projectName]) {
        return listOfProjects[projectName];
      }
    }
    /**
     * @param {number} num - The current image number
     * @return {string} The new image url
     */

  }, {
    key: "setImageNumber",
    value: function setImageNumber(num) {
      // Get image number
      var regex = /\d+(.jpg)/g;
      return project.setAttribute('src', project.src.replace(regex, "".concat(num, ".jpg")));
    }
  }]);

  return ImageGallery;
}();

var imageGallery = new ImageGallery();

function swipeImages() {
  var screenWidth = window.screen.width;
  var pageStart = 0;
  var pageEnd = 0;
  console.info(screenWidth);

  var handleStart = function handleStart(event) {
    event.stopPropagation();
    event.preventDefault();
    var touches = event.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      console.log("handleStart - event.touches[i].pageX: ", touches[i].pageX);
      pageStart = touches[i].pageX;
    }
  };

  var handleEnd = function handleEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    var touchesEnd = event.changedTouches;

    for (var i = 0; i < touchesEnd.length; i++) {
      console.log("handleEnd - event.touchesEnd[i].pageX: ", touchesEnd[i].pageX);
      pageEnd = touchesEnd[i].pageX;
    }

    swipe(pageStart, pageEnd);
  };

  function swipe(startX, endX) {
    if (startX - endX < 0 && Math.abs(startX - endX) > screenWidth / 3) {
      console.log("Plus");
      imageGallery.plus();
    }

    if (startX - endX > 0 && Math.abs(startX - endX) > screenWidth / 3) {
      console.log("Minus");
      imageGallery.minus();
    }
  }

  project.addEventListener("touchstart", handleStart, false);
  project.addEventListener("touchend", handleEnd, false);
}

swipeImages();
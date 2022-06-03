"use strict";
(function (getPixelOnImageSizeMax) {
  ("use strict");
  getPixelOnImageSizeMax(window).on("load", function () {
    getPixelOnImageSizeMax('[data-loader="circle-side"]').fadeOut();
    getPixelOnImageSizeMax("#preloader").delay(350).fadeOut("slow");
    getPixelOnImageSizeMax("body").delay(350).css({ overflow: "visible" });
  });
  getPixelOnImageSizeMax("form#wrapped").on("submit", function () {
    var pixelSizeTargetMax = getPixelOnImageSizeMax("form#wrapped");
    pixelSizeTargetMax.validate();
    if (pixelSizeTargetMax.valid()) {
      getPixelOnImageSizeMax("#loader_form").fadeIn();
    }
  });
  var _0x481dx3 = new FloatLabels("form", { style: 2 });
  getPixelOnImageSizeMax(".container_smile").click(function () {
    getPixelOnImageSizeMax(this).find("input").toggleClass("rotate-x");
  });
  getPixelOnImageSizeMax(".container_smile").click(function () {
    getPixelOnImageSizeMax(this).find("input").toggleClass("rotate-x");
  });
})(window.jQuery);

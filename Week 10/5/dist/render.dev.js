"use strict";

var images = require("images");

function render(viewport, element) {
  console.log(element);
  element.style = element.computedStyle;

  if (element.style) {
    var img = images(element.style.width || 100, element.style.height || 100);

    if (element.style["background-color"]) {
      // let color = element.style["background-color"] || "rgb(0,0,0)";
      var color = "rgb(0,255,0)";
      console.log('color:', color);
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 0);
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }
}

module.exports = render;
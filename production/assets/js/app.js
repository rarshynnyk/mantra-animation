(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var rgbToHsl = require('rgb-to-hsl');
var hexToRgb = require('hex-to-rgb');

module.exports = function (hex) {
	var hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
	return [hsl[0], parseInt(hsl[1], 10), parseInt(hsl[2], 10)];
};

},{"hex-to-rgb":2,"rgb-to-hsl":3}],2:[function(require,module,exports){
module.exports = function hexToRgb (hex) {

  if (hex.charAt && hex.charAt(0) === '#') {
    hex = removeHash(hex)
  }

  if (hex.length === 3) {
    hex = expand(hex)
  }

  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return [r, g, b]
}

function removeHash (hex) {

  var arr = hex.split('')
  arr.shift()
  return arr.join('')
}

function expand (hex) {

  return hex
    .split('')
    .reduce(function (accum, value) {

      return accum.concat([value, value])
    }, [])
    .join('')
}

},{}],3:[function(require,module,exports){
(function() {
  module.exports = function(r, g, b) {
    var d, h, l, max, min, s;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    h = 0;
    s = 0;
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
      }
      h /= 6;
    }
    h = Math.ceil(h * 360);
    s = (Math.ceil(s * 100)) + "%";
    l = (Math.ceil(l * 100)) + "%";
    return [h, s, l];
  };

}).call(this);

},{}],4:[function(require,module,exports){
'use strict';

var _canvas = require('./modules/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  _canvas2.default.init();
})(); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

},{"./modules/canvas":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hexToHsl = require('hex-to-hsl');

var _hexToHsl2 = _interopRequireDefault(_hexToHsl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = function () {
  var canvas = document.getElementById('main-canvas');
  var ctx = canvas.getContext('2d');

  var settings = {
    circlesCount: 15,
    num: 300,
    radius: 156,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    period: 15,
    amplitude: 24,
    color: 1504
  };

  var x = void 0,
      y = void 0,
      angle = void 0,
      variativeRadius = void 0;
  var time = 0;

  function init() {
    if (canvas === null) return;

    render();
    var gui = new dat.GUI();
    gui.add(settings, 'amplitude', 1, 40).step(1);
    gui.add(settings, 'circlesCount', 1, 40).step(1);
    gui.add(settings, 'radius', 1, 400).step(1);
    gui.add(settings, 'circlesCount', 1, 40).step(1);
    gui.add(settings, 'period', 1, 40).step(1);
    gui.add(settings, 'color', 1, 2000).step(1);
  }

  function drawCircle(radius, color, offset) {
    ctx.fillStyle = color;

    ctx.beginPath();

    for (var i = 0; i <= settings.num; i++) {
      angle = i * 2 * Math.PI / settings.num;
      variativeRadius = radius + settings.amplitude * Math.sin(angle * settings.period + offset);
      x = settings.centerX + variativeRadius * Math.cos(angle);
      y = settings.centerY + variativeRadius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    time++;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < settings.circlesCount; i++) {
      drawCircle(settings.radius - i * 10, 'hsl(' + settings.color + i * 10 + ',' + '50%, 50%)', i * time / 50);
    }
  }

  function render() {
    draw();
    window.requestAnimationFrame(render);
  }

  return {
    init: init
  };
}();

exports.default = canvas;

},{"hex-to-hsl":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGV4LXRvLWhzbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9oZXgtdG8tcmdiL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JnYi10by1oc2wvaW5kZXguanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL21vZHVsZXMvY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUJBOzs7Ozs7QUFFQSxDQUFDLFlBQU07QUFDTCxtQkFBTyxJQUFQO0FBQ0QsQ0FGRCxJLENBUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0hBOzs7Ozs7QUFFQSxJQUFNLFNBQVUsWUFBVztBQUN6QixNQUFJLFNBQVMsU0FBUyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJLE1BQU0sT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQVY7O0FBRUEsTUFBTSxXQUFXO0FBQ2Ysa0JBQWMsRUFEQztBQUVmLFNBQUssR0FGVTtBQUdm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Q2hCO0FBQ0EsV0FBTyxxQkFBUCxDQUE2QixNQUE3QjtBQUNEOztBQUVELFNBQU87QUFDTCxVQUFNO0FBREQsR0FBUDtBQUdELENBdkVjLEVBQWY7O2tCQXlFZSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIHJnYlRvSHNsID0gcmVxdWlyZSgncmdiLXRvLWhzbCcpO1xudmFyIGhleFRvUmdiID0gcmVxdWlyZSgnaGV4LXRvLXJnYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZXgpIHtcblx0dmFyIGhzbCA9IHJnYlRvSHNsLmFwcGx5KHJnYlRvSHNsLCBoZXhUb1JnYihoZXgpKTtcblx0cmV0dXJuIFtoc2xbMF0sIHBhcnNlSW50KGhzbFsxXSwgMTApLCBwYXJzZUludChoc2xbMl0sIDEwKV07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoZXhUb1JnYiAoaGV4KSB7XG5cbiAgaWYgKGhleC5jaGFyQXQgJiYgaGV4LmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgaGV4ID0gcmVtb3ZlSGFzaChoZXgpXG4gIH1cblxuICBpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xuICAgIGhleCA9IGV4cGFuZChoZXgpXG4gIH1cblxuICB2YXIgYmlnaW50ID0gcGFyc2VJbnQoaGV4LCAxNilcbiAgdmFyIHIgPSAoYmlnaW50ID4+IDE2KSAmIDI1NVxuICB2YXIgZyA9IChiaWdpbnQgPj4gOCkgJiAyNTVcbiAgdmFyIGIgPSBiaWdpbnQgJiAyNTVcblxuICByZXR1cm4gW3IsIGcsIGJdXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2ggKGhleCkge1xuXG4gIHZhciBhcnIgPSBoZXguc3BsaXQoJycpXG4gIGFyci5zaGlmdCgpXG4gIHJldHVybiBhcnIuam9pbignJylcbn1cblxuZnVuY3Rpb24gZXhwYW5kIChoZXgpIHtcblxuICByZXR1cm4gaGV4XG4gICAgLnNwbGl0KCcnKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtLCB2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gYWNjdW0uY29uY2F0KFt2YWx1ZSwgdmFsdWVdKVxuICAgIH0sIFtdKVxuICAgIC5qb2luKCcnKVxufVxuIiwiKGZ1bmN0aW9uKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICB2YXIgZCwgaCwgbCwgbWF4LCBtaW4sIHM7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG4gICAgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgaCA9IDA7XG4gICAgcyA9IDA7XG4gICAgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgIGggPSBzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZCA9IG1heCAtIG1pbjtcbiAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgcjpcbiAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZzpcbiAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgaCA9IE1hdGguY2VpbChoICogMzYwKTtcbiAgICBzID0gKE1hdGguY2VpbChzICogMTAwKSkgKyBcIiVcIjtcbiAgICBsID0gKE1hdGguY2VpbChsICogMTAwKSkgKyBcIiVcIjtcbiAgICByZXR1cm4gW2gsIHMsIGxdO1xuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gWW91IGNhbiB3cml0ZSBhIGNhbGwgYW5kIGltcG9ydCB5b3VyIGZ1bmN0aW9ucyBpbiB0aGlzIGZpbGUuXG4vL1xuLy8gVGhpcyBmaWxlIHdpbGwgYmUgY29tcGlsZWQgaW50byBhcHAuanMgYW5kIHdpbGwgbm90IGJlIG1pbmlmaWVkLlxuLy8gRmVlbCBmcmVlIHdpdGggdXNpbmcgRVM2IGhlcmUuXG5cbmltcG9ydCBjYW52YXMgZnJvbSAnLi9tb2R1bGVzL2NhbnZhcyc7XG5cbigoKSA9PiB7XG4gIGNhbnZhcy5pbml0KCk7XG59KSgpO1xuIiwiaW1wb3J0IGhleFRvSHNsIGZyb20gJ2hleC10by1oc2wnO1xuXG5jb25zdCBjYW52YXMgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1jYW52YXMnKTtcbiAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNvbnN0IHNldHRpbmdzID0ge1xuICAgIGNpcmNsZXNDb3VudDogMTUsXG4gICAgbnVtOiAzMDAsXG4gICAgcmFkaXVzOiAxNTYsXG4gICAgY2VudGVyWDogd2luZG93LmlubmVyV2lkdGgvMixcbiAgICBjZW50ZXJZOiB3aW5kb3cuaW5uZXJIZWlnaHQvMixcbiAgICBwZXJpb2Q6IDE1LFxuICAgIGFtcGxpdHVkZTogMjQsXG4gICAgY29sb3I6IDE1MDRcbiAgfTtcblxuICBsZXQgeCwgeSwgYW5nbGUsIHZhcmlhdGl2ZVJhZGl1cztcbiAgbGV0IHRpbWUgPSAwO1xuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGNhbnZhcyA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgcmVuZGVyKCk7XG4gICAgdmFyIGd1aSA9IG5ldyBkYXQuR1VJKCk7XG4gICAgZ3VpLmFkZChzZXR0aW5ncywgJ2FtcGxpdHVkZScsIDEsIDQwKS5zdGVwKDEpO1xuICAgIGd1aS5hZGQoc2V0dGluZ3MsICdjaXJjbGVzQ291bnQnLCAxLCA0MCkuc3RlcCgxKTtcbiAgICBndWkuYWRkKHNldHRpbmdzLCAncmFkaXVzJywgMSwgNDAwKS5zdGVwKDEpO1xuICAgIGd1aS5hZGQoc2V0dGluZ3MsICdjaXJjbGVzQ291bnQnLCAxLCA0MCkuc3RlcCgxKTtcbiAgICBndWkuYWRkKHNldHRpbmdzLCAncGVyaW9kJywgMSwgNDApLnN0ZXAoMSk7XG4gICAgZ3VpLmFkZChzZXR0aW5ncywgJ2NvbG9yJywgMSwgMjAwMCkuc3RlcCgxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdDaXJjbGUocmFkaXVzLCBjb2xvciwgb2Zmc2V0KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gc2V0dGluZ3MubnVtOyBpKyspIHtcbiAgICAgIGFuZ2xlID0gaSAqIDIgKiBNYXRoLlBJIC8gc2V0dGluZ3MubnVtO1xuICAgICAgdmFyaWF0aXZlUmFkaXVzID0gcmFkaXVzICsgc2V0dGluZ3MuYW1wbGl0dWRlKk1hdGguc2luKGFuZ2xlKnNldHRpbmdzLnBlcmlvZCArIG9mZnNldCk7XG4gICAgICB4ID0gc2V0dGluZ3MuY2VudGVyWCArIHZhcmlhdGl2ZVJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgIHkgPSBzZXR0aW5ncy5jZW50ZXJZICsgdmFyaWF0aXZlUmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgdGltZSsrO1xuICAgIGN0eC5jYW52YXMud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldHRpbmdzLmNpcmNsZXNDb3VudDsgaSsrKSB7XG4gICAgICBkcmF3Q2lyY2xlKHNldHRpbmdzLnJhZGl1cyAtIGkqMTAsICdoc2woJyArIHNldHRpbmdzLmNvbG9yICsgaSoxMCArICcsJyArICc1MCUsIDUwJSknLCBpKnRpbWUvNTApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBkcmF3KCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FudmFzO1xuIl19

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
    radius: window.innerHeight / 3,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    period: 15,
    amplitude: 3,
    color: 100
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGV4LXRvLWhzbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9oZXgtdG8tcmdiL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JnYi10by1oc2wvaW5kZXguanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL21vZHVsZXMvY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUJBOzs7Ozs7QUFFQSxDQUFDLFlBQU07QUFDTCxtQkFBTyxJQUFQO0FBQ0QsQ0FGRCxJLENBUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0hBOzs7Ozs7QUFFQSxJQUFNLFNBQVUsWUFBVztBQUN6QixNQUFJLFNBQVMsU0FBUyxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFDQSxNQUFJLE1BQU0sT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQVY7O0FBRUEsTUFBTSxXQUFXO0FBQ2Ysa0JBQWMsRUFEQztBQUVmLFNBQUssR0FGVTtBQUdm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QVMsTUFBVCxHQUFrQjtBQUNoQjtBQUNBLFdBQU8scUJBQVAsQ0FBNkIsTUFBN0I7QUFDRDs7QUFFRCxTQUFPO0FBQ0wsVUFBTTtBQURELEdBQVA7QUFHRCxDQXZFYyxFQUFmOztrQkF5RWUsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciByZ2JUb0hzbCA9IHJlcXVpcmUoJ3JnYi10by1oc2wnKTtcbnZhciBoZXhUb1JnYiA9IHJlcXVpcmUoJ2hleC10by1yZ2InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaGV4KSB7XG5cdHZhciBoc2wgPSByZ2JUb0hzbC5hcHBseShyZ2JUb0hzbCwgaGV4VG9SZ2IoaGV4KSk7XG5cdHJldHVybiBbaHNsWzBdLCBwYXJzZUludChoc2xbMV0sIDEwKSwgcGFyc2VJbnQoaHNsWzJdLCAxMCldO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGV4VG9SZ2IgKGhleCkge1xuXG4gIGlmIChoZXguY2hhckF0ICYmIGhleC5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgIGhleCA9IHJlbW92ZUhhc2goaGV4KVxuICB9XG5cbiAgaWYgKGhleC5sZW5ndGggPT09IDMpIHtcbiAgICBoZXggPSBleHBhbmQoaGV4KVxuICB9XG5cbiAgdmFyIGJpZ2ludCA9IHBhcnNlSW50KGhleCwgMTYpXG4gIHZhciByID0gKGJpZ2ludCA+PiAxNikgJiAyNTVcbiAgdmFyIGcgPSAoYmlnaW50ID4+IDgpICYgMjU1XG4gIHZhciBiID0gYmlnaW50ICYgMjU1XG5cbiAgcmV0dXJuIFtyLCBnLCBiXVxufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoIChoZXgpIHtcblxuICB2YXIgYXJyID0gaGV4LnNwbGl0KCcnKVxuICBhcnIuc2hpZnQoKVxuICByZXR1cm4gYXJyLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGV4cGFuZCAoaGV4KSB7XG5cbiAgcmV0dXJuIGhleFxuICAgIC5zcGxpdCgnJylcbiAgICAucmVkdWNlKGZ1bmN0aW9uIChhY2N1bSwgdmFsdWUpIHtcblxuICAgICAgcmV0dXJuIGFjY3VtLmNvbmNhdChbdmFsdWUsIHZhbHVlXSlcbiAgICB9LCBbXSlcbiAgICAuam9pbignJylcbn1cbiIsIihmdW5jdGlvbigpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgdmFyIGQsIGgsIGwsIG1heCwgbWluLCBzO1xuICAgIHIgLz0gMjU1O1xuICAgIGcgLz0gMjU1O1xuICAgIGIgLz0gMjU1O1xuICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGggPSAwO1xuICAgIHMgPSAwO1xuICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQgPSBtYXggLSBtaW47XG4gICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBiOlxuICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgfVxuICAgIGggPSBNYXRoLmNlaWwoaCAqIDM2MCk7XG4gICAgcyA9IChNYXRoLmNlaWwocyAqIDEwMCkpICsgXCIlXCI7XG4gICAgbCA9IChNYXRoLmNlaWwobCAqIDEwMCkpICsgXCIlXCI7XG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIFlvdSBjYW4gd3JpdGUgYSBjYWxsIGFuZCBpbXBvcnQgeW91ciBmdW5jdGlvbnMgaW4gdGhpcyBmaWxlLlxuLy9cbi8vIFRoaXMgZmlsZSB3aWxsIGJlIGNvbXBpbGVkIGludG8gYXBwLmpzIGFuZCB3aWxsIG5vdCBiZSBtaW5pZmllZC5cbi8vIEZlZWwgZnJlZSB3aXRoIHVzaW5nIEVTNiBoZXJlLlxuXG5pbXBvcnQgY2FudmFzIGZyb20gJy4vbW9kdWxlcy9jYW52YXMnO1xuXG4oKCkgPT4ge1xuICBjYW52YXMuaW5pdCgpO1xufSkoKTtcbiIsImltcG9ydCBoZXhUb0hzbCBmcm9tICdoZXgtdG8taHNsJztcblxuY29uc3QgY2FudmFzID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY2FudmFzJyk7XG4gIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICBjaXJjbGVzQ291bnQ6IDE1LFxuICAgIG51bTogMzAwLFxuICAgIHJhZGl1czogd2luZG93LmlubmVySGVpZ2h0LzMsXG4gICAgY2VudGVyWDogd2luZG93LmlubmVyV2lkdGgvMixcbiAgICBjZW50ZXJZOiB3aW5kb3cuaW5uZXJIZWlnaHQvMixcbiAgICBwZXJpb2Q6IDE1LFxuICAgIGFtcGxpdHVkZTogMyxcbiAgICBjb2xvcjogMTAwXG4gIH07XG5cbiAgbGV0IHgsIHksIGFuZ2xlLCB2YXJpYXRpdmVSYWRpdXM7XG4gIGxldCB0aW1lID0gMDtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChjYW52YXMgPT09IG51bGwpIHJldHVybjtcblxuICAgIHJlbmRlcigpO1xuICAgIHZhciBndWkgPSBuZXcgZGF0LkdVSSgpO1xuICAgIGd1aS5hZGQoc2V0dGluZ3MsICdhbXBsaXR1ZGUnLCAxLCA0MCkuc3RlcCgxKTtcbiAgICBndWkuYWRkKHNldHRpbmdzLCAnY2lyY2xlc0NvdW50JywgMSwgNDApLnN0ZXAoMSk7XG4gICAgZ3VpLmFkZChzZXR0aW5ncywgJ3JhZGl1cycsIDEsIDQwMCkuc3RlcCgxKTtcbiAgICBndWkuYWRkKHNldHRpbmdzLCAnY2lyY2xlc0NvdW50JywgMSwgNDApLnN0ZXAoMSk7XG4gICAgZ3VpLmFkZChzZXR0aW5ncywgJ3BlcmlvZCcsIDEsIDQwKS5zdGVwKDEpO1xuICAgIGd1aS5hZGQoc2V0dGluZ3MsICdjb2xvcicsIDEsIDIwMDApLnN0ZXAoMSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q2lyY2xlKHJhZGl1cywgY29sb3IsIG9mZnNldCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNldHRpbmdzLm51bTsgaSsrKSB7XG4gICAgICBhbmdsZSA9IGkgKiAyICogTWF0aC5QSSAvIHNldHRpbmdzLm51bTtcbiAgICAgIHZhcmlhdGl2ZVJhZGl1cyA9IHJhZGl1cyArIHNldHRpbmdzLmFtcGxpdHVkZSpNYXRoLnNpbihhbmdsZSpzZXR0aW5ncy5wZXJpb2QgKyBvZmZzZXQpO1xuICAgICAgeCA9IHNldHRpbmdzLmNlbnRlclggKyB2YXJpYXRpdmVSYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICB5ID0gc2V0dGluZ3MuY2VudGVyWSArIHZhcmlhdGl2ZVJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3KCkge1xuICAgIHRpbWUrKztcbiAgICBjdHguY2FudmFzLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXR0aW5ncy5jaXJjbGVzQ291bnQ7IGkrKykge1xuICAgICAgZHJhd0NpcmNsZShzZXR0aW5ncy5yYWRpdXMgLSBpKjEwLCAnaHNsKCcgKyBzZXR0aW5ncy5jb2xvciArIGkqMTAgKyAnLCcgKyAnNTAlLCA1MCUpJywgaSp0aW1lLzUwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgZHJhdygpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFxuICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbnZhcztcbiJdfQ==

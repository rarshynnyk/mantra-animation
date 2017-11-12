import hexToHsl from 'hex-to-hsl';

const canvas = (function() {
  let canvas = document.getElementById('main-canvas');
  let ctx = canvas.getContext('2d');

  const settings = {
    circlesCount: 15,
    num: 300,
    radius: 156,
    centerX: window.innerWidth/2,
    centerY: window.innerHeight/2,
    period: 15,
    amplitude: 24,
    color: 1504
  };

  let x, y, angle, variativeRadius;
  let time = 0;

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
      variativeRadius = radius + settings.amplitude*Math.sin(angle*settings.period + offset);
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
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < settings.circlesCount; i++) {
      drawCircle(settings.radius - i*10, 'hsl(' + settings.color + i*10 + ',' + '50%, 50%)', i*time/50);
    }
  }

  function render() {
    draw();
    window.requestAnimationFrame(render);
  }

  return {
    init: init
   };
})();

export default canvas;

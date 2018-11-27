// canvas settings
let drawingCanvas = document.getElementById("network");
let viewHeight = drawingCanvas.offsetHeight;
let viewWidth = drawingCanvas.offsetWidth;
let timeStep = (1 / 60);
let time = 0;
let nodes = [],
  signals = [];
let signalCount = 0;
let ctx;

let small_cluster_amt = -1;
let big_cluster_amt = -1; 
function setupCanvas(canvas) {
  // Fixes the DPI of the canvas
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}


function transmit() {
  let vH = window.innerHeight;
  let winTop = $(window).scrollTop();
  signals.forEach(function (n) {
    let canDelete = true;
    n.parts.forEach(function (b) {
      if (b.complete == false) {
        canDelete = false;
      }
    });
    if (canDelete) {
      let theIndex = signals.indexOf(n);
      signals.splice(theIndex, 1);
    }
  });
  if (signals.length < 5) {
    signals.push(new Signal(getRandom(nodes)));
    signalCount++;
  }
}

function update() {
  nodes.forEach(function (n) {
    n.update();
  });
  signals.forEach(function (s) {
    if (s.update() === true) {
      signals.splice(signals.indexOf(s), 1);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  nodes.forEach(function (n) {
    n.draw();
  });

  signals.forEach(function (s) {
    s.draw();
  });
}

let loop = function () {
  update();
  draw();
  time += timeStep;
  requestAnimationFrame(loop);
}

function Node(x, y) {
  this.x = this._x = x;
  this.y = this._y = y;

  this.connections = [];

  //random is to control the swaying movement
  this.r = randomRange(-10, 10);
  //change this.r to 10 make everything sway at the same rate
  //this.r = 10;
}
Node.prototype = {

  //this code wiggles the nodes around
  update: function () {
    this.x = this._x + Math.sin(time) * this.r;
    this.y = this._y + Math.cos(time) * this.r;
  },

  //determines the size and color of the connection lines
  draw: function () {
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 0.1;
    //determines the size of the nodes
    ctx.fillRect(this.x, this.y, 1, 1);

    for (let i = 0; i < this.connections.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.connections[i].x, this.connections[i].y);
      ctx.stroke();
    }
  }
};

function Signal(start) {
  this.start = start;
  this.parts = [];
  this.completeParts = [];
  this.strength = 10.0;
  this.jumps = 0;

  let tint = Math.floor(Math.random() * 360);
  this.style = 'hsl(' + tint + ',100%,50%)';
  for (let i = 0; i < start.connections.length - Math.floor(Math.random() * 3) - 1; i++) {
    this.parts.push(new SignalPart(this.start, this.start.connections[i], this.strength, this.style));
  }
}

Signal.prototype = {
  update: function () {
    let complete = false;
    this.completeParts.length = 0;

    let randomSendLength = Math.floor(Math.random() * 4);

    for (let i = this.parts.length - 1; i >= 0; i--) {
      this.parts[i].time += timeStep;

      if (this.parts[i].complete && this.parts.length < randomSendLength) {
        //push the node into the current array for which nodes to send a pulse to
        this.completeParts.push(this.parts.splice(i, 1)[0]);
      }
    }

    if (this.completeParts.length > 0) {
      this.jumps++;
      this.strength--;
      complete = this.jumps === 3;
    }

    if (complete === false) {
      let part,
        end,
        connection;

      for (let j = 0; j < this.completeParts.length; j++) {
        part = this.completeParts[j];
        end = part.end;

        for (let k = 0; k < end.connections.length; k++) {
          connection = end.connections[k];

          this.parts.push(new SignalPart(end, connection, this.strength, this.style));
        }
      }
    }
    return complete;
  },
  draw: function () {
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].draw();
    }
  }
};

function SignalPart(start, end, strength, style) {
  this.start = start;
  this.end = end;
  this.strength = strength;
  this.style = style;
  this._time = 0;
  this.prevTime = 0;
  this.duration = 2;
  this.complete = false;

  this.p0 = {
    x: 0,
    y: 0
  };
  this.p1 = {
    x: 0,
    y: 0
  };
}
SignalPart.prototype = {
  set time(v) {
    this.prevTime = this._time;
    this._time = v >= this.duration ? this.duration : v;
    this.complete = this._time === this.duration;
  },
  get time() {
    return this._time;
  },
  draw: function () {
    let t0 = Ease.outCubic(this.prevTime, 0, 1, this.duration);
    let t1 = Ease.outQuad(this.time, 0, 1, this.duration);
    lerp(this.start, this.end, t0, this.p0);
    lerp(this.start, this.end, t1, this.p1);

    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strength * 0.1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.p0.x, this.p0.y);
    ctx.lineTo(this.p1.x, this.p1.y);
    ctx.stroke();
  }
};

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function getRandom(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function lerp(n1, n2, t, p) {
  p = p || {
    x: 0,
    y: 0
  };

  p.x = n1.x + t * (n2.x - n1.x);
  p.y = n1.y + t * (n2.y - n1.y);

  return p;
}

/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */
let Ease = {
  inCubic: function (t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  },
  outCubic: function (t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  inQuad: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  outQuad: function (t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  inOutCubic: function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
};

function weightedRandom(max, numDice) {
  var num = 0;
  for (var i = 0; i < numDice; i++) {
    num += Math.random() * (max / numDice);
  }
  return num;
}

function createNodes() {
  for (let i = 0; i < small_cluster_amt; i++) {
    let x_loc = weightedRandom(viewWidth, 60);
    let y_loc = weightedRandom(viewHeight, 30);
    nodes[i] = new Node(x_loc, y_loc);
  }
  for (let i = small_cluster_amt; i < small_cluster_amt + big_cluster_amt; i++) {
    let x_loc = weightedRandom(viewWidth, 10);
    let y_loc = weightedRandom(viewHeight, 6);
    nodes[i] = new Node(x_loc, y_loc);
  }
}

function connectNodes() {
  let connection, j, connectCount;
  for (let i = 0; i < nodes.length; i++) {
    j = 0;
    connectCount = Math.floor(randomRange(2, 4));
    while (j < connectCount) {
      connection = getRandom(nodes);
      if (nodes[i] !== connection) {
        nodes[i].connections.push(connection);
        j++;
      }
    }
  }
}

function init() {

  small_cluster_amt = Math.floor(viewWidth/32); // This is around 50 nodes for me
  big_cluster_amt = Math.floor((4*small_cluster_amt)/5); // 5:4 is a good ratio
  console.log("Number of nodes: " + (small_cluster_amt + big_cluster_amt));

  createNodes();
  connectNodes();
  transmit();
  setInterval(transmit, 1600);

  requestAnimationFrame(loop);
  drawingCanvas.width = viewWidth;
  drawingCanvas.height = viewHeight;
  ctx = setupCanvas(drawingCanvas);
}
init();
// canvas settings
var drawingCanvas = document.getElementById("network"),
  ctx,
  viewHeight = 500,
  viewWidth = 1280;
timeStep = (1/60),
  time = 0;

var nodes = [],
  signals = [];

var signalCount = 0;

function initDrawingCanvas() {
  drawingCanvas.width = viewWidth;
  drawingCanvas.height = viewHeight;
  ctx = drawingCanvas.getContext('2d');
}

function createNodes() {
  /*var rad = viewWidth * 0.5 - 10;
  for (var i = 0; i < 100; i++) {
  var q = Math.random() * (Math.PI * 2);
  var r = Math.sqrt(Math.random());
  var x = (rad * r) * Math.cos(q) + viewWidth * 0.5;
  var y = (rad * r) * Math.sin(q) + viewWidth * 0.5;
  if(x > 200){
  x=x-50;
}
if(y > 200){
y=x-50;
}
nodes[i] = new Node(x, y);
}*/
  nodes[0] = new Node(50,120);
  nodes[1] = new Node(800,300);
  nodes[2] = new Node(980,350);
  nodes[3] = new Node(500,320);
  nodes[4] = new Node(600,270);
  nodes[5] = new Node(370,230);
  nodes[6] = new Node(350,320);
  nodes[7] = new Node(920,250);
  nodes[8] = new Node(270,15);
  nodes[9] = new Node(1300,200);
  nodes[10] = new Node(240,320);
  nodes[11] = new Node(1240,290);
  nodes[12] = new Node(770,370);
  nodes[13] = new Node(890,190);
  nodes[14] = new Node(810,140);
  nodes[15] = new Node(630,310);
  nodes[16] = new Node(250,150);
  nodes[17] = new Node(1070,50);
  nodes[18] = new Node(430,170);
  nodes[19] = new Node(560,220);
  nodes[20] = new Node(530,320);
  nodes[21] = new Node(490,390);
  nodes[22] = new Node(140,460);
  nodes[23] = new Node(680,140);
  nodes[24] = new Node(550,120);
  nodes[25] = new Node(480,330);
  nodes[26] = new Node(470,260);
  nodes[27] = new Node(670,180);
  nodes[28] = new Node(1070,430);
  nodes[29] = new Node(670,330);
  nodes[30] = new Node(650,290);
  nodes[31] = new Node(620,350);
  nodes[32] = new Node(600,190);
  nodes[33] = new Node(630,140);
  nodes[34] = new Node(620,250);
  nodes[35] = new Node(680,270);
  nodes[36] = new Node(790,290);
  nodes[37] = new Node(840,250);
  nodes[38] = new Node(760,250);
  nodes[39] = new Node(730,210);
}

function connectNodes() {
  nodes[0].connections.push(nodes[2]);
  nodes[0].connections.push(nodes[1]);
  nodes[1].connections.push(nodes[3]);
  nodes[3].connections.push(nodes[1]);
  nodes[4].connections.push(nodes[1]);
  nodes[5].connections.push(nodes[6]);
  nodes[6].connections.push(nodes[7]);
  nodes[7].connections.push(nodes[4]);
  nodes[8].connections.push(nodes[5]);
  nodes[8].connections.push(nodes[1]);
  nodes[8].connections.push(nodes[12]);
  nodes[8].connections.push(nodes[15]);
  nodes[9].connections.push(nodes[10]);
  nodes[10].connections.push(nodes[9]);
  nodes[11].connections.push(nodes[2]);
  nodes[12].connections.push(nodes[16]);
  nodes[13].connections.push(nodes[17]);
  nodes[14].connections.push(nodes[14]);
  nodes[15].connections.push(nodes[15]);
  nodes[16].connections.push(nodes[4]);
  nodes[17].connections.push(nodes[12]);
  nodes[17].connections.push(nodes[12]);
  nodes[18].connections.push(nodes[19]);
  nodes[18].connections.push(nodes[13]);
  nodes[19].connections.push(nodes[7]);
  nodes[15].connections.push(nodes[8]);
  nodes[12].connections.push(nodes[8]);
  nodes[13].connections.push(nodes[11]);

  var connection, j, connectCount;
  for (var i = 0; i < nodes.length; i++) {
    j = 0;
    connectCount = Math.floor(randomRange(1, 4));
    while (j < connectCount) {
      connection = getRandom(nodes);
      if (nodes[i] !== connection) {
        nodes[i].connections.push(connection);
        j++;
      }
    }
  }
}

function transmit() {
  var vH = window.innerHeight;
  var winTop = $(window).scrollTop();
  //if(document.getElementById('network') && winTop > document.getElementById('network').offsetTop + 500 && winTop < document.getElementById('network').offsetTop - vH){

  //}else{
  signals.forEach(function(n){
    var canDelete = true;
    n.parts.forEach(function(b){
      if(b.complete == false){
        canDelete = false;
      }
    });
    if(canDelete){
      var theIndex = signals.indexOf(n);
      signals.splice(theIndex, 1);
    }
  });
  if(signals.length < 5){
    signals.push(new Signal(getRandom(nodes)));
    signalCount++;
  }
}

function update() {
  nodes.forEach(function(n) {
    n.update();
  });

  /*nodes[0].update();
  nodes[3].update();
  nodes[4].update();
  nodes[9].update();
  nodes[11].update();
  nodes[21].update();
  nodes[19].update();*/

  signals.forEach(function(s) {
    if (s.update() === true) {
      signals.splice(signals.indexOf(s), 1);
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  nodes.forEach(function(n) {
    n.draw();
  });

  signals.forEach(function(s) {
    s.draw();
  });
}

var loop = function(){
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
  update:function() {
    this.x = this._x + Math.sin(time) * this.r;
    this.y = this._y + Math.cos(time) * this.r;
  },

  //determines the size and color of the connection lines
  draw:function() {
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 0.1;
    //determines the size of the nodes
    ctx.fillRect(this.x, this.y, 1, 1);

    for (var i = 0; i < this.connections.length; i++) {
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
  //create random number for the connections
  function randomNums(){
    return Math.floor(Math.random() * start.connections.length) + 1 ;
  };

  //start of color
  //color depends on how long the signals have existed for
  //var tint = (signalCount % 12) * 30;
  var tint = Math.floor(Math.random() * 360);
  this.style = 'hsl(' + tint + ',100%,50%)';
  //end of color
  /*
  var smallNum = randomNums();
  var bigNum = randomNums();

  while(bigNum <= smallNum){
  smallNum = randomNums();
  bigNum = randomNums();
}*/


  for (var i = 0; i < start.connections.length - Math.floor(Math.random()*3) - 1; i++) {
    this.parts.push(new SignalPart(this.start, this.start.connections[i], this.strength, this.style));
  }
}

Signal.prototype = {
  update:function() {
    var complete = false;
    this.completeParts.length = 0;

    var randomSendLength = Math.floor(Math.random()*4);

    for (var i = this.parts.length - 1; i >= 0; i--) {
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
      var part,
        end,
        connection;

      for (var j = 0; j < this.completeParts.length; j++) {
        part = this.completeParts[j];
        end = part.end;

        for (var k = 0; k < end.connections.length; k++) {
          connection = end.connections[k];

          this.parts.push(new SignalPart(end, connection, this.strength, this.style));
        }
      }
    }

    return complete;
  },
  draw:function() {
    for (var i = 0; i < this.parts.length; i++) {
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

  this.p0 = {x:0, y:0};
  this.p1 = {x:0, y:0};
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
  draw:function() {
    var t0 = Ease.outCubic(this.prevTime, 0, 1, this.duration);
    var t1 = Ease.outQuad(this.time, 0, 1, this.duration);
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
  p = p || {x:0, y:0};

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
var Ease = {
  inCubic:function (t, b, c, d) {
    t /= d;
    return c*t*t*t + b;
  },
  outCubic:function(t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
  },
  inQuad: function (t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  outQuad: function (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  inOutCubic:function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  }
};
initDrawingCanvas();
if(viewWidth < 500){
  nodes[0] = new Node(50,120);
  nodes[1] = new Node(400,300);
  nodes[2] = new Node(350,350);
  nodes[3] = new Node(240,320);
  nodes[4] = new Node(200,270);
  nodes[5] = new Node(370,230);
  nodes[6] = new Node(150,320);
  nodes[7] = new Node(40,250);
  nodes[8] = new Node(420,15);
  nodes[9] = new Node(300,200);
  nodes[10] = new Node(120,320);
  nodes[11] = new Node(240,290);
  nodes[12] = new Node(370,370);

  nodes[0].connections.push(nodes[2]);
  nodes[0].connections.push(nodes[1]);
  nodes[1].connections.push(nodes[3]);
  nodes[3].connections.push(nodes[1]);
  nodes[4].connections.push(nodes[1]);
  nodes[5].connections.push(nodes[6]);
  nodes[6].connections.push(nodes[7]);
  nodes[7].connections.push(nodes[4]);
  nodes[8].connections.push(nodes[5]);
  nodes[8].connections.push(nodes[1]);
  nodes[8].connections.push(nodes[12]);
  nodes[8].connections.push(nodes[8]);
  nodes[9].connections.push(nodes[10]);
  nodes[10].connections.push(nodes[9]);
  nodes[11].connections.push(nodes[2]);
  nodes[12].connections.push(nodes[11]);
}else{
  createNodes();
  connectNodes();
}
transmit();
setInterval(transmit, 1600);

requestAnimationFrame(loop);






var snowflakeSpeed = 30;//change this variable to control the intervals between snowflake cycles (60 = 60 milliseconds)
//each cycle is the time you tell the code to wait before it execudes the code
var fadeoutAmount = 0.015 // this means that it'll reduce its opacity by 5% each cycle (lower number means fade out slower)
var waitAmount = 12;//this variable determines if the code should make a new snowflake this cyle (currently it'll make a new snowflake every 2 cycles which is ever 120 milliseconds becuase the snowflake speed is 60)

var wait = waitAmount;
var canvas;
var canvasH;
var canvasW;
var ctxone;
var numbers = new Array();

//runs once

function fix_dpi(canvasId) {
  let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

init();
function init(){
  //finds the canvas in the html and saves its width and height in a variable
  canvas = document.getElementById("binarySnowflakeCanvas");
  canvas.width = window.innerWidth; //document.width is obsolete
  canvas.height = 450;
  fix_dpi(canvas);
  canvasW = canvas.width;
  canvasH = canvas.height;
  //more init stuff
  ctxone= canvas.getContext("2d");
  ctxone.font = "100 4em Arial";
  //creates the first snowflake in the snowflake object (must  be done this way because the loop needs at least one "snowflake" to start)
  var firstObject = new Object();
  firstObject.x = 300;//give it a set y value
  firstObject.y = 300;//give it a set x value
  firstObject.color = "rgba(225,225,225,";//here the snowflake is set to the colour white
  firstObject.alpha = 1;
  firstObject.word = 1;
  numbers.push(firstObject);

  if( canvas.getContext )
  {
    //setup();
    setInterval( run , snowflakeSpeed );//this is the cycle
  }
}
//generates a random colour
function getRandColor(){
  return "rgba("+ Math.floor((Math.random() * 256)+1)+","+ Math.floor((Math.random() * 256)+1)+","+ Math.floor((Math.random() * 256)+1)+",";//rgba(225,225,225,
}
//randomly makes the snowflake either a one or zero
function oneOrZero(){
  return Math.floor(Math.random()*1.5);
}
function run(){

  if(wait == 0){//see if it is time to spawn a new snowflake
    var randx = Math.floor((Math.random() * canvasW) + 1);
    //make random y
    var randy = Math.floor((Math.random() * canvasH) + 1);

    ctxone.fillStyle = getRandColor();
    ctxone.fillText(oneOrZero(),randx,randy);
    var newObject = new Object();
    newObject.x = randx;
    newObject.y = randy;
    newObject.color = "rgba(255,255,255,"; //currently all snowflakes are set to be white but replace 'rgba(255,255,255,";' with "getRandColor();" to get random coloured snowflakes
    newObject.alpha =1;//this sets the opacity of the snowflake to 1 (no transparency)
    newObject.word = oneOrZero()//randomises the snowflake to be 1 or zero (calls function)
    numbers.push(newObject);//this sends the created snowflake into the snowflake array so it can be rendered on screen
    wait = waitAmount;//sets the wait variable back to the orginal amount
  }else{
    wait --;//decreases wait variable
  }
  //this renders the snowflakes on the canvas
  ctxone.clearRect(0, 0, canvasW, canvasH);
  drawNum();
}
//this reads the javascript array that contains all of the snowflakes and draws them onto the canvas (each snowflake has its own opacity, colour, x,y coords etc. and the draw command renders it)
var twow = canvas.width/2;
function drawNum(){
  for(var i = 0; i < numbers.length; i++){
    ctxone.fillStyle = numbers[i].color+numbers[i].alpha+")";//draws opacity
    numbers[i].alpha = numbers[i].alpha-fadeoutAmount;//reduces opacity (for fadeout affect)
    ctxone.fillText(numbers[i].word,numbers[i].x,numbers[i].y);//makes it one or zero
    numbers[i].y = numbers[i].y +3;
    if(numbers[i].alpha < 0){//if the opacity of the snowflake is zero remove it from the array of snowflakes
      numbers.splice(i, 1);
    }
  }
}

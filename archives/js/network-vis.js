// canvas settings
    var drawingCanvas = document.getElementById("network-vis"),
    ctx,
    viewHeight = 500,
    viewWidth = screen.width,
    timeStep = (1/60),
    time = 0;

var nodes = [],
    signals = [];

var signalCount = 0;

window.onload = function() {
    initDrawingCanvas();
    createNodes();
    connectNodes();

    transmit();
    setInterval(transmit, 1600);

    requestAnimationFrame(loop);
};

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
    nodes[0] = new Node(10,120);
    nodes[1] = new Node(800,300);
    nodes[2] = new Node(980,350);
    nodes[3] = new Node(500,320);
    nodes[4] = new Node(600,270);
    nodes[5] = new Node(370,230);
    nodes[6] = new Node(350,320);
    nodes[7] = new Node(920,250);
    nodes[8] = new Node(270,0);
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
    
    var connection,
        j,
        connectCount;

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
    signals.push(new Signal(getRandom(nodes)));
    signalCount++;
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

function loop() {
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
        ctx.lineWidth = 0.3;
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
    //console.log(tint);
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
        ctx.lineWidth = this.strength * 0.2;
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

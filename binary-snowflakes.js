const SNOWFLAKE_SPEED = 30; //change this variable to control the intervals between snowflake cycles (60 = 60 milliseconds)
const SNOWFLAKE_DELAY = 2; //this variable determines if the code should make a new snowflake this cyle (currently it'll make a new snowflake every 2 cycles which is ever 120 milliseconds becuase the snowflake speed is 60)
const FADEOUT_AMOUNT = 0.015; // this means that it'll reduce its opacity by 5% each cycle (lower number means fade out slower)
let numbers = [];
let wait = SNOWFLAKE_DELAY;

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

//this reads the javascript array that contains all of the snowflakes and draws them onto the canvas (each snowflake has its own opacity, colour, x,y coords etc. and the draw command renders it)
function drawNum(ctxone) {
    for (let i = 0; i < numbers.length; i++) {
        ctxone.fillStyle = numbers[i].color + numbers[i].alpha + ")"; //draws opacity
        numbers[i].alpha = numbers[i].alpha - FADEOUT_AMOUNT; //reduces opacity (for fadeout affect)
        ctxone.fillText(numbers[i].word, numbers[i].x, numbers[i].y); //makes it one or zero
        numbers[i].y = numbers[i].y + 3;
        if (numbers[i].alpha < 0) { //if the opacity of the snowflake is zero remove it from the array of snowflakes
            numbers.splice(i, 1);
        }
    }
}

function run(canvas, ctxone) {
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    if (wait == 0) { //see if it is time to spawn a new snowflake
        let newObject = {
            "x": Math.floor((Math.random() * canvasW) + 1),
            "y": Math.floor((Math.random() * canvasH) + 1),
            "color": "rgba(225,225,225,", //here the snowflake is set to the colour white
            "alpha": 1,
            "word": Math.floor(Math.random() + 0.5) // makes a random 1 or 0
        }
        numbers.push(newObject); //this sends the created snowflake into the snowflake array so it can be rendered on screen
        wait = SNOWFLAKE_DELAY; //sets the wait letiable back to the orginal amount
    } else {
        wait--; //decreases wait letiable
    }
    //this renders the snowflakes on the canvas
    ctxone.clearRect(0, 0, canvasW, canvasH);
    drawNum(ctxone);
}

function init_binary_snowflakes() {
    let drawingCanvas = document.getElementById("binarySnowflakeCanvas");
    drawingCanvas.width = window.innerWidth; //document.width is obsolete
    drawingCanvas.height = 450;

    ctxone = setupCanvas(drawingCanvas);
    ctxone.font = "3 2em Arial";
    //creates the first snowflake in the snowflake object (must  be done this way because the loop needs at least one "snowflake" to start)
    let firstObject = {
        "x": 300,
        "y": 300,
        "color": "rgba(225,225,225,", //here the snowflake is set to the colour white
        "alpha": 1,
        "word": 1

    }
    numbers.push(firstObject);
    setInterval(function () {
        run(drawingCanvas, ctxone);
    }, SNOWFLAKE_SPEED); //this is the cycle
}




//init_binary_snowflakes();
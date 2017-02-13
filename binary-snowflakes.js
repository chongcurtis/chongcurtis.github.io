
//THE DRAW FUNCTION COLLIDES WITH THE DRAW FROM THE OTHER CANVAS



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
init();
function init(){
    //finds the canvas in the html and saves its width and height in a variable
    canvas = document.getElementById("binarySnowflakeCanvas");
    canvas.width = window.innerWidth; //document.width is obsolete
    canvas.height = 450; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
    //more init stuff
    ctxone= canvas.getContext("2d");
    ctxone.font = "100 30px Arial";
    //creates the first snowflake in the snowflake object (must  be done this way because the loop needs at least one "snowflake" to start)
    var firstObject = new Object();
    firstObject.x = 300;//give it a set y value
    firstObject.y = 300;//give it a set x value
    firstObject.color = "rgba(225,225,225,";//here the snowflakte is set to the colour white
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
draw();
}
//this reads the javascript array that contains all of the snowflakes and draws them onto the canvas (each snowflake has its own opacity, colour, x,y coords etc. and the draw command renders it)
var twow = canvas.width/2;
function draw(){
    for(var i = 0; i < numbers.length; i++){
        ctxone.font = "30px Arial";
        ctxone.fillStyle = numbers[i].color+numbers[i].alpha+")";//draws opacity
        numbers[i].alpha = numbers[i].alpha-fadeoutAmount;//reduces opacity (for fadeout affect)
        ctxone.fillText(numbers[i].word,numbers[i].x,numbers[i].y);//makes it one or zero
        numbers[i].y = numbers[i].y +3;
        if(numbers[i].alpha < 0){//if the opacity of the snowflake is zero remove it from the array of snowflakes
            numbers.splice(i, 1);
        }
    }
}

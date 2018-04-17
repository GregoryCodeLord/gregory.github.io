var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


c.fillStyle = "orange";
c.fillRect(50, 200, 100, 100);
c.fillStyle = "blue";
c.fillRect(50, 300, 100, 100);
/*
console.log(canvas);

//line stroke

c.beginPath();
c.moveTo(100, 100);
c.lineTo(200, 200);
c.lineTo(300, 100);
c.lineTo(300, 300);
c.strokeStyle = "red";
c.stroke();

//arc circle
c.beginPath();
c.arc(600, 200, 150, 0, Math.PI*2, false);
c.strokeStyle = "green";
c.stroke();



for(var i = 0; i < 50; i++){
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var sz = Math.random() * (100 - 30) + 50;
    c.fillStyle = rndRgb();
    c.beginPath();
    c.arc(x, y, sz, 0, Math.PI*2, false);
    
    c.fill();
}
*/




/*
function rndRgb(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r +','+ g +','+ b +')';
}
*/

var mouse = {
    x: undefined,
    y: undefined
}


var maxRadius = 45;
var minRadius = 2;

var colorArray = [
    '#B80C09',
    '#0B4F6C',
    '#01BAEF',
    '#FBFBFF',
    '#040F16',
];

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    
});

window.addEventListener('resize', 
    function(event){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
});

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        //interact
        if (mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y < 80 && mouse.y - this.y > -80){
            if (this.radius < maxRadius){
               this.radius += 5; 
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }


        this.draw();
    }

}


var circleArray = [];

function init(){
    circleArray = [];
    for (var i = 0; i < 1000; i++){
        var radius = Math.random() * 5 + 3;
        var x = Math.random()*(window.innerWidth - radius*2) + radius;
        var y = Math.random()*(window.innerHeight - radius*2) + radius;
        var dx = (Math.random() -0.5)*4;
        var dy = (Math.random() -0.5)*4;
        
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth, innerHeight);
        
    for (var i = 0; i < circleArray.length; i++){
            circleArray[i].update();
    }
}

animate();
init();

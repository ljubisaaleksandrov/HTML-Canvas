var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var mouseMinAnimationDistance = 50;

var circleArray = []
var colorArray = ['#2c3e50', '#e74c3c', '#ecf0f1', '#3498db', '#2980b9'];
	
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	
	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0 && this.radius > this.minRadius){
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0 && this.radius < maxRadius){
			this.dy = -this.dy;
		}
		
		this.x += this.dx;
		this.y += this.dy;
		
		// mouse related animations
		if(mouse.x - this.x < mouseMinAnimationDistance && mouse.x - this.x > -mouseMinAnimationDistance &&
		   mouse.y - this.y < mouseMinAnimationDistance && mouse.y - this.y > -mouseMinAnimationDistance){
			if(this.radius < maxRadius){
				this.radius++;
			}
	    }
		else if (this.radius > this.minRadius){
			this.radius--;
		}
		
		this.draw();
	}
}

function init(){
	circleArray = [];
	
	for(var i = 0; i < 500; i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}

init();
animate(); 
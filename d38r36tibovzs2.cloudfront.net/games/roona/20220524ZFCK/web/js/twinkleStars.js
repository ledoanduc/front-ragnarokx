
var stars = [];

function setup() {
    var canvas = createCanvas(1900, 350);    
    canvas.parent('twinkleStars');   
	
	for (var i = 0; i < 100; i++) {
		stars[i] = new Star();
	}
}

function draw() {
  background(30);
  clear();
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}


// star class //
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.05;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

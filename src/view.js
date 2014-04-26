TRB.selectBox = {x:0.05,y:0.05,w:0.15,h:0.3};
TRB.infoBox = {x:0.7,y:0.05,w:0.28,h:0.5};
TRB.gameBox = {x:0,y:0,w:1,h:1};
TRB.saveBox = {x:0.05,y:0.30,w:0.9,h:0.65};

TRB.drawGame = function() {
	TRB.drawClear();	
	TRB.drawBoids();
};

TRB.getSubBox = function(parentBox,childBox) {
	var subBox = {x:0,y:0,w:0,h:0};

	subBox.x = parentBox.x + childBox.x * parentBox.w;
	subBox.y = parentBox.y + childBox.y * parentBox.h;
	subBox.w = childBox.w * parentBox.w;
	subBox.h = childBox.h * parentBox.h;

	return subBox;
};

TRB.pointInBox = function(x, y, box) {
	return x > box.x && x < box.x+box.w && y > box.y && y < box.y+box.h;
};

TRB.drawBoids = function(parentBox, worldID) {
	var ctx = TRB.ctx;
	ctx.save();

	var w = TRB.canvas.width;
	var h = TRB.canvas.height;
	var b = TRB.gameBox;

	for(var i = 0; i < TRB.boids.length; i++) {
		var boid = TRB.boids[i];
		var boid1 = TRB.boids[boid.b1];
		var boid2 = TRB.boids[boid.b2];
		var x = ((boid.x - b.x) / b.w) * w;
		var y = ((boid.y - b.y) / b.h) * h;

		var x1 = ((boid1.x - b.x) / b.w) * w;
		var y1 = ((boid1.y - b.y) / b.h) * h;

		var x2 = ((boid2.x - b.x) / b.w) * w;
		var y2 = ((boid2.y - b.y) / b.h) * h;

		ctx.fillStyle = boid.color;
		ctx.strokeStyle = boid.color;

		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.closePath();
		ctx.fill();

	}

	// for(var i = 0; i < TRB.boids.length; i++) {
	// 	var boid = TRB.boids[i];
	
	// 	var x = ((boid.x - b.x) / b.w) * w;
	// 	var y = ((boid.y - b.y) / b.h) * h;
		
	// 	ctx.fillStyle = boid.color;

	// 	ctx.beginPath();
	// 	ctx.arc(x,y,3, 0, 2 * Math.PI, false);
	// 	ctx.closePath();
	// }
	// 	ctx.fill();	

	ctx.restore();
};

TRB.drawClear = function() {
	var ctx = TRB.ctx;
	ctx.save();

	var w = TRB.canvas.width;
	var h = TRB.canvas.height;

	// ctx.fillStyle = 'black'
	ctx.clearRect(0,0,w,h);
	// ctx.fill();
	ctx.restore();
};

TRB.selectBox = {x:0.05,y:0.05,w:0.15,h:0.3};
TRB.infoBox = {x:0.7,y:0.05,w:0.28,h:0.5};
TRB.gameBox = {x:20,y:20,w:10,h:10};
TRB.saveBox = {x:0.05,y:0.30,w:0.9,h:0.65};

TRB.drawGame = function() {

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

TRB.clampGameBox = function() {
	var w = TRB.gameState.w;
	var h = TRB.gameState.h;
	if(TRB.gameBox.w > w) {TRB.gameBox.w = w;}
	if(TRB.gameBox.h > h) {TRB.gameBox.h = h;}
	if(TRB.gameBox.x < 0) {TRB.gameBox.x = 0;}
	if(TRB.gameBox.y < 0) {TRB.gameBox.y = 0;}
	if(TRB.gameBox.x + TRB.gameBox.w >= w) {TRB.gameBox.x = w - TRB.gameBox.w;}
	if(TRB.gameBox.y + TRB.gameBox.h >= h) {TRB.gameBox.y = h - TRB.gameBox.h;}
};

TRB.drawBoid = function(parentBox, worldID) {
	var ctx = TRB.ctx;
	ctx.save();

	var w = TRB.canvas.width;
	var h = TRB.canvas.height;

	ctx.restore();
};

TRB.drawClear = function() {
	var ctx = TRB.ctx;
	ctx.save();

	var w = TRB.canvas.width;
	var h = TRB.canvas.height;

	ctx.clearRect(0,0,w,h);

	ctx.restore();
};

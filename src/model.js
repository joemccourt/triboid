TRB.updateModel = function(dt) {

};

TRB.initNewGameState = function() {
	TRB.initModel();

	var state = {};
	var w = 1;//world.size.w;
	var h = 1;//world.size.h;

	TRB.gameBox.w = w;
	TRB.gameBox.h = h;

	state.w = w;
	state.h = h;

	TRB.gameState = state;
};

TRB.initModel = function() {

};
"use strict";
var TRB = {};

TRB.initDefaultValues = function() {
	TRB.canvasID = "#canvas";
	TRB.dirtyCanvas = true;
	TRB.dirtyInfoBG = true;
	TRB.dirtySelectBG = true;
	TRB.lastFrameTime = 0;
	TRB.mousePos = {'x':0.5,'y':0.5};
	TRB.mouseDownPos = {x:-1,y:-1};
	TRB.mouseState = "up";


	TRB.mouseMoved = false;
	TRB.particles = {};

	TRB.gameState = {};

	TRB.time = 0;
};

TRB.main = function() {
	TRB.initDefaultValues();
	TRB.startSession();

	requestAnimationFrame(TRB.gameLoop);
};

window.onload = TRB.main;

TRB.startSession = function() {
	TRB.canvas = $(TRB.canvasID)[0];
	TRB.ctx = TRB.canvas.getContext("2d");

	TRB.loadGameState();

	TRB.initNewGameState();

	TRB.resizeToFit();

	TRB.dirtyCanvas = true;
	TRB.initEvents();
};

TRB.gameLoop = function(time) {
	var ctx = TRB.ctx;
	TRB.time = time;

	TRB.frameRenderTime = time - TRB.lastFrameTime;
	
	TRB.updateModel(TRB.frameRenderTime/1000);

	TRB.drawClear();
	TRB.drawGame();

	requestAnimationFrame(TRB.gameLoop);
};

TRB.startNewGame = function() {
	TRB.initNewGameState();
	TRB.saveGameState();
};

TRB.copyBox = function(box) {
	return {
		x: box.x,
		y: box.y,
		w: box.w,
		h: box.h
	};
};

TRB.fitGameBox = function(box,w,h) {

	if(!w || !h) {
		w = TRB.canvas.width;
		h = TRB.canvas.height;
	}

	var scaleX = w/h*box.h/box.w;

	box.x += (1-scaleX)/2*box.w;
	box.w *= scaleX;

	return box;
};

TRB.mousemove = function(x,y){
	var w = TRB.canvas.width;
	var h = TRB.canvas.height;

	TRB.mousePos = {'x':x,'y':y};
};

TRB.mousedown = function(x,y) {
	TRB.mousePos = {'x':x,'y':y};
	TRB.mouseDownPos = {'x':x,'y':y};
	TRB.mouseState = "down";
	TRB.mouseMoved = false;
};

TRB.mouseup = function(x,y) {
	var w = TRB.canvas.width;
	var h = TRB.canvas.height;

	TRB.mousePos = {'x':x,'y':y};
	TRB.mouseState = "up";
};

TRB.resizeToFit = function() {
	var w = $(window).width();
	var h = $(window).height();

	TRB.canvas.width  = w;
	TRB.canvas.height = h;

	TRB.gameBox = TRB.fitGameBox(TRB.gameBox, w, h);
	TRB.dirtyCanvas = true;

	TRB.dirtyInfoBG = true;
	TRB.dirtySelectBG = true;
};

TRB.keydown = function(e) {
	TRB.keyControlDown(e.which);
}

// *** Event binding *** //
TRB.initEvents = function(){
	$(window).resize(function(){
		TRB.resizeToFit();
	});

	$(window).mousemove(function (e) {
		var offset = $(TRB.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = TRB.canvas.width;
		var h = TRB.canvas.height;

		TRB.mousemove(x/w,y/h);
	});

	$(window).mousedown(function (e) {
		var offset = $(TRB.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = TRB.canvas.width;
		var h = TRB.canvas.height;

		TRB.mousedown(x/w,y/h);
	});

	$(window).mouseup(function (e) {
		var offset = $(TRB.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = TRB.canvas.width;
		var h = TRB.canvas.height;
		TRB.mouseup(x/w,y/h);
	});

	$(document).keydown(function (e) {
		TRB.keydown(e);
	});
};

TRB.loadGameState = function(){
	if (!supports_html5_storage()) { return false; }
	
	var gameData = localStorage["TRB.gameData"];
	if(typeof gameData === "string") {
		TRB.gameData = JSON.parse(gameData);
	}
};

TRB.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }

	localStorage["TRB.gameData"] = JSON.stringify(TRB.gameData);
};

// *** LocalStorage Check ***
function supports_html5_storage() {
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	}catch (e){
		return false;
	}
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
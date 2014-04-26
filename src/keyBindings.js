TRB.keyControlDown = function(key) {

	// console.log(key);
	switch (key) {
		case 82:
			// TRB.cellTypeAdd = "root";
			TRB.resetGame();
			break;
		case 39:
			TRB.moveRight();
			break;
		case 37:
			TRB.moveLeft();
			break;
		case 38:
			TRB.moveUp();
			break;
		case 40:
			TRB.moveDown();
			break;
		case 189:
			TRB.zoomOut();
			break;
		case 187:
			TRB.zoomIn();
			break;
	}
};
'use strict';

function createBuilding(x0, height, width, color) {
	this.x0 = x0;
	this.height = height;
	this.width = width;
	this.color = color;

	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;
	var canvas = document.querySelector("canvas");
	var c = canvas.getContext("2d");
	var floor = canvas.height / 2;
	this.grow = function () {
		var c = document.querySelector("canvas").getContext("2d");
		c.fillStyle = this.color;
		var newHeight = Math.random() * this.height;
		c.fillRect(x0, newHeight, width, floor-newHeight);
		c.fillStyle = "yellow";
		for (var y = floor; y > newHeight + floorSpacing; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random() > 0.5) {
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);
				}
			}
		}
		this.height = newHeight;
	}
	this.redraw = function () {
		var c = document.querySelector("canvas").getContext("2d");
		c.fillStyle = this.color;
		var newHeight = this.height;
		c.fillRect(x0, newHeight, width, floor-newHeight);
		c.fillStyle = "yellow";
		for (var y = floor; y > newHeight + floorSpacing; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random() > 0.5) {
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);
				}
			}
		}
		this.height = newHeight;
	}
}

var buildings = new Array();
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2;
	var grad = c.createLinearGradient(0,floor,0,canvas.height);
	grad.addColorStop(0, "green");
	grad.addColorStop(1, "black");
	c.fillStyle=grad;
	c.fillRect(0, floor, canvas.width, canvas.height);

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3;
	var windowHeight = 5, windowWidth = 3;

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'];

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width;
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10);
		var blgHeight = Math.random()*canvas.height/2;

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)];
		var col = c.fillStyle;
		buildings.push(new createBuilding(x0, floor - blgHeight, blgWidth, col));
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight);
		c.fillStyle="yellow";

		const dy = floorSpacing + windowHeight;
		const dx = windowSpacing + windowWidth;
		const floors = Math.floor(blgHeight/dy);
		const cols = Math.floor(blgWidth/dx) - 1;
		const range = (n, delta, x0) => Array(n).fill(1).map((_, i) => x0 + i * delta);
		range(floors, dy, floor - blgHeight + dy).forEach(y => {
		    range(cols, dx, windowSpacing).forEach(x => {
			c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
		    })
		})
	};

	var sum_x = 0;
	var sum_y = 30;
	function update() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		c.beginPath();
		c.arc(sum_x, sum_y, 10, 0, 2 * Math.PI);
		c.fillStyle = "yellow";
		c.fill();
		sum_x += 10;
		sum_y += Math.random() * 10 - 5;
		buildings.forEach(function (element) {
			element.redraw();
		});
		grad.addColorStop(0, "green");
		grad.addColorStop(1, "black");
		c.fillStyle = grad;
		c.fillRect(0, floor, canvas.width, canvas.height);
	}

	setInterval(update, 1000);
	return {
		build: build
	}
};

window.onload = function() {
	var app = createApp(document.querySelector("canvas"));
	document.getElementById("build").onclick = app.build
};



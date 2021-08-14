import { Planet, planetsDefault } from "./planet.js";

class SolarSystem {
	_canvas = null;
	_scale = null;
	_scaleMultiplier = null;

	_context = null;
	_formControl = null;
	_isRunning = false;
	_planets = {};
	_previusTime = 0;

	static init = (canvasElement, formControlElement) => {
		// Initiate the elements:
		this._canvas = canvasElement;
		this._startCanvas();

		// config the form:
		this._formControl = formControlElement;
		this._formControl.onsubmit = function(event) {
			event.preventDefault();
		}

		this._scaleMultiplier = 0.5;
		this._scale = 1.0;

		document.getElementById("ss-plus").onclick = (event) => {
			this._scale /= this._scaleMultiplier;
			console.log(this._scale);
		}

		document.getElementById("ss-minus").onclick = (event) => {
			this._scale *= this._scaleMultiplier;
			console.log(this._scale);
		}

		this._createPlanetsDefault();
		this.play();
	}

	static play = () => {
		this._isRunning = true;
		requestAnimationFrame(this._updateCanvas);
		requestAnimationFrame(this._updateState);
	}

	static pause = () => {
		this._isRunning = false;
	}

	static _startCanvas = () => {
		// sets the size of canvas:
		this._canvas.width = 960;
		this._canvas.height = 540;

		// create the context:
		this._context = this._canvas.getContext("2d");
	}

	static _updateCanvas = (elapsedTime) => {
		//console.log("updateCanvas -> deltaTime");
		
		const deltaTime = elapsedTime - this._previusTime;
		this._previusTime = elapsedTime;

		// clear screen:
		this._context.fillStyle = "#222";
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

		this.drawSun();

		// show all planets:
		if (this._planets) {
			const planetKeys = Object.keys(this._planets);
			planetKeys.forEach((key) => {
				let positionX = this._planets[key].orbit.x;
				let positionY = this._planets[key].orbit.y;

				if (this._planets[key].image) {
					const planetImg = this._planets[key].image;
					positionX -= planetImg.width / 2;
					positionY -= planetImg.height / 2;

					this._context.drawImage(planetImg, positionX, positionY);
				} else {
					const radius = this._planets[key].planetRadius;
					positionX -= radius;
					positionY -= radius;
					this._context.beginPath();
					this._context.fillStyle = this._planets[key].color;
					this._context.arc(positionX, positionY, radius, 0, 2 * Math.PI, false);
					this._context.fill();
				}
			});
		}

		if (this._isRunning) requestAnimationFrame(this._updateCanvas);
	}

	static _updateState = (elapsedTime) => {
		// set the previous execution time minus the current one:
		const deltaTime = elapsedTime - this._previusTime;
		this._previusTime = elapsedTime;

		// update the position of all planets:
		if (this._planets) {
			const planetKeys = Object.keys(this._planets);

			planetKeys.forEach((key) => {
				this._planets[key].orbit.incrementOrbitPosition();
			});
		}

		if (this._isRunning) requestAnimationFrame(this._updateState);
	}

	static drawSun = () => {
		this._context.beginPath();
		this._context.fillStyle = '#FDDD41';
		this._context.arc(this._canvas.width / 2, this._canvas.height / 2, 10, 0, 2 * Math.PI, false);
		this._context.fill();
	}

	static _createPlanetsDefault = () => {
		this._planets = planetsDefault;
	}
};


export { SolarSystem };

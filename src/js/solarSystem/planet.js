import { Orbit } from "./orbit/orbit.js";

class Planet {
	constructor(elementToShow, angularVelocity, sunFocus, focus, eccentricity) {
		this.orbit = new Orbit(angularVelocity, sunFocus, focus, eccentricity);

		if (elementToShow.imgSrc) {
			this.image = new Image();
			this.image.src = elementToShow.imgSrc;
		} else {
			this.planetRadius = elementToShow.planetRadius;
			this.color = elementToShow.color;
		}
		
	}
};

const planetsDefault = {
	earth: new Planet({ planetRadius: 10, color: '#2771C6' }, 0.01, { x: 380, y: 270 }, { x: 580, y: 270 }, 0.9),
	mars: new Planet({ planetRadius: 10, color: '#EC5252' }, 0.01, { x: 380, y: 270 }, { x: 600, y: 270 }, 0.5)
}

export { Planet, planetsDefault };
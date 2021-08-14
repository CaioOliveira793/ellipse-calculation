import { Ellipse } from "./ellipse.js";

class Orbit extends Ellipse {
	constructor(angularVelocity, sunFocus, focus, eccentricity) {
		super(sunFocus, focus, eccentricity);
		this.angularVelocity = angularVelocity;
	}

	incrementOrbitPosition(angularVelocity_ = this.angularVelocity) {
		if (super.angle + angularVelocity_ >= 2 * Math.PI) super.angle = 0;
		else super.angle += angularVelocity_;

		super.calcRadius();
		super.updateCartesian();
	}
};

export { Orbit };

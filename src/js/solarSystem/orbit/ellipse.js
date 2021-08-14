// calculates the cartesian coordinates of the ellipse with the focal line
// parallel to the x or y axis.

// for polar coordinates uses one of the focus on the origin.

// x equacion:
function xCenterOnOrigin() {
	return this.centerDistance.x * Math.sqrt((this.centerDistance.y + this._y)
		* (this.centerDistance.y - this._y)) / this.centerDistance.y;
}

// y equacion:
function yCenterOnOrigin() {
	return this.centerDistance.y * Math.sqrt((this.centerDistance.x + this._x)
		* (this.centerDistance.x - this._x)) / this.centerDistance.x;
}

// set the value in the range:
function setsInRange(value, min, max) {
	if (value > max) return max;
	else if (value < min) return min;
	else return value;
}

const MAX_ANGLE = 2 * Math.PI;
const MIN_ANGLE = 0;

class Ellipse {
	constructor(sunFocusXY = { x: 0, y: 0 }, focusXY = { x: 0, y: 0 }, eccentricity = 1) {
		// properties:
		this.sunFocus = sunFocusXY;
		this.focus = focusXY;
		this.eccentricity = eccentricity;
		this.center = {
			x: (this.sunFocus.x + this.focus.x) / 2,
			y: (this.sunFocus.y + this.focus.y) / 2
		};
		this.halfFocalDistance = Math.sqrt(Math.pow(this.sunFocus.x - this.focus.x, 2)
			+ Math.pow(this.sunFocus.y - this.focus.y, 2)) / 2;
		
		this.halfMajorAxis = this.halfFocalDistance / this.eccentricity;
	
		this.halfMinorAxis = Math.sqrt(Math.pow(this.halfMajorAxis, 2)
			- Math.pow(this.halfFocalDistance, 2));
	
		// sets the centerDistance, if is not possible, they will return a Error
		if (this.sunFocus.x === this.focus.x) {
			this.centerDistance = { x: this.halfMajorAxis, y: this.halfMinorAxis };
		} else if (this.sunFocus.y === this.focus.y) {
			this.centerDistance = { x: this.halfMinorAxis, y: this.halfMajorAxis };
		} else {
			const errorMsg = "Ellipse constructor: The focal points needs to be parallel with x or y axis";
			console.error(errorMsg);
			return Error(errorMsg);
		}
	
		this.y = 0;
		this.x = 0;
		this.radius = this.halfMajorAxis - this.halfFocalDistance;
		this.angle = MIN_ANGLE;
	}
	// methods:
	set angle(value) { this._angle = setsInRange(value, MIN_ANGLE, MAX_ANGLE) }
	get angle() { return this._angle }

	// functions to calc cartesians coordinates:
	calcPositiveX() {
		this.x = xCenterOnOrigin.call(this) + this.center.x;
		return this.x;
	}
	calcNegativeX() {
		this.x = xCenterOnOrigin.call(this) * -1 + this.center.x;
		return this.x;
	}
	calcPositiveY() {
		this.y = yCenterOnOrigin.call(this) + this.center.y;
		return this.y;
	}
	calcNegativeY() {
		this.y = yCenterOnOrigin.call(this) * -1 + this.center.y;
		return this.y;
	}

	// calc polaris coordinates:
	calcRadius() {
		this.radius = this.halfMajorAxis * (1 - Math.pow(this.eccentricity, 2)) / (1
			+ this.eccentricity * Math.cos(this.angle));
		return this.radius;
	}
	
	// converts cartesian to polar and the opposite:
	updateCartesian() {
		const cartesian = polarisToCartesian(this.radius, this.angle);
		this.x = cartesian.x + this.focus.x;
		this.y = cartesian.y + this.focus.y;
	}
	updatePolar() {
		const polar = cartesianToPolaris(this.x, this.y);
		this.radius = polar.radius;
		if (this.x >= this.center.x) this.angle = polar.angleQuadrant1and4;
		else this.angle = polar.angleQuadrant2and3;
	}
};

// conversion functions:
const cartesianToPolaris = (x, y) => {
	return {
		radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
		angleQuadrant1and4: Math.atan(y / x),
		angleQuadrant2and3: Math.atan(y / x) + Math.PI
	}
}
const polarisToCartesian = (radius, angle) => {
	return {
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle)
	}
}

export { Ellipse, cartesianToPolaris, polarisToCartesian }

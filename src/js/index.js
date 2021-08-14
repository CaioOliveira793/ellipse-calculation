import { SolarSystem } from "./solarSystem/solarSystem.js";

function loadSolarSystem() {
	const canvas = document.getElementById("ss-canvas");
	const formControl = document.getElementById("ss-control");
	
	SolarSystem.init(canvas, formControl);
}

loadSolarSystem();

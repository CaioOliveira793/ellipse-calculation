

class FormControl {
	constructor(formElement) {
		if (!formElement.name === "FORM") {
			const errorMsg = "FormControl constructor: The focal points needs to be parallel with x or y axis";
			console.error(errorMsg);
			return Error(errorMsg);
		}
		this._form = formElement;
	}
};

export { FormControl }

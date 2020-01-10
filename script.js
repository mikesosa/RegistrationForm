// All the alert divs
let completeChecks = document.getElementsByClassName("check");

var base = {
	nameChecked: false,
	emailChecked: false,
	usernameChecked: false,
	passwordChecked: false,
	passwordConfirmedChecked: false,
	genderChecked: false,
	numberChecked: false,
	agreeTermsChecked: false
}

var controller = {
	init: () => {
		view.init();
	},
	submit: () => {
		if (controller.checkStatus()) {
			console.log("congrats");
		} else {
			controller.checkName();
			controller.checkEmail();
			controller.checkUsername();
			controller.checkPassword();
			controller.checkConfirmPassword();
			controller.checkGender();
			controller.checkNumber();
			controller.checkAgree();
		}
	},
	checkName: () => {
		let value = document.getElementById('name').value;
		if (value.length < 3) {
			document.getElementById('alert-name').innerHTML = 'Name field is empty or less than 3 characters!';
			view.hideCheckNumber(0);
			view.inputUnchecked("name");
			view.disableButton();
		} else if (!controller.validName(value)) {
			document.getElementById('alert-name').innerHTML = 'Invalid characters! or Names too short!';
			view.hideCheckNumber(0);
			view.inputUnchecked("name");
			view.disableButton();
		} else {
			document.getElementById('alert-name').innerHTML = '';
			view.showCheckNumber(0);
			view.inputChecked("name");
			view.enableButton();
			base.nameChecked = true;
		}
	},
	checkEmail: () => {
		let value = document.getElementById('email').value;
		if (value.length < 0) {
			document.getElementById('alert-email').innerHTML = 'Email field is empty';
			view.hideCheckNumber(1);
			view.inputUnchecked("email");
			view.disableButton();
		} else if (!controller.validEmail(value)) {
			document.getElementById('alert-email').innerHTML = 'Invalid email address!';
			view.hideCheckNumber(1);
			view.inputUnchecked("email");
			view.disableButton();
		} else {
			document.getElementById('alert-email').innerHTML = '';
			view.showCheckNumber(1);
			view.inputChecked("email");
			view.enableButton();
			base.emailChecked = true;
		}
	},
	checkUsername: () => {
		let value = document.getElementById('username').value;
		if (value.length < 5) {
			document.getElementById('alert-username').innerHTML = 'Username must be greather than 5 characters!';
			view.hideCheckNumber(2);
			view.inputUnchecked("username");
			view.disableButton();
		} else if (!controller.alphaNumeric(value)) {
			document.getElementById('alert-username').innerHTML = 'Invalid characters!';
			view.hideCheckNumber(2);
			view.inputUnchecked("username");
			view.disableButton();
		} else {
			document.getElementById('alert-username').innerHTML = '';
			view.showCheckNumber(2);
			view.inputChecked("username");
			view.enableButton();
			base.usernameChecked = true;
		}
	},
	checkPassword: () => {
		let value = document.getElementById('password').value;
		if (value.length < 6) {
			document.getElementById('alert-password').innerHTML = 'Password field is empty or less than 6 characters';
			view.hideCheckNumber(3);
			view.inputUnchecked("password");
			view.disableButton();
		} else {
			document.getElementById('alert-password').innerHTML = '';
			view.showCheckNumber(3);
			view.enableButton();
			controller.checkConfirmPassword();
			view.inputChecked("password");
			base.passwordConfirmedChecked = true;
		}
	},
	checkConfirmPassword: () => {
		let compare = document.getElementById('password').value;
		let value = document.getElementById('confirmPassword').value;
		if (compare !== value) {
			document.getElementById('alert-confirmPassword').innerHTML = 'Your passwords do not match!';
			view.hideCheckNumber(4);
			view.inputUnchecked("confirmPassword");
			view.disableButton();
		} else {
			document.getElementById('alert-confirmPassword').innerHTML = '';
			view.showCheckNumber(4);
			view.inputChecked("confirmPassword");
			view.enableButton();
			base.passwordChecked = true;
		}
	},
	checkGender: () => {
		let value = document.getElementById('gender').value;;
		if (!value) {
			document.getElementById('alert-gender').innerHTML = 'Please select an option :)';
			view.hideCheckNumber(5);
			view.inputUnchecked("gender");
			view.disableButton();
		} else if (value === "Choose a gender ...") {
			document.getElementById('alert-gender').innerHTML = 'Please select an option :)';
			view.hideCheckNumber(5);
			view.inputUnchecked("gender");
			view.disableButton();
		} else {
			document.getElementById('alert-gender').innerHTML = '';
			view.showCheckNumber(5);
			view.inputChecked("gender");
			view.enableButton();
			base.genderChecked = true;
		}
	},
	checkNumber: () => {
		let value = document.getElementById('number').value;
		if (isNaN(value)) {
			document.getElementById('alert-number').innerHTML = 'Must be a number';
			view.hideCheckNumber(6);
			view.inputUnchecked("number");
			view.disableButton();
		} else if (value < 1 || value > 10) {
			document.getElementById('alert-number').innerHTML = 'Must be a number between 1 and 10';
			view.hideCheckNumber(6);
			view.inputUnchecked("number");
			view.disableButton();
		} else {
			document.getElementById('alert-number').innerHTML = '';
			view.showCheckNumber(6);
			view.inputChecked("number");
			view.enableButton();
			base.numberChecked = true;
		}
	},
	checkAgree: () => {
		let value = document.getElementById('agree').checked
		if (!value) {
			document.getElementById('agree-label').innerHTML = 'I AGREE';
			view.removeColorAgreeButton();
			view.disableButton();
		} else {
			document.getElementById('agree-label').innerHTML = 'AGREED';
			view.addColorAgreeButton();
			view.enableButton();
			base.agreeTermsChecked = true;
		}
	},
	validName: (data) => {
		let rexp = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
		if (rexp.test(data)) {
			return true;
		}
		return false;
	},
	validEmail: (data) => {
		let rexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (rexp.test(data)) {
			return true;
		}
		return (false)
	},
	alphaNumeric: (data) => {
		let letters = /^[0-9a-zA-Z]+$/;
		if (letters.test(data)) {
			return true;
		}
		return false;
	},
	checkStatus: () => {
		for (var i in base) {
			if (base[i] === false) {
				console.log(`${i} is false`);
				view.disableButton();
				return false;
			}
			return true;
		}
	}

}

var view = {
	init: () => {
		document.getElementById('name').addEventListener('click', controller.checkName);
		document.getElementById('name').onkeydown = function () {
			controller.checkName();
		};

		document.getElementById('email').addEventListener('click', controller.checkEmail);
		document.getElementById('email').onkeydown = function () {
			controller.checkEmail();
		};

		document.getElementById('username').addEventListener('click', controller.checkUsername);
		document.getElementById('username').onkeydown = function () {
			controller.checkUsername();
		};

		document.getElementById('password').addEventListener('click', controller.checkPassword);
		document.getElementById('password').onkeyup = function () {
			controller.checkPassword();
		};

		document.getElementById('confirmPassword').addEventListener('click', controller.checkConfirmPassword);
		document.getElementById('confirmPassword').onkeyup = function () {
			controller.checkConfirmPassword();
		};

		document.getElementById('number').addEventListener('click', controller.checkNumber);
		document.getElementById('number').onkeyup = function () {
			controller.checkNumber();
		};
		document.getElementById('gender').addEventListener('click', controller.checkGender);
		document.getElementById('agree').addEventListener('click', controller.checkAgree);
		document.getElementById('submit').addEventListener('click', controller.submit);
	},
	disableButton: () => {
		document.getElementById('submit').disabled = true;
	},
	enableButton: () => {
		document.getElementById('submit').disabled = false;
	},
	showCheckNumber: (number) => {
		completeChecks[number].classList.add('active');
	},
	hideCheckNumber: (number) => {
		completeChecks[number].classList.remove('active');
	},
	addColorAgreeButton: () => {
		document.getElementById('agree-label').classList.add('label-checked');
	},
	removeColorAgreeButton: () => {
		document.getElementById('agree-label').classList.remove('label-checked');
	},
	inputChecked: (string) => {
		document.getElementById(string).classList.add('input-checked');
	},
	inputUnchecked: (string) => {
		document.getElementById(string).classList.remove('input-checked');
	}
}

controller.init();

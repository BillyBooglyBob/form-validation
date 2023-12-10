import './css/style.css';


// check password complexity using regex
function checkPasswordComplexity(input) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let errorMessage = '';
    if (!passwordRegex.test(input.value)) {
        errorMessage = `Password must have at least one upper case, one lower case,
            one digit, one special letter and be at least 8 digits in length`;
    }

    return errorMessage
}

// check the password confirmation field same as the password field
// need to be used with two input fields
function checkPasswordConfirmedTwice(password, passwordConfirmation) {
    let errorMessage = "";
    if (password.value != passwordConfirmation.value) {
        errorMessage = "Password does not match the above";
    }
    displayError(passwordConfirmation, errorMessage);
}

// check if the provided input has any error
// and return the corresponding error message
function validateInput(input) {
    // additional checking for password
    const inputId = input.id;
    if (inputId === "password" || inputId === "password-confirmation") {
        if (inputId === "password") {
            return checkPasswordComplexity(input);
        } else {

        }
    }


    if (input.validity.valueMissing) {
        return `You need to enter the ${input.id}`;
    } else if (input.validity.typeMismatch) {
        return `Entered values need to be a valid ${input.id}`;
    } else if (input.validity.tooShort) {
        return `${input.id} too short. Needs to be at least ${input.minLength}
            characters. You entered ${input.value.length}`;
    } else {
        return '';
    }
}

// display the error message
function displayError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
}

// check for any errors for the provided input and display 
// the error message
function checkInputError(input) {
    const errorMessage = validateInput(input);
    displayError(input, errorMessage);
}

// add event listeners for inline validation
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const zipCode = document.querySelector('#zip-code');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#password-confirmation');

function addInlineValidation(input) {
    input.addEventListener("input", () => {
        checkInputError(input);
    })
}

addInlineValidation(email);
addInlineValidation(country);
addInlineValidation(zipCode);
addInlineValidation(password);
addInlineValidation(passwordConfirmation);

// confirm password
// additional logic placed here as it needs two input fields
// avoid declaring input fields in two places
passwordConfirmation.addEventListener("input", () => {
    checkPasswordConfirmedTwice(password, passwordConfirmation);
})




// validate values when submitting the form
const submitForm = document.querySelector('#postal-info-form');

function validateForm(event) {

    // Check for errors
    const emailError = validateInput(email);
    const countryError = validateInput(country);
    const zipCodeError = validateInput(zipCode);
    const passwordError = validateInput(password);
    const passwordConfirmationError = validateInput(passwordConfirmation);
    const passwordMatchError = checkPasswordConfirmedTwice(password, passwordConfirmation);

    // Display errors
    displayError(email, emailError);
    displayError(country, countryError);
    displayError(zipCode, zipCodeError);
    displayError(password, passwordError);
    displayError(passwordConfirmation, passwordConfirmationError);

    // If no errors, display a "hooray" message or perform other actions
    if (emailError || countryError || zipCodeError || passwordError || passwordConfirmationError 
        || passwordMatchError) {
        // Prevent the default form submission behavior
        event.preventDefault();
    }
    // alert('Hooray! Form submitted successfully!');
}

submitForm.addEventListener("submit", validateForm);
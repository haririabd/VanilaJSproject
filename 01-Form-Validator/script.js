const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
/* Changing the class of the parent element of the input element to 'form-control error'. */
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
/* Getting the small element inside the form-control element and changing the innerText to the message. */
    const small = formControl.querySelector('small');
    small.innerText = message;
}

/**
 * If the input is valid, then change the class of the parent element to 'form-control success'.
 * @param input - The input element that we want to check
 */
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Valid email checker
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
  };

/* Event listener (basic method)
form.addEventListener('submit', function(e) {
// It prevents the default behavior of the form.
    e.preventDefault();

// Checking if the input is empty. If it is empty, it will show an error message. 
//If it is not empty, it will show a success message.
    if (username.value === '') {
        showError(username,'Username is required');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email,'Email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is not valid')
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password,'Password is required');
    } else {
        showSuccess(password);
    }

    if (password2.value === '') {
        showError(password2,'Password 2 is required');
    } else {
        showSuccess(password2);
    }
}); */

//Check the required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Password do not match');
    }
}

//Get fieldname, make the first character uppercase then concat with the sliced filedname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listener (preferred method)
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});
function submitSignupForm() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var newEmail = document.getElementById('newEmail').value;
    var newPassword = document.getElementById('newPassword').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/signup", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var signupResponseMessage = document.getElementById('signupResponseMessage');
            var jsonResponse = JSON.parse(xhr.responseText);

            if (xhr.status === 201) {
                signupResponseMessage.innerHTML = "<p class='success'>Signup successful!</p>";
            } else {
                signupResponseMessage.innerHTML = "<p class='error'>" + jsonResponse.message + "</p>";
            }
        }
    };

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "newEmail": newEmail,
        "newPassword": newPassword
    };

    xhr.send(JSON.stringify(data));
}

function redirectToLogin() {
    // Redirect back to the login page
    window.location.href = "/Users/lokeshshanmugam/Desktop/DB Project/HTML/Login.html";
}

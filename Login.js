

function submitLoginForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var responseMessage = document.getElementById('responseMessage');
            var jsonResponse = JSON.parse(xhr.responseText);

            if (xhr.status === 200) {
                responseMessage.innerHTML = "<p class='success'>Login successful!</p>";

                
               // window.location.href = "/Users/lokeshshanmugam/Desktop/DB Project/HTML/Dashboard.html";
            } else {
                responseMessage.innerHTML = "<p class='error'>" + jsonResponse.message + "</p>";
            }
        }
    };

    var data = {
        "email": email,
        "password": password
    };

    xhr.send(JSON.stringify(data));
}

function redirectToSignup() {
    // Redirect to the signup page
    window.location.href = "/Users/lokeshshanmugam/Desktop/DB Project/HTML/Signup.html";
}
function redirectToDashboard() {
    // Redirect to the signup page
    window.location.href = "/Users/lokeshshanmugam/Desktop/DB Project/HTML/Dashboard.html";
}


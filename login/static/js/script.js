function validatePassword(event) {
  event.preventDefault();

  var password = document.querySelector(".registration.form input[type='password']").value;
  var confirmPassword = document.querySelector(".registration.form input[type='password'][placeholder='Confirm your password']").value;

  var passwordError = document.getElementById("password-error");

  if (password === confirmPassword) {
      passwordError.textContent = "";
      alert("Passwords match! You can proceed with signup.");
  } else {
      passwordError.textContent = "Passwords do not match. Please try again.";
  }
}

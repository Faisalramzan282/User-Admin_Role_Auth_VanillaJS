// SignUp
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
const signUpBtn = document.getElementById("signUpBtn");
const errorContainer = document.getElementById("errorContainer");
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let usernamePattern = /^[A-Z][a-zA-Z]*\d.*$/; //start with capital and include digit
  if (!usernamePattern.test(username.value)) {
    errorContainer.textContent = "username must start with capital letter and contain atleast one digit"
  }
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    errorContainer.textContent = "email Must be valid";
  }
  let passwordPattern = /^(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordPattern.test(password.value)) {
    errorContainer.textContent = "Password must include one special character and atleast 8 characters long"
  }
  //for correct validations
  let correctValidatios = usernamePattern.test(username.value) && emailPattern.test(email.value) && passwordPattern.test(password.value);
  if (correctValidatios) {
    const signUpObj = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    processSignUp(signUpObj);
  }
});
//post request 
function processSignUp(obj) {
  const apiUrl = 'http://localhost:3001/users/register';
  axios
    .post(apiUrl, obj)
    .then((response) => {
      console.log('Data sent successfully:', response.data);
      alert("successfully registered");
      window.location.href = '/Components/login.html'
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
};
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorContainer = document.getElementById("errorContainer");
async function loginCom(e) {
    e.preventDefault();
    const loginObj = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    const apiUrl = 'http://localhost:3001/users/authenticate';
    try {
        const { data } = await axios.post(apiUrl, loginObj);
        const userLogAuth = JSON.parse(localStorage.getItem("userLogAuth"));
        console.log("data is ==>", data)
        localStorage.setItem('userLogAuth', JSON.stringify(data.data));
        if (data.data.token && data.data.user.role === 'admin') {
            alert("Welcome Admin Page");
            window.location.href = '../Components/AdminCom/adminHome.html';

        }
        else if (data.data.token && data.data.user.role === 'user') {
            alert("Welcome User Page");
            window.location.href = '../Components/UserCom/userHome.html';
        }
    } catch (error) {
        error = "invalid Credentials"
        console.log("error is ===>", error);
        errorContainer.textContent = error;
        setTimeout(() => {
            errorContainer.textContent = "";
        }, 5000);
    }
}
loginBtn.addEventListener("click", loginCom);
window.onload = function () {
    const userLogAuth = JSON.parse(localStorage.getItem("userLogAuth"));
    if (userLogAuth != null) {
        if (userLogAuth.token && userLogAuth.user.role === 'user') {
            alert('Welcome again')
            window.location.href = '../Components/UserCom/userHome.html';
        }
        else if (userLogAuth.token && userLogAuth.user.role === 'admin') {
            alert('Welcome again')
            window.location.href = '../Components/AdminCom/adminHome.html';
        }
    }
}

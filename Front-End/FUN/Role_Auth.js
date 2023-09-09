let changeUserRoleBtn = document.getElementById("changeUserRoleBtn");
changeUserRoleBtn.addEventListener("click", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3001/users/register`, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var { data } = JSON.parse(xhr.responseText);
      var userContainer = document.getElementById("userRolesContainer");
      //shows userContainer with roles
      data.forEach(function (user ) {
        var userDiv = document.createElement("div");
        userDiv.className = "user-container-roles card mb-3";
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        var userIdPara = document.createElement("p");
        userIdPara.className = "card-text";
        userIdPara.textContent = "User ID: " + user._id;
        var emailPara = document.createElement("p");
        emailPara.className = "card-text";
        emailPara.textContent = "Email: " + user.email;
        var userRolesPara = document.createElement("p");
        userRolesPara.className = "card-text";
        userRolesPara.textContent = "User Roles: " + user.role;
        var changeRoleBtn = document.createElement("button");
        changeRoleBtn.textContent = "Change Role";
        changeRoleBtn.className = "btn btn-primary change-role-button";
        cardBody.appendChild(userIdPara);
        cardBody.appendChild(emailPara);
        cardBody.appendChild(userRolesPara);
        cardBody.appendChild(changeRoleBtn);
        userDiv.appendChild(cardBody);
        userContainer.appendChild(userDiv);
        //change the roles
        changeRoleBtn.addEventListener("click", () => {
          if (user.role == "admin") {
            user.role = "user";
          } else {
            user.role = "admin";
          }
          $.ajax({
            url: `http://localhost:3001/users/role/${user._id}`,
            method: "PATCH",
            data: JSON.stringify({ role: user.role }),
            contentType: "application/json",
            success: function (data) {
              alert(data.message);
              location.reload();
            },
            error: function (error) {
              console.error("Error changing role:", error);
            },
          });
        });
      });
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Network error occurred");
  };
  xhr.send();
});
//update profile work
const updateProfileBtn = document.getElementById('updateProfileBtn');
updateProfileBtn.addEventListener('click', ()=>{   
    var newUsername = document.getElementById('updateProUsername');
    var newPassword = document.getElementById('updateProPassword');
    var updateProButton = document.getElementById('updateProButton');
    let userLogAuth = JSON.parse(localStorage.getItem('userLogAuth'));
    updateProButton.addEventListener('click', ()=>{
        $.ajax({
            url: `http://localhost:3001/users/register/${userLogAuth.user._id}`,
            method: "PATCH",
            data: JSON.stringify({newUsername: newUsername.value,newPassword: newPassword.value}),
            contentType: "application/json",
            success: function (data) {
              alert(data.message);
              window.location.href = '../Components/login.html';            },
            error: function (error) {
              console.error("Error changing role:", error);
            },
          });
    })
    $('#updateModal').modal('hide');
  });
//logout functionality
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', ()=>{
    if(localStorage.getItem('userLogAuth'))
    {
      localStorage.removeItem('userLogAuth');
      alert("Logout Successfully");
      // window.location.href = '../Components/login.html';
    } 
    else{
      alert("user not exist");
    }
})
// Delete User
const deleteUserBtn = document.getElementById('deleteUserBtn');
deleteUserBtn.addEventListener('click', ()=>{
  const loggedUser = JSON.parse(localStorage.getItem('userLogAuth'));
  const apiURL = `http://localhost:3001/users/register/${loggedUser.user._id}`;
  $.ajax({
    url : apiURL,
    type: 'delete',
    success: function ( data ) {
      $( "p" ).append( "Delete request is Success." );
      alert("deleted  successfully");
      localStorage.removeItem('userLogAuth');
      location.replace('../Components/login.html')
      },
    error: function()
    {
      alert("not successfully deleted...")
    }
  })
})
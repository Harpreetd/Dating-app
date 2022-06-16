let saveNewUserBtn = document.getElementById("saveBtn");
saveNewUserBtn.addEventListener("click", () => {
  addNewUser();
});
let cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", () => {
  location.href = "index.html";
});

// CREATE AND SAVE NEW USER INFO & SENDING IT OVER TO LOGIN PAGE

let newUserArray = JSON.parse(localStorage.getItem("newUserArray")) || [];
function addNewUser() {
  let firstName = document.getElementById("first-name").value;
  firstName = firstName.replace(/\b\w/g, (c) => c.toUpperCase());
  let lastName = document.getElementById("last-name").value;
  lastName = lastName.replace(/\b\w/g, (c) => c.toUpperCase());
  let gender = document.getElementById("gender").value;
  let imgSrc;
  if (gender == "male") {
    imgSrc =
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
  } else if (gender == "female") {
    imgSrc =
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1727&q=80";
  } else {
    imgSrc =
      "https://images.unsplash.com/photo-1516119555254-e3b36f4b6769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80";
  }
  let dob = document.getElementById("dob").value;
  let city = document.getElementById("city").value;
  city = city.replace(/\b\w/g, (c) => c.toUpperCase());
  let country = document.getElementById("country").value;
  country = country.replace(/\b\w/g, (c) => c.toUpperCase());
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    firstName == "" ||
    lastName == "" ||
    dob == "" ||
    gender == "none" ||
    gender == "" ||
    city == "" ||
    country == "" ||
    email == "" ||
    username == "" ||
    password == ""
  ) {
    alert("You need to fill in all information");
  } else if (validateEmail.test(email)) {
    newUserArray.push({
      name: {
        first: firstName,
        last: lastName,
      },
      gender: gender,
      dob: dob,
      email: email,
      picture: {
        large: imgSrc,
        medium: imgSrc,
        thumbnail: imgSrc,
      },
      location: {
        city: city,
        country: country,
      },
      login: {
        username: username,
        password: password,
      },
    });
    localStorage.setItem("newUserArray", JSON.stringify(newUserArray));
    window.location.href = "/login.html";
  } else {
    alert("Please write a valid email address!");
  }
}

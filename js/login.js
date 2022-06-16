// FETCH API & SAVING DATA IN LOCAL ARRAY
let randomUsersArray = [];
const loadRandomUsers = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/?results=150");
    let userInfo = await res.json();
    randomUsersArray = userInfo.results.map((user) => ({
      name: user.name,
      gender: user.gender,
      dob: user.dob,
      email: user.email,
      login: user.login,
      picture: user.picture,
      location: user.location,
    }));
    //   console.log(randomUsersArray); //to see username & password from api to login as a user from api
  } catch (error) {
    console.log("failed to fetch API", error);
  }
};

loadRandomUsers();
// LOGIN
function logIn() {
  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let newUsersArray = JSON.parse(localStorage.getItem("newUserArray"));
  console.log(newUsersArray);
  if (newUsersArray != null) {
    let allUsersArray = (randomUsersArray = newUsersArray.reduce(
      (allUsersArray, item) => {
        allUsersArray.push(item);
        return allUsersArray;
      },
      randomUsersArray
    ));
  }
  let currentUser = randomUsersArray.find((user) => {
    return user.login.username == userName && user.login.password === password;
  });
  if (currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("randomUsersArray", JSON.stringify(randomUsersArray));
    window.location.href = "allUsers.html";
  } else {
    alert("wrong username or password");
  }
}
// TO REMOVE USERS FROM LIKEDARRAY FROM PREVIOUS USER ON ALLUSERS PAGE
localStorage.removeItem("uniqueUsers");

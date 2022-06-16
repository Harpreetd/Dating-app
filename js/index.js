// FETCH API & SAVE DATA IN LOCAL ARRAY
let randomUsersArray = [];

const loadRandomUsers = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/?results=3");
    let userInfo = await res.json();
    console.log(userInfo.results);
    randomUsersArray = userInfo.results.map((user) => ({
      name: user.name,
      gender: user.gender,
      dob: user.dob,
      email: user.email,
      login: user.login,
      picture: user.picture,
      location: user.location,
    }));

    displayUsers(randomUsersArray);
  } catch (err) {
    console.log("failed to fetch API", err);
  }
};
loadRandomUsers();
// DISPLAY CARDS WITH USERS INFO
const displayUsers = (array) => {
  let usersList = document.getElementById("users-list");

  usersList.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let listItem = document.createElement("li");
    listItem.classList.add("card");
    usersList.append(listItem);
    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    listItem.append(cardContent);
    let userImage = document.createElement("img");
    userImage.src = `${array[i].picture.medium}`;
    userImage.classList.add("user-image");
    let details = document.createElement("div");
    details.classList.add("details");
    cardContent.append(userImage, details);
    let cardTitle = document.createElement("h2");
    cardTitle.textContent = `${array[i].name.first}`;
    let cardCity = document.createElement("p");
    cardCity.textContent = `from ${array[i].location.city}`;
    details.append(cardTitle, cardCity);
  }
};
let arrowBtn = document.getElementById("arrow");
let counter = 0;
arrowBtn.addEventListener("click", () => {
  if (counter < 3) {
    loadRandomUsers();
    counter++;
  } else {
    alert("Create account to get full access");
    arrowBtn.disabled = true;
  }
});
// BUTTONS ON HERO SECTION
let createAccountBtn = document.getElementById("create-account");
createAccountBtn.addEventListener("click", () => {
  location.href = "./createAccount.html";
});
let loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", () => {
  location.href = "./login.html";
});

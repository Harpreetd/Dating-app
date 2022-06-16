// DATA FROM LOCAL STORAGE
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let randomUsersArray = JSON.parse(localStorage.getItem("randomUsersArray"));
let likedUsersArray = JSON.parse(localStorage.getItem("uniqueUsers")) || [];
// DISPLAY ALL THE USERS STORED FROM API
let usersList = document.getElementById("users-list");
const displayUsers = (array) => {
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
    let cardTitle = document.createElement("h3");
    cardTitle.textContent = `${array[i].name.first} ${array[i].name.last}`;
    let cardCity = document.createElement("p");
    cardCity.textContent = `from ${array[i].location.city} `;
    let cardCountry = document.createElement("p");
    cardCountry.textContent = `${array[i].location.country}`;
    let buttonsSection = document.createElement("div");
    buttonsSection.style.display = "flex";
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-xmark "></i>`;
    deleteBtn.classList.add("icon");
    deleteBtn.addEventListener("click", () => {
      deleteUser(array, i);
    });
    let heartBtn = document.createElement("button");
    heartBtn.innerHTML = `<i class="fa-solid fa-heart-circle-bolt "></i>`;
    heartBtn.classList.add("icon");
    heartBtn.addEventListener("click", () => {
      alert("liked");
      likedUsersArray.push(array[i]);
    });
    let profileBtn = document.createElement("button");
    profileBtn.innerHTML = `<i class="fa-solid fa-user"></i>`;
    profileBtn.classList.add("icon");
    profileBtn.addEventListener("click", () => {
      // SENDING THIS DATA TO SINGLE PROFILE PAGE
      localStorage.setItem("array", JSON.stringify(array[i]));
      window.location.href = "singleUserProfile.html";
    });
    details.append(cardTitle, cardCity, cardCountry, buttonsSection);
    buttonsSection.append(deleteBtn, heartBtn, profileBtn);
  }
};

//DELETE USERS FROM THE DISPLAYED USERS LIST & UPDATE THE LIST WITH NEW USERS IN PLACE OF DELETED ONES
function deleteUser(array, index) {
  array.splice(index, 1);
  randomUsersArray.push(
    randomUsersArray[Math.floor(Math.random() * randomUsersArray.length)]
  );
  displayUsers(array);
}

// DISPLAY THE LOGGED IN USER (CURRENT USER)
let newUserImage = document.createElement("img"); //had to declare it outside the function to access it to upload new profile image to work
showProfileIcon(currentUser);
function showProfileIcon(currentUser) {
  let newProfile = document.getElementById("new-profile");
  newProfile.style.display = "block";
  newUserImage.src = currentUser.picture.large;
  newUserImage.classList.add("user-image");
  newProfile.append(newUserImage);
  const indexOfUser = randomUsersArray.findIndex((user) => {
    return user.login.username == currentUser.login.username;
  });
  randomUsersArray.splice(indexOfUser, 1);
  displayUsers(randomUsersArray);
  newUserImage.addEventListener("click", () => {
    openForm(currentUser);
  });
}
// UPDATE CURRENT USER'S PROFILE
function openForm(currentUser) {
  document.getElementById("myForm").style.display = "block";
  let originalFirstName = document.getElementById("original-first-name");
  originalFirstName.value = currentUser.name.first;
  let originalLastName = document.getElementById("original-last-name");
  originalLastName.value = currentUser.name.last;
  let originalCity = document.getElementById("original-city");
  originalCity.value = currentUser.location.city;
  let originalCountry = document.getElementById("original-country");
  originalCountry.value = currentUser.location.country;
  // SAVE THE UPDATES & CLOSE THE FORM
  let saveUpdateBtn = document.getElementById("save-updates");
  saveUpdateBtn.addEventListener("click", () => {
    let updatedFirstName = document.getElementById("original-first-name").value;
    let updatedLastName = document.getElementById("original-last-name").value;
    let updatedCity = document.getElementById("original-city").value;
    let updatedCountry = document.getElementById("original-country").value;
    if (
      updatedFirstName == "" ||
      updatedLastName == "" ||
      updatedCity == "" ||
      updatedCountry == ""
    ) {
      alert("Please fill in all the information");
    } else {
      currentUser.name.first = updatedFirstName;
      currentUser.name.last = updatedLastName;
      currentUser.location.city = updatedCity;
      currentUser.location.country = updatedCountry;
      console.log(currentUser);
      alert("Your profile is up to date");
      closeForm();
    }
  });
  let logOutBtn = document.getElementById("logOutBtn");
  logOutBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

// UPLOAD IMAGE & CHANGE PROFILE PICTURE OF CURRENT USER
let loadFile = function (e) {
  let image = document.getElementById("output");
  newUserImage.src = URL.createObjectURL(e.target.files[0]);
  image.src = URL.createObjectURL(e.target.files[0]);
};

// CLOSE THE UPDATE FORM WITHOUT SAVING
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
let closeFormBtn = document.getElementById("close-form");
closeFormBtn.addEventListener("click", () => {
  closeForm();
});
// FILTER FUNCTIONS ACCORDING TO CATEGORY
// ALL OTHER USERS
let allUsers = document.getElementById("all");
allUsers.addEventListener("click", () => {
  displayUsers(randomUsersArray);
});
// GENDER FILTER
function genderFilter(gender) {
  const filteredArray = randomUsersArray.filter(function (user) {
    return user.gender === gender;
  });
  displayUsers(filteredArray);
}

// USERS LIKED BY THE CURRENT USER
let likedUserBtn = document.getElementById("liked-users");
likedUserBtn.addEventListener("click", () => {
  let uniqueUsers = [...new Set(likedUsersArray)];
  if (uniqueUsers.length == 0) {
    alert("you havn't liked any one yet");
  } else {
    localStorage.setItem("uniqueUsers", JSON.stringify(uniqueUsers));
    displayUsers(uniqueUsers);
  }
});
// SEARCHBAR
let searchBar = document.getElementById("searchbar");
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  if (typeof searchString !== "string" || searchString.length === 0) {
    return randomUsersArray;
  } else {
    let filteredUser = randomUsersArray.filter((user) => {
      if (user.name.first.toLowerCase().includes(searchString)) {
        return true;
      }
      if (user.name.last.toLowerCase().includes(searchString)) {
        return true;
      }
      if (user.location.city.toLowerCase().includes(searchString)) {
        return true;
      }
      if (user.location.country.toLowerCase().includes(searchString)) {
        return true;
      }
    });
    displayUsers(filteredUser);
  }
});

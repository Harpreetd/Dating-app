let userData = JSON.parse(localStorage.getItem("array"));
let interestsArrayFake = [
  "Reading",
  "Traveling",
  "Yoga",
  "Baking",
  "Gaming",
  "Football",
  "Painting",
  "Cooking",
  "Music",
  "Archery",
  "Calligraphy",
  "Dancing",
  "Astrology",
  "Camping",
  "Surfing",
  "Skiing",
];
let randomIndex = Math.floor(Math.random() * interestsArrayFake.length - 1);
let thisUserName = document.getElementById("user-name");
let thisUserGender = document.getElementById("user-gender");
let thisUserAge = document.getElementById("user-age");
let thisUserCity = document.getElementById("user-city");
let thisUserCountry = document.getElementById("user-country");
let thisUserEmail = document.getElementById("user-email");
let thisUserInterest = document.getElementById("interests");
thisUserName.innerText = userData.name.first + "  " + userData.name.last;
thisUserAge.innerText = userData.dob.age;
thisUserGender.innerText = userData.gender;
thisUserCity.innerText = userData.location.city;
thisUserCountry.innerText = userData.location.country;
thisUserEmail.innerText = userData.email;
thisUserInterest.innerText = interestsArrayFake[randomIndex];
let thisUserImage = document.getElementById("user-image");
thisUserImage.src = userData.picture.large;
let goBackBtn = document.getElementById("go-back");
goBackBtn.onclick = () => {
  window.location.href = "allUsers.html";
};
let messageBtn = document.getElementById("message-btn");
messageBtn.onclick = () => {
  let messengerContainer = document.getElementById("messenger");
  messengerContainer.style.display = "flex";
  load(thisUserName, thisUserImage);
};
// CHAT FUNCTIONALITY
let messenger = document.querySelector(".messenger");
let messages = document.querySelector(".messages-content");
function load(thisUserName, thisUserImage) {
  messenger.style.display = "block";
  let recipientName = document.getElementById("recipient-name");
  recipientName.innerText = thisUserName.innerText;
  let recipientImg = document.getElementById("recipient-img");
  recipientImg.src = thisUserImage.src;
  setTimeout(function () {
    fakeMessage();
  }, 100);
}
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  messenger.style.display = "none";
});
let messagesContent = document.querySelector(".messages-content");
function insertMessage() {
  let msg = document.querySelector(".message-input").value;
  if (msg === "") {
    return false;
  } else {
    let msgSent = document.createElement("div");
    msgSent.classList.add("message", "message-sent");
    msgSent.innerText = msg;
    messagesContent.append(msgSent);
  }
  setTimeout(function () {
    fakeMessage();
  }, 1000 + Math.random() * 20 * 100);
}
let sendMessageBtn = document.getElementById("send-message");
sendMessageBtn.addEventListener("click", () => {
  insertMessage();
});
let Fake = [
  "Hi there!!!",
  "How are you?",
  "Not too bad, thanks",
  "What do you do?",
  "That's awesome",
  "Findlove is a nice place to stay",
  "I think you're a nice person",
  "Why do you think that?",
  "Can you explain?",
  "Anyway I've gotta go now",
  "It was a pleasure chat with you",
  "Bye",
  ":)",
];
let i = 0;
function fakeMessage() {
  if (document.querySelector(".message-input").value == "") {
    return false;
  } else {
    let typingMsg = document.createElement("div");
    typingMsg.classList.add("message", "loading", "new");
    messagesContent.append(typingMsg);
    setTimeout(function () {
      typingMsg.innerText = Fake[i];
      typingMsg.classList.remove("loading");
      i++;
    }, 1000 + Math.random() * 20 * 100);
  }
}

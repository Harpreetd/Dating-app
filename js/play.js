// LOVE CALCULATOR
let calculateLoveBtn = document.getElementById("calculate-love");
calculateLoveBtn.addEventListener("click", () => {
  let name1 = document.getElementById("name1").value;
  name1 = name1.replace(/\b\w/g, (c) => c.toUpperCase());
  let name2 = document.getElementById("name2").value;
  name2 = name2.replace(/\b\w/g, (c) => c.toUpperCase());
  if (name1 == "" || name2 == "") {
    alert("Fill in both names to get the result ");
  } else {
    let randomNumber = Math.random();
    console.log(randomNumber);
    let loveScore = Math.floor(randomNumber * 100) + 1;
    let lovePercentage = document.getElementById("love-percentage");
    lovePercentage.innerHTML = `<h3>${name1}  <i class="fa-solid fa-heart-pulse"></i> ${name2}</h3>
   <h2> ${loveScore}% </h2>`;
    let loveQuote = document.getElementById("love-quote");
    if (loveScore > 75) {
      loveQuote.textContent = "You are a match made in heaven!";
    } else if (loveScore <= 75 && loveScore > 50) {
      loveQuote.textContent =
        "Love is a two-way street constantly under construction.";
    } else if (loveScore <= 50 && loveScore > 30) {
      loveQuote.textContent = "Show concern and compassion for each other.";
    } else {
      loveQuote.textContent = "Sorry! You go together like Oil and Water!";
    }
  }
});
// SPIN WHEEL
let spinContainer = document.getElementById("spin-container");
let spinWheel = document.getElementById("spin-wheel");
let spinBtn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);
spinBtn.onclick = function () {
  spinWheel.style.transform = "rotate(" + number + "deg)";
  number += Math.ceil(Math.random() * 1000);
};

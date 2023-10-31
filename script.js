/* --- header and footer --- */
async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

/* --- Submit on contact page --- */
function sendMail(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("https://formspree.io/f/xjvqpzyl", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      Accept: "application/json",
    },
  })
    .then(() => {
      window.location.href = "./send_mail.html";
    })
    .catch((error) => {
      console.log(error);
    });
}


/* --- calculate amount-values on recipes --- */
let originAmounts = [];
let inputAmountSave = 4;

function getInputAmount() {
  //get the value of inputfield
  let inputAmount = document.getElementById("ing-input").value;

  if (inputAmount < 1) {
    document.getElementById('ing-input').value = inputAmountSave;
    inputAmount = inputAmountSave;
    alert("Bitte gib eine valide Zahl ein.")
  }
  else {
    inputAmountSave = inputAmount;
  }

  // find all classes with 'ing-amount'
  let amounts = document.getElementsByClassName("ing-amount");

  //saving the original amount-values only on the first run
  if (originAmounts.length == 0) {
    for (let i = 0; i < amounts.length; i++) {
      originAmounts.push(amounts[i].innerHTML);
    }
  }
  
  //iterate through the array
  for (let i = 0; i < amounts.length; i++) {
    //reset the actual to the original value to calculate with it
    amounts[i].innerHTML = originAmounts[i];

    //the resetet value can be multiplied with the inputAmount
    //if amount gets zero
    if (isNumeric(amounts[i].innerHTML)) {
      amounts[i].innerHTML =
        Math.round((amounts[i].innerHTML / 4) * inputAmount * 100) / 100;
    }
  }
}


/* --- check if value is numeric for calculation in recipe--- */
/* https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number */
function isNumeric(str) {
  if (typeof str != "string") {
    return false;
  } else {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
}

/* --- BURGER MENU --- */
function dialogShow() {
  document.getElementById("dialog").classList.remove("d-none");
}

function dialogRemove() {
  document.getElementById("dialog").classList.add("d-none");
}

// function imgreplace() {
//   document.getElementById("menu-button").innerHTML = `<img
//                 src="./img/icons/burger-close.svg"
//                 onclick="dialogRemove()"
//                 class="burger-close"
//                 id="menu-button"
//               />`
// }

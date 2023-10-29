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

let originAmounts = [];
function getInputAmount() {
  //get the value of inputfield
  let inputAmount = document.getElementById("ing-input").value;
  console.log(`Zutaten für: ${inputAmount}`);

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
    console.log("origin: " + originAmounts[i]);

    //reset the actual to the original value to calculate with it
    amounts[i].innerHTML = originAmounts[i];

    //the resetet value can be multiplied with the inputAmount
    //if amount gets zero
    if (isNumeric(amounts[i].innerHTML)) {
      amounts[i].innerHTML =
        Math.round((amounts[i].innerHTML / 4) * inputAmount * 100) / 100;
      console.log("amounts: " + amounts[i].innerHTML);
    }
  }
}

/* https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number */
function isNumeric(str) {
  if (typeof str != "string") {
    return false;
  } else {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
}

// BURGER MENU

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

const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backButton = document.querySelector(".back");

let firstNumber = null;
let operator = null;
let waitingForSecond = false;

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (waitingForSecond) {
      display.value = "";

      waitingForSecond = false;
    }

    display.value += this.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = parseFloat(display.value);

    if (isNaN(value)) return;

    if (firstNumber === null) {
      firstNumber = value;
    } else if (operator) {
      firstNumber = calculate(firstNumber, value, operator);

      display.value = firstNumber;
    }

    operator = this.textContent;

    waitingForSecond = true;
  });
});

equalButton.addEventListener("click", function () {
  const secondNumber = parseFloat(display.value);

  if (firstNumber === null || operator === null) return;

  const result = calculate(firstNumber, secondNumber, operator);

  display.value = result;

  firstNumber = null;

  operator = null;

  waitingForSecond = false;
});

clearButton.addEventListener("click", function () {
  display.value = "";

  firstNumber = null;

  operator = null;

  waitingForSecond = false;
});

backButton.addEventListener("click", function () {
  display.value = display.value.slice(0, -1);
});

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      if (b === 0) {
        return "Error";
      }

      return a / b;

    default:
      return b;
  }
}

let displayValue = "";
let currentOperation = null;
let firstOperand = null;
let shouldResetDisplay = false;

function appendNumber(number) {
  if (displayValue === "0" || shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function chooseOperation(operation) {
  if (currentOperation !== null) calculate();
  firstOperand = parseFloat(displayValue);
  currentOperation = operation;
  displayValue = operation;
  shouldResetDisplay = true;
}

function calculate() {
  if (currentOperation === null) return;
  const secondOperand = parseFloat(displayValue);
  if (isNaN(firstOperand) || isNaN(secondOperand)) return;

  let result;
  switch (currentOperation) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }
  displayValue = result.toString();
  currentOperation = null;
  firstOperand = null;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  currentOperation = null;
  firstOperand = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.value = displayValue;
}

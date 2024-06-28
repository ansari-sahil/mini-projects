let displayValue = "";

function appendNumber(number) {
  displayValue += number;
  updateDisplay();
}

function appendOperation(operation) {
  displayValue += ` ${operation} `;
  updateDisplay();
}

function calculate() {
  try {
    displayValue = eval(displayValue).toString();
  } catch (e) {
    displayValue = "Error";
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.value = displayValue;
}

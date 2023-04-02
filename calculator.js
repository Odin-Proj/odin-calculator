let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const operatorExButtons = document.querySelectorAll(".operator-ex");
const equalButton = document.getElementById("equalBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const pointButton = document.getElementById("pointBtn");
const plusMinusButton = document.getElementById("plusMinusBtn");

const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

window.addEventListener("keydown", handleKeyboardInput);
equalButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
plusMinusButton.addEventListener("click", invert)

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

operatorExButtons.forEach((button) => {
  button.addEventListener("click", () => setExOperation(button.textContent));
});

function appendNumber(num) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += num;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function handleKeyboardInput() {
  console.log("enter");
}

function deleteNumber() {
  if (currentOperationScreen.textContent === "0") return;
  if (currentOperationScreen.textContent.length !== 1) {
    currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1);
  } else {
    currentOperationScreen.textContent = "0";
  }
}

function appendPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (currentOperationScreen.textContent === "") {
    currentOperationScreen = "0";
  }
  if (currentOperationScreen.textContent.includes(".")) {
    return;
  }
  currentOperationScreen.textContent += ".";
}

function invert() {
    if (currentOperationScreen.textContent === "0") {
        return;
    }
    if (currentOperationScreen.textContent.includes("-")) {
        currentOperationScreen.textContent = currentOperationScreen.textContent.substring(1);
    } else {
        currentOperationScreen.textContent = `-${currentOperationScreen.textContent}`;
    }
}

function setOperation(operator) {
  console.log(operator);
  if (currentOperation !== null) {
    calculate();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  if (currentOperation === "xn") {
    lastOperationScreen.innerHTML = `${firstOperand}<sup>n`
  } else {
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  }
  shouldResetScreen = true;
}

function setExOperation(exOperator) {
  console.log(exOperator);
    exCalculate(exOperator, currentOperationScreen.textContent);
    shouldResetScreen;
}

function calculate() {
  if (currentOperation === null || shouldResetScreen) {
    return;
  }
  if (currentOperation === "/" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  if (currentOperation === "xn") {
    lastOperationScreen.innerHTML = `${firstOperand}<sup>${secondOperand}`;
  } else {
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
  }
  currentOperation = null;
}

function exCalculate(exOperator, num) {
    if (exOperator === "1/x" && num === "0") {
        alert("You can't divide by 0!")
        return;
    }
    currentOperationScreen.textContent = roundResult(
        exOperate(exOperator, num)
    );

    switch (exOperator) {
      case "x2":
        lastOperationScreen.innerHTML = `${num}<sup>2`;
        break;
      case "1/x":
        lastOperationScreen.textContent = `1/${num}`;
        break;
      case "√x":
        lastOperationScreen.textContent = `√${num}`;
        break;
      default:
        lastOperationScreen.textContent = `${exOperator} ${num}`;
    }
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  console.log(operator);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return null;
      } else {
        return divide(a, b);
      }
    case "%":
        if (b === 0) {
            return null;
        } else {
            return modulus(a, b);
        }
    case "xn":
        return power(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulus(a, b) {
    return a % b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function exOperate(operator, num) {
    num = Number(num);
    switch(operator) {
        case 'x2':
            return squared(num);
        case '1/x':
            return divideByOne(num);
        case '√x':
            return sqrt(num);
        default:
            return null;
    }
}

function squared(num) {
    return Math.pow(num, 2);
}

function divideByOne(num) {
    return 1/num;
}

function sqrt(num) {
    return Math.sqrt(num);
}
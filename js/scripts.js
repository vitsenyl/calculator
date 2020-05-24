// Defining basic math functions
const add = (x,y) => x + y;
const subtract = (x,y) => x - y;
const multiply = (x,y) => x * y;
const divide = (x,y) => x / y;

const operate = (operator, x, y) => {
    switch (operator) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '/':
            return divide(x,y);
        case '*': 
            return multiply(x,y);
        default:
            return "Error!";
    }
};
const isOperator = (char) => (/[^0-9]/.test(char));

const displayDiv = document.querySelector('#currentInput');
const operateDiv = document.querySelector('#operate');
const outputDiv = document.querySelector('#output');

let currentInput = displayDiv.textContent;

function clearCalculations() {
    displayDiv.textContent = '0';
    outputDiv.textContent = '0';
    currentInput = '0';
}

document.querySelector('.clear').onclick = clearCalculations;

function updateInputExpr(value) {
    let lastVal = currentInput.slice(-1);
    if (lastVal == 0) {
        currentInput = `${isOperator(value)? ' ':''}${value}`;
    } else if (isOperator(lastVal) && isOperator(value)) {
        currentInput = currentInput.slice(0, -1) + value;
    } else if (!isOperator(lastVal) && !isOperator(value)) {
        currentInput += value;
    } else {
        currentInput += ' ' + value;
    }
    displayDiv.textContent = currentInput;
}

function addInput(e) {
    // console.log(e);
    newVal = e.target.getAttribute('value');
    updateInputExpr(newVal);
}

// Sets up Callback Functions
// window.addEventListener('keydown',addInput());
const inputs = document.querySelectorAll('.input');
inputs.forEach(input => input.addEventListener('click', addInput));
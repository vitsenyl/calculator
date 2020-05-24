// Defining basic math functions
const add = (x,y) => +x + +y;
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
const isOperator = (char) => (/[^0-9.]/.test(char));

const displayDiv = document.querySelector('#currentInput');
const outputDiv = document.querySelector('#output');

let currentInput = displayDiv.textContent;
let evaluated = false;

function clearCalculations() {
    displayDiv.textContent = '0';
    outputDiv.textContent = '0';
    currentInput = '0';
}

document.querySelector('.clear').onclick = clearCalculations;
document.querySelector('#operate').onclick = evaluate;

function evaluate() {
    let input = displayDiv.textContent;
    output = evalInputExpr(input);
    outputDiv.textContent = output;
    evaluated = true;
}

function evalInputExpr(str) {
    //Evaluates the expression by breaking into fundamental expressions.

    let operands = ['*','/','+','-']; // Set order of operations here

    let stringArray = str.split(' ');

    for (let i = 0; i < operands.length; i++) {
        stringArray = evalOperation(stringArray, operands[i]);
    }
    return stringArray.join('');
}

const findNextOperation = (stringArray, operand) => stringArray.findIndex((a) => a == operand);

function evalOperation (stringArray, operand) {
    let n;
    while ( findNextOperation(stringArray, operand) >= 0) {
        n = findNextOperation(stringArray, operand);
        stringArray.splice(n-1, 3, operate(operand, stringArray[n-1], stringArray[n+1]));
    }
    return stringArray;
}



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

function newInput(e) {
    if (evaluated == true) {
        evaluated = false;
        currentInput = Number(outputDiv.textContent).toPrecision(3);
    }
    newVal = e.target.getAttribute('value');
    updateInputExpr(newVal);
}

// Sets up Callback Functions
// // window.addEventListener('keydown',addInput());

const inputs = document.querySelectorAll('.input');
inputs.forEach(input => input.addEventListener('click', newInput));
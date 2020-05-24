// Defining basic math functions
const add = (x,y) => +x + +y;
const subtract = (x,y) => x - y;
const multiply = (x,y) => x * y;
const divide = (x,y) => x / y;


const validateOperand = (operator, x) => {
    if (isNaN(x) ) {
        switch (operator) {
            case '+':
            case '-':
                x = 0;
                break;
            case '*':
            case '/':
                x = 1;
        }
    }
    return x;
};

const operate = (operator, x, y) => {
    x = validateOperand(operator, +x);
    y = validateOperand(operator, +y);
    
    switch (operator) {
        case '+':
            return add(+x,+y);
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

const displayDiv = document.querySelector('#inputExpr');
const outputDiv = document.querySelector('#output');

let inputExpr = displayDiv.textContent;
let evaluated = true;

function clearCalculations() {
    displayDiv.textContent = '0';
    outputDiv.textContent = '0';
    inputExpr = '0';
}



function evaluate() {
    let input = displayDiv.textContent;
    outputDiv.textContent = evalInputExpr(input);
    evaluated = true;
}

function evalInputExpr(str) {
    //Evaluates the expression by breaking into fundamental expressions.

    let operators = ['*','/','+','-']; // Set order of operations here

    let stringArray = str.split(' ');

    for (let i = 0; i < operators.length; i++) {
        stringArray = evalOperation(stringArray, operators[i]);
    }
    return stringArray.join('');
}

const findNextOperation = (stringArray, operator) => stringArray.findIndex((a) => a == operator);

function evalOperation (stringArray, operator) {
    let n;
    while ( findNextOperation(stringArray, operator) >= 0) {
        n = findNextOperation(stringArray, operator);
        stringArray.splice(n-1, 3, operate(operator, stringArray[n-1], stringArray[n+1]));
    }
    return stringArray;
}

function updateInputExpr(value) {
    if (evaluated == true) {
        evaluated = false;
        inputExpr = isOperator(value) ?         
                truncate((outputDiv.textContent),3) + ' ' + value :
                value;
        displayDiv.textContent = inputExpr;
        return;
    }

    let lastVal = inputExpr.slice(-1);

    if (inputExpr == 0) {
        inputExpr = `${isOperator(value)? ' ':''}${value}`;
    } else if (isOperator(lastVal) && isOperator(value)) {
        inputExpr = inputExpr.slice(0, -1) + value;
    } else if (!isOperator(lastVal) && !isOperator(value)) {
        inputExpr += value;
    } else {
        inputExpr += ' ' + value;
    }
    displayDiv.textContent = inputExpr;
}

const truncate = (number, precision) => (Math.round(Number(number).toFixed(precision) * 10**precision)/10**precision);

function newInput(e) {

    newVal = e.target.getAttribute('value');
    updateInputExpr(newVal);
}

// Sets up Callback Functions 
// // window.addEventListener('keydown',addInput());

document.querySelector('.clear').onclick = clearCalculations;
document.querySelector('#operate').onclick = evaluate;
const inputs = document.querySelectorAll('.input');
inputs.forEach(input => input.addEventListener('click', newInput));
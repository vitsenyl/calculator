// Defining Globals
const inputExpression = document.querySelector('#inputExpr');
const output = document.querySelector('#output');
let inputExpr = inputExpression.textContent;
let evaluated = true;

// Initializing Callbacks
document.querySelector('#delete').onclick = deleteEntry;
document.querySelector('#clear').onclick = clearCalculations;
document.querySelector('#operate').onclick = evaluate;

const inputs = document.querySelectorAll('.input');
inputs.forEach(input => input.addEventListener('click', newInput));

// Callback Functions

function clearCalculations() {
    inputExpression.textContent = '0';
    output.textContent = '0';
    inputExpr = '0';
}

function deleteEntry() {
    evaluated = false; //Assume that after the calculation, the person wanted something different
    
    if (isOperator(inputExpr.slice(-1))) {
        inputExpr = inputExpr.substring(0,inputExpr.length-2);
    } else {
        inputExpr = inputExpr.substring(0,inputExpr.length-1);
    }
    inputExpression.textContent = inputExpr;
}

function evaluate() {
    let input = inputExpression.textContent;
    output.textContent = evalInputExpr(input);
    evaluated = true;
}

function newInput(e) {
    newVal = e.target.getAttribute('value');
    updateInputExpr(newVal);
}

// Utility functions

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

function isType(value) {
    if (value == '.') {
        return 'dot';
    } else if (value == '0') {
        return 'zero';
    } else if (/[1-9]/.test(value)) {
        return 'number';
    } else {
        return 'operator';
    }
}

function addDot(lastVal) {

    if (/[.]/.test(inputExpr.split(' ').slice(-1))) {
        // If this was previously a decimal value already
        return lastVal;
    } else if ( isOperator(lastVal)) {
        return ' 0.';
    } else {
        return lastVal + '.';
    }
}

function addOperator(lastVal, operator) {
    if (isOperator(lastVal)) {
        return operator;
    } else {
        return `${lastVal} ${operator}`;
    }
}

function addNumber(lastVal, number) {
    if (isOperator(lastVal)) {
        return `${lastVal} ${number}`;
    } else {
        return (lastVal + number);
    }
}

const truncate = (number, precision) => parseFloat(Number(number).toFixed(precision));

function addAfterEval(value) {
    if (isOperator(value)) {
        inputExpr =  truncate((output.textContent),3) + ' ' + value;
    } else if (value == '.') {
        inputExpr = '0.';
    } else {
        inputExpr = value;
    }
}

function updateInputExpr(value) {
    if (evaluated == true) {
        addAfterEval(value);
        evaluated = false;
    } else {
        const lastVal = inputExpr.slice(-1);
        let stringToAppend = '';

        if (value == '.') {
            stringToAppend = addDot(lastVal);
        } else if (isOperator(value)) {
            stringToAppend = addOperator(lastVal, value);
        } else {
            stringToAppend = addNumber(lastVal, value);
        }
        inputExpr = inputExpr.slice(0, -1) + stringToAppend;
    }
    inputExpression.textContent = inputExpr;
}
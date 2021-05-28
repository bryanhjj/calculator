let inputValue = [];
let inputOperator;

// basic functions for the calculator
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};


// function that takes an operator and 2 numbers and then calls one of the above functions
function operate(opt, num1, num2) {
    let n1 = Number(num1);
    let n2 = Number(num2);
    switch(opt) {
        case "+":
            return add(n1, n2);
        
        case "-":
            return subtract(n1, n2);
        
        case "*":
            return multiply(n1, n2);
        
        case "/":
            return divide(n1, n2);
    }; 
};


// function that populate the display when number buttons are pressed (will populate in the mini-display)
function populateMiniDisplay(input) {
    let miniDisplay = document.querySelector("#mini-display");
    miniDisplay.textContent += input;
};

const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        inputValue.push(button.value);
        populateMiniDisplay(button.value);
    });
});

const operatorButtons = document.querySelectorAll("#operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        inputOperator = button.value;
    });
})


// show the results of the calculator on the main display (#display)
function populateDisplay(result) {
    let display = document.querySelector("#display");
    display.textContent += result;
};

let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    let res = operate(inputOperator, inputValue[0], inputValue[1]);
    inputValue.splice(0, 2);
    inputOperator = "";
    return populateDisplay(res);
});

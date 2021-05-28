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
    switch(opt) {
        case "+":
            return add(num1, num2);
        
        case "-":
            return subtract(num1, num2);
        
        case "*":
            return multiply(num1, num2);
        
        case "/":
            return divide(num1, num2);
    }; 
};


// function that populate the display when number buttons are pressed (will populate in the mini-display)
function populateMiniDisplay(input) {
    let miniDisplay = document.querySelector("#mini-display");
    let inputValue = input;
    miniDisplay.textContent += input;
};

const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        populateMiniDisplay(button.value)
    });
});
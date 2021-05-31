let listOfOperators = ["+", "-", "*", "/"];
// not an elegant solution, will revisit when I have a better idea.
let listOfNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; 

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
        populateMiniDisplay(button.value);
    });
});


// show the results of the calculator on the main display (#display)
function populateDisplay(result) {
    let display = document.querySelector("#display");
    display.textContent += result;
};

function operatorSearch(arr) {
    for (let i = 0; i < listOfOperators.length; i++) {
        for (let b = 0; b < arr.length; b++) {
            if (arr[b] == listOfOperators[i]) {
                return b;
            };
        };
    };
};


// to deal with inputs with more than 2 digits 
let multiNumA;
let multiNumB;
function digitAfter(arr, operandIndex, tempVal = 0) {
    let temp;
    if (tempVal == 0) {
        temp = [arr[operandIndex]];
    } else {
        temp = [tempVal];
    }
    if (listOfNumbers.includes(arr[operandIndex + 1]) == false) {
        return multiNumA;
    } else {
        temp.push(arr[operandIndex + 1]);
        multiNumA = temp.join("");
        digitAfter(arr, operandIndex + 1, multiNumA)
    }
}

function digitBefore(arr, operandIndex, tempVal = 0) {
    let temp;
    if (tempVal == 0) {
        temp = [arr[operandIndex]];
    } else {
        temp = [tempVal];
    }
    if (listOfNumbers.includes(arr[operandIndex - 1]) == false) {
        return multiNumB;
    } else {
        temp.unshift(arr[operandIndex - 1]);
        multiNumB = temp.join("");
        digitBefore(arr, operandIndex - 1, multiNumB);
    }
}

function processUserInput() { // goes through user input(in #mini-display) and enters the data into the appropriate functions
    let miniDisplay = document.querySelector("#mini-display");
    let userInput = Array.from(miniDisplay.textContent);
    let operatorIndex = 0;
    let operatorCount = 0;
    let result = 0;

    for (let i = 0; i < listOfOperators.length; i++) { // check if users input multiple operators
        for (let b = 0; b < userInput.length; b++) {
            if (userInput[b] == listOfOperators[i]) {
                operatorCount ++;
            };
        };
    };

    if (operatorCount > 1) {
        if (userInput.includes("*")) {
            operatorIndex = userInput.indexOf("*");
        } else if (userInput.includes("/")) {
            operatorIndex = userInput.indexOf("/");
        } else {
            operatorIndex = operatorSearch(userInput);
        }

        let leftOperandIndex = operatorIndex - 1;
        let rightOperandIndex = operatorIndex + 1;

        for (let i = 0; i < operatorCount; i++) {
            if (listOfNumbers.includes(userInput[leftOperandIndex - 1])) {
                digitBefore(userInput, leftOperandIndex);
                userInput.splice(leftOperandIndex - multiNumB.length + 1, multiNumB.length, multiNumB);
                multiNumB = 0;
            } else if (listOfNumbers.includes(userInput[rightOperandIndex + 1])) {
                digitAfter(userInput, rightOperandIndex);
                userInput.splice(rightOperandIndex, multiNumA.length, multiNumA);
                multiNumA = 0;
            }

            result = operate(userInput[operatorIndex], userInput[leftOperandIndex], userInput[rightOperandIndex]);
            userInput.splice(leftOperandIndex, 3, result);
            if (userInput.includes("*")) {
                operatorIndex = userInput.indexOf("*");
            } else if (userInput.includes("/")) {
                operatorIndex = userInput.indexOf("/");
            } else {
                operatorIndex = operatorSearch(userInput);
            }
            leftOperandIndex = operatorIndex - 1;
            rightOperandIndex = operatorIndex + 1;
        }
    } else {
        operatorIndex = operatorSearch(userInput);
        let leftOperandIndex = operatorIndex - 1;
        let rightOperandIndex = operatorIndex + 1;
        if (listOfNumbers.includes(userInput[leftOperandIndex - 1])) {
            digitBefore(userInput, leftOperandIndex);
            userInput.splice(leftOperandIndex - (multiNumB.length + 1), multiNumB.length, multiNumB);
            multiNumB = 0;
        } else if (listOfNumbers.includes(userInput[rightOperandIndex + 1])) {
            digitAfter(userInput, rightOperandIndex);
            userInput.splice(rightOperandIndex, multiNumA.length, multiNumA);
            multiNumA = 0;
        }
        result = operate(userInput[operatorIndex], userInput[leftOperandIndex], userInput[rightOperandIndex]);
        }
    return result;
};

let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    let result = processUserInput();
    populateDisplay(result);
});

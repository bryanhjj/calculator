let listOfOperators = ["+", "-", "*", "/"];
let miniDisplay = document.querySelector("#mini-display");
let display = document.querySelector("#display");
let listOfNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let multiNumA;
let multiNumB;

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
    display.textContent += result;
};

// searches for an operator in an array
function operatorSearch(arr) {
    for (let i = 0; i < listOfOperators.length; i++) {
        for (let b = 0; b < arr.length; b++) {
            if (arr[b] == listOfOperators[i]) {
                return b;
            };
        };
    };
};


// to deal with inputs with more than 2 digits, ie 300+30
function digitAfter(arr, operandIndex, tempVal = null) {
    let temp;
    let rightOperInd = operandIndex + 1;
    if (tempVal == null) {
        temp = [arr[rightOperInd]];
    } else {
        temp = [tempVal];
    }
    if (listOfNumbers.includes(arr[rightOperInd + 1]) == false) {
        return multiNumA;
    } else {
        temp.push(arr[rightOperInd + 1]);
        multiNumA = temp.join("");
        digitAfter(arr, operandIndex + 1, multiNumA)
    }
}

function digitBefore(arr, operandIndex, tempVal = null) {
    let temp;
    let leftOperInd = operandIndex - 1;
    if (tempVal == null) {
        temp = [arr[leftOperInd]];
    } else {
        temp = [tempVal];
    }
    if (listOfNumbers.includes(arr[leftOperInd - 1]) == false) {
        return multiNumB;
    } else {
        temp.unshift(arr[leftOperInd - 1]);
        multiNumB = temp.join("");
        digitBefore(arr, operandIndex - 1, multiNumB);
    }
}

// checks and keeps count of multiple operators from user input
function operatorCounter(arr) {
    let counter = 0;
    for (let i = 0; i < listOfOperators.length; i++) { 
        for (let b = 0; b < arr.length; b++) {
            if (arr[b] == listOfOperators[i]) {
                counter ++;
            };
        };
    };
    return counter;
};

// goes through user input(in #mini-display) and enters the data into the appropriate functions
function processUserInput() { 
    let userInput = Array.from(miniDisplay.textContent);
    let operatorIndex = 0;
    let result = 0;

    let operatorCount = operatorCounter(userInput);

    // applying the rule of multiply and divide first before add and subtract
    // hence the result may vary from step 6.1 in the instructions
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
                digitBefore(userInput, operatorIndex);
                userInput.splice(operatorIndex - multiNumB.length, multiNumB.length, multiNumB);
                // the following is to update relevant index after splice as positions may have changed
                if (userInput.includes("*")) {
                    operatorIndex = userInput.indexOf("*");
                } else if (userInput.includes("/")) {
                    operatorIndex = userInput.indexOf("/");
                } else {
                    operatorIndex = operatorSearch(userInput);
                }
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
                // resetting the this variable so it can be used again later on
                multiNumB = 0;
            } 
            if (listOfNumbers.includes(userInput[rightOperandIndex + 1])) {
                digitAfter(userInput, operatorIndex);
                userInput.splice(rightOperandIndex, multiNumA.length, multiNumA);
                // the following is to update relevant index after splice as positions may have changed
                if (userInput.includes("*")) {
                    operatorIndex = userInput.indexOf("*");
                } else if (userInput.includes("/")) {
                    operatorIndex = userInput.indexOf("/");
                } else {
                    operatorIndex = operatorSearch(userInput);
                }
                leftOperandIndex = operatorIndex - 1;
                rightOperandIndex = operatorIndex + 1;
                // resetting the this variable so it can be used again later on
                multiNumA = 0;
            }

            result = operate(userInput[operatorIndex], userInput[leftOperandIndex], userInput[rightOperandIndex]);
            userInput.splice(leftOperandIndex, 3, result);
            // the following is to update relevant index after splice as positions may have changed
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
            digitBefore(userInput, operatorIndex);
            userInput.splice(operatorIndex - multiNumB.length, multiNumB.length, multiNumB);
            // the following is to update relevant index after splice as positions may have changed
            operatorIndex = operatorSearch(userInput);
            leftOperandIndex = operatorIndex - 1;
            rightOperandIndex = operatorIndex + 1;
            // resetting the this variable so it can be used again later on
            multiNumB = 0;
        } 
        if (listOfNumbers.includes(userInput[rightOperandIndex + 1])) {
            digitAfter(userInput, operatorIndex);
            userInput.splice(rightOperandIndex, multiNumA.length, multiNumA);
            // the following is to update relevant index after splice as positions may have changed
            operatorIndex = operatorSearch(userInput);
            leftOperandIndex = operatorIndex - 1;
            rightOperandIndex = operatorIndex + 1;
            // resetting the this variable so it can be used again later on
            multiNumA = 0;
        }
        result = operate(userInput[operatorIndex], userInput[leftOperandIndex], userInput[rightOperandIndex]);
        }
    return result;
};

// function for the clear button
function clearMiniDisplay() {
    miniDisplay.textContent = "";
    multiNumA = 0;
    multiNumB = 0;
};

function clearDisplay() {
    display.textContent = "";
    multiNumA = 0;
    multiNumB = 0;
};

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    clearMiniDisplay();
    clearDisplay();
});

let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    let result = processUserInput();
    populateDisplay(result);
});

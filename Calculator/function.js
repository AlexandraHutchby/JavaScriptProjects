"use strict";

var input = document.getElementById('input'),
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false;

//adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        //storing current input string and its last character in variables
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (!resultDisplayed) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed && (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷")) {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        // Add this line to see what operator character is being used
        console.log("Operator clicked:", e.target.innerHTML);
        
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length === 0) {
            console.log("enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

//on click of the equal button
result.addEventListener("click", function () {
    var inputString = input.innerHTML;
    
    // Add this line to see the raw input
    console.log("Raw input:", inputString);
    
    var parts = inputString.match(/(\d+(\.\d+)?)|([+\-x÷])/g) || [];
    var numbers = [];
    var operators = [];

    for (var i = 0; i < parts.length; i++) {
        if (!isNaN(parseFloat(parts[i])) && isFinite(parts[i])) {
            numbers.push(parseFloat(parts[i]));
        } else {
            operators.push(parts[i]);
            // Add this line to see the exact operator character and its code
            console.log("Operator found:", parts[i], "Char code:", parts[i].charCodeAt(0));
        }
    }

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------");

    // Log the actual values being compared for multiplication
    console.log("Looking for multiplication symbol: 'x'");
    var multiply = operators.indexOf("x");
    console.log("Multiplication index:", multiply);
    
    // Log the actual values being compared for division
    console.log("Looking for division symbol: '÷'");
    var divide = operators.indexOf("÷");
    console.log("Division index:", divide);
    
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("x");
    }

    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, numbers[add] + numbers[add + 1]);
        operators.splice(add, 1);
        add = operators.indexOf("+"); // Reset the search for the next addition
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-"); // Reset the search for the next subtraction
    }

    input.innerHTML = numbers[0];
    resultDisplayed = true;
});

clear.addEventListener("click", function () {
    input.innerHTML = "";
});
// get the screen and all the buttons
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

//Store the number being typed
let currentNumber = ''; // whatever the user is typing

// Loop through all buttons 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // CLEAR ALL (AC)
        if (value === 'AC') {
            currentNumber = '';
            screen.textContent = '';
            return;
        }

        // CLEAR LAST DIGIT (C)
        if (value === 'C') {
            currentNumber = currentNumber.slice(0, -1); // remove last character
            screen.textContent = currentNumber;
            return;
        }

        // Add numbers to the screen
        if (!isNaN(value)) {  
            currentNumber += value;
            screen.textContent = currentNumber;
        }

           // If value is an operator (+ - × ÷)
        if (['+', '-', '×', '/'].includes(value)) {
            operator = value;
            previousNumber = currentNumber;
            currentNumber = '';
            return;
        }

        // Equals button (=)
        if (value === '=') {
            if (previousNumber && currentNumber && operator) {
                let result = 0;

                const num1 = parseFloat(previousNumber);
                const num2 = parseFloat(currentNumber);

                if (operator === '+') result = num1 + num2;
                if (operator === '-') result = num1 - num2;
                if (operator === '×') result = num1 * num2;
                if (operator === '/') result = num1 / num2;

                screen.textContent = result;
                currentNumber = String(result);
                previousNumber = '';
                operator = null;
            }
        }
    });
});

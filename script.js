// get the screen and all the buttons
//screen (this connects JS to ("div class = screen")
//buttons -> gets ALL <button> elements on the page 
// Js can control both the display and every calculator button 
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

//Store the number being typed
//this holds the current number the user is building, for example:
// If they press 1, then currentNumber = 1
// If they press 2, then currentNumber = "12"
let currentNumber = ''; // whatever the user is typing

// Loop through all buttons
// "for every button some code are ran when its clicked"
// so every button will trigger this event inside  
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // So if the button says:
        // "1" -> value = "1"
        // "AC" -> value = "AC"
        // "+" -> value = "+"
        // "=" -> value = "="
        const value = button.textContent;

        // CLEAR ALL (AC)
        // Clears the number you're typing
        // Clears the screen
        // Stops teh function using return
        if (value === 'AC') {
            currentNumber = '';
            screen.textContent = '';
            return;
        }

        // CLEAR LAST DIGIT (C)
        // Typing "123"
        // Press C -> becomes "12"
        // .slice(0, -1) = remove last character
        if (value === 'C') {
            currentNumber = currentNumber.slice(0, -1); // remove last character
            screen.textContent = currentNumber;
            return;
        }

        // Add numbers to the screen
        // isNaN (value) = checks if something is NOT a number 
        // isNaN (value) = means it is a number 
        if (!isNaN(value)) {  
            currentNumber += value;
            screen.textContent = currentNumber;
        }

           // If value is an operator (+ - × ÷)
           // Store the operator (e.g., "/")
           // Save the number you typed BEFORE the operator
           // Clear currentNumber so you can type the second number
        if (['+', '-', '×', '/'].includes(value)) {
            operator = value;
            previousNumber = currentNumber;
            currentNumber = '';
            return;
        }

        // Equals button (=)
        // Only calculate if:
        // the first number exists 
        // the second number exists
        // the operator exists
        if (value === '=') {
            if (previousNumber && currentNumber && operator) {
                let result = 0;

                const num1 = parseFloat(previousNumber);
                const num2 = parseFloat(currentNumber);

                // Based on the operator, choose the correct math
                if (operator === '+') result = num1 + num2;
                if (operator === '-') result = num1 - num2;
                if (operator === '×') result = num1 * num2;
                if (operator === '/') result = num1 / num2;

                //Show result on screen
                // Set currentNumber to result so user can continue calculating (like a real calculator)
                // Reset everything else
                screen.textContent = result;
                currentNumber = String(result);
                previousNumber = '';
                operator = null;
            }
        }
    });
});

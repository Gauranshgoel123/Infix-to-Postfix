function infixToPostfix(infix) {
    const stack = [];
    let postfix = '';
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

    for (let i = 0; i < infix.length; i++) {
        const token = infix[i];

        if (/[a-zA-Z0-9]/.test(token)) {
            postfix += token;
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop(); // Remove '(' from the stack
        } else {
            while (stack.length > 0 && precedence[token] <= precedence[stack[stack.length - 1]]) {
                postfix += stack.pop();
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        postfix += stack.pop();
    }

    return postfix;
}

function evaluatePostfix(postfix, variables) {
    const stack = [];

    for (let i = 0; i < postfix.length; i++) {
        const token = postfix[i];

        if (/[a-zA-Z]/.test(token)) {
            stack.push(variables[token]);
        } else if (/[0-9]/.test(token)) {
            stack.push(parseInt(token));
        } else {
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    stack.push(operand1 / operand2);
                    break;
                case '^':
                    stack.push(Math.pow(operand1, operand2));
                    break;
            }
        }
    }

    return stack.pop();
}

function convert() {
    const infixExpression = document.getElementById('expressionInput').value;
    const postfixExpression = infixToPostfix(infixExpression);
    document.getElementById('postfixOutput').textContent = postfixExpression;
}

function performEvaluation() {
    const postfixExpression = document.getElementById('postfixOutput').textContent;
    const variables = {}; // You can add variables and their values here
    const evaluationResult = evaluatePostfix(postfixExpression, variables);
    document.getElementById('evaluationOutput').textContent = evaluationResult;
}


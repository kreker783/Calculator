const calculate = (expression) => {
    expLog(expression);
    if (expression.length === 1) {
        return expression;
    }
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].type === 'operation') {
            if (expression[i].value === '*') {
                mul(expression, i);
                expLog(expression);
                i--;
            } else if (expression[i].value === '/') {
                if (expression[i+1].value === 0) {
                    expression = [{type: 'error', value: `You can't divide by zero!`}];
                    expLog(expression);
                    return expression;
                }
                div(expression, i);
                expLog(expression);
                i--;
            }
        }
    }
    for (let i = 0; i < expression.length; i++) {
        if (expression[i].type === 'operation') {
            if (expression[i].value === '+') {
                add(expression, i);
                expLog(expression);
                i--;
            } else if (expression[i].value === '-') {
                sub(expression, i);
                expLog(expression);
                i--;
            }
        }
    }
    expLog(expression);
    return expression;
}

const expLog = (expression) => {
    let msg = '';
    expression.forEach((obj) => {
        if (obj.type === 'number' && obj.value < 0) {
            msg += '(';
            msg += obj.value;
            if (obj.percent) msg+= '%';
            msg += ')';
        } else {
            msg += obj.value;
            if (obj.percent) msg+= '%';
        }
    });
    console.log(msg);
}

const getNumHigh = (numberObj) => {
    return numberObj.percent ?
        numberObj.value / 100 :
        numberObj.value;
}

const getNumLow = (numberObj, origNum) => {
    return numberObj.percent ?
        numberObj.value / 100 * origNum :
        numberObj.value;
}

const mul = (expression, index) => {
    let number1 = getNumHigh(expression[index-1]);
    let number2;
    if (expression[index+1] === undefined) {
        number2 = number1;
    } else {
        number2 = getNumHigh(expression[index+1])
    }
    let result = number1 * number2;
    expression.splice(index-1, 3, {type: 'number', value: result});
}

const div = (expression, index) => {
    let number1 = getNumHigh(expression[index-1]);
    let number2;
    if (expression[index+1] === undefined) {
        number2 = number1;
    } else {
        number2 = getNumHigh(expression[index+1])
    }
    let result = number1 / number2;
    expression.splice(index-1, 3, {type: 'number', value: result});
}

const add = (expression, index) => {
    let number1 = getNumHigh(expression[index-1]);
    let number2;
    if (expression[index+1] === undefined) {
        number2 = number1;
    } else {
        number2 = getNumLow(expression[index + 1], number1);
    }
    let result = number1 + number2;
    expression.splice(index-1, 3, {type: 'number', value: result});
}

const sub = (expression, index) => {
    let number1 = getNumHigh(expression[index-1]);
    let number2;
    if (expression[index+1] === undefined) {
        number2 = number1;
    } else {
        number2 = getNumLow(expression[index + 1], number1);
    }
    let result = number1 - number2;
    expression.splice(index-1, 3, {type: 'number', value: result, percent: false});
}

//Test
/*const operations = {
    mul: {type: 'operation', value: '*'},
    div: {type: 'operation', value: '/'},
    add: {type: 'operation', value: '+'},
    sub: {type: 'operation', value: '-'},
};

let expression = [
    {type: 'number', value: -20, percent: true},
    operations.mul,
    {type: 'number', value: 100, percent: false},
    operations.add,
    {type: 'number', value: 5, percent: false},
    operations.div,
    {type: 'number', value: 10, percent: false},
    operations.sub,
    {type: 'number', value: 10, percent: true},
];
calculate(expression, operations);*/

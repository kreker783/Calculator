const operations = {
  mul: {type: 'operation', value: '*'},
  div: {type: 'operation', value: '/'},
  add: {type: 'operation', value: '+'},
  sub: {type: 'operation', value: '-'},
};

// class Calculator {
//   constructor(node) {
//     this.history = [];
//     this.node = node;
//     this.expression = []
//   }
//
//   equals() {
//     const history = this.toString();
//     this.expression = [...calculate(this.expression)];
//     const result = this.toString();
//     this.history.push(`${history} = ${result}`);
//     return result;
//   }
//
//   toString() {
//     return expression.reduce((acc, {type, value, percent}) => {
//       const v = type === 'number' ? (value >= 0 ? value : `(${value})`) : value
//       return `${acc} ${v}${percent ? '%' : ''}`
//     }, '');
//   }
// }

const toString = (expression) =>
  expression.reduce((acc, {type, value, percent}) => {
    const v = type === 'number' ? (value >= 0 ? value : `(${value})`) : value
    return `${acc} ${v}${percent ? '%' : ''}`
  }, '').trim();

const getHistoryHtml = (history) => {
  if (!history.length) {
    return '<span>there is nothing here yet</span>'
  }

  return `
    <ul>
      ${history.map((h) => `<li>${h}</li>`).join('')}
    </ul>
  `;
}

let expression = [];
const history = [];

window.addEventListener('load', () => {
  const calc = document.querySelector('.calculator');
  const $output = calc.querySelector('.output');

  const $showHistory = calc.querySelector('#showHistory');
  const $buttons = calc.querySelector('.buttons');
  const $history = calc.querySelector('.history');

  $showHistory.addEventListener('click', function () {
    if (!this.className.includes('active')) {

      $history.innerHTML = getHistoryHtml(history)

      this.classList.add('active')
      $buttons.classList.remove('active');
      $history.classList.add('active');
      return
    }
    this.classList.remove('active');
    $history.classList.remove('active');
    $buttons.classList.add('active');
  });

  calc.addEventListener('click', ({target}) => {
    const {type, value} = target.dataset;

    if (!(type && value)) {
      return;
    }
    const length = expression.length - 1;
    if (!expression.length && type === 'operation') {
      return;
    }

    if (value === 'equals') {
      if (!length) {
        return;
      }

      if (expression[length].type === 'operation') {
        expression.push(expression[expression.length - 2]);
      }

      expression.forEach((v) => {
        if (v.type === 'number') {
          v.value = +v.value
        }
      })
      history.unshift(toString(expression));
      expression = calculate(expression);
      if (expression[0].type === 'error') {
        $output.innerHTML = expression[0].value;
        expression = [];
        history.shift()
        return;
      }

      expression[0].value = myCeilFloor(expression[0].value);
      history[0] = `${history[0]} = ${toString(expression)}`
      $output.innerHTML = toString(expression);
      return;
    }

    if (type === 'number') {
      if (!expression.length) {
        if (value === '0') {
          return;
        }
        if (value === '.') {
          expression.push({type, value: '0.', percent: false});
        } else {
          expression.push({type, value, percent: false});
        }
      } else {
        if (expression[length].type !== 'operation') {
          if (value === '.' && expression[length].value.toString().includes(value)) {
            return;
          }
          expression[length].value += value;
        } else {
          if (value === '.') {
            expression.push({type, value: '0.', percent: false});
          } else {
            expression.push({type, value, percent: false});
          }
        }
      }
    } else {
      if (value === 'reset') {
        expression = [];
        $output.innerHTML = '0'
        return;
      }
      if (expression[length].type === type && value !== 'negative') {
        expression[length].value = operations[value].value;
      } else if (value === 'negative') {
        if (expression[length].type !== type) {
          expression[length].value *= -1;
        }
      } else if (value === 'percent') {
        if (expression[length].type !== type) {
          expression[length].percent = !expression[length].percent;
        }
      } else {
        expression.push(operations[value]);
      }
    }
    $output.innerHTML = toString(expression);
  })

  document.addEventListener('keyup', ({ key }) => {
    if (key !== 'Backspace') {
      return;
    }
    expression.pop();
    $output.innerHTML = toString(expression);
  })
})

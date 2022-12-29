const buttons = document.querySelectorAll('button');
const screenPrimary = document.querySelector('#screen-primary');
const screenSecondary = document.querySelector('#screen-secondary');

let a = '';
let b = '';
let c = '';
let operator = '';
const operations = {
  'suma': (x, y) => {
    return x + y
  },
  'resta': (x, y) => {
    return x - y
  },
  'multiplicacion': (x, y) => {
    return x * y
  },
  'division': (x, y) => {
    return x / y
  }
}
const launchOperation = (op, x, y) => {
  let c;
  switch (op) {
    case '+':
      c = operations.suma(x, y);
      break;
    case '-':
      c = operations.resta(x, y);
      break;
    case '/':
      c = operations.division(x, y);
      break;
    case '*':
      c = operations.multiplicacion(x, y);
      break;
    default:
      break;
  }
  return c;
}

buttons.forEach((element) => {
  element.addEventListener('click', (e) => {
    const value = e.target.dataset.value;

    if (
      value.charCodeAt() > 47 &&
      value.charCodeAt() < 58) {

      //Si se oprime un valor numerico pero no existe un operador cargado en memoria
      if (operator === '') {
        a += value
        screenPrimary.innerHTML = a
      }

      //Si se oprime un boton numerico y existe un operador en memoria
      if (operator !== '') {
        b += value;
        screenPrimary.innerHTML = b
      }

      //Si se oprime un boton numerico habiendo un valor en C
      if (c !== '') {
        b = '';
        c = '';
        a = value;
        operator = '';
        screenPrimary.innerHTML = a;
      }

    } else if (
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/'
    ) {

      //si se oprime un boton operador habiendo un valor en C
      if (c !== '') {
        b = '';
        c = '';
        operator = value;

        screenPrimary.innerHTML = a;
        screenSecondary.innerHTML = `${a} ${operator}`
      }

      //Si se oprime un boton operador  habiendo un valor y un operador sin cargar
      if (a !== '' && operator === '') {
        operator = value;
        screenSecondary.innerHTML = `${a} ${operator}`
      }

      //Si se oprime un boton operador  habiendo un valor y un operador cargado
      if (a !== '' && operator !== '') {
        operator = value;
        screenSecondary.innerHTML = `${a} ${operator}`
      }

      //Si se oprime un boton operador habiendo A, B y operador cargado en memoria
      if (a !== '' && operator !== '' && b !== '') {
        c = launchOperation(operator, parseFloat(a), parseInt(b));
        operator = value

        screenPrimary.innerHTML = `${c}`;
        screenSecondary.innerHTML = `${c} ${operator}`;

        a = c;
        c = '';
        b = '';
      }
    } else if (value === '=') {

      //Cuando el usuario oprime un boton = habiendo A, B y operador cargado en memoria
      if (a !== '' && operator !== '' && b !== '') {
        c = launchOperation(operator, parseInt(a), parseInt(b))
        screenSecondary.innerHTML = `${a} ${operator} ${b}`
        screenPrimary.innerHTML = `${c}`
        a = c;
      }

      //Cuando el usuario oprime = habiendo A y un operador cargado en memoria
      if (a !== '' && operator != '' && b === '') {
        b = a;
        c = launchOperation(operator, parseInt(a), parseInt(b))
        screenSecondary.innerHTML = `${a} ${operator} ${b}`
        screenPrimary.innerHTML = `${c}`
        a = c;
      }

      //Cuando el usuario oprime = sin haber un operador cargado en memoria
      if (operator === '') {
        screenSecondary.innerHTML = `${a} =`
        screenPrimary.innerHTML = `${a}`
      }
    } else if (value === 'D') {

      if (a !== '' && operator === '') {
        let localArray = a.split('');
        localArray.pop()

        a = localArray.join('');
        screenPrimary.innerHTML = a;
      }

      if (operator !== '' && b !== '' && c === '') {
        let localArray = b.split('');
        localArray.pop();

        b = localArray.join('');
        screenPrimary.innerHTML = b;
      }

      if (a !== '' && b !== '' && c !== '') {
        b = '';
        operator = '';

        screenSecondary.innerHTML = ''
      }
    } else if (value === 'C') {
      //Si se oprime C se barre con todos los datos guardados en memoria
      a = '';
      b = ''
      c = '';
      operator = '';

      screenPrimary.innerHTML = '';
      screenSecondary.innerHTML = '';
    } else if (value === 'CE') {
      //Si se oprime CE habiendo A en memoria y no habiendo un operador en memoria se elimina todo A de memoria
      if (a !== '' && operator === '') {
        a = '';
        screenPrimary.innerHTML = a;
      };

      //Si se oprime CE habiendo A un operador en memoria, B en memoria  pero que no haya C en memoria se elimina todo B de memoria
      if (operator !== '' && b !== '' && c === '') {
        b = ''
        screenPrimary.innerHTML = b;
      };
    }
  })
}
)
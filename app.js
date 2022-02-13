$(document).ready(function () {
  let a = "";
  let b = "";
  let c = 0;
  let operator = "";
  let flag = false;

  let texto = "";
  const addTextDown = () => {
    const result = `= ${c}`;
    $("#down").text(result);
  };

  const addTextUp = (chain) => {
    texto += chain;
    $("#up").text(texto);
  };

  const showResult = () => { 
    $("#up").text(c);
    $("#down").text(c);
  };

  const operation = (x, y) => {
    switch (operator) {
      case "+":
        c = parseInt(x) + parseInt(y);
        break;
      case "-":
        c = parseInt(x) - parseInt(y);
        break;
      case "*":
        c = parseInt(x) * parseInt(y);
        break;
      case "/":
        c = parseInt(x) / parseInt(y);
        break;
      default:
        break;
    }
  };

  $("#buttons-container").click(function (e) {
    if (e.target.value != undefined) {
      if (isNaN(e.target.value)) {
        if (!flag) {
          flag = true;
        } else {
          a = c;
          b = "";
          texto = `${c}`
        }
        switch (e.target.value) {
          case "+": 
            operator = "+";
            addTextUp(` ${operator} `);
            break;
          case "-":
            operator = "-";
            addTextUp(` ${operator} `);
            break;
          case "*":
            operator = "*";
            addTextUp(` ${operator} `);
            break;
          case "/":
            operator = "/";
            addTextUp(` ${operator} `);
            break;
          case "=":
            showResult();
            break;
          default:
            break;
        }
        if (!flag) {
          flag = true;
        } else {
          a = c;
          b = "";
        }
      } else {
        if (operator == "") {
          a += e.target.value;
          c = parseInt(a);
          console.log(c);
          addTextUp(e.target.value);
          addTextDown();
        } else {
          b += e.target.value;
          operation(a, b);
          console.log(`${a} ${operator} ${b}`);
          addTextUp(e.target.value);
          addTextDown();
        }
      }
    }
  });
});

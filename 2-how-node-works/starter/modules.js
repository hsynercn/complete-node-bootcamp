//contains all arguments of the function 
//console.log(arguments);

//console.log(require('module').wrapper);
/* this will print:
[
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
]
*/

//module exports
//for classes we use uppercase
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(1, 2));

//exports
const calc2 = require('./test-module-2');
console.log(calc2.add(1, 2));

//destructure
const {add, multiply, divide, subtract} = require('./test-module-2');
console.log(multiply(4, 2));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
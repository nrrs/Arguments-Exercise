// If you're confused, think of it this way: _curriedSum keeps
// collecting arguments and returning itself until it has enough arguments,
// at which point it actually does the required work of summing.

function curriedSum(numArgs) {
  let numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      let totalSum = 0;
      for (let i = 0; i < numArgs; i++) {
        totalSum += numbers[i];
      }
      return totalSum;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

const sum = curriedSum(3);
// console.log(sum(5)(30)(10));

Function.prototype.curry = function(numArgs) {
  let numbers = [];
  let that = this;

  return function _curry(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      return that.apply(that, numbers);
    } else {
      return _curry;
    }
  };
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

Function.prototype.currySpread = function(numArgs) {
  let numbers = [];
  let that = this;

  return function _curry(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      return that.call(that, ...numbers);
    } else {
      return _curry;
    }
  };
};

Function.prototype.curryFat = function(numArgs) {
  let numbers = [];

  let _curry = (num) => {
    numbers.push(num);

    if (numbers.length === numArgs) {
      return this.call(this, ...numbers);
    } else {
      return _curry;
    }
  };
  return _curry;
};

console.log(`result = ${sumThree.curry(3)(4)(20)(6) }`); // == 30
console.log(`result = ${sumThree.currySpread(3)(4)(20)(6) }`); // == 30
console.log(`result = ${sumThree.curryFat(3)(4)(20)(6) }`); // == 30

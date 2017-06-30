function sum() {
  let args = Array.from(arguments),
      totalSum = 0;
  for (let i = 0; i < args.length; i++) {
    totalSum += args[i];
  }
  return totalSum;
}

function sumRest(...args) {
  let totalSum = 0;
  for (let i = 0; i < args.length; i++) {
    totalSum += args[i];
  }
  return totalSum;
}

// console.log(sumRest(1,2,3,4));

Function.prototype.myBind = function myBind(context) {
  let bindArgs = Array.from(arguments).slice(1);

  return (...callArgs) => {
    this.apply(context, bindArgs.concat(callArgs));
  };
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
// markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

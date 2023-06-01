
var globalVar = "global var";

const funcA = () => {
  var localVar1 = "A-1";
  localVar2 = "A-2"; // auto elevate to global scope
  console.log("funcA: " + globalVar);
  console.log("funcA: " + localVar1);
  console.log("funcA: " + localVar2);
};

const funcB = () => {
  var localVar1 = "B-1";
  localVar2 = "B-2"; // auto elevate to global scope
  console.log("funcB: " + globalVar);
  console.log("funcB: " + localVar1);
  console.log("funcB: " + localVar2);
};

console.log("global: " + globalVar);
// console.log("global: " + localVar1);
// console.log("global: " + localVar2);

funcA();

console.log("global: " + globalVar);
// console.log("global: " + localVar1);
console.log("global: " + localVar2);

funcB();

console.log("global: " + globalVar);
// console.log("global: " + localVar1);
console.log("global: " + localVar2);
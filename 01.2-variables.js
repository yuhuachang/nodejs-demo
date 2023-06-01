
const globalVar = "global var";

const funcA = () => {
  const globalVar = "A-1";
  const localVar = "A-2";
  console.log("funcA: " + globalVar);
  console.log("funcA: " + localVar);
};

const funcB = () => {
  const globalVar = "B-1";
  const localVar = "B-2";
  console.log("funcB: " + globalVar);
  console.log("funcB: " + localVar);
};

console.log("global: " + globalVar);
// console.log("global: " + localVar);

funcA();

console.log("global: " + globalVar);
// console.log("global: " + localVar);

funcB();

console.log("global: " + globalVar);
// console.log("global: " + localVar);

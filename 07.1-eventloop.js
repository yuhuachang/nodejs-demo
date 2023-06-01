
console.log("1. start");

setTimeout(() => {
  console.log("2. setTimeout 3000");
}, 3000);

setTimeout(() => {
  console.log("3. setTimeout 0");
}, 0);

setTimeout(() => {
  console.log("4. setTimeout 1000");
}, 1000);

// not ECMAScript standard
setImmediate(() => {
  console.log("5. setImmediate");
});

// not ECMAScript standard
process.nextTick(() => {
  console.log("6. nextTick");
});

console.log("7. end");


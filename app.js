
// let s = "ab,cd,efg";
// s = "";
// s = "xxxx" + "yyyy";
// console.log(s);

let arr = [];
// console.log(arr);
// console.log(arr.length);

arr = ["a", "b", "c"];
// console.log(arr);
// console.log(arr.length);

for (let i = 0; i < arr.length; i++) {
  console.log(i + ": " + arr[i]);
}

arr[1] = "x";

for (let i = 0; i < arr.length; i++) {
  console.log(i + ": " + arr[i]);
}
console.log(typeof(arr));

const x = arr.join('***')
console.log(x);

console.log(typeof(x));



// const d = {
//   "a": 1,
//   "b": 2,
//   "c": 3
// };
// console.log(d["a"]);
// console.log(d["b"]);
// d["b"] = 999;
// console.log(d["b"]);
// console.log(d);
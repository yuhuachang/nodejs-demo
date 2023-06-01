let s = "Hello "
console.log(s);

s = s + "World"
console.log(s);

s += "!"
console.log(s);

console.log("string length = " + s.length);
console.log(`string length = ${s.length}`);

console.log("------------------------------------");

strArray = s.split(" ");
console.log(strArray);
console.log(`strArray length = ${strArray.length}`);

for (let i = 0; i < strArray.length; i++) {
  console.log(`${i}: ${strArray[i]}`);
}
console.log(`the first: ${strArray[0]}`);
console.log(`the 1th: ${strArray[1]}`);
console.log(`the last: ${strArray[strArray.length - 1]}`);

console.log("------------------------------------");

console.log(s);

const s1 = s.substring(0, 5);
console.log(s1);

const s2 = s.substring(2, 8);
console.log(s2);

console.log("------------------------------------");

const s3 = s.toUpperCase();
console.log(s3);

const s4 = s.toLowerCase();
console.log(s4);

console.log("------------------------------------");

const arr1 = ["A", "B", "C", "D", "E"];
console.log(arr1);
console.log(arr1.length);
console.log(typeof(arr1));

const s5 = arr1.join(",");
console.log(s5);
console.log(s5.length);
console.log(typeof(s5));

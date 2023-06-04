// scalar
const s = "Ryan";
console.log(s);

// array
const a = ["aa", "bb", "cc"];
console.log(a);

// iterate array (use for loop)
for (let i = 0; i < a.length; i++) {
  console.log(i + ": " + a[i]);
}

// iterate array (use for of)
for (let item of a) {
  console.log(item);
}

// iterate array (use forEach(...))
a.forEach(item => {
  console.log(item);
});

// iterate array (use forEach(...) with index)
a.forEach((item, index) => {
  console.log(index + ": " + item);
});

// modify an item in an array by index.
a[1] = "dd";
console.log(a);

// add an item to an array.
a.push("ee");
console.log(a);

// remove an item from an array.
a.splice(1, 1);
console.log(a);

a.splice(1, 2);
console.log(a);

// dictionary
const d = {
  "name": "Ryan",
  "age": 10,
};
console.log(d);

// check if a key exists in a dictionary.
console.log("name" in d);
console.log("school" in d);

// iterate dictionary (use for in)
for (let key in d) {
  console.log(key + ": " + d[key]);
}

// iterate dictionary (use forEach(...))
Object.keys(d).forEach(key => {
  console.log(key + ": " + d[key]);
});

// modify an item in a dictionary by key.
d["age"] = "dddd";
console.log(d);

d.grade = 4;
console.log(d);

// add an item to a dictionary by key.
d["school"] = "BaShing";
console.log(d);

d.class = 16;
console.log(d);

// remove an item from a dictionary by key.
delete d["school"];
console.log(d);

delete d.grade;
console.log(d);

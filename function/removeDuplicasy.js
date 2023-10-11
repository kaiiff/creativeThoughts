function removeDuplicasy(arr) {
  let uniqueItems = new Set();
  let uniqueArr = [];

  arr.forEach((element) => {
    let key = JSON.stringify(element);
    if (!uniqueItems.has(key)) {
      uniqueItems.add(key);
      uniqueArr.push(element);
    }
  });

  return uniqueArr;
}

const array = [
  { id: 1, value: "xyz" },
  { id: 2, value: "abc" },
  { id: 1, value: "xyz" },
  { id: 3, value: "pqr" },
  { id: 3, value: "pqr" },
];

const data = removeDuplicasy(array);
console.log(data);

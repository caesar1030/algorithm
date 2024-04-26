const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number).reverse();

const lb = (array, target) => {
  let l = 0;
  let r = array.length;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (array[mid] >= target) r = mid;
    else l = mid + 1;
  }

  return r;
};

const ans = [0];
arr.forEach((el) => {
  if (el > ans.at(-1)) {
    ans.push(el);
  } else {
    const idx = lb(ans, el);
    ans[idx] = el;
  }
});

console.log(arr.length - (ans.length - 1));

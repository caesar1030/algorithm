const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const m = +input[line++];
const queries = input[line++].split(' ').map(Number);

arr.sort((a, b) => a - b);

const lb = (target) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] >= target) r = mid;
    else l = mid + 1;
  }

  return r;
};

const rb = (target) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] > target) r = mid;
    else l = mid + 1;
  }

  return r;
};

const ans = [];
queries.forEach((el) => {
  const lbr = lb(el);
  const ubr = rb(el);
  ans.push(ubr - lbr);
});

console.log(ans.join(' '));

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let min = 1e9;
let max = -1e9;

const n = +input[0];

const arr = input[1].split(' ').map(Number);
const ops = input[2]
  .split(' ')
  .map(Number)
  .reduce((acc, cur, idx) => {
    if (idx === 0) {
      for (let i = 0; i < cur; i++) {
        acc.push('+');
      }
      return acc;
    }
    if (idx === 1) {
      for (let i = 0; i < cur; i++) {
        acc.push('-');
      }
      return acc;
    }
    if (idx === 2) {
      for (let i = 0; i < cur; i++) {
        acc.push('*');
      }
      return acc;
    }
    if (idx === 3) {
      for (let i = 0; i < cur; i++) {
        acc.push('/');
      }
      return acc;
    }
  }, []);

const swap = (idx1, idx2) => {
  [ops[idx1], ops[idx2]] = [ops[idx2], ops[idx1]];
};

const perm = (fixed) => {
  if (fixed === ops.length) {
    const temp = ops.reduce((acc, cur, idx) => {
      if (cur === '+') return acc + arr[idx + 1];
      if (cur === '-') return acc - arr[idx + 1];
      if (cur === '*') return acc * arr[idx + 1];
      if (cur === '/') return ~~(acc / arr[idx + 1]);
    }, arr[0]);

    max = Math.max(max, temp);
    min = Math.min(min, temp);

    return;
  }

  for (let i = fixed; i < ops.length; i++) {
    swap(fixed, i);
    perm(fixed + 1);
    swap(fixed, i);
  }
};

perm(0);

console.log(max);
console.log(min);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];

const arr = input[1].split(' ').map(Number);

const swap = (idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

let ans = 0;

const perm = (fixed) => {
  if (fixed === n) {
    const temp = arr.reduce((acc, cur, i, ar) => {
      if (i === n - 1) return acc;

      return acc + Math.abs(ar[i] - ar[i + 1]);
    }, 0);
    ans = Math.max(temp, ans);

    return;
  }

  for (let i = fixed; i < n; i++) {
    swap(fixed, i);
    perm(fixed + 1);
    swap(fixed, i);
  }
};

perm(0);

console.log(ans);

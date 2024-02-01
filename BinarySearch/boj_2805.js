const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

let ans = -1;
const bs = () => {
  let l = 0;
  let r = Math.max(...arr);

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    const sum = arr.reduce((acc, cur) => acc + Math.max(cur - mid, 0), 0);

    if (sum >= m) {
      l = mid + 1;
      ans = Math.max(ans, mid);
    } else r = mid - 1;
  }
};

bs();

console.log(ans);

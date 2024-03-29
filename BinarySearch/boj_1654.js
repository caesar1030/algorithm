const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [k, n] = input[line++].split(' ').map(Number);
const arr = [];

for (let i = 0; i < k; i++) {
  arr.push(+input[line++]);
}

let ans = -1;
const bs = () => {
  let l = 0;
  let r = Math.max(...arr);

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const sum = arr.reduce((acc, cur) => acc + Math.floor(cur / mid), 0);

    if (sum >= n) {
      ans = Math.max(ans, mid);
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
};

bs();
console.log(ans);

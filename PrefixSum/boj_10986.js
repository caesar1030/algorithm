const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

const psum = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  psum[i] = psum[i - 1] + arr[i - 1];
}

const mpsum = psum.map((val) => val % m);

const temp = new Array(m).fill(0);

mpsum.forEach((val) => temp[val]++);
console.log(
  temp
    .filter((val) => val > 1)
    .reduce((acc, cur) => acc + (cur * (cur - 1)) / 2, 0)
);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = [];

for (let i = 0; i < n; i++) {
  const [a, b] = input[line++].split(' ').map(Number);
  arr.push([a, b]);
}

arr.sort((a, b) => a[0] - b[0]);

let now = 0;
arr.forEach(([arrive, duration]) => {
  if (arrive > now) now = arrive;
  now += duration;
});

console.log(now);

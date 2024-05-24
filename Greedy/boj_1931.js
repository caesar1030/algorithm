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

arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }

  return a[1] - b[1];
});

let endTime = arr[0][1];
let ans = 1;

for (let i = 1; i < n; i++) {
  const [a, b] = arr[i];
  if (a < endTime) continue;
  endTime = b;
  ++ans;
}

console.log(ans);

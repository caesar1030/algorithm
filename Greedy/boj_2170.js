const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(' ').map(Number));
}

arr.sort((a, b) => a[0] - b[0]);

let ans = 0;
let start = arr[0][0];
let end = arr[0][1];

for (let i = 1; i < n; i++) {
  if (arr[i][0] > end) {
    ans += end - start;
    start = arr[i][0];
    end = arr[i][1];
  } else {
    end = Math.max(end, arr[i][1]);
  }
}

ans += end - start;

console.log(ans);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line].split(' ').map(Number);

arr.sort((a, b) => a - b);

for (let i = 1; i < n; i++) arr[i] = arr[i] + arr[i - 1];

console.log(arr.reduce((acc, cur) => acc + cur, 0));

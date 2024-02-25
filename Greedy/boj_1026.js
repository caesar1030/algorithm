const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const a = input[line++].split(' ').map(Number);
const b = input[line++].split(' ').map(Number);

a.sort((a, b) => a - b);
b.sort((a, b) => b - a);

console.log(a.reduce((acc, cur, idx) => acc + cur * b[idx], 0));

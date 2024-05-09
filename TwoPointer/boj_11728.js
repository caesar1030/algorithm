const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const a = input[line++].split(' ').map(Number);
const b = input[line++].split(' ').map(Number);

let l = 0;
let r = 0;
const ans = [];

while (l < n && r < m) {
  if (a[l] < b[r]) {
    ans.push(a[l]);
    l++;
  } else if (a[l] >= b[r]) {
    ans.push(b[r]);
    r++;
  }
}

if (r === m) {
  while (l < n) {
    ans.push(a[l]);
    l++;
  }
} else if (l === n) {
  while (r < m) {
    ans.push(b[r]);
    r++;
  }
}

console.log(ans.join(' '));

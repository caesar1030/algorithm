const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, k] = input[line++].split(' ').map(Number);

const nameMap = {};
const numMap = {};

for (let i = 1; i <= n; i++) {
  const name = input[line++];

  nameMap[name] = i;
  numMap[i] = name;
}

const ans = [];

const numReg = /[1-9]+/;

for (let i = 0; i < k; i++) {
  const q = input[line++];

  if (numReg.test(q)) {
    ans.push(numMap[q]);
  } else {
    ans.push(nameMap[q]);
  }
}

console.log(ans.join('\n'));

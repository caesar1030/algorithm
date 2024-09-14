const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const [s, e] = input[line++].split('*');

const ans = [];
const regex = new RegExp(`^${s}.*${e}$`);

for (let i = 0; i < n; i++) {
  const str = input[line++];
  if (regex.test(str)) {
    ans.push('DA');
  } else {
    ans.push('NE');
  }
}

console.log(ans.join('\n'));

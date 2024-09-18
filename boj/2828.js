const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const j = +input[line++];

let start = 1;
let end = m;
let ans = 0;

for (let i = 0; i < j; i++) {
  const pos = +input[line++];

  if (pos < start) {
    const gap = start - pos;
    start = pos;
    end -= gap;

    ans += gap;
  } else if (pos > end) {
    const gap = pos - end;
    end = pos;
    start += gap;

    ans += gap;
  }
}

console.log(ans);

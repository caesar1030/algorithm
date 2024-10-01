const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [h, w] = input[line++].split(' ').map(Number);

const arr = [];
const ans = [...new Array(h)].map(() => new Array(w).fill(-1));

let output = '';

for (let i = 0; i < h; i++) {
  arr[i] = input[line++];

  let num = -1;
  if (arr[i][0] === 'c') num = 0;
  ans[i][0] = num;

  for (let j = 1; j < w; j++) {
    if (arr[i][j] === 'c') {
      num = 0;
    } else {
      if (num >= 0) {
        num++;
      }
    }

    ans[i][j] = num;
  }

  output += ans[i].join(' ') + '\n';
}

console.log(output);

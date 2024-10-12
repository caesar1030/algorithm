const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);

const stack = [];
const ans = [...new Array(n)].fill(-1);
arr.forEach((val, idx) => {
  while (stack.length) {
    if (stack.at(-1).val >= val) break;

    ans[stack.at(-1).idx] = val;
    stack.pop();
  }

  stack.push({ val, idx });
});

console.log(ans.join(' '));

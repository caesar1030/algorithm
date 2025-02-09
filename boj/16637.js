const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const str = input[line];

const nums = [];
const ops = [];

for (let i = 0; i < n; i++) {
  if (i % 2 === 0) {
    nums.push(+str[i]);
  } else {
    ops.push(str[i]);
  }
}

const calculate = (num1, num2, op) => {
  if (op === '*') return num1 * num2;
  if (op === '+') return num1 + num2;
  if (op === '-') return num1 - num2;
};

let ans = Number.MIN_SAFE_INTEGER;
const dfs = (idx, num) => {
  if (idx > nums.length - 1) {
    ans = Math.max(ans, num);
    return;
  }

  dfs(idx + 1, calculate(num, nums[idx], ops[idx - 1]));
  if (idx + 1 <= nums.length - 1) {
    const temp = calculate(nums[idx], nums[idx + 1], ops[idx]);
    dfs(idx + 2, calculate(num, temp, ops[idx - 1]));
  }
};

dfs(1, nums[0]);

console.log(ans);

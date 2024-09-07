const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const arr = [];

for (let i = 0; i < 9; i++) {
  arr.push(Number(input[i]));
}

const selected = [];

const dfs = (idx) => {
  if (
    selected.reduce((acc, cur) => acc + cur, 0) === 100 &&
    selected.length === 7
  ) {
    selected.sort((a, b) => a - b);
    console.log(selected.join('\n'));

    process.exit();
  }

  for (let i = idx; i < 9; i++) {
    selected.push(arr[i]);
    dfs(i + 1);
    selected.pop();
  }
};

dfs(0);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

while (true) {
  const [n, ...arr] = input[line++].split(' ').map(Number);
  if (n === 0) return;

  arr.sort((a, b) => a - b);

  const selected = [];
  const dfs = (depth, start) => {
    if (depth === 7) {
      console.log(selected.join(' '));
      return;
    }

    for (let i = start; i < n; i++) {
      selected.push(arr[i]);
      dfs(depth + 1, i + 1);
      selected.pop();
    }
  };
  dfs(1, 0);
  console.log();
}

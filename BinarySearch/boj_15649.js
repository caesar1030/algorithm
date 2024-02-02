const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);

const visited = new Array(n + 1).fill(false);

const bt = (depth, ans) => {
  if (ans.length === m) {
    console.log(ans.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    bt(depth + 1, [...ans, i]);
    visited[i] = false;
  }
};

bt(1, []);

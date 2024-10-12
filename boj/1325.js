const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);

const arr = [...new Array(n)].map(() => []);
const visited = [...new Array(n)].fill(false);

for (let i = 0; i < m; i++) {
  const [dest, start] = input[line++].split(' ').map(Number);
  arr[start - 1].push(dest - 1);
}

const dfs = (now) => {
  let rv = 1;
  visited[now] = true;
  arr[now].forEach((next) => {
    if (visited[next]) return;
    rv += dfs(next);
  });

  return rv;
};

let max = 0;
let ans = [];

for (let i = 0; i < n; i++) {
  visited.fill(false);
  const res = dfs(i);

  if (res > max) {
    max = res;
    ans = [i + 1];
  } else if (res === max) {
    ans.push(i + 1);
  }
}

console.log(ans.sort((a, b) => a - b).join(' '));

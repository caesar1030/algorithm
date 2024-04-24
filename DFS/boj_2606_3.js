const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const m = +input[line++];

const graph = [...new Array(n)].map(() => new Array(n).fill(false));
const visited = new Array(n).fill(false);

for (let i = 0; i < m; i++) {
  const [a, b] = input[line++].split(' ').map(Number);
  graph[a - 1][b - 1] = true;
  graph[b - 1][a - 1] = true;
}

const ans = [];

const dfs = (now) => {
  for (let i = 0; i < n; i++) {
    if (!graph[now][i]) continue;
    if (visited[i]) continue;

    visited[i] = true;
    ans.push(i);
    dfs(i);
  }
};

visited[0] = true;
dfs(0);

console.log(ans.length);

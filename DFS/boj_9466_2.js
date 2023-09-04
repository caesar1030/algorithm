const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let t = +input[0];
let line = 1;

while (t--) {
  const n = +input[line];

  const graph = new Array(n + 1);
  const visited = new Array(n + 1).fill(0);

  input[line + 1].split(' ').forEach((val, idx) => {
    graph[idx + 1] = +val;
  });

  let sum = 0;

  const dfs = (now) => {
    visited[now] = 1;

    let next = graph[now];

    if (visited[next] === 0) {
      dfs(next);
    }

    if (visited[next] === 1) {
      while (next !== now) {
        ++sum;
        next = graph[next];
      }
      ++sum;
    }

    visited[now] = 2;
  };

  for (let i = 1; i <= n; i++) {
    if (visited[i] === 0) {
      dfs(i);
    }
  }

  console.log(n - sum);
  line += 2;
}

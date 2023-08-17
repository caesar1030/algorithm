const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let line = 0;
let c = 1;
let output = '';
while (true) {
  const [n, m] = input[line].split(' ').map(Number);
  if (n === 0 && m === 0) break;

  const dfs = (v, parent) => {
    visited[v] = true;
    let rv = true;

    for (let next of graph[v]) {
      if (next === parent) continue;

      if (visited[next]) return false;
      if (!dfs(next, v)) rv = false;
    }

    return rv;
  };

  const graph = Array.from(Array(n + 1), () => new Array());
  const visited = Array(n + 1).fill(false);

  for (let i = 1; i <= m; i++) {
    const [a, b] = input[line + i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    if (dfs(i, 0)) ++ans;
  }

  if (ans === 1) {
    output += `Case ${c}: There is one tree.\n`;
  } else if (ans === 0) {
    output += `Case ${c}: No trees.\n`;
  } else {
    output += `Case ${c}: A forest of ${ans} trees.\n`;
  }
  line += m + 1;
  ++c;
}

console.log(output);

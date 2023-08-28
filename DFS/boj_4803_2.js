const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let line = 0;
let caseNum = 1;

while (true) {
  const [n, m] = input[line].split(' ').map(Number);
  if (n === 0 && m === 0) break;

  const graph = Array.from(new Array(n + 1), () => new Array());
  const visited = new Array(n + 1).fill(false);

  for (let i = 1; i <= m; i++) {
    const [v1, v2] = input[line + i].split(' ').map(Number);
    graph[v1].push(v2);
    graph[v2].push(v1);
  }

  const isCyclic = (now, parent) => {
    let rv = false;
    visited[now] = true;

    for (let next of graph[now]) {
      if (next === parent) continue;
      if (visited[next]) {
        rv = true;
        continue;
      }
      if (isCyclic(next, now)) rv = true;
    }

    return rv;
  };

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      if (isCyclic(i, 0)) continue;
      ++ans;
    }
  }

  let description = '';

  if (ans === 0) {
    description = 'No trees.';
  } else if (ans === 1) {
    description = 'There is one tree.';
  } else {
    description = `A forest of ${ans} trees.`;
  }

  console.log(`Case ${caseNum}: ${description}`);
  caseNum++;
  line += m + 1;
}

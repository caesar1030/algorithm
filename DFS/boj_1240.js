// 내 접근법
// 인접 리스트 => dfs 한번당 O(V+E)
// V===N E===N-1
// dfs 한번당 O(N)
// dfs 무식하게 M번 수행하면? O(NM)
// N<=1000 M<=1000

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const graph = Array.from(Array(n + 1), () => new Array());

let ans = [];

const dfs = (s, d, sum, visited) => {
  if (s === d) {
    ans.push('' + sum);
    return;
  }

  visited[s] = true;

  for (let [next, distance] of graph[s]) {
    if (visited[next]) continue;
    dfs(next, d, sum + distance, visited);
  }
};

for (let i = 0; i < n - 1; i++) {
  const [f, t, d] = input[i].split(' ').map(Number);
  graph[f].push([t, d]);
  graph[t].push([f, d]);
}

for (let i = n - 1; i < n - 1 + m; i++) {
  const [s, d] = input[i].split(' ').map(Number);
  dfs(s, d, 0, Array(n + 1).fill(false));
}

console.log(ans.reduce((acc, cur) => acc + cur + '\n', ''));

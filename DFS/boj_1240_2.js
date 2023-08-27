// 14:03 시작
// 14:24 성공

// 시간복잡도 계산
// 인접 리스트 => dfs 1회당 O(V+E)
// V=n<=1000 E=n-1<=999 => O(n)
// m<=1000 => 매번에 대해 dfs O(nm)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = Array.from(Array(n + 1), () => []);

for (let i = 0; i < n - 1; i++) {
  const [f, t, d] = input[1 + i].split(' ').map(Number);
  graph[f].push([t, d]);
  graph[t].push([f, d]);
}

for (let i = n; i < n + m; i++) {
  const [f, t] = input[i].split(' ').map(Number);
  const visited = new Array(n + 1).fill(false);

  let ans = 0;
  const dfs = (now, sum) => {
    if (now === t) {
      ans = sum;
      return;
    }
    visited[now] = true;

    for (const [next, distance] of graph[now]) {
      if (visited[next]) continue;
      dfs(next, sum + distance);
    }
  };

  dfs(f, 0);

  console.log(ans);
}

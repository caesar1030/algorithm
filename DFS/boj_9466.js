// 9시 40분
// 10시 30분 실패
// 방향 그래프의 사이클 판별 알고리즘

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let t = +input.shift();

let line = 0;
while (t--) {
  const n = +input[line];

  const graph = Array.from(Array(n + 1));
  const visited = Array(n + 1).fill(0);

  const students = input[line + 1].split(' ').map(Number);
  for (let i = 1; i <= n; i++) {
    graph[i] = students[i - 1];
  }

  let ans = [];

  const dfs = (now, path) => {
    visited[now] = 1;

    let next = graph[now];

    // 방문 자체를 안함
    if (visited[next] === 0) {
      dfs(next, path);
    }

    // 방문은 했지만 완료는 안됨
    if (visited[next] === 1) {
      while (next !== now) {
        ans.push(next);
        next = graph[next];
      }
      ans.push(next);
    }

    visited[now] = 2;
  };

  for (let i = 1; i <= n; i++) {
    if (visited[i] === 0) dfs(i, []);
  }

  console.log(n - ans.length);

  line += 2;
}

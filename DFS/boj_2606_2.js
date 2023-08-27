// 13:30 시작
// 13:41 성공
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const e = +input[1];

const graph = Array.from(Array(n + 1), () => []);
const visited = new Array(n + 1).fill(false);

for (let i = 0; i < e; i++) {
  const [s, d] = input[i + 2].split(' ').map(Number);

  graph[s].push(d);
  graph[d].push(s);
}

let ans = 0;
const dfs = (start) => {
  visited[start] = true;
  ++ans;

  for (next of graph[start]) {
    if (visited[next]) continue;
    dfs(next);
  }
};

dfs(1);

console.log(ans - 1);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

// 컴퓨터 수
const n = Number(input.shift());
// 간선 수
const x = Number(input.shift());

const graph = Array.from(Array(n + 1), () => new Array());
const visited = Array(n + 1).fill(false);

for (let i = 0; i < x; i++) {
  const [f, t] = input[i].split(' ');

  graph[+f].push(+t);
  graph[+t].push(+f);
}

let ans = 0;

const dfs = (start) => {
  visited[start] = true;

  ++ans;

  for (let next of graph[start]) {
    if (!visited[next]) {
      dfs(next);
    }
  }
};

dfs(1);

console.log(ans - 1);

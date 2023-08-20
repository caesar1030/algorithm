//15:46 시작
//16:01 성공

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const graph = Array(n + 1).fill(0);
const visited = Array(n + 1).fill(0);

let ans = [];
const dfs = (now) => {
  visited[now] = 1;

  let next = graph[now];
  if (visited[next] === 0) {
    dfs(next);
  }

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
  graph[i] = +input[i];
}

for (let i = 1; i <= n; i++) {
  if (visited[i] === 0) {
    dfs(i);
  }
}

console.log(
  ans
    .sort((a, b) => a - b)
    .reduce((acc, cur) => {
      return acc + `${cur}\n`;
    }, `${ans.length}\n`)
);

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const graph = new Array(n + 1);
const visited = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  const num = +input[i];
  graph[i] = num;
}

const ans = [];

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
  if (visited[i] === 0) {
    dfs(i);
  }
}

console.log(ans.length);
console.log(
  ans.sort((a, b) => a - b).reduce((acc, cur) => acc + '' + cur + '\n', '')
);

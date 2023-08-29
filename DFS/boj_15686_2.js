const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = new Array(n);

const houses = [];
const chickens = [];

for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1].split(' ').map(Number);

  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1) {
      houses.push([i, j]);
    } else if (graph[i][j] === 2) {
      chickens.push([i, j]);
    }
  }
}

const selected = [];
let ans = 1e10;
const combi = (start) => {
  if (selected.length === m) {
    let tempAns = 0;
    for (const [hy, hx] of houses) {
      let tempSum = 1e10;
      selected.forEach((idx) => {
        const [cy, cx] = chickens[idx];
        tempSum = Math.min(tempSum, Math.abs(hy - cy) + Math.abs(hx - cx));
      });
      tempAns += tempSum;
    }
    ans = Math.min(tempAns, ans);

    return;
  }

  for (let i = start; i < chickens.length; i++) {
    selected.push(i);
    combi(i + 1);
    selected.pop(i);
  }
};

combi(0);

console.log(ans);

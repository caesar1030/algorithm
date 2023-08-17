const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const h = [];
const c = [];

for (let i = 1; i <= n; i++) {
  const row = input[i].split(' ').map(Number);
  row.forEach((val, j) => {
    if (val === 1) {
      h.push([i - 1, j]);
    }

    if (val === 2) {
      c.push([i - 1, j]);
    }
  });
}

const selectedIdx = [];
let ans = 987654321;
const dfs = (start) => {
  if (selectedIdx.length === m) {
    let temp1 = 0;
    for (const [hr, hc] of h) {
      let temp2 = 987654321;
      selectedIdx.forEach((v) => {
        const [cr, cc] = c[v];
        temp2 = Math.min(Math.abs(hr - cr) + Math.abs(hc - cc), temp2);
      });
      temp1 += temp2;
    }
    ans = Math.min(temp1, ans);
    return;
  }

  for (let i = start; i < c.length; i++) {
    selectedIdx.push(i);
    dfs(i + 1);
    selectedIdx.pop();
  }
};

dfs(0);

console.log(ans);

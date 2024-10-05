const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(' ').map(Number));
}

const selected = [];

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const temp = [...new Array(n)].map(() => new Array(m).fill(0));

let ans = 0;

const dfs = (row, col) => {
  temp[row][col] = 2;

  for (let i = 0; i < 4; i++) {
    const ny = row + dy[i];
    const nx = col + dx[i];

    if (ny >= n || ny < 0 || nx < 0 || nx >= m) continue;
    if (temp[ny][nx] !== 0) continue;
    dfs(ny, nx);
  }
};

const check = () => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      temp[i][j] = arr[i][j];
    }
  }

  for (let i = 0; i < 3; i++) {
    const idx = selected[i];
    const row = Math.floor(idx / m);
    const col = idx % m;

    temp[row][col] = 1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (temp[i][j] !== 2) continue;
      dfs(i, j);
    }
  }

  let num = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (temp[i][j] !== 0) continue;
      num++;
    }
  }

  if (ans < num) {
    ans = num;
  }
};

const combi = (idx) => {
  if (selected.length === 3) {
    check();

    return;
  }

  for (let i = idx; i < n * m; i++) {
    const row = Math.floor(i / m);
    const col = i % m;

    if (arr[row][col] !== 0) continue;

    selected.push(i);
    combi(i + 1);
    selected.pop();
  }
};

combi(0);
console.log(ans);

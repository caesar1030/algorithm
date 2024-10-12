const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const parents = input[line++].split(' ').map(Number);
let root = null;
const node = +input[line++];

const arr = [...new Array(n)].map(() => new Array(n).fill(0));

parents.forEach((parent, idx) => {
  if (parent === -1) {
    root = idx;
    return;
  }

  arr[parent][idx] = 1;
});

const dfs = (now) => {
  let rv = 0;

  arr[now].forEach((possible, next) => {
    if (!possible) return;

    rv += dfs(next);
  });

  if (arr[now].reduce((acc, cur) => acc + cur, 0) === 0) {
    return 1;
  }

  return rv;
};

for (let i = 0; i < n; i++) {
  arr[i][node] = 0;
}
if (node === root) {
  console.log(0);
} else {
  console.log(dfs(root));
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const array = new Array(n).fill(0).map((_, i) => i + 1);

let ans = [];

const permutaition = (arr, fixed) => {
  if (fixed === m) {
    const temp = arr.slice(0, m);
    ans.push(temp.join(' '));

    return;
  }

  for (let i = fixed; i < n; i++) {
    [arr[i], arr[fixed]] = [arr[fixed], arr[i]];
    permutaition(arr, fixed + 1);
    [arr[i], arr[fixed]] = [arr[fixed], arr[i]];
  }
};

permutaition(array, 0);
console.log(
  ans.sort().reduce((acc, cur) => {
    return acc + cur + '\n';
  }, '')
);

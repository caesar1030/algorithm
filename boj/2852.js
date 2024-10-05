const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const MINUTE = 60;
const totalTime = 48 * 60;

const n = +input[line++];

const arr = [0, 0, 0];
const ans = [0, 0, 0];

const tr = (seconds) => {
  return `${(Math.floor(seconds / MINUTE) + '').padStart(2, '0')}:${(
    (seconds % MINUTE) +
    ''
  ).padStart(2, '0')}`;
};

let prevScoreTime = 0;
let winner = 0;
for (let i = 0; i < n; i++) {
  const [team, time] = input[line++].split(' ');

  if (arr[1] > arr[2]) {
    winner = 1;
  } else if (arr[2] > arr[1]) {
    winner = 2;
  } else {
    winner = 0;
  }

  const [minutes, seconds] = time.split(':').map(Number);
  const nowTime = minutes * MINUTE + seconds;

  ans[winner] += nowTime - prevScoreTime;

  prevScoreTime = nowTime;
  arr[+team]++;
}

nowTime = 48 * MINUTE;
if (arr[1] > arr[2]) {
  winner = 1;
} else if (arr[2] > arr[1]) {
  winner = 2;
} else {
  winner = 0;
}
ans[winner] += nowTime - prevScoreTime;

console.log(tr(ans[1]) + '\n' + tr(ans[2]));

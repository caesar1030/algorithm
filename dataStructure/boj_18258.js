const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : './dataStructure/input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = Number(input.shift());

class Queue {
  constructor() {
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }

  push(x) {
    this.data[this.tail] = x;
    ++this.tail;
  }

  pop() {
    if (this.empty()) {
      return -1;
    }
    const rv = this.data[this.head];
    delete this.data[this.head];
    ++this.head;
    return rv;
  }

  size() {
    return this.tail - this.head;
  }

  empty() {
    const flag = this.head === this.tail;
    return flag;
  }

  front() {
    if (this.empty()) {
      return -1;
    }

    return this.data[this.head];
  }

  back() {
    if (this.empty()) {
      return -1;
    }

    return this.data[this.tail - 1];
  }
}

const q = new Queue();

let ans = [];
for (let i = 0; i < n; i++) {
  let cmd = input[i];
  cmd = cmd.split(' ');

  if (cmd[0] === 'push') {
    q.push(cmd[1]);
  } else if (cmd[0] === 'front') {
    ans.push(q.front());
  } else if (cmd[0] === 'back') {
    ans.push(q.back());
  } else if (cmd[0] === 'size') {
    ans.push(q.size());
  } else if (cmd[0] === 'pop') {
    ans.push(q.pop());
  } else if (cmd[0] === 'empty') {
    ans.push(q.empty() ? 1 : 0);
  }
}

console.log(
  ans.reduce((acc, cur) => {
    return acc + cur + '\n';
  }, '')
);

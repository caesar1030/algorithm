// 17:49 시작

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, k] = input[0].split(' ').map(Number);

const visited = new Array(100001).fill(0);

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.tail] = item;
    ++this.tail;
  }

  pop() {
    const item = this.items[this.head];
    delete this.items[this.head];
    ++this.head;
    return item;
  }

  empty() {
    return this.head === this.tail;
  }
}

const bfs = (start, q) => {
  q.push(start);
  visited[start] = 1;

  while (!q.empty()) {
    const now = q.pop();
    if (now === k) return;

    if (!visited[now - 1] && now - 1 >= 0) {
      q.push(now - 1);
      visited[now - 1] = visited[now] + 1;
    }
    if (!visited[now + 1] && now + 1 <= 100000) {
      q.push(now + 1);
      visited[now + 1] = visited[now] + 1;
    }
    if (!visited[now * 2] && now * 2 <= 100000) {
      q.push(now * 2);
      visited[now * 2] = visited[now] + 1;
    }
  }
};

bfs(n, new Queue());

console.log(visited[k] - 1);

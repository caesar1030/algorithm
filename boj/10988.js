const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const str = input[line];
console.log(str === [...str].reduceRight((acc, cur) => acc + cur, '') ? 1 : 0);

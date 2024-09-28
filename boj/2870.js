const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const m = +input[line++];

const ans = [];
for(let i=0; i<m; i++){
    const str = input[line++];

    const temp = str.split(/[a-z]+/).filter((v) => v.length).map(BigInt);
    
    ans.push(...temp);
}

ans.sort((a,b) => a<b?-1:1);

console.log(ans.join("\n"));
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n,c] = input[line++].split(" ").map(Number);
const nums = input[line++].split(" ").map(Number);

const map = {};

for(let i=0; i<n; i++){
    const num = nums[i];
    if(!map[num]){
        map[num] = {
            idx: i,
            bindo: 1
        }
    }else {
        map[num].bindo++;
    }
}

nums.sort((a,b) => {
    if(map[a].bindo === map[b].bindo){
        return map[a].idx - map[b].idx
    }

    return map[b].bindo - map[a].bindo
})

console.log(nums.join(" "))
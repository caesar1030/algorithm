const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let str = input[line++];

while(str !== "end"){
    let monum = 0;
    let jamo3 = 0;
    let double = false;

    const mo = new Set();
    mo.add("a");
    mo.add("e");
    mo.add("i");
    mo.add("o");
    mo.add("u");

    [...str].forEach((char, idx, arr)=>{
        if(mo.has(char)){
            monum++;
        }

        if(mo.has(char)) {
            if(mo.has(arr[idx-1])){
                jamo3++;
                if(jamo3 >= 3) double = true;
            }else {
                jamo3 = 1;
            }
        }else {
            if(mo.has(arr[idx-1])){
                jamo3 = 1;
            }else {
                jamo3++;
                if(jamo3 >= 3) double = true;
            }
        }

        if(char !== "e" && char!=="o"){
            if(arr[idx-1] === char) double = true;
        }
    })

    
    if(monum < 1 || double) console.log(`<${str}> is not acceptable.`)
    else console.log(`<${str}> is acceptable.`)

    str = input[line++]
}
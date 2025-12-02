const fs = require('fs');
const input = fs.readFileSync('./inputs/day2.txt').toString().replace(/\r/g, '').split(',').map((ids)=> ids.split('-'));

function solution1(ranges) {
  let sum = 0;
  for (const range of ranges) {
    const start = parseInt(range[0])
    const end = parseInt(range[1])

    for (let i = start; i <= end; i++) {
      const str = i.toString();
      if (str.length % 2 === 0) {
        const firstHalf = str.slice(0, str.length / 2);
        const secondHalf = str.slice(str.length / 2);

        if (firstHalf[0] !== '0' && secondHalf === firstHalf) {
          sum += i;
        }
      }
    }
  }
  console.log(sum);
}

function solution2(ranges) {
    let sum = 0;
  for (const range of ranges) {
    const start = parseInt(range[0])
    const end = parseInt(range[1])

    for (let i = start; i <= end; i++) {
      const str = i.toString();
      let isInvalid = false;
      for (let j = 0; j < Math.ceil(str.length / 2); j++) {
        const length = j + 1;
        if (str.length % length === 0) {
          const chunks = str.match(new RegExp(`.{1,${length}}`, 'g'));
          if (chunks.length >= 2 && chunks.every(chunk => chunk === chunks[0])) {
            sum += i;
            isInvalid = true;
            break;
          }
        }
      }
    }
  }
  console.log(sum);
}

solution1(input);
solution2(input);
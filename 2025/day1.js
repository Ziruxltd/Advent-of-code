const fs = require('fs');
const input = fs.readFileSync('./inputs/day1.txt').toString().replace(/\r/g, '');
const instructions = input.split('\n').map(instruction => [instruction.slice(0,1), parseInt(instruction.slice(1))]);

function solution1(instructions) {

  let position = 50
  let zeroStayed = 0

  function turn(instruction) {
    const direction = instruction[0];
    let times = instruction.slice(1)[0];
    if (times > 99) times = times % 100;

    if (direction === 'R') {
      position += times;
      if (position > 99) position = position % 100;
    } else if (direction === 'L') {
      position -= times;
      if (position < 0) position = 100 + position;
    }
    if (position === 0) zeroStayed++;
  }


  for (let instruction of instructions) {
    turn(instruction);
  }
  console.log(zeroStayed);
}

function solution2(instructions) {
  let position = 50
  timesVisitedZero = 0;
  
  for (let instruction of instructions) {
    const direction = instruction[0];
    let times = instruction.slice(1)[0];

    for (let i = 0; i < times; i++) {
      if (direction === 'R') {
        position++;
        if (position > 99) position = 0;
        if (position === 0) timesVisitedZero++;
      } else if (direction === 'L') {
        position--;
        if (position < 0) position = 99;
        if (position === 0) timesVisitedZero++;
      }
    }
  }

  console.log(timesVisitedZero);
}

solution1(instructions);
solution2(instructions);
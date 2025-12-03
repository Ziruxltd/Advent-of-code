const fs = require('fs');
const input = fs.readFileSync('./inputs/day3.txt').toString().replace(/\r/g, '');
const ratings = input.split('\n')

function calculateJoltage(bank, length) {
  let maxJoltage = 0;
  
  function recursive(start, current) {
    if (current.length === length) {
      const value = parseInt(current);
      if (value > maxJoltage) {
        maxJoltage = value;
      }
      return;
    }

    if (bank.length - start < length - current.length) {
      return;
    }

    for (let i = start; i < bank.length; i++) {
      recursive(i + 1, current + bank[i]);
    }
  }
  recursive(0, '');
  return maxJoltage;
}

function solution1(ratings) {
  let validJoltages = [];
  for (let i = 0; i < ratings.length; i++) {
    validJoltages.push(calculateJoltage(ratings[i], 2));
  }
  const sum = validJoltages.reduce((acc, curr) => acc + curr, 0);
  console.log(sum);
}

function solution2(ratings) {
  let validJoltages = [];
  for (let i = 0; i < ratings.length; i++) {
    const bank = ratings[i];
    let result = '';
    let startPos = 0;
    
    for (let pos = 0; pos < 12; pos++) {
      const neededAfter = 12 - pos - 1;
      const maxSearchPos = bank.length - neededAfter;
      
      let bestDigit = bank[startPos];
      let bestIndex = startPos;
      
      for (let j = startPos; j < maxSearchPos; j++) {
        if (bank[j] > bestDigit) {
          bestDigit = bank[j];
          bestIndex = j;
        }
      }
      
      result += bestDigit;
      startPos = bestIndex + 1;
    }
    
    validJoltages.push(BigInt(result));
  }
  const sum = validJoltages.reduce((acc, curr) => acc + curr, BigInt(0));
  console.log(sum.toString());
}

solution1(ratings);
solution2(ratings);
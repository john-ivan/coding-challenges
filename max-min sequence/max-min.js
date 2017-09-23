let output = [];

function generateArray(num = 1000, range = 50) {
  if (document.getElementById('array')) {
    output = [];
    document.body.removeChild(document.getElementById('array'));
    if (document.getElementById('results')) document.body.removeChild(document.getElementById('results'));
  }
  for (let i = 0; i < num; i += 1) {
    const multiplier = (2 * range) + 1;
    const randomInt = Math.floor(Math.random() * multiplier) - range;
    output.push(randomInt);
  }
  const div = document.createElement('div');
  div.id = 'array';
  const stringArray = output.join('  ');
  const newContent = document.createTextNode(stringArray);
  // add the text node to the newly created div.
  div.appendChild(newContent);
  // add the newly created element and its content into the DOM
  document.body.appendChild(div);
  console.log(output);
}

function findMaxMinSequence() {
  // track positiveSum, maxSum, negativeSum and minSum;
  let positiveSum = -Infinity;
  let maxSum = -Infinity;
  let negativeSum = Infinity;
  let minSum = Infinity;
  // set variable for start and end index for both
  let maxStart;
  let maxEnd;
  let minStart;
  let minEnd;
  const colors = {};
  // loop through the array
  output.forEach((el, i) => {
    colors[i] = false;
    // compare the current el vs positiveSum + el and store the greater value in a var
    positiveSum = Math.max(el, positiveSum + el);
    // compare the current el vs negativeSum + el and store the lesser value in a var
    negativeSum = Math.min(el, negativeSum + el);
    // if el === positiveSum & greater than the current maxSum, mark i as the new start and end pt
    if (positiveSum === el && positiveSum > maxSum) {
      maxStart = i;
      maxEnd = i;
    }
    // if el === negativeSum & less than the current minSum, mark i as the new start and end pt
    if (negativeSum === el && negativeSum < minSum) {
      minStart = i;
      minEnd = i;
    }
    // compare currentMax to positiveSum and set maxSum to the greater value
    maxSum = Math.max(maxSum, positiveSum);
    // compare currentMin to negativeSum and set minSum to the lesser value
    minSum = Math.min(minSum, negativeSum);
    // if maxSum === positiveSum adjust maxEnd
    if (maxSum === positiveSum) maxEnd = i;
    // if minSum === negativeSum adjust minEnd
    if (minSum === negativeSum) minEnd = i;

    for (let b = maxStart; b <= maxEnd; b += 1) {
      colors[b] = 'blue';
    }

    for (let r = minStart; r <= minEnd; r += 1) {
      if (colors[r] === 'blue') {
        colors[r] = 'violet';
      } else {
        colors[r] = 'red';
      }
    }
  });
  console.log(colors);
  if (output.length && !document.getElementById('results')) {
    // INSERT HIGHLIGHT METHOD HERE
    // remove array from the dom
    document.body.removeChild(document.getElementById('array'));
    const elements = document.createElement('div');
    elements.id = 'array';
    document.body.appendChild(elements);
    for (let j = 0; j < output.length; j += 1) {
      const el = document.createElement('span');
      const text = document.createTextNode(`${output[j]}  `);
      el.appendChild(text);
      if (colors[j]) {
        el.style.color = colors[j];
      }
      elements.appendChild(el);
    }

    const div = document.createElement('h3');
    div.id = 'results';
    const maxMin = document.createTextNode(`Max: ${maxSum} Min: ${minSum}`);
    div.appendChild(maxMin);
    document.body.appendChild(div);
  }
  // return {
  //   max: { maxStart, maxEnd, maxSum },
  //   min: { minStart, minEnd, minSum },
  // };
}

// TESTS
// console.log(maxMinSequence([0, -5, 2, -5, -9]));
// console.log(maxMinSequence([-1, -2, 3]));
// console.log(maxMinSequence([1, -2, 3, 10, -4, 7, -2, -5]));
// console.log(maxMinSequence([15, -20, -5, -10]));
// console.log(maxMinSequence([1, 2, 3, 4, 5]));
// console.log(maxMinSequence([-5, -4, -3, -2, -1]));

// const arr = generateArray(1000, 100);

// NOTES
// 1. (mins only?) function currently returns the longest sequence even if two sequences are equal.

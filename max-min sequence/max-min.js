// variable that stores generated random integers
let output = [];

// FUNCTION - generateArray - called onclick -> Generate Array button
// Purpose: generates an array of random integers and appends it to the DOM
// Parameters:
// num -> desired number of elements of generated array
// range -> +-range of randomized integers e.g. 10 will generate integers from -10 to 10
function generateArray(num = 5, range = 50) {
  // initialize variables to target array and results dom elements
  const array = document.getElementById('array');
  const results = document.getElementById('results');
  // if array is already on HTML reset output and remove element/s
  if (array) {
    output = [];
    document.body.removeChild(array);
    if (results) document.body.removeChild(results);
  }
  // loop till num and generate a random integer within + range and - range
  for (let i = 0; i < num; i += 1) {
    const multiplier = (2 * range) + 1;
    const randomInt = Math.floor(Math.random() * multiplier) - range;
    // push random value to output array
    output.push(randomInt);
  }
  // convert output array into a string with 2 spaces for readability
  const stringArray = output.join(',\u0020\u0020');
  // create div to contain text
  const arrayDiv = document.createElement('div');
  // set id for div
  arrayDiv.id = 'array';
  // create a textnode that contains the string
  const text = document.createTextNode(stringArray);
  // append text to arrayDiv
  arrayDiv.appendChild(text);
  // append div to body
  document.body.appendChild(arrayDiv);
}

// FUNCTION - findMaxMinSequences
// PURPOSE: returns the sum, and the start & end indices of the sequences within an array that add up to the largest and smallest values
// Parameters:
// array -> target array
function findMaxMinSequences(array) {
  // declare variables for positiveSum, maxSum, negativeSum and minSum.
  // initialize positive and max sum to the lowest possible value (-infinity)
  let positiveSum = -Infinity;
  let maxSum = -Infinity;
  // initialize negative and min sum to the highest possible value (infinity)
  let negativeSum = Infinity;
  let minSum = Infinity;
  // set variable for start and end index for both min and max
  let maxStart;
  let maxEnd;
  let minStart;
  let minEnd;
  // loop through the array
  array.forEach((el, i) => {
    // compare the current el vs the sum of the current sequence and store the greater value
    positiveSum = Math.max(el, positiveSum + el);
    // compare the current el vs the sum of the current sequence and store the lesser value
    negativeSum = Math.min(el, negativeSum + el);
    // if the positiveSum is updated with el's value & greater than the current maxSum, reset the seqeunce by adjusting the max's indices
    if (positiveSum === el && positiveSum > maxSum) {
      maxStart = i;
      maxEnd = i;
    }
    // if the negativeSum is updated with el's value & less than the current minSum, reset the seqeunce by adjusting the min's indices
    if (negativeSum === el && negativeSum < minSum) {
      minStart = i;
      minEnd = i;
    }
    // compare currentMax to positiveSum and set maxSum to the greater value
    maxSum = Math.max(maxSum, positiveSum);
    // compare currentMin to negativeSum and set minSum to the lesser value
    minSum = Math.min(minSum, negativeSum);
    // if maxSum is updated and the current element is not 0 and not equal to maxSum, update the index maxEnd
    if (maxSum === positiveSum && maxSum !== el && el !== 0) maxEnd = i;
    // if minSum is updated and the current element is not 0 and not equal to minSum, update the index minEnd
    if (minSum === negativeSum && minSum !== el && el !== 0) minEnd = i;
  });
  // return the final values inside of an object
  return {
    maxStart,
    maxEnd,
    maxSum,
    minStart,
    minEnd,
    minSum,
  };
}

// FUNCTION - assignColors
// Purpose: returns an obj containing color attributes for elements within the max and min sequences, key = index, value = color
// Parameters:
// maxStart & maxEnd -> start and end indices for sequence that generates the largest sum
// minStart & minEnd -> start and end indices for sequence that generates the smallest sum
function assignColors(maxStart, maxEnd, minStart, minEnd) {
  // create an object to store colors
  const colors = {};
  // loop through appropriate indices and store appropriate color for each sequence
  for (let b = maxStart; b <= maxEnd; b += 1) {
    colors[b] = 'blue';
  }
  for (let r = minStart; r <= minEnd; r += 1) {
    // if a key has already been saved, this indicates an overlap and thus will be colored violet, a mix of red and blue
    if (colors[r]) {
      colors[r] = 'violet';
    } else {
      colors[r] = 'red';
    }
  }
  // return the object with the color assignments
  return colors;
}

// FUNCTION - applyChangesToDOM
// Purpose: adds color to min and max sequences and appends a results div to the DOM
// Parameters:
// maxStart, maxEnd, maxSum, minStart, minEnd, minSum -> indices and summated values of max and min sequences
// colors -> object which contains color assignments
function applyChangesToDOM(maxStart, maxEnd, maxSum, minStart, minEnd, minSum, colors) {
  // declare constants targeting the array and results divs
  const array = document.getElementById('array');
  const results = document.getElementById('results');
  // if array has been generated and results has not
  if (array && !results) {
    // remove array
    document.body.removeChild(array);
    // create a new div container
    const styledArray = document.createElement('div');
    // assign it an id of 'array'
    styledArray.id = 'array';
    // append the new div to the document body
    document.body.appendChild(styledArray);
    // loop through the output
    for (let j = 0; j < output.length; j += 1) {
      // create a text node for each output element
      // if on the last element, remove the comma from the template literal
      let text = (j !== output.length - 1) ? `${output[j]},\u0020\u0020` : `${output[j]}`;
      text = document.createTextNode(text);
        // if the colors object contains a key that matches the current index
      if (colors[j]) {
        // create a span tag
        const span = document.createElement('span');
        // style it with the appropriate color value
        span.style.color = colors[j];
        // append the text to the span
        span.appendChild(text);
        // append the span to the new array div
        styledArray.appendChild(span);
      } else {
        // else simply append the text to the new styledArray div
        styledArray.appendChild(text);
      }
    }
    // create a new div for results
    const resultsDiv = document.createElement('div');
    // give it an id of 'results
    resultsDiv.id = 'results';
    // create two p tags for min and max
    const max = document.createElement('p');
    const min = document.createElement('p');
    // create text to display a summary of results
    const maxText = document.createTextNode(`MAX: start index = ${maxStart} end index = ${maxEnd} Sum = ${maxSum}`);
    const minText = document.createTextNode(`MIN: start index = ${minStart} end index = ${minEnd} Sum = ${minSum}`);
    // append text
    max.appendChild(maxText);
    min.appendChild(minText);
    // color text with the appropriate color, blue for max, red for min
    max.style.color = 'blue';
    min.style.color = 'red';
    // append to the results div
    resultsDiv.appendChild(max);
    resultsDiv.appendChild(min);
    // create another p tag for a note
    const noteOverlaps = document.createElement('p');
    // create a text node that explains why there are violet colored elements
    const noteText = document.createTextNode('*elements colored purple indicate overlapping indices.');
    // append text to p tag
    noteOverlaps.appendChild(noteText);
    // style note element
    noteOverlaps.style.color = 'violet';
    // append note to resultsDiv
    resultsDiv.appendChild(noteOverlaps);
    // append resultsDiv to the document body
    document.body.appendChild(resultsDiv);
  }
}

// FUNCTION - generateResults - called onclick -> Find Max and Min Sequences button
// Purpose: calls helper functions to: find max min sequences -> assign colors -> apply changes
function generateResults() {
  // deconstruct return value of findMaxMinSequences to its appropriate variable names
  const {
    maxStart,
    maxEnd,
    maxSum,
    minStart,
    minEnd,
    minSum,
  } = findMaxMinSequences(output);
  // declare a variable to store the returned colors object
  const colors = assignColors(maxStart, maxEnd, minStart, minEnd);
  // manipulate the DOM, passing in the stored constants as arguments
  applyChangesToDOM(maxStart, maxEnd, maxSum, minStart, minEnd, minSum, colors);
}

// TESTS for findMaxMinSequences

// // all positive integers
// console.log(findMaxMinSequences([1, 2, 3, 4]));
// // maxStart: 0, maxEnd: 3, maxSum: 10, minStart: 0, minEnd: 0, minSum: 1

// // all negative integers
// console.log(findMaxMinSequences([-15, -20, -5, -10]));
// // maxStart: 2, maxEnd: 2, maxSum: -5, minStart: 0, minEnd: 3, minSum: -50

// // mix of positive and negative integers
// console.log(findMaxMinSequences([0, -15, 2, 5, -9]));
// // maxStart: 2, maxEnd: 3, maxSum: 7, minStart: 1, minEnd: 4, minSum: -17
// console.log(findMaxMinSequences([1, -2, 3, 10, -4, 7, -2, -5]));
// // maxStart: 2, maxEnd: 5, maxSum: 16, minStart: 4, minEnd: 7, minSum: -7

// // greatest and least sums found at both endpoints
// console.log(findMaxMinSequences([12, -19, -38, -30, 12]));
// // maxStart: 0, maxEnd: 0, maxSum: 12, minStart: 1, minEnd: 3, minSum: -87
// console.log(findMaxMinSequences([-12, 19, 38, 30, -12]));
// // maxStart: 1, maxEnd: 3, maxSum: 87, minStart: 0, minEnd: 0, minSum: -12

// // two sequences that generate the same max and min sum
// console.log(findMaxMinSequences([12, 0, 12, -30, 24]));
// // maxStart: 0, maxEnd: 2, maxSum: 24, minStart: 3, minEnd: 3, minSum: -30
// console.log(findMaxMinSequences([-12, 0, -12, 30, -24]));
// // maxStart: 3, maxEnd: 3, maxSum: 30, minStart: 0, minEnd: 2, minSum: -24

// // sequence with 0 at endpts
// console.log(findMaxMinSequences([0, -15, 2, 5, -9, 0]));
// // maxStart: 2, maxEnd: 3, maxSum: 7, minStart: 1, minEnd: 4, minSum: -17

/* NOTES
1. max-min function currently returns the longest sequence not including 0 values at the start and endpoints of a sequence even if more than two sequences are equal.
2. if an array's max or min sum is a single element and that appears more than once in the array only the first instance will have its indices tracked.
3. output is declared globally for ease of access, alternatively we can pull data from the 'array' div
*/

// Create a 'spacify' function directly on the String object that returns the same string with each character separated by a space. E.g.:
//
// 'hello world'.spacify(); //'h e l l o   w o r l d'

String.prototype.spacify = function() {
  return this.split('').join(' ');
};

// console.log('hello world'.spacify())

// In the front-end language of your choice, implement the following: given a list of integers, take each integer in that list and double it, then square the doubled value, then as output, sum together all the squared values. E.g.:
//
// doubleSquareSum [1] // 4
// doubleSquareSum [1, 2] // 20
// doubleSquareSum [1, 2, 3] // 56
// doubleSquareSum [1, 2, 3, 4] // 120

function doubleSquareSum(intArray) {
    // ensure intArray is an array
  if (!Array.isArray(intArray)) return 'invalid input';
    // loop through intArray
    // double and square each value
    // add each value to output
    // return output
    // use Reduce
  return intArray.reduce((acc, curr) => {
    return Math.pow(curr * 2, 2) + acc;
  }, 0);
}
// console.log(doubleSquareSum([1]))

// polyfill the reduce, map and filter functions onto the Array object

Array.prototype.reduced = function(callback, start){
  let acc;
  let i;
  // if start is undefined set start to 0th element
  start === undefined ? acc = this[0] : acc = start;
  // adjust i value accordingly
  acc === start ? i = 0 : i = 1;
  // loop through and assign acc to result of calling
  // callback on acc and the current i value
  for (i; i < this.length; i += 1) {
    acc = callback(acc, this[i]);
  }
  // return acc
  return acc;
};

// console.log([1,2,3].reduced((a,c)=> {return a+c},1))

Array.prototype.mapped = function(callback){
  // declare new output array
  const output = [];
  // loop through array and call callback on each one and push to output array
  for (let i = 0; i < this.length; i += 1) {
    output.push(callback(this[i]));
  }
  return output;
};

// console.log([1,2,3].mapped((a)=> {return a+1}))

Array.prototype.filtered = function(callback){
  // declared filtered array
  const filtered = [];
  // loop through each element
  for (let i = 0; i < this.length; i += 1) {
    // call callback on each element if true push into filtered arr
    if (callback(this[i])) filtered.push(this[i]);
  }
  // return filtered
  return filtered;
};

// console.log([1,2,3,4].filtered((a)=> { return a % 2 === 0}))

// Suppose you have this code:
//
// var nodes = document.getElementsByTagName('button');
// for (var i = 0; i < nodes.length; i++) {
//    nodes[i].addEventListener('click', function() {
//       console.log('Element #' + i);
//    });
// }
//
// What is the console output when the first and the fourth buttons are clicked, and why?

// nodes returns an array of elements with the button tag
// var nodes = document.getElementsByTagName('button');
// // nodes array is looped through and an event listener is added to click behavior
// for (var i = 0; i < nodes.length; i++) {
//    nodes[i].addEventListener('click', function() {
//        // clicks console.log 'Element #' + i
//       console.log('Element #' + i);
//    });
// }

// it would log Element #0 for the 1st button and Element #3 for the fourth button
// because the node array would start at i = 0

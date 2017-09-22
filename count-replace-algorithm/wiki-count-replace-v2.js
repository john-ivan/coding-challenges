// METHODOLOGY
// Create a data structure for banned words
// Create a function to fetch top 100 words from wiki page, add to bannedWords array
// Create a function count and replace to count word appearance and replace with counted value
// Pull bodyContent and split into an array of words
// Loop through the array and use a counter to track word appearances
// Replace top 25 words inline with their corresponding counts

// TALKING POINT - Vanilla vs jQuery
// TALKING POINT
// - MY APPROACH > EXPLORATORY IF ABLE > BASIC FUNCTIONALITY, TEST & QA -> REFACTOR MERCILESSLY

// append jQuery script to current web page --> not necessary
// const scr = document.createElement('script');
// scr.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
// document.body.appendChild(scr);

// create an object to contain banned words - TALKING POINT
const bannedWords = {
  are: true,
  is: true,
  where: true,
  was: true,
};

// create a new promise that fetches top 100 words - TALKING POINT
const fetchTop100 = new Promise((resolve) => {
  $.get('https://en.wikipedia.org/wiki/Most_common_words_in_English', (res) => {
    const data = $.parseHTML(res);
    // selectively target elements where words are located
    const words = $(data).find('.columns-5').find('li');
    // loop through array of nodes
    for (let i = 0; i < words.length; i += 1) {
      // TALKING POINT INNERTEXT VS TEXTCONTENT
      const word = words[i].textContent;
      // if word is not a dup store it in into bannedWords
      if (!bannedWords[word]) {
        bannedWords[word] = true;
      }
    }
    // if get request is succesful > resolve
    resolve();
  });
});

// function to select only text nodes by using a treewalker
function textNodesUnder(target) {
  let node;
  const textNodes = [];
  // TALKING POINT TREEWALKER METHOD OF THE DOCUMENT OBJECT OF THE WEB API
  const walk = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null, false);
  while (node = walk.nextNode()) textNodes.push(node);
  return textNodes;
}

function countReplaceTop25() {
  // create store to keep track of word instances
  const store = {};
  // select body inner text
  const textContent = document.body.textContent;

  // filter out non a-z characters, change to lower case, and split into an array
  const bodyContent = textContent
    .replace(/[^a-zA-Z ]/g, '')
    .toLowerCase()
    .split(' ');

  // loop through body content
  for (let i = 0; i < bodyContent.length; i += 1) {
    const word = bodyContent[i];
    // if element is not banned, and its length is greater than 1 check store
    if (!bannedWords[word] && word.length > 1) {
      // if in store increment count property by 1
      if (store[word]) {
        store[word].count += 1;
      } else {
        // else store set word property as word and count as 1
        store[word] =
        { word,
          count: 1 };
      }
    }
  }
  // order stored value by occurence
  const ordered = Object.values(store).sort((a, b) => b.count - a.count);

  // slice off largest elements
  let sliceEnd = 25;
  // if elements above the 25th element have the same count increment the end of the slice
  while (ordered[sliceEnd].count === ordered[24].count) sliceEnd += 1;
  const mostUsedWords = ordered.slice(0, sliceEnd);

  // call textNodesUnder on content div to generate an array of only text nodes

  // TALKING POINT - the importance of targeting text nodes
  const textNodes = textNodesUnder(document.body);

  // loop through array of most used words
  for (let i = 0; i < mostUsedWords.length; i += 1) {
    const word = mostUsedWords[i].word;
    const count = mostUsedWords[i].count;

    // create a new regex object to target each word
    const targetWord = new RegExp(`\\b${word}\\b`, 'ig');

    // loop through each textNode and replace nodeValue with the its proper count
    textNodes.forEach((text) => {
      text.nodeValue = text.nodeValue.replace(targetWord, count);
    });
  }
}

// call fetchtop100 and then count and replace on the webpage
const t0 = performance.now()
fetchTop100.then(() => {
  countReplaceTop25()
  const t1 = performance.now()
console.log(`Call to countReplaceTop25 took ${(t1 - t0)} milliseconds.`)
});

// POSSIBLE IMPROVEMENTS
// Storage of banned words for successive uses
// Generalizing to enable the function to be run by any website
// Performance improvements by coding in Vanilla
// Style - airBnB but I'm open to other coding formats that will better my code

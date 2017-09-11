// METHODOLOGY
// Create an array for banned words
// Create a function to fetch top 100 words from wiki page, add to bannedWords array
// Create a function count and replace to count word appearance and replace with counted value
// Pull bodyContent and split into an array of words
// Loop through the array and use a counter to track word appearances
// Replace top 25 words inline with their corresponding counts

// append jQuery script to current web page
const scr = document.createElement('script');
scr.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
document.body.appendChild(scr);

// create an array to contain banned words
const bannedWords = ['are', 'is', 'where', 'was'];

// create a new promise that fetches top 100 words
const fetchTop100 = new Promise((resolve) => {
  $.get('https://en.wikipedia.org/wiki/Most_common_words_in_English', (res) => {
    const data = $.parseHTML(res);
    // selectively target elements where words are located
    const words = $(data).find('.columns-5').find('li');
    // loop through array of nodes
    for (let i = 0; i < words.length; i += 1) {
      // if word is not a dup push it into bannedWords
      if (!bannedWords.includes(words[i].innerText)) {
        bannedWords.push(words[i].innerText);
      }
    }
    // if get request is succesful > resolve
    resolve();
  });
});

// function to select only text nodes by using a treewalker
function textNodesUnder(el) {
  let n;
  const a = [];
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) a.push(n);
  return a;
}

function countReplaceTop25() {
  // create store to keep track of word instances
  const store = {};
  const pageContent = document.getElementById('content');
  // select body inner text
  const textContent = pageContent.textContent;

  // filter out non a-z characters, change to lower case, and split into an array
  const bodyContent = textContent
    .replace(/[^a-zA-Z ]/g, '')
    .toLowerCase()
    .split(' ');

  // loop through body content
  for (let i = 0; i < bodyContent.length; i += 1) {
    // if element is not banned, and its length is greater than 1 check store
    if (!bannedWords.includes(bodyContent[i]) && bodyContent[i].length > 1) {
      // if in store increment count property by 1
      if (store[bodyContent[i]]) {
        store[bodyContent[i]].count += 1;
      } else {
        // else store set word property as word and count as 1
        store[bodyContent[i]] =
        { word: bodyContent[i],
          count: 1 };
      }
    }
  }
  // order stored value by occurence
  const ordered = Object.values(store).sort((a, b) => b.count - a.count);
  // slice off largest elements
  const top25 = ordered.slice(0, 25);

  // call textNodesUnder on content div to generate an array of only text nodes
  const textNodes = textNodesUnder(document.getElementById('content'));

  // loop through array of top 25 words
  for (let i = 0; i < top25.length; i += 1) {
    // create a new regex object to target each word
    const regex = new RegExp(`\\b${top25[i].word}\\b`, 'ig');

    // loop through each textNode and replace nodeValue with the its proper count
    textNodes.forEach((el) => {
      if (el.nodeValue) el.nodeValue = el.nodeValue.replace(regex, top25[i].count);
    });
  }
}


// call fetchtop100 and then count and replace on the webpage
fetchTop100.then(() => countReplaceTop25());

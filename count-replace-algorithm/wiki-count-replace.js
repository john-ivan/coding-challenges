// METHODOLOGY
// Create an array for banned words
// Create a function to fetch top 100 words from wiki page, add to bannedWords array
// Create a function count and replace to count word appearance and replace with counted value
// Pull bodyContent and split into an array of words
// Loop through the array and use a counter to track word appearances
// Replace top 25 words inline with their corresponding counts

// Add Jquery script
const scr = document.createElement('script');
scr.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
document.body.appendChild(scr);

const bannedWords = ['are', 'is', 'where', 'was'];

// add reject as customary
const fetchTop100 = new Promise((resolve) => {
  $.get('https://en.wikipedia.org/wiki/Most_common_words_in_English', (res) => {
    const data = $.parseHTML(res);
    const words = $(data).find('.columns-5').find('li');
    for (let i = 0; i < words.length; i += 1) {
      if (!bannedWords.includes(words[i].innerText)) {
        bannedWords.push(words[i].innerText);
      }
    }
    resolve('fetch successful');
  });
});

function countReplaceTop25() {
  const store = {};
  const body = document.body;
  const textContent = body.innerText;

  // filter out non a-z characters, change to lower case, and split into an array
  const bodyContent = textContent.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');

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
  const ordered = Object.values(store).sort((a, b) => a.count - b.count);
  // slice of largest elements
  const top25 = ordered.slice((ordered.length - 25), (ordered.length));

  // loop through array of top 25 words
  for (let i = top25.length - 1; i >= 0; i -= 1) {
    // use regex to replace words with their counts
    const regex = new RegExp(`\\b${top25[i].word}\\b`, 'ig');
    body.innerHTML = body.innerHTML.replace(regex, top25[i].count);
  }
}

$(document).ready(() => fetchTop100.then(() => countReplaceTop25()));

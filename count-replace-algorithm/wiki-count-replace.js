// METHODOLOGY
// Create a function count and replace
// Create filter for undesired words
// Create a function to pull top 100 words from wiki page
// Add common words to filter including any single chars
// Extract text from desired wiki page and run it through filter
// Split into words and count
// Replace top 25 words inline with their corresponding counts

// Add Jquery script
const scr = document.createElement("script");
scr.src = "https://code.jquery.com/jquery-3.2.1.min.js";
document.body.appendChild(scr);

const bannedWords = ['are', 'is', 'where', 'was'];

const fetchTop100 = new Promise((resolve) => {
  $.get('https://en.wikipedia.org/wiki/Most_common_words_in_English', (res) => {
    const data = $.parseHTML(res);
    const words = $(data).find('.columns-5').find('li');
    for (let i = 0; i < words.length; i += 1) {
      if (!bannedWords.includes(words[i].innerText)) resolve(bannedWords.push(words[i].innerText));
    }
  });
});

function countReplaceTop25() {
  const store = {};
  const body = document.body;
  const textContent = body.innerText;

  const bodyContent = textContent.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');

  for (let i = 0; i < bodyContent.length; i += 1) {
    // filter out banned words and single chars
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
  console.log(top25);

  // sort by length
  const top25byLength = top25.sort((a, b) => a.word.length - b.word.length);

  // replace with top 25 start from the longest to the shortest to avoid root words
  for (let i = top25byLength.length - 1; i >= 0; i -= 1) {
    const regex = new RegExp(top25[i].word, 'ig');
    body.innerHTML = body.innerHTML.replace(regex, top25byLength[i].count);
  }
}

fetchTop100.then(() => countReplaceTop25());

// KNOWLEDGE TO EXPLORE
// cors /no cors etc (setting headers)
// using fetch API do to the same as jquery
// Use Vanilla JS to do the fetch
// innertext vs textContent
// filter out images or remove
// review and refactore for time and space complexity

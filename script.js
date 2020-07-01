const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loadQuote() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  if (quoteContainer.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuote() {
  loadQuote();
  const proxyURL = 'https://jacinto-cors-proxy.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-text');
    } else {
      quoteText.classList.remove('long-text');
    }

    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    quoteText.innerText = data.quoteText;
    loadingComplete();
  } catch (error) {
    getQuote();
  }
}

newQuoteBtn.addEventListener('click', () => {
  getQuote();
});

twitterBtn.addEventListener('click', () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(tweetURL, '_blank');
});

getQuote();

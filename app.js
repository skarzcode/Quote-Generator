
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// show Loading
function Loading(){
    loader.hidden = false
    quoteContainer.hidden = true;
};

// hide loading
function complete (){
    loader.hidden = true;
    quoteContainer.hidden = false;  
};

// show New Quote
function newQuote(response){
    Loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent=quote.author;
    quoteText.textContent= quote.text;
    if(!quote.author){
        authorText.textContent="Unknown";
    } else {
        authorText.textContent= quote.author;
    };
    

    // check quote length to determine styling/font size
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote'); 
    }
    quoteText.textContent= quote.text;
    complete()
}


// Get Quotes From API
async function getQuotes(){
    Loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
    } catch(error){

    }
}

// to tweet fucntion

function tweetQuote () {
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
window.open(twitterUrl, '_blank');
};

// Loading New Quote && tweeting function

newQuoteBtn.addEventListener("click",  newQuote);

  twitterBtn.addEventListener("click", tweetQuote);
 



// On Load 
getQuotes();

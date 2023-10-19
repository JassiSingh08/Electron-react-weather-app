import React, { useState } from "react";

const Quotes = () => {

  async function clicked(args) {
    const result = await window.myApp.sayHello(args);
    console.log(result, "3");
  }

  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  const getRandomQuote = (data) => {
    if (data.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };

  const removeTypeFit = (author) => {
    return author.replace(", type.fit", "");
  };

  const RandomQuotes = async () => {
    try {
      const res = await fetch("https://type.fit/api/quotes");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const randomQuote = getRandomQuote(data);
      
      if (randomQuote) {
        randomQuote.author = removeTypeFit(randomQuote.author);
        setQuotes([randomQuote]);
        clicked({randomQuote});
        

        setError(null);
      } else {
        setQuotes([]);
        setError("No quotes available at the moment.");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuotes([]);
      setError("API request failed");
    }
  };

  return (
    <div className="flex flex-col justfy-center items-center">
      <div>Want to read some random quotes?</div>
      <button
        className="bg-blue-500 text-white rounded-full text-l p-4"
        onClick={RandomQuotes}
      >
        Click Here
      </button>

      {quotes.length > 0 && (
        <div className="mt-4">
          {quotes.map((quote, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-center">
                {quote.text} ~ {quote.author}
              </h3>
            </div>
          ))}
        </div>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default Quotes;

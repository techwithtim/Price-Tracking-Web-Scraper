import React, { useState, useEffect } from "react";
import SearchTextList from "./components/SearchTextList";
import PriceHistoryTable from "./components/PriceHistoryTable";

const URL = "http://localhost:5000";

function App() {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    fetchUniqueSearchTexts();
  }, []);

  const fetchUniqueSearchTexts = async () => {
    try {
      const response = await fetch(`${URL}/unique_search_texts`);
      const data = await response.json();
      setSearchTexts(data);
    } catch (error) {
      console.error("Error fetching unique search texts:", error);
    }
  };

  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await fetch(`${URL}/results?search_text=${searchText}`);
      const data = await response.json();
      setPriceHistory(data);
      setShowPriceHistory(true);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  const handlePriceHistoryClose = () => {
    setShowPriceHistory(false);
    setPriceHistory([]);
  };

  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${URL}/start-scraper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_text: newSearchText,
          url: "https://amazon.ca",
        }),
      });

      if (response.ok) {
        alert("Scraper started successfully");
        setSearchTexts([...searchTexts, newSearchText]);
        setNewSearchText("");
      } else {
        alert("Error starting scraper");
      }
    } catch (error) {
      alert("Error starting scraper:", error);
    }
  };

  return (
    <div className="main">
      <h1>Product Search Tool</h1>
      <form onSubmit={handleNewSearchTextSubmit}>
        <label>Search for a new item:</label>
        <input
          type="text"
          value={newSearchText}
          onChange={handleNewSearchTextChange}
        />
        <button type="submit">Start Scraper</button>
      </form>
      <SearchTextList
        searchTexts={searchTexts}
        onSearchTextClick={handleSearchTextClick}
      />
      {showPriceHistory && (
        <PriceHistoryTable
          priceHistory={priceHistory}
          onClose={handlePriceHistoryClose}
        />
      )}
    </div>
  );
}

export default App;

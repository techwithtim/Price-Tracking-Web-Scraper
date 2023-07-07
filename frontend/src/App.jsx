import React, { useState, useEffect } from "react";
import SearchTextList from "./components/SearchTextList";
import PriceHistoryTable from "./components/PriceHistoryTable";
import axios from "axios";
import TrackedProductList from "./components/TrackedProductList";
import "./App.scss";

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
      const response = await axios.get(`${URL}/unique_search_texts`);
      const data = response.data;
      setSearchTexts(data);
    } catch (error) {
      console.error("Error fetching unique search texts:", error);
    }
  };

  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await axios.get(
        `${URL}/results?search_text=${searchText}`
      );

      const data = response.data;
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
      await axios.post(`${URL}/start-scraper`, {
        search_text: newSearchText,
        url: "https://amazon.ca",
      });

      alert("Scraper started successfully");
      setSearchTexts([...searchTexts, newSearchText]);
      setNewSearchText("");
    } catch (error) {
      alert("Error starting scraper:", error);
    }
  };

  return (
    <main className="scrapper__container">
      <header className="scrapper__header">
        <h1 className="title">Product Search Tool</h1>
      </header>
      <section className="scrapper__section">
        <form onSubmit={handleNewSearchTextSubmit} className="scrapper__search">
          <div className="form__input">
            <input
              type="text"
              id="search-text"
              className="input"
              value={newSearchText}
              onChange={handleNewSearchTextChange}
            />
            <label>Search for a new item</label>
          </div>
          <button type="submit" className="btn">
            Start Scraper
          </button>
        </form>
        <SearchTextList
          searchTexts={searchTexts}
          onSearchTextClick={handleSearchTextClick}
        />
        <TrackedProductList />
        {showPriceHistory && (
          <PriceHistoryTable
            priceHistory={priceHistory}
            onClose={handlePriceHistoryClose}
          />
        )}
      </section>
    </main>
  );
}

export default App;

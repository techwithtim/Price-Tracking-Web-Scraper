import React, { useState, useEffect } from "react";
import SearchTextList from "./components/SearchTextList";
import PriceHistoryTable from "./components/PriceHistoryTable";

const URL = "http://localhost:5000";

function App() {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

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

  return (
    <div className="main">
      <h1>Product Search Tool</h1>
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

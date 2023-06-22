import React from 'react';

function SearchTextList({ searchTexts, onSearchTextClick }) {
  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {searchTexts.map((searchText, index) => (
          <li key={index} onClick={() => onSearchTextClick(searchText)}>
            <button>{searchText}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTextList;

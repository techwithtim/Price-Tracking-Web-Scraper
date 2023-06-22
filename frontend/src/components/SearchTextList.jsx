import React from 'react';

function SearchTextList({ searchTexts, onSearchTextClick }) {
  return (
    <div>
      <h2>Unique Search Texts:</h2>
      <ul>
        {searchTexts.map((searchText, index) => (
          <li key={index} onClick={() => onSearchTextClick(searchText)}>
            {searchText}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTextList;

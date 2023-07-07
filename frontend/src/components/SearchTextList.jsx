import React from "react";

function SearchTextList({ searchTexts, onSearchTextClick }) {
  return (
    <div>
      <h2>All Products</h2>
      <ul className="product-list">
        {searchTexts.map((searchText, index) => (
          <li
            className="product-list__item"
            key={index}
            onClick={() => onSearchTextClick(searchText)}
          >
            <button className="btn btn--chip">{searchText}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTextList;

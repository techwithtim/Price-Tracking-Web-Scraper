import React from "react";

function PriceHistoryTable({ priceHistory, onClose }) {
  const getPriceData = (product) => {
    return product.priceHistory[0];
  };

  const getPriceChange = (product) => {
    if (product.priceHistory.length < 2) return 0;
    const currentPrice = product.priceHistory[0].price;
    const lastPrice = product.priceHistory[1].price;
    const change = 100 - (currentPrice / lastPrice) * 100;
    return change;
  };

  return (
    <div>
      <h2>Price History</h2>
      <table>
        <thead>
          <tr className="row">
            <th>Updated At</th>
            <th colspan={3}>Name</th>
            <th>URL</th>
            <th>Price</th>
            <th>Price Change</th>
          </tr>
        </thead>
        <tbody>
          {priceHistory.map((product) => {
            const priceData = getPriceData(product);
            const change = getPriceChange(product);
            console.log(priceData);

            return (
              <tr key={product.url} className="row">
                <td>{priceData.date}</td>
                <td colspan={3}>{product.name}</td>
                <td>
                  <a href={`${product.source}${product.url}`}>Click to view</a>
                </td>
                <td>${priceData.price}</td>
                <td style={change > 0 ? { color: "red" } : { color: "green" }}>
                  {change >= 0 ? "+" : "-"}
                  {change}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default PriceHistoryTable;

import React, { useState } from "react";
import ModalComponent from './Modal';
import ProductDetailsPage from "./ProductDetailsPage";

function PriceHistoryTable({ priceHistory, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({})

  const openModal = (product) => {
    setCurrentProduct(product)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPriceData = (product) => {
    return product.priceHistory[0];
  };

  const getPriceChange = (product) => {
    if (product.priceHistory.length < 2) return 0;
    const currentPrice = product.priceHistory[0].price;
    const lastPrice = product.priceHistory[1].price;
    const change = 100 - (currentPrice / lastPrice) * 100;
    return Math.round(change * 100) / 100;
  };

  return (
    <div>
      <h2>Price History</h2>
      <table>
        <thead>
          <tr className="row">
            <th>Updated At</th>
            <th>Name</th>
            <th>Price</th>
            <th>Price Change</th>
          </tr>
        </thead>
        <tbody>
          {priceHistory.map((product) => {
            const priceData = getPriceData(product);
            const change = getPriceChange(product);

            return (
              <tr key={product.url} className="row">
                <td>{priceData.date}</td>
                <td ><a onClick={() => openModal(product)}>{product.name}</a></td>
                <td>${priceData.price}</td>
                <td style={change > 0 ? { color: "red" } : { color: "green" }}>
                  {change >= 0 && "+" }
                  {change}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={<ProductDetailsPage product={currentProduct} />}
      />
    </div>
  );
}

export default PriceHistoryTable;

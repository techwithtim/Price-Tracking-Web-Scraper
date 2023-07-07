import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackedProductList = () => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [newTrackedProduct, setNewTrackedProduct] = useState("");

  useEffect(() => {
    fetchTrackedProducts();
  }, []);

  const fetchTrackedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracked-products"
      );

      setTrackedProducts(response.data);
    } catch (error) {
      console.error("Error fetching tracked products:", error);
    }
  };

  const handleNewTrackedProductChange = (event) => {
    setNewTrackedProduct(event.target.value);
  };

  const handleAddTrackedProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/add-tracked-product",
        {
          name: newTrackedProduct,
        }
      );
      const { id } = response.data;
      setTrackedProducts((prevProducts) => [
        ...prevProducts,
        { id, name: newTrackedProduct, tracked: true },
      ]);
      setNewTrackedProduct("");
    } catch (error) {
      console.error("Error adding tracked product:", error);
    }
  };

  const handleToggleTrackedProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/tracked-product/${productId}`);
      setTrackedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, tracked: !product.tracked }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling tracked product:", error);
    }
  };

  return (
    <div className="section-wrapper">
      <h2>Tracked Products</h2>
      <ul className="tracked-products">
        {trackedProducts.map((product) => (
          <label htmlFor={product.id}>
            <li key={product.id} className="tracked-products__item">
              <span>{product.name}</span>
              <input
                type="checkbox"
                id={product.id}
                onChange={() => handleToggleTrackedProduct(product.id)}
                checked={product.tracked}
              />
            </li>
          </label>
        ))}
      </ul>

      <div className="input-button-wrapper">
        <div className="form__input">
          <input
            type="text"
            value={newTrackedProduct}
            onChange={handleNewTrackedProductChange}
          />
          <label>Add Tracked Product</label>
        </div>
        <button onClick={handleAddTrackedProduct} className="btn">
          Add
        </button>
      </div>
    </div>
  );
};

export default TrackedProductList;

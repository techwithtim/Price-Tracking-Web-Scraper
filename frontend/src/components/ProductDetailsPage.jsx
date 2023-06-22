import React from "react";
import ApexCharts from "react-apexcharts";

const ProductDetailsPage = ({ product }) => {
  const {
    name,
    url: productUrl,
    img,
    source,
    created_at: createdAt,
    priceHistory,
  } = product;

  const dates = priceHistory.map((history) =>
    new Date(history.date).toLocaleDateString("en-US")
  );
  const prices = priceHistory.map((history) => history.price);

  const chartData = {
    options: {
      chart: {
        id: "price-chart",
      },
      xaxis: {
        categories: dates, // Example categories (dates)
      },
    },
    series: [
      {
        name: "Price",
        data: prices, // Example data
      },
    ],
  };

  return (
    <div>
      <h2>{name}</h2>
      <img src={img} alt="Product" />
      <p>
        URL:{" "}
        <a href={`${source}${productUrl}`} target="_blank">
          View product.
        </a>
      </p>
      <p>
        Source:{" "}
        <a target="_blank" href={source}>
          {source}
        </a>
      </p>
      <p>Newest Price At: {createdAt}</p>
      <h2>Price History</h2>
      <h3>Current Price: ${prices.length > 0 ? prices[0] : "N/A"}</h3>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default ProductDetailsPage;

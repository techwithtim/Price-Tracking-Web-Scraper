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

  function formatDate(date) {
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = date.getMonth() + 1;

    if (gg < 10) gg = "0" + gg;

    if (mm < 10) mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hours < 10) hours = "0" + hours;

    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
  }

  const dates = priceHistory
    .map((history) => formatDate(new Date(history.date)))
    .reverse();
  const prices = priceHistory.map((history) => history.price).reverse();

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
      <h3>
        Current Price: ${prices.length > 0 ? prices[prices.length - 1] : "N/A"}
      </h3>
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

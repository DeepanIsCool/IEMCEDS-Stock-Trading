import React, { useState } from 'react';

const Trading = () => {
  const [stockId, setStockId] = useState('');
  const [stockInfo, setStockInfo] = useState({ price: 'INR' });
  const [buyQuantity, setBuyQuantity] = useState(1);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Fetch stock information based on stockId
    // Example: setStockInfo({ price: 'INR 1000' });
    console.log('Searching for stock:', stockId);
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    // Handle buying stock with buyQuantity
    console.log('Buying stock:', stockId, 'Quantity:', buyQuantity);
  };

  return (
    <div>
      <h1>Trade Stocks</h1>
      <form id="search-stock-form" onSubmit={handleSearchSubmit}>
        <label htmlFor="stockId">Stock ID:</label>
        <input
          type="text"
          id="stockId"
          name="stockId"
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div id="stock-info">
        <h2>Stock Information</h2>
        <p id="price">Price: {stockInfo.price}</p>
      </div>

      <form id="buy-stock-form" onSubmit={handleBuySubmit}>
        <label htmlFor="buy-quantity">Quantity to Buy:</label>
        <input
          type="number"
          id="buy-quantity"
          name="quantity"
          value={buyQuantity}
          onChange={(e) => setBuyQuantity(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default Trading;
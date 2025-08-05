import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stock")
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📈 Live Stock Prices</h1>
      <ul>
        {stocks.map((stock, idx) => (
          <li key={idx}>
            {stock.name} - ₹{stock.price} ({stock.change}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/stock', async (req, res) => {
  const stockName = req.query.name || 'IEX';
  const url = `https://stock.indianapi.in/stock?name=${stockName}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.STOCK_API_KEY
      }
    });

    if (!response.ok) {
      return res.status(400).json({ error: "Upstream API error" });
    }

    const data = await response.json();
    console.log("success");
    res.json(data);
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

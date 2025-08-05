// backend/services/apiService.js
const axios = require('axios');
const https = require('https');

const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'x-api-key': process.env.STOCK_API_KEY
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(`API Fetch Error: ${err.message}`);
  }
};

const stockService = {
  async getStockDetail(name) {
    return await fetchFromAPI(`https://stock.indianapi.in/stock?name=${name}`);
  },
  async getTrendingStock() {
    return await fetchFromAPI('https://stock.indianapi.in/trending');
  },
  async getPriceShockers() {
    return await fetchFromAPI('https://stock.indianapi.in/price_shockers');
  },
  async getBSEMostActive() {    
    return await fetchFromAPI('https://stock.indianapi.in/BSE_most_active');
  },
  async getNSEMostActive() {
    return await fetchFromAPI('https://stock.indianapi.in/NSE_most_active');
  },
  async get52WeekHighLowData() {
    return await fetchFromAPI('https://stock.indianapi.in/fetch_52_week_high_low_data');
  } 
};

const commodityService = {
  async getCommodityDetail() {
    return await fetchFromAPI(`https://stock.indianapi.in/commodities`);
  }
};

const mfService = {
  async getMFs() {
    return await fetchFromAPI(`https://stock.indianapi.in/mutual_funds`);
  },
  async getMFDetails(name) {
    return await fetchFromAPI(`https://stock.indianapi.in/mutual_funds_details?stock_name=${name}`);
  }
};

const ipoService = {
  async getIPOs() {
    return await fetchFromAPI(`https://stock.indianapi.in/ipo`);
  }
};

const newsService = {
  async getNews() {
    return await fetchFromAPI(`https://stock.indianapi.in/news`);
  }
};

module.exports = { fetchFromAPI, stockService, commodityService, mfService, ipoService, newsService };
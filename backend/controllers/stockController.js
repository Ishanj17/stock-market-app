// backend/controllers/stockController.js
const { stockService } = require('../services/apiService');

const stockController = {
  async getStockDetail(req, res) {
    try {
      const name = req.query.name;
      const rawData = await stockService.getStockDetail(name);
      const data = {
        name: rawData.companyName,
        industry: rawData.industry,
        description: rawData.companyProfile.companyDescription,
        peerCompanyList: rawData.companyProfile.peerCompanyList,
        price: rawData.currentPrice,
        risk: rawData.riskMeter.categoryName,
        recentNews: rawData.recentNews,
        yearLow: rawData.yearLow,
        yearHigh: rawData.yearHigh,
        keyMetrics: rawData.keyMetrics
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getTrendingStock(req, res) {
    try {
      const data = await stockService.getTrendingStock();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getPriceShockers(req, res) {
    try {
      const data = await stockService.getPriceShockers();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getBSEMostActive(req, res) {
    try {
      const data = await stockService.getBSEMostActive();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },  
  async getNSEMostActive(req, res) {
    try {
      const data = await stockService.getNSEMostActive();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },  
  async get52WeekHighLowData(req, res) {
    try {
      const data = await stockService.get52WeekHighLowData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }   
};

module.exports = stockController;
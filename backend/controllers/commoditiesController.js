const { commodityService } = require('../services/apiService');

const commodityController = {
  async getCommodityDetail(req, res) {
    try {
      const data = await commodityService.getCommodityDetail();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = commodityController;
const { ipoService } = require('../services/apiService');

const ipoController = {
  async getIPOs(req, res) {
    try {
      const data = await ipoService.getIPOs();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = ipoController;
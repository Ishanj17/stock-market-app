const { mfService } = require('../services/apiService');

const mfController = {
  async getMFs(req, res) {
    try {
      const data = await mfService.getMFs();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getMFDetails(req, res) {
    try {
      const name = req.query.fund_name;
      const data = await mfService.getMFDetails(name);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = mfController;
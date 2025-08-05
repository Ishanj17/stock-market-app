const { newsService } = require('../services/apiService');

const newsController = {
  async getNews(req, res) {
    try {
      const data = await newsService.getNews();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = newsController;
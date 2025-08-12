const { getWatchlistedStock, addStockToWatchlist, removeStockFromWatchlist, checkWatchlistStatus } = require('../models/watchlist');
const { stockService } = require('../services/apiService');

const watchlistController = {
	async getWatchlist(req, res) {
			const {user_id} = req.body;

			try {
					const watchlist = await getWatchlistedStock(user_id);
					console.log(watchlist, 'watchlist');
					if (!watchlist || watchlist.length === 0) {
						return res.json({
							code: 400,
							exists: false,
							message: 'Watchlist does not exist!',
							data: []
						});
					}
					// open apis calls
					const resData = await Promise.all(
						watchlist.map(async (stock) => {
              const tempName = stock.stock_name.replace(/\s+Ltd$/i, '');
							const rawData = await stockService.getStockDetail(tempName);
              if (!rawData.companyProfile) {
                return null;
              }
							return {
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
							};
						})
					);
					return res.json({
						code: 200,
						exists: true,
						message: 'Watchlist fetched successfully!',
						data: resData
					});
			} catch(error) {
					console.log(error, 'error while fetching watchlist');
					return res.status(500).json({ code: 400, error: 'Internal Server Error' });
			}
	},
	async addToWatchlist(req, res) {
		const {user_id, stock_name} = req.body;
		console.log(user_id, stock_name, 'user_id and stock_name');

		try {
				const watchlist = await addStockToWatchlist(user_id, stock_name);
				console.log(watchlist, 'watchlist');
				if(watchlist === 1) {
					return res.json({
						code: 200,
						exists: true,
						message: 'Stock added to watchlist successfully!',
					});
				}
				return res.json({
					code: 200,
					exists: true,
					message: 'Stock not added to watchlist!',
				});
		} catch(error) {
				console.log(error, 'error while fetching watchlist');
				return res.status(500).json({ code: 400, error: 'Internal Server Error' });
		}
  },
	async removeFromWatchlist(req, res) {
		const {user_id, stock_name} = req.body;
		console.log(user_id, stock_name, 'user_id and stock_name');

		try {
			const watchlist = await removeStockFromWatchlist(user_id, stock_name);
			if(watchlist === 1) {
				return res.json({
					code: 200,
					exists: true,
					message: 'Stock removed from watchlist successfully!',
				});
			}
			return res.json({
				code: 200,
				exists: true,
				message: 'Stock not removed from watchlist!',
			});
		} catch(error) {
				console.log(error, 'error while removing stock from watchlist');
				return res.status(500).json({ code: 400, error: 'Internal Server Error' });
		}
	},
  async checkWatchlistStatus(req, res) {
    const {user_id, stock_name} = req.body;

    try {
      const watchlist = await checkWatchlistStatus(user_id, stock_name);
      if(watchlist.length > 0) {
        return res.json({
          code: 200,
          exists: true,
          message: 'Stock is in watchlist!',
        });
      }
      return res.json({
        code: 400,
        exists: false,
        message: 'Stock is not in watchlist!',
      });
    } catch(error) {
      console.log(error, 'error while checking watchlist status');
      return res.status(500).json({ code: 400, error: 'Internal Server Error' });
    }
  }
}

module.exports = watchlistController;
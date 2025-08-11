const { getWatchlistedStock, addStockToWatchlist, removeStockFromWatchlist } = require('../models/watchlist');
const { stockService } = require('../services/apiService');

const watchlistController = {
	async getWatchlist(req, res) {
			const user_id = req.body.user_id;
			console.log(user_id, 'user_id');

			try {
					const watchlist = await getWatchlistedStock(user_id);
					console.log(watchlist, 'watchlist');
					if (!watchlist || watchlist.length === 0) {
						return res.json({
							code: 200,
							exists: false,
							message: 'Watchlist does not exist!',
							data: []
						});
					}
					// open apis calls
					const resData = await Promise.all(
						watchlist.map(async (stock) => {
							const rawData = await stockService.getStockDetail(stock.stock_name);
							console.log(rawData, 'rawData');
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
}

module.exports = watchlistController;
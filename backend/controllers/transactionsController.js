const { checkBalance, addStockToPortfolio, updateBalance, checkStockInPortfolio, updatePortfolio, updateTransactions, addWithdrawBalance } = require('../models/transactions');

const transactionsController = {

	async getBalance(req, res) {
		const {user_id} = req.body;
		// check money in balance
		const balance = await checkBalance(user_id);
		console.log(balance, 'balance details');
		if(balance.length === 0) {
				return res.json({
						code: 200,
						message: 'Balance not found!',
						data: []
				});
		}
		return res.json({
				code: 200,
				message: 'Balance fetched successfully!',
				data: balance[0]
		});
	},

	async buyStock(req, res) {
			const {user_id, stock_name, quantity, price} = req.body;
			console.log(user_id, stock_name, quantity, price, 'user_id, stock_name, quantity, price');
			// balance check
			const balance = await checkBalance(user_id);

			if(balance.length === 0 ||balance[0].total_balance < price*quantity) {
					return res.json({
							code: 200,
							message: 'Insufficient balance!',
							data: []
					});
			}
			// check if stock is in portfolio
			const stock = await checkStockInPortfolio(user_id, stock_name);
			console.log(stock, 'stockaa');
			if(stock.length === 0) {
				// add new row
				const newStock = await addStockToPortfolio(user_id, stock_name, quantity, price);
				console.log(newStock, 'addd');
				if(newStock === 0) {
						return res.json({
								code: 400,
								message: 'Internal Server Error!',
								data: []
						});
				}
			} else {
				// update existing row
				const updatedStock = await updatePortfolio(user_id, stock_name, quantity, price, 'BUY');
				console.log(updatedStock, 'updatedStock');
				if(updatedStock === 0) {
					return res.json({	
						code: 400,
						message: 'Internal Server Error!',
						data: []
					});
				}
			}
			// update balance
			const updatedBalance = await updateBalance(user_id, price*quantity, 'BUY');
			console.log(updatedBalance, 'updatedBalance');
			if(updatedBalance === 0) {
					// give error in api
					return res.json({
							code: 400,
							message: 'Internal Server Error!',
							data: []
					});
			}
			// update transactions
			const updatedTransactions = await updateTransactions(user_id, stock_name, quantity, price, 'BUY');
			console.log(updatedTransactions, 'updatedTransactions');
			if(updatedTransactions === 0) {
					// give error in api
					return res.json({
							code: 400,
							message: 'Internal Server Error!',
							data: []
					});
			}
			// return success message
			return res.json({
					code: 200,
					message: 'Stock bought successfully!',
					data: {
							user_id: user_id,
							stock_name: stock_name,
							quantity: quantity,
							price: price
					}
			});
	},

	async sellStock(req, res) {
			const {user_id, stock_name, quantity, price} = req.body;
			console.log(user_id, stock_name, quantity, price, 'user_id, stock_name, quantity, price');
			// check if stock is in portfolio
			const stock = await checkStockInPortfolio(user_id, stock_name);
			if(stock.length === 0) {
					return res.json({
							code: 200,
							message: 'Stock not found!',
							data: []
					});
			}
			// check if quantity is available
			if(stock[0].quantity < quantity) {
					return res.json({
							code: 200,
							message: 'Insufficient quantity!',
							data: []
					});
			}
			// update portfolio
			const updatedPortfolio = await updatePortfolio(user_id, stock_name, quantity, price, 'SELL');
			console.log(updatedPortfolio, 'updatedPortfolio');
			if(updatedPortfolio === 0) {
					// give error in api
					return res.json({
							code: 400,  
							message: 'Internal Server Error!',
							data: []
					});
			}
			// update balance
			const updatedBalance = await updateBalance(user_id, price*quantity, 'SELL');
			console.log(updatedBalance, 'updatedBalance');
			if(updatedBalance === 0) {
					// give error in api
					return res.json({
							code: 400,  
							message: 'Internal Server Error!',
							data: []
					});
			}
			// update transactions
			const updatedTransactions = await updateTransactions(user_id, stock_name, quantity, price, 'SELL');
			console.log(updatedTransactions, 'updatedTransactions');    
			if(updatedTransactions === 0) {
					// give error in api
					return res.json({
							code: 400,
							message: 'Internal Server Error!',
							data: []
					});
			}   
			// return success message
			return res.json({
					code: 200,
					message: 'Stock sold successfully!',
					data: {
							user_id: user_id,
							stock_name: stock_name,
							quantity: quantity,
							price: price
					}
			});
	},

	async addMoney(req, res) {
		const {user_id, amount} = req.body;
		const updatedBalance = await addWithdrawBalance(user_id, amount, 'ADD');
		if(updatedBalance === 0) {
		return res.json({
			code: 400,
			message: 'Internal Server Error!',
			data: []
		});
		}
		console.log("jo")
		const updatedTransactions = await updateTransactions(user_id, '', 1, amount, 'ADD');
		if(updatedTransactions === 0) {
		return res.json({
			code: 400,
			message: 'Internal Server Error!',
			data: []
		});
		}
		return res.json({
		code: 200,
		message: 'Money added successfully!',
		data: {
			user_id: user_id,
			amount: amount
		}
		});
	},

 async withdrawMoney(req, res) {
		const {user_id, amount} = req.body;
		const updatedBalance = await addWithdrawBalance(user_id, amount, 'WITHDRAW');
		if(updatedBalance === 0) {
		return res.json({
			code: 400,
			message: 'Internal Server Error!',
			data: []
		});
		}
		const updatedTransactions = await updateTransactions(user_id,'', 1, amount, 'WITHDRAW');
		if(updatedTransactions === 0) {
		return res.json({
			code: 400,
			message: 'Internal Server Error!',
			data: []
		});
		}
		return res.json({
		code: 200,
		message: 'Money withdrawn successfully!',
		data: {
			user_id: user_id,
			amount: amount
		}
		});
	}

}

module.exports = transactionsController;
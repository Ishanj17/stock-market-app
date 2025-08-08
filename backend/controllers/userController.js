const {findUserByEmail, createUser} = require('../models/userLogin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

const userController = {

	async emailVerification(req, res) {
			const email = req.body.email;

			if (!email) {
					return res.status(400).json({ code: 200, error: 'Email is required' });
			}

			try {
					const user = await findUserByEmail(email);
	
					if(user) {
							return res.json({ code: 200, exists: true, message: 'email found.'});
					} else {
							return res.json({code: 200, exists: false, message: 'email does not exist!'})
					} 
			} catch(error) {
					console.log(error, 'error while email verification');
					return res.status(500).json({ code: 200, error: 'Internal Server Error' });
			}
	},
	async userSignUp(req, res) {
			try {
				const {first_name, email, password} = req.body;
				const saltRounds = 10;
      	const password_hash = await bcrypt.hash(password, saltRounds)

				const userCreation = await createUser({ first_name, email, password_hash });
	
					if(userCreation) {
            const jwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });  
            return res.json({ code: 200, created: true, message: 'User Created Successfully!', token: jwtToken });
					} else {
							return res.json({code: 200, created: false, message: 'User Created Failed!'})
					} 
			} catch(error) {
					console.log(error, 'error while user creation');
					return res.status(500).json({code: 200, error: 'Internal Server Error' });
			}
	},
	async userLogin(req, res) {
		try {
			const {email, password} = req.body;
			if (!email || !password) {
					return res.status(400).json({ error: 'Email and password are required' });
			}
			const user = await findUserByEmail(email);
			if (!user) {
				return res.status(401).json({ error: 'Invalid password' });
			}
			const match = await bcrypt.compare(password, user.password_hash);
			if (match) {
        console.log(user, "user");
        const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ code: 200, success: true, message: 'User logged in successfully!', token: jwtToken });
			} else {
					return res.status(401).json({ code: 401, success: false, message: 'Invalid password' });
			}
		} catch(error) {
				return res.status(500).json({code: 200, error: 'Internal Server Error' });
		}
	},
}

module.exports = userController;
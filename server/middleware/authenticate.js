var {User} = require('./../models/user');

var authenticate = (req, res, next) =>{
	var token = req.header('x-auth');

	User.findByToken(token).then((user)=>{
		if(!user){
			//vai direto pro catch
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next();
	}).catch((e)=>{
		//401 - precisa de autenticaçao
		res.status(401).send();
	});
	//procura o usuario relacionado ao token e retorna
	//User.findByToken(token)
};

module.exports = {
	authenticate
};
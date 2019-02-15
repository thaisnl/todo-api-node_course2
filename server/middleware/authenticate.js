var {User} = require('./../models/user');

var authenticate = (req, res, next) =>{
	//o usuario deve passar o token como header
	var token = req.header('x-auth');

	//dai procura no banco um usuario com esse token
	User.findByToken(token).then((user)=>{
		if(!user){
			//vai direto pro catch
			return Promise.reject();
		}
		//seta o token e o usuario do req
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
const mongoose = require('mongoose'),
	validator = require('validator'),
	jwt = require('jsonwebtoken'),
	_ = require('lodash'),
	bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		minlength: 1,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} não é um email válido'
		}
	},

	password: {
		type: String,
		require: true,
		minlength: 6
	},
	//tokens estão disponíveis no mongodb
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

//precisa do this por isso que nao usa arrow function
//ímportante pra gerar o token de acesso do usuario
//cada usuario tem varios tokens pois pode acessar de vários dispositivos
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, '753951').toString();
	user.tokens = user.tokens.concat([{access, token}]);

	return user.save().then(()=>{
		return token;
	});
};

UserSchema.methods.removeToken = function (token){
	var user = this;

	user.update({
		$pull: {
			tokens: {token}
		}
	});
};

//metodo de classe/model ao inves de instancia
UserSchema.statics.findByToken = function (token){
	var User = this;
	var decoded;
	try{
		//vai ver se joga um erro
		decoded = jwt.verify(token, '753951');
	}catch (e){
		return Promise.reject();
	}

	return User.findOne({
		//quotes sao necessarias qnd houver o operador do .
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'

	});
};

UserSchema.statics.findByCredentials = function (email, password) {
	var User = this;

	return User.findOne({email}).then((user)=>{
		if(!user){
			return Promise.reject();
		}

		return new Promise((resolve, reject) =>{
			bcrypt.compare(password, user.password, (err, res)=>{
				if(err){
					reject();
				}else{
					resolve(user);
				}
			});
		});
	})
};

//vai rodar isso aqui antes de do save
//mongoose middleware
UserSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10, (err, salt)=>{
			bcrypt.hash(user.password, salt, (err, hash)=>{
				user.password = hash;
				next();
			});
		});
	}else{
		next();
	}
});

var User = mongoose.model('User', UserSchema);


module.exports = {User};
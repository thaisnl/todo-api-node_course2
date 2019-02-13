const mongoose = require('mongoose'),
	validator = require('validator'),
	jwt = require('jsonwebtoken'),
	_ = require('lodash');


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

UserSchemamethods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

//precisa do this por isso que nao usa arrow function
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, '753951').toString();
	user.tokens = user.tokens.concat([{access, token}]);

	return user.save().then(()=>{
		return token;
	});
};

var User = mongoose.model('User', UserSchema);


module.exports = {User};
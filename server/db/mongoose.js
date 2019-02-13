const mongoose = require('mongoose');

//seta o mongoose pra usar promises e define a library da promise
//blabla teste
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
	mongoose
};
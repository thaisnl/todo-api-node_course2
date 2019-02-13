const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data ={
	id: 10
}


var token = jwt.sign(data, '97412538');
console.log(token);

var decoded = jwt.verify(token, '97412538');
console.log(decoded);
//jwt.verify
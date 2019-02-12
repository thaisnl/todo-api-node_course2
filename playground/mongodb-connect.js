// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//var obj = new ObjectID();
//console.log(obj);

//recebe dois argumentos - url onde a aplicação fica + callback p tratar se suceder ou não
//cria a database simplesmente colocando o nome depois da porta
//mas o mongo não cria a database antes de adicionar registros nela
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
// 	if (err){
// 		//pra prevenir o programa de continuar
// 		return console.log('Incapaz de conectar ao servidor MongoDB');
// 	}
// 	console.log('Conectado ao servidor MongoDB');
// 	const db = client.db('TodoApp');

// 	db.collection('Todos').insertOne({
// 		text: 'Algo a fazer',
// 		completed: false
// 	}, (err, result) =>{
// 		if(err){
// 			//passando o erro pra fazer como um log
// 			return console.log('Incapaz de inserir todo', err);
// 		}
// 		console.log(JSON.stringify(result.ops, undefined, 2));
// 	});

// 	client.close();
// });

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
	if(err){
		return console.log("Incapaz de conectar ao servidor MongoDB");
	}

	console.log("Conectado ao MongoDB");
	const db = client.db('TodoApp');

	//ps: há uma função chamada insertMany
	db.collection('Users').insertOne({
		name: 'Thaís',
		age: 21,
		location: 'Fortaleza'
	}, (err, result)=>{
		if(err){
			return console.log("Incapaz de inserir o registro");
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	});


	client.close();
});

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

	//sem parametros o find retorna tudo
	//find retorna um cursor
	// db.collection('Todos'). find({completed: false}).toArray().then((docs)=>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err)=>{
	// 	console.log('Incapaz de retornar os todos', err);
	// });


	//deleteMany
	// db.collection('Todos').deleteMany({text: 'Algo a fazer'}).then((result)=>{
	// 	console.log(result);
	// });

	//deleteOne
	//deleta o primeiro elemento que obedece o critério e para
	// db.collection('Todos').deleteOne({text: 'Estudar'}).then((result)=>{
	// 	console.log(result);
	// });


	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({text: 'Passear co catioro'}).then((result)=>{
	// 	console.log(result);
	// });

	db.collection('Users').deleteMany({name: 'Thaís'}).then((result)=>{
		console.log('Deletei');
	});


	//client.close();
});

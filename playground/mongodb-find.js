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


	db.collection('Todos').find({}).forEach((item)=>{
		console.log(`todo: ${item.text}`);
	});

	db.collection('Users').find({name: 'Thaís'}).toArray().then((docs)=>{
		console.log(JSON.stringify(docs, undefined, 2));

	});

	db.collection('Users'). find({name: 'Thaís'}).count().then((count)=>{
		console.log('Todos count:' + count);
	}, (err)=>{
	 	console.log('Incapaz de retornar os todos', err);
	});



	//client.close();
});

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
//pega so propriedades especificas inves de ter que botar Todo.Todo
//body-parser pra enviar json pro server
var {User} = require('./models/user');
//const argv = yargs.argv;

var app = express();


//middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	}, (e) => {
		//vai enviar um status de 400 que quer dizer bad request/input, provavelmente devido ao user n ter provido um text
		res.status(400).send(e);
	});
});

app.listen(3000, ()=>{
	console.log('Começou na porta 3000');
});

app.get('/todos', (req, res)=>{
	Todo.find({}).then((todos)=>{
		res.send({
			todos
		});
	}, (e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((doc)=>{
		if(!doc){
			return res.status(404).send();
		}
		res.send({doc});
	}, (e) =>{
		res.status(400).send();
	});

});

app.delete('/todos/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((doc) =>{
		if (!doc){
			return res.status(404).send();
		}
		res.status(200).send();
	}).catch((e)=>{
		res.status(400).send();
	})
});

//seta o mongoose pra usar promises e define a library da promise


// var newUser = new User({
// 	email: argv._[0]
// });

// newUser.save().then((response)=>{
// 	console.log(response);
// 	console.log("Usuário salvo");
// }, (e)=>{
// 	console.log(e);
// });

//var newTodo = new Todo({
//	text: 'Cozinhar'
//});

// var todoNew = new Todo({
// 	text: 'Passear',
// 	completed: false,
// 	completedAt: Date.now()
// })

// todoNew.save().then((result)=>{
// 	console.log(result);
// 	console.log('Salvou o todo');
// }, (e)=>{
// 	console.log("Não deu pra salvar o todo");
// });
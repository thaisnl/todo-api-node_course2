const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
//pega so propriedades especificas inves de ter que botar Todo.Todo
//body-parser pra enviar json pro server
const {User} = require('./models/user');
//const argv = yargs.argv;

const app = express();
//usa essa porta (vai ser a do heroku) ou a 3000 se ela nao estiver disponivel, assim rodando localmente
const port = process.env.PORT || 3000;


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

app.patch('/todos/:id', (req, res)=>{
	var id = req.params.id;

	//pick recebe um objeto e um array de parametros q vai tirar desse objeto se eles existirem
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true	
	}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		//envia wrapped num objeto
		res.send({todo});

	}).catch((e)=>{
		res.status(400).send();
	})
});

app.listen(port, ()=>{
	console.log(`Começou na porta ${port}`);
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
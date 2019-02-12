const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');
const {User} = require('./../server/models/user');


//pode ser uma id valida sem o objeto existir ou nao
//var id = '5c62ca7b6e3d2a193dea7a82';

// Todo.find({
// 	_id: id
// }).then((todos) =>{
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) =>{
// 	console.log('Todo', todos);
// });

var userId = '5c62be9a59f4240fd971c76b';
User.findById(userId).then((doc)=>{
	if (!doc){
		return console.log("Id não encontrada");
	}
	console.log(doc);
}).catch((e)=>{
	console.log("Id não válida");
});


// if(!ObjectId.isValid(id)){
// 	console.log("Id não valida");
// }

// Todo.findById(id).then((todo)=>{
// 	if(!todo){
// 		//sempre lembrar que o return é bom pra interromper a funçao
// 		return console.log('Id não encontrada');
// 	}
// 	console.log('Todo by Id', todo);
// });

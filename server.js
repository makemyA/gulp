const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const session = require('cookie-session');
const bodyParser =require('body-parser');
const urlencodedParser= bodyParser.urlencoded({extended:false});
app.set('views', path.join(__dirname, 'views'));                                                                                                                                        
app.use(express.static(path.join(__dirname, 'src')));                                                                                                                           
app.set('view engine', 'pug');
/*gestion des sessions*/
app.use(session({secret: 'todotopsecret'}));
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
 app.use((req,res,next)=>{
    typeof(req.session.todolist)=='undefined'?req.session.todolist=[]:req.session.todolist;
    next();
});
/*gestion des routes*/
app.get('/todo', function(req, res){
  console.log("enter the app");
  console.log('ma session actuelle vaut: '+ req.session.todolist);
  const tableauTest = ['a','b','c','d'];                                                                                                                                              
  res.render('todo.pug', {tab:tableauTest});                                                                                                                                            
});
app.post('/todo/add/',urlencodedParser, (req, res)=>{
    console.log("Vous avez ajouté un item!!");
    req.body.newtodo !=''?req.session.todolist.push(req.body.newtodo):console.log("Impossible de rajouter un élément vide");
    res.redirect('/todo');
});
app.get('/todo/delete/:id',(req, res)=>{
    console.log("l'item"+req.params.id+ 'a bien été supprimé');
    req.params.id!=''?req.session.todolist.splice(req.params.id,1): console.log("L'élément que vous essayez de supprimer n'existe pas");
});                                                
console.log("server started");
server.listen(8091);
console.log('server listen on port 8091');
console.log("ca marche on dirait");
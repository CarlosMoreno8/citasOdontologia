//Basic Import Section
const express=require('express');
const app=express();
const cors=require('./mw/cors');
const PORT = process.env.PORT || 3000;
const auth=require('./mw/auth');

//Modular imports
const {showClients} = require('./controllers/clientController');
const {showClientsId} = require('./controllers/clientController');
const {registerClient} = require('./controllers/clientController');
const {deleteClient} = require('./controllers/clientController');
const {modifyClient} = require('./controllers/clientController');
const {loginClient} = require('./controllers/clientController');
const {logoutClient} = require('./controllers/clientController');


//Middleware
app.use(cors);
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();

//ACTIONS

//client endpoints
app.get('/client/showAll', showClients);
app.get('/client/id/:clientId', showClientsId);
app.post('/client/register', registerClient);
app.post('/client/login', loginClient);
app.delete('/client/delete/:id', deleteClient);
app.put('/client/modify', modifyClient);
app.get('/client/logout', auth, logoutClient);

//appointment endpoints


//port listen
app.listen(PORT, ()=> console.log('>>>SERVER ONLINE'+PORT));
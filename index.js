//Basic Import Section
const express=require('express');
const app=express();
const cors=require('./mw/cors');

//Modular imports
const {showClients} = require('./db/dbclient');
const {showClientsId} = require('./db/dbclient');
const {registerClient} = require('./db/dbclient');
const {deleteClient} = require('./db/dbclient');
const {modifyClient} = require('./db/dbclient');
const {loginClient} = require('./db/dbclient');

//Middleware
app.use(cors);
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');
dbconnect();

//ACTIONS

//client actions
app.get('/client/showAll', showClients);
app.get('/client/id/:clientId', showClientsId);
app.post('/client/register', registerClient);
app.post('/client/login', loginClient);
app.delete('/client/delete', deleteClient);
app.put('/client/modify', modifyClient);

//order actions

//port listen
app.listen(3000, ()=> console.log('>>>SERVER ONLINE'));
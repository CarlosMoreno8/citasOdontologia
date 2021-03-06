const ClientModel=require('../models/Client');

const mongoose=require('mongoose');

const bcrypt = require("bcryptjs");

const fs=require('fs');

const showClients = (req, res) => { // Esto es un get en el que te muestra todos los clientes
     
    
        //we show all clients
        ClientModel.find({})
        .then(clients=>{
            res.send(clients)
        })
        .catch(error=>console.log(error))
    
}

const showClientsId = (req, res) => { // Esto es un get el cual te muestra los clientes por su id
     
    let idCarlos = req.params.clientId;
    //we show all clients
    ClientModel.findOne({id:idCarlos}) // Aqui te muestra exactamente el cliente por id que tu le pases
    .then(clients=>{
        res.send(clients)
    })
    .catch(error=>console.log(error))

}

const registerClient = async (req, res) => { // Esto es un post con regex (lineas 36,37) y esta hecho en async await (lienas 33, 58)
    
    let bodyData = req.body;
    let regExEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
    let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;


    if(!regExEmail.test(bodyData.email)){
        res.send({
            message: "El email introducido no es válido"
        });
        return;
    }

    if(!regExPassword.test(bodyData.password)){
        res.send({
            message: "El password introducido no es válido"
        });
        return;
    }

    //fin de comprobacion inicial de errores
    
    //encriptado de password
    
    let hashPass = await bcrypt.hash(bodyData.password, 10);

    try {
		
        const client = await new ClientModel({
            clientname: bodyData.clientname,
            surname: bodyData.surname,
            phone: bodyData.phone,
		    email: bodyData.email,
		    password: hashPass
        }).save();

        res.send({
            message: "Account created successfully.",
            clientname: client.clientname
        });

        // const client = await new ClientModel(
        //     req.body
        // ).save();
		
	} catch (err) {
        
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
			
			res.status(409); // conflict
			res.send({
				error: "Email already used."
			});
			
		} else {
			
			res.send(err);
			
		}
			
		
	};
	
};

const deleteClient = async (req, res) => { // Esta hecho en async await y es un delete del cliente
    
    let id = req.params.id;

	ClientModel.findByIdAndDelete( // Con la funcion findByIdAndDelete, buscar por id el cliente que le pasas y lo elimina, sino eliminaria todos los clientes
		id
	).then ( (borradoExitosamente) => {
		
		if (borradoExitosamente) {
			res.send({
				message: `Client ${borradoExitosamente.id} borrado con éxito: Client: ${borradoExitosamente.clientname} email: ${borradoExitosamente.email}`
			});
		} else {
			res.status(404);
			res.send({
				error: `Client con el id ${id} no encontrado.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
}

const modifyClient = async (req, res) => { // Aqui utilizamos promesas, primero buscamons el cliente por id y luego lo modificamos, esto es un put
    ClientModel.findByIdAndUpdate(req.body.id,
        {clientname: req.body.clientname, password: req.body.password}, {new:true, useFindAndModify:false})
    .then( (client) => {

        if(client){

            if(client){
                //then positively client was found and updated.
                res.send(client);
            }else{
                res.send({"message": "Oops! there was an error updating the changes."})
            }
            
        }
    }).catch (err => console.log(err));
}

const loginClient = async (req, res) => { // Aqui utilizamos async await, buscamos el cliente con el findOne a traves del email, esto es un post

    // let clientEncontrado = await ClientModel.findOne({
    //     $and : [
    //         { email:  req.body.email}, { password: req.body.password }
    //     ]
    // })
try {
    let clienteEncontrado = await ClientModel.findOne({
        email: req.body.email
    });

    if(!clienteEncontrado){
        res.status(400).send({
            message: "No existe el cliente"
        })
    }else{

        let passwordOk = await bcrypt.compare(req.body.password, clienteEncontrado.password);

        if(passwordOk){

            const clientWithToken = await clienteEncontrado.generateAuthToken()
            res.send(clientWithToken)
        }else{
            res.status(401).send({
                message: "Credenciales incorrectas"
            })
        }
        
    }

} catch (error) {
    res.status(401).send({
        message: error.message
    })    
}
    

    

}

const logoutClient = async (req, res) => {

    try {
        const client = await ClientModel.findByIdAndUpdate(req.client._id, {token:""});
        if (!client){
            res.status(401).send(
                {message: 'Client already out.'}
            )
        }
        else{
            res.send(
                {message: 'Sayonara baby.'}
            )
        }
    } catch (error) {
        res.status(400).send(
            {message: error.message}
        )
        
    }
}

module.exports = {
    showClients,
    showClientsId,
    registerClient,
    deleteClient,
    modifyClient,
    loginClient,
    logoutClient
}
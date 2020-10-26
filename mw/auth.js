const jwt = require('jsonwebtoken');
const ClientModel = require( '../models/Client.js');

const auth = async(req, res, next) => {
    try {
        const authorization =req.headers.authorization;
        if(authorization){
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, 'mimamamemimamucho');
            const client = await ClientModel.findById(payload._id);
            if (!client) {
                return res.status(401).send({ message: 'You are not authorized' })
            }
            req.client = client;
            next() 
        } else {
            return res.status(401).send({ message: 'You are not authorized' })
        }
        
    } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'You are not authorized', error })
    }
}
module.exports = auth;
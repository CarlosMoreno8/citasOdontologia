import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, 'mimamamemimamucho');
        const user = await UserModel.findById(payload._id);
        if (!user) {
            return res.status(401).send({ message: 'You are not authorized' })
        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'You are not authorized', error })
    }
}
export default auth;
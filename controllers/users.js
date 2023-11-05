import Users from '../modules/users.js';
import Authentications from '../modules/authentications.js';

const signup = (req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    const user = new Users({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        timestamp: timestamp
    });
    user.save()
    .then(result => {
        const authentications = new Authentications({
            user: result,
            password: data.password, 
            timestamp: timestamp
        });
        return authentications.save()
    })
    .then(result => {
        res.status(200).send({message: 'User Signed Up',user: result});
    })
    .catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    });
}

const login = (req, res) => {
    const data = req.body;
    Authentications.findOne({ "user.firstName": data.firstName ,"password": data.password})
    .then(result => {
        res.status(200).send({message: 'login',result});
    })
    .catch(err => {
        err.data = {code:'AUTHENTICATION'}
        next(err);
    })
}


export { signup, login }
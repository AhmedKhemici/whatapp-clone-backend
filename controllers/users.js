import Users from '../modules/users.js';
import Authentications from '../modules/authentications.js';

const signup = (req, res) => {
    console.log('Here');
    const data = req.body;
    const timestamp = Date.now();
    const user = new Users({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        timestamp: timestamp
    });
    console.log('Here');
    user.save()
    .then(result => {
        const authentications = new Authentications({
            user: result,
            password: data.password, 
            timestamp: timestamp
        });
        authentications.save()
        .then(result => {
            res.status(200).send({message: 'User Signed Up',user: result});
        })
        .catch(err => {
            err.code = 'ERR_AUTHENTICATION'
            next(err);
        });
    })
    .catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    });
}

const login = (req, res) => {
    const data = req.body;
    console.log(data);
    Authentications.findOne({ "users.firstName": data.firstName ,"password": data.password})
    .then(result => {
        console.log(result);
        res.status(200).send({message: 'login',result});
    })
    .catch(err => {
        err.data = {code:'AUTHENTICATION'}
        next(err);
    })
}


export { signup, login }
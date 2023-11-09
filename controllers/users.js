import Users from '../modules/users.js';
import Authentications from '../modules/authentications.js';

const signup = (req, res) => {
    const data = req.body;
    const user = new Users({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
    });
    user.save()
    .then(result => {
        const authentications = new Authentications({
            user_id: result,
            password: data.password
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

const login = (req, res, next) => {
    const data = req.body;
    Users.findOne({ firstName: data.firstName})
    .then( (user)=>{
        const auth = Authentications.findOne({ user_id: user._id, password: data.password}).populate('user_id');
        return auth;
    })
    .then( (auth) => {
        res.status(200).send({message: 'login', result: auth});
    })
    .catch(err => {
        err.data = {code:'AUTHENTICATION'}
        next(err);
    })
}


export { signup, login }
import Users from '../module/users.js';

const signup = (req, res) => {
    const data = req.body;
    const user = new Users(data);
    user.save()
    .then(result => {
        res.status(200).send({message: 'User Signed Up',user: result});
    })
    .catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    })
}

const login = (req, res) => {
    const data = req.body;
    console.log(data);
    Users.findOne({ name: data.name, password: data.password })
    .then(result => {
        console.log(result);
        res.status(200).send({message: 'login',user: result});
    })
    .catch(err => {
        err.data = {code:'AUTHENTICATION'}
        next(err);
    })
}


export { signup, login }
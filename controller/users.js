import Users from '../module/users.js';

const signup = (req, res) => {
    const data = req.body;
    const user = new Users(data);
    user.save()
    .then(result => {
        res.status(200).send({message: 'User Signed Up',user: result});
    })
    .catch(err => {
        res.status(500).send({message: 'Error Occurred',Error: err})
    })
}

const login = (req, res) => {
    const data = req.body;
    Users.find({ name: data.name, password: data.password })
    .then(result => {
        res.status(200).send({message: 'login',user: result});
    })
    .catch(err => {
        res.status(500).send({message: 'Credentials Invalid',Error: err})
    })
}


export { signup, login }
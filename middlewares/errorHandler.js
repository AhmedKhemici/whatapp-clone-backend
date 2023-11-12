const Errors = {
    'ERR_DEFAULT':{'message': 'internal server error','status': 500},
    'ERR_USER_NOT_FOUND':{'message': 'user was not found','status': 500},
    'ERR_AUTHENTICATION': {'message':`Token is not valid`,'status': 500}
}

const errorHandler = (err, req, res, next) => {
    let response = Errors['ERR_DEFAULT'];
    console.log(err);
    if (err.code){
        response = Errors[err.code];
    }
    res.status(response.status).send(response.message);
}

export default errorHandler;
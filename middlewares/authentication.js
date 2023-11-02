import Authentications from '../modules/authentications.js';

const authentication = (req, res, next) => {
    //TODO: this is not secure need to use real auth service , jwt or something else ...
    const auth = req.header('authorization');
    console.log('authentication here ');
    if (!auth){
        const err = {code: 'ERR_DEFAULT'}
        next(err);
    }
    Authentications.findById(auth).then((result) => {
        req.userId = result.users._id;
        next();
    }).catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    }) 
}

export {authentication};
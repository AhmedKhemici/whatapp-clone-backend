import Authentications from '../modules/authentications.js';

const authentication = (req, res, next) => {
    const auth = req.header('authorization');
    if (!auth){
        const err = {code: 'ERR_DEFAULT'}
        next(err);
    }
    Authentications.findById(auth).then((result) => {
        req.userId = result.user._id;
        next();
    }).catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    }) 
}

export {authentication};
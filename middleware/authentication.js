import user from '../module/users.js';

const authentication = (req, res, next) => {
    const auth = req.header('authorization');
    console.log('authentication here ');
    if (!auth){
        const err = {code: 'ERR_DEFAULT'}
        next(err);
    }
    user.findById(auth).then(() => {
        req.userId = auth;
        next();
    }).catch(err => {
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    }) 
}

export {authentication};
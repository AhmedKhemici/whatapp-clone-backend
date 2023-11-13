import Authentications from '../modules/authentications.js';

const authentication = (req, res, next) => {
    const auth = req.header('authorization');
    if (!auth)throw new Error({code: 'ERR_DEFAULT'})
    Authentications.findById(auth).then((result) => {
        req.userId = result.user_id;
        next();
    }).catch(err => {
        console.log(err);
        err.code = 'ERR_AUTHENTICATION'
        next(err);
    }) 
}

const socketAuth = (socket, next) => {
    const auth = socket.handshake.query.token || null
    if(auth){
        Authentications.findById(auth).populate('user_id').then((result) => {
            socket.data.user = result.user_id;
            next();
        }).catch(err => {
            console.log(err);
            err.code = 'ERR_AUTHENTICATION'
            next(err);
        }) 
    }else{
        console.log('Socket Error');
        next(new Error('missing token'));
    }
}


export {authentication, socketAuth};
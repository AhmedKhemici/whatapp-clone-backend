

let namespace =  null;

const socketConnect = (io, callback) => {
    namespace = io.of('/');
    namespace.use(callback).on('connection', socket => {
        console.log(`client ${socket.data.user.firstName} connected`);
        socket.join(socket.data.user._id.toString());
        socket.on('disconnect', () =>{
            console.log(`client ${socket.data.user.firstName} disconnected`);
        })
    });
    return namespace
}

const getIO = ()=>{
    return namespace;
}

export { socketConnect, getIO}
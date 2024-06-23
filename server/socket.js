const io = require('socket.io')(8900, { cors: { origin: 'http://localhost:5173' }, });

let users = [];

const addUser = (userId, socketId, email) => {
    const isUserExist = users.findIndex(user => user.userId == userId) != -1
    if (!isUserExist) {
        users.push({ userId, socketId, email });
    }
    else {
        console.log('\nUser already connected', email, users)
    }
};

const removeUser = (socketId) => { users = users.filter((user) => user.socketId !== socketId); };

const getUser = (userId) => { return users.find((user) => user.userId === userId); };

io.on('connection', (socket) => {
    //when ceonnect
    console.log('A user connected. ', socket?.id);

    //take userId and socketId from user
    socket.on('addUser', ({ userId, socketId, email }) => {
        if (userId) {
            addUser(userId, socketId || socket.id, email);
            io.emit('getUsers', users);
        }
    });

    //send and get message
    socket.on('sendMessage', ({ sender, receiver, text, timestamp, readBy }) => {
        const receiverUser = getUser(receiver);
        if (!receiverUser) console.error('user not found - receiverId = ' + receiver);
        io.to(receiverUser?.socketId).emit('getMessage', { sender, receiver, text, timestamp, readBy, });
    });

    //when disconnect
    socket.on('disconnect', () => {
        console.log('\nA user disconnected!');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
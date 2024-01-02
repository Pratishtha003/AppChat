const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

const users=[{}];


// const ENDPOINT = "http://localhost:4500";
// const socket = socketIO(ENDPOINT,{transports:['websocket']});

app.use(cors()); //cors is used for intercommunication between url

app.get('/',(req,res)=>{
    res.send("Hello its working");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{         //this is a whole circuit and sockets are different users
    // console.log("new Connection");

    socket.on('joined',({user1,room1})=>{
        users[socket.id]=user1;
        console.log(`${user1} has joined`);
        socket.emit('welcome',{user1:"Admin",message:`Welcome to the chat`});//sending from backend 


        console.log(`${room1}`);
        var rooms = io.sockets.adapter.rooms;
        console.log(rooms);
        var room =rooms.get(room1);
        console.log(room);

        if (!users[room1]) {
            users[room1] = [];
        }
        if (!room || room.size < 2) {
            socket.join(room1);
            socket.emit("create1");
        } else {
            socket.emit("full");
        }



        // if(room == undefined){
        //     socket.join(room1);
        //     // console.log('Room created');
        //     socket.emit("create1");
        // }
        // else if(room.size == 1){
        //     socket.join(room1);
        //     // console.log("room joined");
        //     socket.emit("join1");
        // }
        // else{
        //     // console.log("room is full");
        //     socket.emit("full");
        // }
        // socket.broadcast.emit('userJoined',{user1:"Admin",message:`${users[socket.id]} has joined`});//broadcast will send message to everyone other then the admin
    })

    socket.on("ready",({user1,room1})=>{
        console.log("Ready");
        socket.broadcast.to(room1).emit("ready");
    })

    socket.on("candidate",({candidate,room1})=>{
        console.log("candidate");
        socket.broadcast.to(room1).emit("ready",candidate);
    })

    socket.on("offer",(offer,room1)=>{
        console.log("offer");
        socket.broadcast.to(room1).emit("offer",offer);
    })

    socket.on("answer",(answer,room1)=>{
        console.log("answer");
        socket.broadcast.to(room1).emit("answer",answer);
    })

    socket.on('message',({message,id})=>{
        //io.emit('sendMessage',{user1:users[id],message})
        io.emit('sendMessage',{user1:users[id],message,id})//////////////
        // console.log(users[id]);
        // console.log(users[socket.id]);
    })

    socket.on('disconnect1',()=>{
        socket.broadcast.emit('leave',{user1:"Admin",message:`${users[socket.id]} has left`});
        // console.log("user left");
    })
})

server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})


// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const socketIO = require('socket.io');

// const app = express();
// const port = process.env.PORT || 4500;

// const users = {};

// app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Hello, it's working");
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
//     console.log("New Connection");

//     socket.on('joined', ({ user1, room1 }) => {
//         socket.join(room1); // Join the specific room
//         users[socket.id] = { user1, room1 };
//         console.log(`${user1} has joined in room ${room1}`);
//         socket.emit('welcome', { user1: "Admin", message: `Welcome to the chat in room ${room1}` });
//         socket.to(room1).broadcast.emit('userJoined', { user1: "Admin", message: `${users[socket.id].user1} has joined` });
//     });

//     socket.on('message', ({ message, id }) => {
//         io.to(users[id].room1).emit('sendMessage', { user1: users[id].user1, message, id });
//     });

//     socket.on('disconnect1', () => {
//         const { user1, room1 } = users[socket.id];
//         socket.to(room1).broadcast.emit('leave', { user1: "Admin", message: `${user1} has left room ${room1}` });
//         delete users[socket.id];
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is working on ${port}`);
// });

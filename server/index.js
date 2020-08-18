const express = require('express');
const socketio = require('socket.io');
const http =  require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
 console.log('we have a new connection')
 // listen for join event
 socket.on('join',({name,room}, callback)=>{

  const result = addUser({id: socket.id, name, room});

  if(result.error) {
   return callback(result.error);
  }
 // send to new user a welcome message from admin
  socket.emit('message',{user: 'admin', text: `${result.user.name} welcome to the room ${result.user.room}`,likes:0});
  // send to everyone except the new user a join notification
  socket.broadcast.to(result.user.room).emit('message',{user: 'admin', text: `${result.user.name}, has joined!`,likes:0});
  // make the new user join a room
  socket.join(result.user.room);
 // send all users in the room, the room data
  io.to(result.user.room).emit('roomData',{room:result.user.room, users:getUsersInRoom(result.user.room)})

 })
// listen for sendMessage event
 socket.on('sendMessage',(message, callback)=>{

   const user= getUser(socket.id);
   // send everyone in the room the message from the user
   io.to(user.room).emit('message',{user: user.name, text: message,likes:0})
  //io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})

  callback();
 })

 // listen for liking a message
 socket.on("like",(message,callback)=>{
  const user= getUser(socket.id);
  // send everyone in the room the message from the user
  io.to(user.room).emit('loveback',{user: message.user, text: message.text,likes:message.likes+1})

 })


 socket.on('disconnect',()=>{
  console.log('User had left!!!');
  const user = removeUser(socket.id);
  if(user){
   // send everyone a notification and update roomdata when the user is gone
   io.to(user.room).emit('message',{user: 'admin', text: `${user.name} has left.`})
   io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})
  }
 })
});

app.use(router);

 server.listen(PORT, ()=>{console.log(`Server has started on port ${PORT}`)});
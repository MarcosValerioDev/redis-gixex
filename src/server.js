require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [];
const fakeData = {"user":"teste", "room":"teste","teste":"teste", "parametro":"teste", "idFunction":"0"}



function saveUserConnection(socket_id, user, room){
    dataUser={
        socket_id,
        user,
        room
    }
    users.push(dataUser);
}

setInterval(async ()=>{

        io.emit('action', fakeData);

},1000)

    io.on('connect', socket => {
        socket.on('select_room', (data, callback) => {
        socket.join(data.room);
        const userInRoom = users.find((user) => user.user === data.user && user.room === data.room);
        if (userInRoom)  userInRoom.socket_id = socket.id;
        else saveUserConnection(socket.id, data.user, data.room);
         io.emit('signin', socket.id);
        })
         

        socket.on('message', async (data) => {
          
            if (values) {
                const func = JSON.parse(values);
                const data = func.map((item) => {if (item.idFunction != data.idFunction && item.user != data.item)  return item});
                //if (!data) await client.set("queueFunc", JSON.stringify(data));
            }  
        })



    })


server.listen(process.env.PORT || 4000, async () => {
    //await client.connect();
    console.log('Servidor connectado a porta 3000');
})
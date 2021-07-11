// create express web server
const express = require('express'); 
const app = express();
const path = require("path");
//choose port
const port = 3000;
const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server Running on port http://localhost:${port}`);
});
var socket = require('socket.io');
var io = socket(server, {'transports': ['websocket', 'polling']});


app.use(express.static(path.join(__dirname, "public/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "index.html"));
});


var userCount = 0;
io.sockets.on('connection', function (socket) {
  
  socket.on('userConnected', () =>{
    console.log('new connection: ' + socket.id);  
    userCount++;
    console.log('userCount:', userCount)
    socket.broadcast.emit("userCount", userCount);
  })

  socket.on('disconnect', () => {
    console.log('the following user just left :( ->' + socket.id);
    userCount = userCount > 0 ? userCount - 1 : 0;
    console.log('User Count: ',userCount)
    // update the user count for all users on every disconnect event;
    socket.broadcast.emit('userCount', userCount);
  })
  
});

module.exports = app;
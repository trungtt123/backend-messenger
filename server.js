const express = require("express");
const bodyParser = require("body-parser");
var app = express();
require('./db/connection');
var cors = require('cors');
const user = require('./controllers/user');
const boxchat = require('./controllers/boxchat');
const http = require('http'); // CORE MODULE, USED TO CREATE THE HTTP SERVER
const BoxChat = require("./repositories/boxchat");
const server = http.createServer(app); // CREATE HTTP SERVER USING APP
const io = require("socket.io")(server, {
    cors: {
        origin: "https://crackert-messenger.web.app",
        methods: ["GET", "POST", "PUT"]
    }
});
const port = process.env.PORT || '8080';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var messenger = io.of("/messenger");
messenger.on("connection", (socket_messenger) => {
    socket_messenger.on("client-send-messenger", async (data) => {
        var room_name = 'boxchat' + data.obj.boxchatid;
        const method_command = 'boxchat' + data.method + data.command;
        var result = await boxchat(data);
        socket_messenger.join(room_name);
        messenger.in(room_name).emit(method_command, result);
    });
});
var home = io.of("/home");
home.on("connection", (socket_home) => {
    socket_home.on("client-send-home", async (data) => {
        var room_handle_add_or_un_friend = 'roomaddfriend';
        const method_command = 'user' + data.method + data.command;
        var result = await user(data);
        socket_home.join(room_handle_add_or_un_friend);
        if (data.command === 'addfriend' || data.command === 'unfriend'){
            home.in(room_handle_add_or_un_friend).emit(method_command, result);
        }
        else home.to(socket_home.id).emit(method_command, result);
    })
});
app.set('port', port);

// LISTEN ON SPECIFIED PORT
server.listen(port);

// LOG WHICH PORT THE SERVER IS RUNNING ON
console.log('Server listening on port ' + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = app;
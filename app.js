//importar as configurações do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(8888, function(){
        console.log('Server ON');
    });

var io = require('socket.io').listen(server);

/* Criar a conexao por websocket */
io.on('connection', function(socket){
    console.log('Usuario conectou');
});
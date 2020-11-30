//importar as configurações do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(8888, function(){
        console.log('Server ON');
    });

var io = require('socket.io').listen(server);

//tornando a variavel io global para utilizar em chat.js
app.set('io', io);

/* Criar a conexao por websocket */

/* WebSockets é uma tecnologia avançada que torna possível abrir uma sessão 
de comunicação interativa entre o navegador do usuário e um servidor. 
Com esta API, você pode enviar mensagens para um servidor e receber 
respostas orientadas a eventos sem ter que consultar o servidor para 
obter uma resposta.

https://www.npmjs.com/package/websocket

https://www.npmjs.com/package/socket.io

----------COMO FUNCIONA ON/EMIT---------------

on('nome', function(){
    ouvindo pedidos de execução
})

emit('nome', pode ser uma function/string/etc){
    Pedido para executar alguma ação
})

*/

io.on('connection', function(socket){
    console.log('Usuario conectou');

    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });

    socket.on('msgParaServidor', function(data){
        //dialogo
        socket.emit('msgParaClientes',
        {
            apelido: data.apelido, mensagem: data.mensagem
        });

        socket.broadcast.emit('msgParaClientes',
        {
            apelido: data.apelido, mensagem: data.mensagem
        });

        //participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('particpantesParaClientes',
            {
                apelido: data.apelido
            });

            socket.broadcast.emit('particpantesParaClientes',
            {
                apelido: data.apelido
            });
        }
    });
});
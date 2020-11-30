const { emit } = require("../../config/server");

module.exports.initChat = function(application, req, res){
    var dadosForm = req.body;
    
    req.assert('apelido', 'Nome ou apelido obrigatorio').notEmpty();
    req.assert('apelido','O campo deve ter entre 3 e 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render('index.ejs', {validacao :erros});
        return;
    }
    //recebendo a variavel io do app.js
    application.get('io').emit('msgParaClientes', {apelido: dadosForm.apelido, mensagem:' acabou de entrar'});

    res.render('chat.ejs', {
        dadosForm: dadosForm
    });
}
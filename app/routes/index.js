module.exports = function(application){
    application.get('/chat', function(req, res){
        res.render('index');
    })
}
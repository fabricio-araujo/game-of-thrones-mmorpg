module.exports.cadastro = function(application, req, res) {
    res.render('cadastro', {validation: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res) {
    //uses bodyparser
    var dadosForm = req.body;

    //uses express validator
    req.assert('nome', 'Name cannot be empty').notEmpty();
    req.assert('usuario', 'User cannot be empty').notEmpty();
    req.assert('senha', 'Password cannot be empty').notEmpty();
    req.assert('casa', 'House cannot be empty').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('cadastro', {validation: errors, dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);

    res.send('Podemos cadastrar!')
}
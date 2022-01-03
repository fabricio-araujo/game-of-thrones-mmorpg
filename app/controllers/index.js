module.exports.index = function(application, req, res) {
    res.render('index', {validation: {}})
}

module.exports.autenticar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('usuario', 'User cannot be empty').notEmpty();
    req.assert('senha', 'Password cannot be empty').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('index', {validation: errors});
        return;
    }

    var connection = application.config.dbConnection;
    
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);
}
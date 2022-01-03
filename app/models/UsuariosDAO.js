function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection('usuarios', function(err, collection) {
            collection.insert(usuario);

            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection('usuarios', function(err, collection) {
            //{usuario: usuario.usuario, senha: usuario.senha} replaced only by user. toArray required to convert cursor
            collection.find(usuario).toArray(function(err, result){

                if(result[0] != undefined) {
                    req.session.autorizado = true;
                    //session variables
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autorizado) {
                    res.redirect('jogo');
                }else {
                    res.render('index', {validation: {}});
                }

            }); 
            mongoclient.close();
        });
    });
}

//consign expects the export of a module in order to load it
module.exports = function() {
    return UsuariosDAO;
} 
function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    this._connection.open(function(err, mongoClient) {
        mongoClient.collection('jogo', function(err, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 25,
                suditos: 10,
                temor: Marth.floor(Math.random() * 1000),
                sabedoria: Marth.floor(Math.random() * 1000),
                comercio: Marth.floor(Math.random() * 1000),
                magia: Marth.floor(Math.random() * 1000),
            });
        });
        mongoClient.close();
    });
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa) {
    this._connection.open(function(err, mongoClient) {
        mongoClient.collection('jogo', function(err, collection) {
            collection.find({usuario: usuario}).toArray(function(err, result){
                
	            res.render("jogo", {img_casa: casa, jogo: result[0]});
                
                mongoClient.close();
            });
        });
    });
}

module.exports = function() {
    return JogoDAO;
}